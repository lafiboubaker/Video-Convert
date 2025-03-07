import os
import json

def convert_to_netscape(json_filename, netscape_filename):
    """Converts a cookies.json file to Netscape format."""
    try:
        with open(json_filename, 'r', encoding='utf-8') as f:
            cookies = json.load(f)
        
        with open(netscape_filename, 'w', encoding='utf-8') as f:
            f.write("# Netscape HTTP Cookie File\n")
            f.write("# This file was generated automatically.\n\n")
            
            for cookie in cookies:
                domain = cookie.get("domain", "")
                flag = "TRUE" if cookie.get("domain_initial_dot", False) else "FALSE"
                path = cookie.get("path", "/")
                secure = "TRUE" if cookie.get("secure", False) else "FALSE"
                expiration = cookie.get("expirationDate", "0")
                name = cookie.get("name", "")
                value = cookie.get("value", "")
                
                f.write(f"{domain}\t{flag}\t{path}\t{secure}\t{expiration}\t{name}\t{value}\n")
        
        print(f"Converted {json_filename} to {netscape_filename}")
        return True
    except Exception as e:
        print(f"Error converting {json_filename}: {e}")
        return False

# Process all JSON cookie files in the directory
json_files = [f for f in os.listdir() if f.endswith(".json")]

for json_file in json_files:
    netscape_file = json_file.replace(".json", "_netscape.txt")
    if convert_to_netscape(json_file, netscape_file):
        try:
            os.remove(json_file)  # Delete original JSON file after successful conversion
            print(f"Deleted original file: {json_file}")
        except Exception as e:
            print(f"Error deleting {json_file}: {e}")

print("All cookies have been converted and original JSON files deleted.")
