from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import yt_dlp
import qrcode
from io import BytesIO
import urllib.parse
import subprocess
import time
import threading
import shutil
import re  # Add import for regular expression
import traceback  # Add import for detailed error tracing
import sys
import json  # Add import for JSON handling

# تأكد من دعم UTF-8 لقراءة الأسماء العربية
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')

app = Flask(__name__)
# تفعيل دعم UTF-8 في Flask
app.config['JSON_AS_ASCII'] = False
CORS(app)

DOWNLOAD_FOLDER = "downloads"
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

# Maximum storage size in bytes (e.g., 5GB)
MAX_STORAGE_SIZE = 5 * 1024 * 1024 * 1024

# تقليل مدة الاحتفاظ بالملفات إلى 3 ساعات (10800 ثانية)
FILE_RETENTION_SECONDS = 10800  # 3 hours

# Cleanup interval in seconds (e.g., every 1 hour)
CLEANUP_INTERVAL = 3600

# متغير لتخزين الحجم الحالي للمجلد
current_folder_size = 0

# Mapping platforms to their respective cookies
COOKIE_FILES = {
    "tiktok.com": "tiktok_cookies.txt",
    "facebook.com": "facebook_cookies.txt",
    "instagram.com": "instagram_cookies.txt"
}

def get_cookie_file(url):
    for platform, cookie_file in COOKIE_FILES.items():
        if platform in url:
            return cookie_file if os.path.exists(cookie_file) else None
    return None

def get_folder_size(folder_path):
    """Calculate the total size of a folder in bytes"""
    global current_folder_size
    
    # If current_folder_size is already calculated, return it
    if current_folder_size > 0:
        return current_folder_size
    
    # Calculate folder size if not already done
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(folder_path):
        for filename in filenames:
            file_path = os.path.join(dirpath, filename)
            if os.path.exists(file_path):
                total_size += os.path.getsize(file_path)
    
    # Store the calculated size
    current_folder_size = total_size
    print(f"Initial folder size calculation: {current_folder_size} bytes")
    return total_size

def update_folder_size(change_in_bytes):
    """Update the folder size without recalculating everything"""
    global current_folder_size
    current_folder_size += change_in_bytes
    print(f"Updated folder size: {current_folder_size} bytes (change: {change_in_bytes} bytes)")

def check_storage_usage():
    """Check if storage usage exceeds the maximum limit"""
    current_size = get_folder_size(DOWNLOAD_FOLDER)
    if current_size > MAX_STORAGE_SIZE:
        cleanup_old_files()
        return True
    return False

def cleanup_old_files():
    """Delete old files to free up space"""
    global current_folder_size
    
    print(f"Starting cleanup of old files...")
    now = time.time()
    file_count = 0
    bytes_removed = 0
    
    # Collect all files with their creation time
    files = []
    for filename in os.listdir(DOWNLOAD_FOLDER):
        file_path = os.path.join(DOWNLOAD_FOLDER, filename)
        if os.path.isfile(file_path):
            # تخطى الملفات غير العادية أو المجلدات
            try:
                creation_time = os.path.getctime(file_path)
                file_size = os.path.getsize(file_path)
                files.append((file_path, creation_time, file_size))
            except Exception as e:
                print(f"Error accessing file {file_path}: {e}")
    
    # Sort files by creation time (oldest first)
    files.sort(key=lambda x: x[1])
    
    # First, delete files older than 3 hours
    for file_path, creation_time, file_size in files:
        file_age = now - creation_time
        if file_age > FILE_RETENTION_SECONDS:
            try:
                os.remove(file_path)
                file_count += 1
                bytes_removed += file_size
                print(f"Removed old file: {file_path}, age: {file_age/3600:.1f} hours")
            except Exception as e:
                print(f"Error removing file {file_path}: {e}")
    
    # If still need to free up space, delete oldest files
    if get_folder_size(DOWNLOAD_FOLDER) > MAX_STORAGE_SIZE * 0.9:
        remaining_files = []
        for filename in os.listdir(DOWNLOAD_FOLDER):
            file_path = os.path.join(DOWNLOAD_FOLDER, filename)
            if os.path.isfile(file_path):
                creation_time = os.path.getctime(file_path)
                file_size = os.path.getsize(file_path)
                remaining_files.append((file_path, creation_time, file_size))
        
        # Sort files by creation time (oldest first)
        remaining_files.sort(key=lambda x: x[1])
        
        # Delete oldest files until we're below 90% usage
        for file_path, creation_time, file_size in remaining_files:
            if get_folder_size(DOWNLOAD_FOLDER) <= MAX_STORAGE_SIZE * 0.9:
                break
            
            try:
                os.remove(file_path)
                file_count += 1
                bytes_removed += file_size
                print(f"Removed oldest file for space: {file_path}")
            except Exception as e:
                print(f"Error removing file {file_path}: {e}")
    
    # Update folder size by subtracting bytes removed
    if bytes_removed > 0:
        update_folder_size(-bytes_removed)
    
    print(f"Cleanup completed: removed {file_count} files, freed {bytes_removed/1024/1024:.2f} MB")
    return bytes_removed

