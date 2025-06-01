from typing import Annotated
from fastapi import APIRouter, HTTPException, Query
from backend.services.youtube_api import get_authenticated_service
from backend.services.spotify_api import get_spotify_client
from backend.services.transfer_api import transfer_playlist_api


router = APIRouter(tags=["Transfer"])

@router.get("/transfer")
def transfer_playlist(
    playlist_url: Annotated[
        str,
        Query(
            ...,
            title="YouTube Playlist URL",
            description="The link to the YouTube playlist to transfer"
        )
    ],
    playlist_name: Annotated[
        str,
        Query(
            ...,
            title="Spotify Playlist Name",
            description="The name of the new Spotify playlist"
        )
    ],
    is_public: Annotated[
        bool,
        Query(
            title="Public Playlist?",
            description="Whether the created playlist should be public or private"
        )
    ] = True,
    description: Annotated[
        str,
        Query(
            title="Spotify Playlist Description",
            description="An optional description for the new Spotify playlist"
        )
    ] = ""
) -> dict:
    """
    Transfers a YouTube playlist to Spotify by extracting titles, searching, and adding tracks.

    Args:
        playlist_url (str): The YouTube playlist URL.
        playlist_name (str): Name for the Spotify playlist.
        is_public (bool): Whether the Spotify playlist should be public.
        description (str): Optional description for the playlist.

    Returns:
        dict: Dictionary containing matched and unmatched titles.
    """

    youtube = get_authenticated_service()
    if not youtube:
        raise HTTPException(status_code=500, detail="YouTube API client not authenticated")
    
    sp = get_spotify_client()
    if not sp:
        raise HTTPException(status_code=500, detail="Spotify API client not authenticated")

    try:
        return transfer_playlist_api(
            youtube=youtube,
            sp=sp,
            playlist_url=playlist_url,
            playlist_name=playlist_name,
            is_public=is_public,
            description=description,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))