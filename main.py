import re
import os
from dotenv import load_dotenv
from youtube_api import get_video_titles_from_playlist


load_dotenv()

playlist_url = os.getenv("YOUTUBE_PLAYLIST_LINK")

# Extract the playlist ID using regex
match = re.search(r"[?&]list=([a-zA-Z0-9_-]+)", playlist_url)
if not match:
    raise ValueError("Invalid YouTube playlist URL: missing 'list=' parameter")


playlist_id = match.group(1)
print(f"Extracted playlist ID: {playlist_id}")


# Get and print titles
titles = get_video_titles_from_playlist(playlist_id)
for title in titles:
    print(title)