# Run cleanup check before each download
def check_and_cleanup():
    """Check storage and clean up if necessary"""
    if check_storage_usage():
        print("Storage limit exceeded, cleanup performed")
    else:
        print("Storage usage is within limits")

# Background thread for periodic cleanup
def periodic_cleanup():
    """Run cleanup periodically in the background"""
    while True:
        try:
            print("Performing periodic cleanup...")
            bytes_removed = cleanup_old_files()
            print(f"Periodic cleanup complete, removed {bytes_removed/1024/1024:.2f} MB")
        except Exception as e:
            print(f"Error in periodic cleanup: {str(e)}")
        
        # Sleep for the specified interval
        time.sleep(CLEANUP_INTERVAL)

# Start the background cleanup thread
cleanup_thread = threading.Thread(target=periodic_cleanup, daemon=True)
cleanup_thread.start()

def sanitize_filename(filename):
    """Clean filename to remove problematic characters for FFmpeg while preserving Arabic characters"""
    # Replace special slash character with hyphen
    filename = filename.replace("⧸", "-")
    filename = filename.replace("/", "-")
    filename = filename.replace("\\", "-")
    
    # Replace other special characters, but preserve Arabic and other non-ASCII characters
    filename = re.sub(r'[*?:"<>|]', "-", filename)
    
    # Replace multiple spaces with single space
    filename = re.sub(r'\s+', " ", filename)
    
    # Trim spaces at beginning and end
    filename = filename.strip()
    
    # Ensure filename is not empty
    if not filename:
        filename = "video"
    
    return filename

def get_video_duration(file_path):
    """Get the duration of a video file using FFmpeg"""
    try:
        cmd = [
            "ffprobe", 
            "-v", "error", 
            "-show_entries", "format=duration", 
            "-of", "json", 
            file_path
        ]
        
        process = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
        
        if process.returncode != 0:
            print(f"Error getting video duration: {process.stderr}")
            return None
        
        # Parse the JSON output
        output = json.loads(process.stdout)
        duration = float(output['format']['duration'])
        
        print(f"Video duration: {duration:.2f} seconds")
        return int(duration)  # Return as integer seconds
    except Exception as e:
        print(f"Error getting video duration: {str(e)}")
        return None

