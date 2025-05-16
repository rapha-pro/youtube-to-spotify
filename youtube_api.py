import os
import pickle
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from dotenv import load_dotenv
from rich import print
import json
from pathlib import Path


load_dotenv()
SCOPES = [os.getenv("YOUTUBE_SCOPE")]

def get_authenticated_service():
    SCOPES = [os.getenv("YOUTUBE_SCOPE")]
    client_secrets_file = os.getenv("YOUTUBE_CLIENT_JSON")

    creds = None

    # Token cache file
    token_path = "credentials/youtube_token.pickle"

    # Load existing credentials if available
    if os.path.exists(token_path):
        with open(token_path, "rb") as token_file:
            creds = pickle.load(token_file)

    # If no (valid) credentials, authenticate
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())  # refresh the token silently
        else:
            flow = InstalledAppFlow.from_client_secrets_file(client_secrets_file, SCOPES)
            creds = flow.run_local_server(port=8080)

        # Save token for next time
        with open(token_path, "wb") as token_file:
            pickle.dump(creds, token_file)

    return build("youtube", "v3", credentials=creds)



def get_video_titles_from_playlist(playlist_id):
    cache_dir = Path("cache") / f"youtube_raw_{playlist_id}"
    os.makedirs(cache_dir, exist_ok=True)

    youtube = get_authenticated_service()

    titles = []
    next_page_token = None
    page = 1

    while True:
        request = youtube.playlistItems().list(
            part="snippet",
            playlistId=playlist_id,
            maxResults=50,
            pageToken=next_page_token,
        )
        response = request.execute()

        # Save api response for current page in cache dir
        cache_filename = cache_dir / f"page_{page}.json"
        with open(cache_filename, "w", encoding="utf-8") as file:
            json.dump(response, file, indent=4)

        for item in response["items"]:
            title = item["snippet"]["title"]
            titles.append(title)

        next_page_token = response.get("nextPageToken")
        if not next_page_token:
            break

        page += 1

    return titles