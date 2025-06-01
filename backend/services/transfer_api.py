from googleapiclient.discovery import Resource
import spotipy
from backend.services.youtube_api import (
    get_video_titles_from_playlist,
    extract_playlist_id
)
from backend.services.spotify_api import (
    api_create_playlist,
    api_add_tracks_from_titles,
)
from urllib.parse import urlparse, parse_qs
import logging


# Setup a logger instance for this module
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Add a basic console handler
console_handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)

# Add handler only if not already added. Prevents duplicate log entries if this module gets imported multiple times
if not logger.handlers:
    logger.addHandler(console_handler)


def transfer_playlist_api(
    youtube: Resource,
    sp: spotipy.Spotify,
    playlist_url: str,
    playlist_name: str,
    is_public: bool = True,
    description: str = "Youtube Playlist Transfer"
) -> dict:
    """
    Transfers a YouTube playlist to a new Spotify playlist.

    Args:
        youtube (Resource): Authenticated YouTube API service.
        sp (spotipy.Spotify): Authenticated Spotify client.
        playlist_url (str): The full YouTube playlist URL.
        playlist_name (str): Name for the new Spotify playlist.
        is_public (bool): Visibility of the Spotify playlist.
        description (str): Optional description.

    Returns:
        str: Name of the created Spotify playlist.
        dict: Summary of the transfer (added, unmatched).
    """

    playlist_id = extract_playlist_id(playlist_url)

    titles = get_video_titles_from_playlist(youtube, playlist_id)

    # Create (or reuse) Spotify playlist
    spotify_playlist_id = api_create_playlist(
        sp,
        name=playlist_name,
        isPublic=is_public,
        description=description
    )

    # Add tracks from titles
    summary = api_add_tracks_from_titles(sp, spotify_playlist_id, titles)

    logger.info("=== Playlist Transfer Summary ===")
    logger.info(f"Playlist name: {playlist_name}")
    logger.info(f"Total YouTube Videos: {len(titles)}")
    logger.info(f"Matched on Spotify: {len(summary['added'])}")
    logger.info(f"Unmatched: {len(summary['unmatched'])}")
    logger.info("===============================")

    return summary
