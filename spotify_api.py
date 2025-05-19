import os
import spotify
from spotify.oath2 import SpotifyOAuth
from dotenv import load_dotenv


load_dotenv()

# Create Spotify client using OAuth
def get_spotify_client():
    sp = spotify.Spotify(auth_manager=SpotifyOAuth(
        client_id=os.getenv("SPOTIFY_CLIENT_ID"),
        client_secret=os.getenv("SPOTIFY_CLIENT_SECRET"),
        redirect_uri=os.getenv("SPOTIFY_REDIRECT_URI"),
        scope=os.getenv("SPOTIFY_SCOPE")
    ))

    return sp


# Create a new playlist or return the playlist_id if it exists
def create_playlist(sp, name="Youtube Playlist", isPublic=False):
    user_id = sp.me()['id']
    playlists = sp.current_user_playlists(limit=50)['items']

    # check if playlist already exists
    for pl in playlists:
        if pl['name'] == name:
            return pl['id']


    # create the playlist
    new_playlist = sp.user_playlist_create(user=user_id, name=name, public=isPublic)

    return new_playlist['id']


# Search for a song on Spotify and return the track ID
def search_track(sp, title):
    results = sp.search(q=title, limit=1, type="track")
    tracks = results.get('tracks', {}).get('items', [])
    if tracks:
        return tracks[0]['id']

    return None


# Add tracks to playlist in batch
def add_tracks_to_playlist(sp, playlist_id, track_ids):
    track_ids = list(filter(None, set(track_ids)))

    for i in range(0, len(track_ids), 100):
        sp.playlist_add_items(playlist_id, track_ids[i:i + 100])
