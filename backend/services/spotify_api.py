import os
import spotipy
from rich import print
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv


load_dotenv()

def get_spotify_client(scope: str = None) -> spotipy.Spotify:
    """
    Authenticates and returns a Spotipy client instance.

    Args:
        scope (str): The Spotify OAuth scopes as a space-separated string.

    Returns:
        spotipy.Spotify: Authenticated Spotify client.
    """

    if scope is None:
        scope = os.getenv("SPOTIFY_SCOPE")

    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
        client_id=os.getenv("SPOTIFY_CLIENT_ID"),
        client_secret=os.getenv("SPOTIFY_CLIENT_SECRET"),
        redirect_uri=os.getenv("SPOTIFY_REDIRECT_URI"),
        scope=scope
    ))

    return sp


def api_get_existing_playlist_id(sp: spotipy.Spotify, user_id: str, name: str) -> str | None:
    """
    Checks if a playlist with the given name already exists.

    Args:
        sp (spotipy.Spotify): Authenticated Spotify client.
        user_id (str): id of the user
        name (str): The name of the playlist to look for.

    Returns:
        str | None: The ID of the playlist if found, otherwise None.
    """

    user_id = sp.me()["id"]  # get the user id of the authenticated user
    limit = 10
    offset = 0

    while True:
        playlists = sp.current_user_playlists(limit=limit, offset=offset)
        for playlist in playlists["items"]:
            if playlist["name"].lower() == name.lower() and playlist["owner"]["id"] == user_id:
                return playlist["id"]

        if playlists["next"]:
            offset += limit
        else:
            break

    return None


def api_create_playlist(sp: spotipy.Spotify, name: str, isPublic: bool = True, description: str = "") -> str:
    """
    Creates a new playlist or reuses existing one with same name

    Args:
        sp (spotipy.Spotify): The authenticated Spotify client.
        name (str): The name of the playlist.
        isPublic (bool): access level of the playlist
        description (str): (Optional) Description for the playlist.

    Returns:
        str: The Spotify playlist ID.
    """

    user_id = sp.me()["id"] 
    existing_id = api_get_existing_playlist_id(sp, user_id, name)
    if existing_id:
        print(f"[bold yellow]Playlist '{name}' already exists. Using existing playlist.[/bold yellow]\n")
        return existing_id

    # create the playlist
    new_playlist = sp.user_playlist_create(user=user_id, name=name, public=isPublic, description=description)
    return new_playlist["id"]


def api_search_track(sp: spotipy.Spotify, title: str) -> str | None:
    """
    Searches for a song on Spotify using a given title.

    Args:
        sp (spotipy.Spotify): The authenticated Spotify client.
        title (str): The YouTube video title to search for.

    Returns:
        str | None: The Spotify track ID if found, else None.
    """

    results = sp.search(q=title, limit=1, type="track")
    tracks = results.get('tracks', {}).get('items', [])
    if tracks:
        return tracks[0]['id']

    return None


# Add tracks to playlist in batch
def api_add_tracks_to_playlist(sp: spotipy.Spotify, playlist_id: str, track_ids: list[str]) -> None:
    """
    Adds a list of track IDs to a specified Spotify playlist.

    Args:
        sp (spotipy.Spotify): The authenticated Spotify client.
        playlist_id (str): The ID of the target playlist.
        track_ids (list[str]): A list of Spotify track IDs to add.
    """

    track_ids = list(filter(None, set(track_ids)))

    for i in range(0, len(track_ids), 100):
        sp.playlist_add_items(playlist_id, track_ids[i:i + 100])

    return



def api_add_tracks_from_titles(
    sp: spotipy.Spotify,
    playlist_id: str,
    titles: list[str]
) -> dict:
    """
    Searches for each title and adds matching tracks to the playlist.

    Args:
        sp (spotipy.Spotify): The authenticated Spotify client.
        playlist_id (str): The Spotify playlist ID.
        titles (list[str]): List of song titles to search for and add.

    Returns:
        dict: Summary with added track IDs and unmatched titles.
    """
    track_ids = []
    unmatched_titles = []

    for title in titles:
        track_id = api_search_track(sp, title)
        if track_id:
            track_ids.append(track_id)
        else:
            unmatched_titles.append(title)

    if track_ids:
        api_add_tracks_to_playlist(sp, playlist_id, track_ids)

    return {
        "matched": track_ids,
        "unmatched": unmatched_titles
    }