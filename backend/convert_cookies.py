import os
import json
from http.cookiejar import Cookie, LWPCookieJar

# Function to convert JSON cookies to Netscape format
def convert_json_to_netscape(json_file, netscape_file):
    try:
        # Check if the JSON file exists
        if not os.path.exists(json_file):
            print(f"Error: The file '{json_file}' does not exist.")
            return

        # Load the JSON cookies file
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                cookies = json.load(f)
        except json.JSONDecodeError:
            print(f"Error: The file '{json_file}' contains invalid JSON data.")
            return
        except Exception as e:
            print(f"Error: An unexpected error occurred while reading '{json_file}': {e}")
            return

        # Create a Netscape cookie jar
        cookie_jar = LWPCookieJar()

        # Iterate through each cookie in the JSON file
        for index, cookie in enumerate(cookies):
            try:
                # Check if all required keys are present
                if not all(key in cookie for key in ['name', 'value', 'domain', 'path']):
                    print(f"Warning: Skipping invalid cookie at index {index} in '{json_file}'. Missing required keys.")
                    continue

                # Create a Cookie object
                c = Cookie(
                    version=0,
                    name=cookie['name'],
                    value=cookie['value'],
                    port=None,
                    port_specified=False,
                    domain=cookie['domain'],
                    domain_specified=True,
                    domain_initial_dot=cookie['domain'].startswith('.'),
                    path=cookie['path'],
                    path_specified=True,
                    secure=cookie.get('secure', False),
                    expires=cookie.get('expirationDate', None),
                    discard=False,
                    comment=None,
                    comment_url=None,
                    rest={'HttpOnly': cookie.get('httpOnly', False)},
                )
                cookie_jar.set_cookie(c)
            except Exception as e:
                print(f"Error: Failed to process cookie at index {index} in '{json_file}': {e}")
                continue

        # Save the cookies in Netscape format
        try:
            cookie_jar.save(netscape_file, ignore_discard=True, ignore_expires=True)
            print(f"Conversion successful! The file has been saved as {netscape_file}")
        except Exception as e:
            print(f"Error: Failed to save the Netscape file '{netscape_file}': {e}")

    except Exception as e:
        print(f"Unexpected error during conversion: {e}")

# Main script logic
if __name__ == "__main__":
    # Get the current directory
    current_directory = os.getcwd()

    # Find all JSON files in the current directory
    json_files = [f for f in os.listdir(current_directory) if f.endswith('.json')]

    # Process each JSON file
    for json_file in json_files:
        # Generate the output file name by appending '_netscape.txt' to the original file name
        netscape_file = json_file.replace('.json', '_netscape.txt')
        print(f"Processing {json_file} -> {netscape_file}")
        convert_json_to_netscape(json_file, netscape_file)