@app.route("/convert", methods=["GET"])
def convert_video():
    try:
        # Check and clean up storage before downloading
        check_and_cleanup()
        
        video_url = request.args.get("url")
        format_type = request.args.get("format", "mp3")
        quality = request.args.get("quality", "720p")

        if not video_url:
            return jsonify({"error": "Missing video URL"}), 400

        cookie_file = get_cookie_file(video_url)
        
        try:
            # Add a unique timestamp to avoid filename conflicts
            timestamp = int(time.time())
            temp_dir = os.path.join(DOWNLOAD_FOLDER, f"temp_{timestamp}")
            os.makedirs(temp_dir, exist_ok=True)
            
            # Use only %(title)s for output template to preserve original title
            output_template = os.path.join(temp_dir, '%(title)s.%(ext)s')
            
            if format_type == "mp3":
                audio_quality = quality.replace("kbps", "")
                
                # Check if audio quality is supported
                # Support high audio quality up to 1500 kbps
                supported_audio_qualities = ["64", "128", "192", "256", "320", "500", "1000", "1500"]
                
                # If quality is not supported, use default quality
                if audio_quality not in supported_audio_qualities:
                    print(f"Unsupported audio quality: {audio_quality}, falling back to 128")
                    audio_quality = "128"
                
                print(f"Using audio quality: {audio_quality}kbps")
                
                ydl_opts = {
                    'outtmpl': output_template,
                    'format': 'bestaudio/best',
                    'cookiefile': cookie_file if cookie_file else None,
                    'postprocessors': [{
                        'key': 'FFmpegExtractAudio',
                        'preferredcodec': 'mp3',
                        'preferredquality': audio_quality,
                    }],
                    'verbose': True
                }
            else:
                height_map = {
                    "8K": 4320,
                    "4320p": 4320,
                    "4K": 2160,
                    "2160p": 2160,
                    "2K": 1440,
                    "1440p": 1440,
                    "1080p": 1080,
                    "720p": 720,
                    "480p": 480,
                    "360p": 360
                }
                
                # Check if requested quality is supported
                if quality not in height_map:
                    print(f"Unsupported video quality: {quality}, falling back to 720p")
                    quality = "720p"
                
                height = height_map.get(quality, 720)
                
                print(f"Using video quality: {quality} (height={height})")
                
                # Use exact format selection to match user's requested quality
                ydl_opts = {
                    'outtmpl': output_template,
                    'format': f'bestvideo[height={height}]+bestaudio/best',
                    'cookiefile': cookie_file if cookie_file else None,
                    'merge_output_format': 'mp4',
                    'verbose': True,
                    'format_sort': [f'res:{height}', 'codec:h264'],
                    'postprocessors': [{
                        'key': 'FFmpegVideoConvertor',
                        'preferedformat': 'mp4',
                    }]
                }

            print(f"Starting download with options: {ydl_opts}")
            print(f"Selected quality: {quality}")
            
            print(f"Video URL: {video_url}")
            print(f"Format type: {format_type}")
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info_dict = ydl.extract_info(video_url, download=False)
                
                # Extract original title for later use
                original_title = info_dict.get("title", "unknown")
                print(f"Original title: {original_title}")
                
                # Log available formats for debugging
                available_formats = []
                if 'formats' in info_dict:
                    print("Available formats:")
                    for fmt in info_dict['formats']:
                        height = fmt.get('height')
                        if height:
                            format_info = {
                                'format_id': fmt.get('format_id'),
                                'height': height,
                                'format': fmt.get('format'),
                                'vcodec': fmt.get('vcodec', 'unknown'),
                                'acodec': fmt.get('acodec', 'unknown'),
                                'filesize': fmt.get('filesize', 0)
                            }
                            available_formats.append(format_info)
                            print(f"Format ID: {fmt.get('format_id')}, Resolution: {height}p, Format: {fmt.get('format')}")
                
                # Download the video with the exact format specified
                info_dict = ydl.extract_info(video_url, download=True)
                
                # Get original title and sanitize it without altering it too much
                video_title = info_dict.get("title", "unknown")
                sanitized_title = sanitize_filename(video_title)
                
                file_ext = "mp3" if format_type == "mp3" else info_dict.get("ext", "mp4")
                
                # Find the file in the temp directory
                downloaded_files = os.listdir(temp_dir)
                if not downloaded_files:
                    raise Exception("No file was downloaded")
                
                # Get the first file that matches the expected extension
                downloaded_file = None
                for file in downloaded_files:
                    if file.endswith(f".{file_ext}"):
                        downloaded_file = file
                        break
                
                if not downloaded_file:
                    # Try to find any file if no matching extension
                    downloaded_file = downloaded_files[0] if downloaded_files else None
                    
                if not downloaded_file:
                    raise Exception("Could not find downloaded file")
                
                # Create the final file name and path, preserving original title
                # Just add a timestamp to avoid conflicts
                original_file_name = f"{sanitized_title}.{file_ext}"
                temp_file_path = os.path.join(temp_dir, downloaded_file)
                original_file_path = os.path.join(DOWNLOAD_FOLDER, original_file_name)
                
                # If file already exists, add timestamp
                if os.path.exists(original_file_path):
                    original_file_name = f"{sanitized_title}_{timestamp}.{file_ext}"
                    original_file_path = os.path.join(DOWNLOAD_FOLDER, original_file_name)
                
                # Get the size of the temp file
                temp_file_size = os.path.getsize(temp_file_path)
                
                # Move the file from temp to final location
                shutil.move(temp_file_path, original_file_path)
                
                # Update the total folder size
                update_folder_size(temp_file_size)
                
                # Clean up temp directory
                try:
                    shutil.rmtree(temp_dir)
                except Exception as e:
                    print(f"Warning: Could not remove temp directory: {str(e)}")
                
                # Get the actual quality of the downloaded video
                actual_quality = quality
                if format_type != "mp3":
                    actual_height = info_dict.get('height', 0)
                    print(f"Actual video height: {actual_height}p")
                    
                    if actual_height >= 2160:
                        actual_quality = "4K"
                    elif actual_height >= 1440:
                        actual_quality = "1440p"
                    elif actual_height >= 1080:
                        actual_quality = "1080p"
                    elif actual_height >= 720:
                        actual_quality = "720p"
                    elif actual_height >= 480:
                        actual_quality = "480p"
                    elif actual_height >= 360:
                        actual_quality = "360p"
                    else:
                        actual_quality = f"{actual_height}p"

            # Verify that the file was actually created
            if not os.path.exists(original_file_path):
                return jsonify({"error": "File was not created successfully"}), 500
            
            # Get file size for verification
            file_size = os.path.getsize(original_file_path)
            if file_size == 0:
                return jsonify({"error": "File was created but is empty"}), 500
            
            # Get video duration if it's a video file
            duration = None
            if format_type == 'mp4':
                duration = get_video_duration(original_file_path)
            
            print(f"File saved at: {original_file_path} with size: {file_size} bytes")
            encoded_file_name = urllib.parse.quote(original_file_name)

            # Make sure to use the server's actual host when generating URLs
            download_url = request.host_url + "download?file=" + encoded_file_name
            qr_code_url = request.host_url + "generate_qr?url=" + urllib.parse.quote(download_url)

            # Add file size and duration to response
            response_data = {
                "download_url": download_url,
                "qr_code_url": qr_code_url,
                "original_title": video_title,  # Send the original title back to the client
                "file_name": original_file_name,
                "selected_quality": quality,
                "actual_quality": actual_quality,
                "file_size": file_size
            }
            
            # Add duration if available
            if duration is not None:
                response_data["duration"] = duration
            
            return jsonify(response_data)
        except Exception as e:
            error_trace = traceback.format_exc()
            print(f"Error during download: {str(e)}")
            print(f"Error trace: {error_trace}")
            return jsonify({
                "error": f"Error during download: {str(e)}",
                "details": error_trace
            }), 500
    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"Unexpected error in convert_video: {str(e)}")
        print(f"Error trace: {error_trace}")
        return jsonify({
            "error": f"Unexpected error: {str(e)}",
            "details": error_trace
        }), 500

