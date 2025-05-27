from typing import Annotated
from fastapi import APIRouter, Query, Body
from backend.services.spotify_api import (
    get_spotify_client,
    api_create_playlist,
    api_search_track,
    api_add_tracks_from_titles
)

router = APIRouter()


@router.get("/search-track")
def search_track(
    title: Annotated[
        str,
        Query(
            ..., 
            title="Track Title", 
            description="The YouTube video or song title to search on Spotify"
        )
    ]
) -> dict:
    """
    Searches Spotify for a track based on the provided title.

    Args:
        title (str): The YouTube/track title to search for on Spotify.

    Returns:
        dict: Contains the Spotify track ID if found.
    """
    sp = get_spotify_client()
    track_id = api_search_track(sp, title)
    return {"track_id": track_id}


@router.post("/create-playlist")
def create_playlist(
    name: Annotated[
        str,
        Query(
            ..., 
            title="Playlist Name", 
            description="The name of the playlist to create"
        )
    ] = "YT Playlist Transfer",
    description: Annotated[
        str,
        Query(
            title="Playlist Description", 
            description="Optional description for the playlist"
        )
    ] = "",
    is_public: Annotated[
        bool,
        Query(
            title="Is Public",
            description="Whether the playlist should be public (True) or private (False)"
        )
    ] = True,
) -> dict:
    """
    Creates a new playlist on Spotify or returns the ID of an existing one with the same name.

    Args:
        name (str): The name of the playlist.
        description (str): A description of the playlist.
        is_public (bool): Determines if the playlist is public.

    Returns:
        dict: Contains the Spotify playlist id.
    """
    sp = get_spotify_client()
    playlist_id = api_create_playlist(
        sp=sp,
        name=name,
        isPublic=is_public,
        description=description
    )
    return {"playlist_id": playlist_id}


@router.post("/add-tracks")
def add_tracks_from_titles(
    playlist_id: Annotated[
        str,
        Query(
            ..., 
            title="Spotify Playlist ID",
            description="The ID of the target Spotify playlist"
        )
    ],
    titles: Annotated[
        list[str],
        Body(
            ..., 
            title="Track Titles",
            description="List of song titles to search on Spotify and add to the playlist"
        )
    ]
) -> dict:
    """
    Adds tracks to a Spotify playlist by searching a list of song titles.

    This endpoint searches for each title on Spotify, retrieves the track ID,
    and adds all found tracks to the specified playlist.

    Args:
        playlist_id (str): Spotify playlist ID.
        titles (list[str]): A list of song titles to search and add.

    Returns:
        dict: A dictionary with the added track IDs and any unmatched titles.
    """
    sp = get_spotify_client()
    result = api_add_tracks_from_titles(sp, playlist_id, titles)
    return result
