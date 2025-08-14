import os
import json
import pickle
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build, Resource
from google.auth.transport.requests import Request
from dotenv import load_dotenv
from pathlib import Path
from urllib.parse import urlparse, parse_qs
from typing import List
from backend.models.transfer import YouTubeVideo

load_dotenv()

def get_authenticated_service(scopes: list[str] = None) -> Resource:
    """
    Authenticates and returns a YouTube API service instance.

    Args:
        scopes (list[str]): A list of OAuth scopes required for the API access.

    Returns:
        Resource: Authenticated YouTube API client resource.
    """

    if scopes is None:
        scopes = [os.getenv("YOUTUBE_SCOPE")]

    client_secrets_file = os.getenv("YOUTUBE_CLIENT_JSON")
    creds = None
    token_path = "backend/credentials/youtube_token.pickle"

    # Load existing credentials if available
    if os.path.exists(token_path):
        with open(token_path, "rb") as token_file:
            creds = pickle.load(token_file)

    # If no (valid) credentials, authenticate
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(client_secrets_file, scopes)
            creds = flow.run_local_server(port=8080)

        # Save token for next time
        with open(token_path, "wb") as token_file:
            pickle.dump(creds, token_file)

    return build("youtube", "v3", credentials=creds)


def get_video_details_from_playlist(
    youtube: Resource,
    playlist_id: str
) -> List[YouTubeVideo]:
    """
    Fetches detailed video information from a YouTube playlist.

    Args:
        youtube (Resource): Authenticated YouTube API service
        playlist_id (str): The YouTube playlist ID

    Returns:
        List[YouTubeVideo]: List of YouTube videos with full metadata
    """

    cache_dir = Path("cache") / f"youtube_raw_{playlist_id}"
    os.makedirs(cache_dir, exist_ok=True)

    videos = []
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

        # Save API response for current page in cache dir
        cache_filename = cache_dir / f"page_{page}.json"
        with open(cache_filename, "w", encoding="utf-8") as file:
            json.dump(response, file, indent=4)

        for item in response["items"]:
            snippet = item["snippet"]
            
            # Extract video ID from resourceId
            video_id = snippet["resourceId"]["videoId"]
            
            # Get the best available thumbnail
            thumbnails = snippet.get("thumbnails", {})
            thumbnail_url = None
            
            # Prefer higher quality thumbnails
            for quality in ["maxres", "standard", "high", "medium", "default"]:
                if quality in thumbnails:
                    thumbnail_url = thumbnails[quality]["url"]
                    break

            # Create YouTubeVideo object
            video = YouTubeVideo(
                video_id=video_id,
                title=snippet["title"],
                youtube_url=f"https://www.youtube.com/watch?v={video_id}",
                thumbnail_url=thumbnail_url,
                channel_title=snippet.get("channelTitle"),
                video_owner_channel=snippet.get("videoOwnerChannelTitle")
            )
            
            videos.append(video)

        next_page_token = response.get("nextPageToken")
        if not next_page_token:
            break

        page += 1

    return videos


def get_video_titles_from_playlist(
    youtube: Resource,
    playlist_id: str
) -> list[str]:
    """
    Legacy function for backward compatibility.
    Fetches only video titles from a YouTube playlist.
    
    Note: Consider using get_video_details_from_playlist() for richer data.
    """
    videos = get_video_details_from_playlist(youtube, playlist_id)
    return [video.title for video in videos]


def extract_playlist_id(playlist_url: str) -> str:
    """
    Extracts the playlist ID from a full YouTube playlist URL.

    Args:
        playlist_url (str): The full YouTube playlist URL.

    Returns:
        str: The extracted playlist ID.

    Raises:
        ValueError: If the URL does not contain a valid playlist ID.
    """
    parsed = urlparse(playlist_url)
    query = parse_qs(parsed.query)
    playlist_id = query.get("list", [None])[0]
    if not playlist_id:
        raise ValueError("Invalid YouTube playlist URL.")
    
    return playlist_id