@app.route("/generate_qr", methods=["GET"])
def generate_qr():
    download_url = request.args.get("url")
    if not download_url:
        return jsonify({"error": "Missing URL"}), 400

    qr = qrcode.make(download_url)
    img_io = BytesIO()
    qr.save(img_io, 'PNG')
    img_io.seek(0)

    return send_file(img_io, mimetype="image/png")

@app.route("/download", methods=["GET"])
def download_file():
    try:
        encoded_file_name = request.args.get("file")
        if not encoded_file_name:
            return jsonify({"error": "Missing file parameter"}), 400
            
        # Properly decode URL-encoded Arabic characters
        file_name = urllib.parse.unquote(encoded_file_name)
        file_path = os.path.join(DOWNLOAD_FOLDER, file_name)
        
        print(f"DEBUG: Trying to download file from: {file_path}")
        
        if os.path.exists(file_path):
            try:
                # Make sure the file exists and is not empty
                if os.path.getsize(file_path) == 0:
                    return jsonify({"error": "File exists but is empty"}), 404
                
                # Set proper headers for Arabic filenames
                response = send_file(
                    file_path, 
                    as_attachment=True, 
                    download_name=file_name,
                    mimetype="application/octet-stream"
                )
                
                # Set Content-Disposition header with encoded filename
                encoded_filename_header = urllib.parse.quote(file_name.encode('utf-8'))
                response.headers.set(
                    'Content-Disposition', 
                    f'attachment; filename="{encoded_filename_header}"; filename*=UTF-8\'\'{encoded_filename_header}'
                )
                
                return response
            except Exception as e:
                error_trace = traceback.format_exc()
                print(f"Error sending file: {str(e)}")
                print(f"Error trace: {error_trace}")
                return jsonify({"error": f"Error sending file: {str(e)}"}), 500
        else:
            # Try to find files with similar names by listing all files and comparing
            files_in_dir = os.listdir(DOWNLOAD_FOLDER)
            if len(files_in_dir) > 0:
                print(f"Files in download directory: {files_in_dir}")
                
                # Check file extension
                file_ext = file_name.split('.')[-1].lower()
                
                # First try exact matches with the same extension
                for file in files_in_dir:
                    if file.lower().endswith(f".{file_ext}"):
                        # Try to match the sanitized version of the filename
                        sanitized_request = sanitize_filename(file_name)
                        sanitized_file = sanitize_filename(file)
                        
                        # Check if base names (without timestamps) match
                        base_name_request = sanitized_request.split('_')[0]
                        if base_name_request in sanitized_file:
                            print(f"Found matching file: {file}")
                            
                            response = send_file(
                                os.path.join(DOWNLOAD_FOLDER, file),
                                as_attachment=True,
                                download_name=file,
                                mimetype="application/octet-stream"
                            )
                            
                            # Set Content-Disposition header with encoded filename
                            encoded_filename_header = urllib.parse.quote(file.encode('utf-8'))
                            response.headers.set(
                                'Content-Disposition', 
                                f'attachment; filename="{encoded_filename_header}"; filename*=UTF-8\'\'{encoded_filename_header}'
                            )
                            
                            return response
                
                # If no exact match, try fuzzy matching
                for file in files_in_dir:
                    if file.lower().endswith(f".{file_ext}"):
                        similar_count = sum(1 for a, b in zip(file.lower(), file_name.lower()) if a == b)
                        similarity = similar_count / max(len(file), len(file_name))
                        if similarity > 0.7:
                            print(f"Found similar file: {file}")
                            
                            response = send_file(
                                os.path.join(DOWNLOAD_FOLDER, file),
                                as_attachment=True,
                                download_name=file,
                                mimetype="application/octet-stream"
                            )
                            
                            # Set Content-Disposition header with encoded filename
                            encoded_filename_header = urllib.parse.quote(file.encode('utf-8'))
                            response.headers.set(
                                'Content-Disposition', 
                                f'attachment; filename="{encoded_filename_header}"; filename*=UTF-8\'\'{encoded_filename_header}'
                            )
                            
                            return response
            
            print(f"Error: File not found at {file_path}")
            return jsonify({"error": "File not found", "file_requested": file_name}), 404
    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"Unexpected error in download_file: {str(e)}")
        print(f"Error trace: {error_trace}")
        return jsonify({
            "error": f"Unexpected error: {str(e)}",
            "details": error_trace
        }), 500

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint to verify server connectivity"""
    return jsonify({
        "status": "ok",
        "message": "Flask server is running"
    })

@app.route("/trim", methods=["GET"])
def trim_video():
    """Trim a video file based on start and end timestamps"""
    try:
        # Get parameters from request
        video_url = request.args.get("url")
        start_time = request.args.get("start", "0")
        end_time = request.args.get("end", "0")
        
        if not video_url:
            return jsonify({"error": "Missing video URL"}), 400
            
        print(f"Trimming video from {start_time} to {end_time} seconds")
        
        try:
            # Extract filename from URL
            video_filename = video_url.split("/download?file=")[-1]
            video_filename = urllib.parse.unquote(video_filename)
            
            # Check if file exists in download folder
            original_file_path = os.path.join(DOWNLOAD_FOLDER, video_filename)
            if not os.path.exists(original_file_path):
                return jsonify({"error": f"Original file not found: {video_filename}"}), 404
            
            # Get the original video duration to verify the trim range
            original_duration = get_video_duration(original_file_path)
            if original_duration is None:
                return jsonify({"error": "Could not determine video duration"}), 500
                
            # Ensure trim values are within the valid range
            try:
                start_seconds = float(start_time)
                end_seconds = float(end_time)
                
                if start_seconds < 0:
                    start_seconds = 0
                
                if end_seconds > original_duration:
                    end_seconds = original_duration
                    
                if start_seconds >= end_seconds:
                    return jsonify({"error": "Start time must be less than end time"}), 400
                    
                # Convert to FFmpeg time format
                start_time_str = str(start_seconds)
                end_time_str = str(end_seconds)
                
                print(f"Trimming from {start_time_str} to {end_time_str} (original duration: {original_duration}s)")
            except ValueError:
                return jsonify({"error": "Invalid time format. Please use seconds (e.g., 120.5)"}), 400
            
            # Get the original file size before creating a new file
            original_file_size = os.path.getsize(original_file_path)
            
            # Create trimmed filename with timestamp to avoid conflicts
            filename, extension = os.path.splitext(video_filename)
            timestamp = int(time.time())
            trimmed_filename = sanitize_filename(f"{filename}_trim_{start_time_str}-{end_time_str}_{timestamp}{extension}")
            trimmed_filepath = os.path.join(DOWNLOAD_FOLDER, trimmed_filename)
            
            # Use FFmpeg to trim the video
            cmd = [
                "ffmpeg", "-y",
                "-i", original_file_path,
                "-ss", start_time_str,
                "-to", end_time_str,
                "-c:v", "copy",
                "-c:a", "copy",
                trimmed_filepath
            ]
            
            print(f"Executing FFmpeg command: {' '.join(cmd)}")
            process = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
            
            if process.returncode != 0:
                print(f"FFmpeg error: {process.stderr}")
                return jsonify({"error": f"Error trimming video: {process.stderr}"}), 500
            
            # Verify trimmed file exists
            if not os.path.exists(trimmed_filepath):
                return jsonify({"error": "Trimmed file was not created"}), 500
            
            # Get file size
            trimmed_file_size = os.path.getsize(trimmed_filepath)
            if trimmed_file_size == 0:
                os.remove(trimmed_filepath)  # Remove empty file
                return jsonify({"error": "Trimmed file is empty"}), 500
                
            # Verify that the trimmed video exists and get its duration
            trimmed_duration = get_video_duration(trimmed_filepath)
            if trimmed_duration is None:
                os.remove(trimmed_filepath)
                return jsonify({"error": "Failed to create valid trimmed video"}), 500
                
            # Verify that the trimmed duration is approximately end_seconds - start_seconds
            expected_duration = end_seconds - start_seconds
            actual_duration = trimmed_duration
            
            print(f"Trimmed video duration: {actual_duration}s (expected: {expected_duration}s)")
            
            # Update storage size tracking
            update_folder_size(trimmed_file_size)
            
            # Generate download URL with proper encoding for Arabic characters
            encoded_trimmed_filename = urllib.parse.quote(trimmed_filename)
            download_url = request.host_url + "download?file=" + encoded_trimmed_filename
            
            return jsonify({
                "download_url": download_url,
                "file_name": trimmed_filename,
                "original_filename": video_filename,
                "file_size": trimmed_file_size,
                "duration": trimmed_duration,
                "original_duration": original_duration,
                "trim_start": start_seconds,
                "trim_end": end_seconds,
                "trim_success": True,
                "message": "Video trimmed successfully"
            })
            
        except Exception as e:
            error_trace = traceback.format_exc()
            print(f"Error during video trimming: {str(e)}")
            print(f"Error trace: {error_trace}")
            return jsonify({
                "error": f"Error during video trimming: {str(e)}",
                "details": error_trace
            }), 500
    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"Unexpected error in trim_video: {str(e)}")
        print(f"Error trace: {error_trace}")
        return jsonify({
            "error": f"Unexpected error: {str(e)}",
            "details": error_trace
        }), 500

if __name__ == "__main__":
    # Start the background cleanup thread if running as main app
    if not threading.active_count() > 1:  # Only start if not already running
        cleanup_thread = threading.Thread(target=periodic_cleanup, daemon=True)
        cleanup_thread.start()
        
    app.run(host="127.0.0.1", port=5000, debug=True)
