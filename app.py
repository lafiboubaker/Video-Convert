from flask import Flask, request, jsonify, send_file
import os
import yt_dlp
import qrcode
import re
from io import BytesIO

app = Flask(__name__)

DOWNLOAD_FOLDER = "downloads"
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

# Function to sanitize filenames
def clean_filename(title):
    return re.sub(r'[\\/*?:"<>|]', '', title)

@app.route("/convert", methods=["GET"])
def convert_video():
    video_url = request.args.get("url")
    format_type = request.args.get("format", "mp3")

    if not video_url:
        return jsonify({"error": "Missing video URL"}), 400

    ydl_opts = {
        'outtmpl': os.path.join(DOWNLOAD_FOLDER, '%(title)s.%(ext)s'),
        'format': 'bestaudio/best' if format_type == "mp3" else 'best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }] if format_type == "mp3" else []
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(video_url, download=True)
        video_title = clean_filename(info_dict.get("title"))
        file_ext = "mp3" if format_type == "mp3" else info_dict.get("ext")
        old_file_path = os.path.join(DOWNLOAD_FOLDER, f"{info_dict.get('title')}.{file_ext}")

        safe_file_name = f"{video_title}.{file_ext}"
        safe_file_path = os.path.join(DOWNLOAD_FOLDER, safe_file_name)

        if old_file_path != safe_file_path:
            os.rename(old_file_path, safe_file_path)

    download_url = request.host_url + "download?file=" + safe_file_name
    qr_code_url = request.host_url + "generate_qr?url=" + download_url

    return jsonify({
        "download_url": download_url,
        "qr_code_url": qr_code_url,
        "original_title": video_title
    })

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
    file_name = request.args.get("file")
    file_path = os.path.join(DOWNLOAD_FOLDER, file_name)

    if os.path.exists(file_path):
        response = send_file(file_path, as_attachment=True)
        try:
            os.remove(file_path)  # Delete file after download
        except Exception as e:
            print(f"Error deleting file: {e}")
        return response
    else:
        return jsonify({"error": "File not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
