from fastapi import APIRouter, HTTPException, Query
from typing import List, Annotated
from backend.services.youtube_api import (
    get_video_titles_from_playlist,
    extract_playlist_id
)


router = APIRouter()

@router.get("/titles", tags=["YouTube"])
def fetch_titles(
    playlist_url: Annotated[
        str,
        Query(
            ..., 
            title="YouTube Playlist url", 
            description="The link to the YouTube playlist"
        )
    ] = None
) -> dict:
    """
    Fetches video titles from a YouTube playlist.
    
    Args:
        playlist_url (str): The YouTube playlist url.

    Returns:
        dict: A list of video titles.
    """
    try:
        playlist_id = extract_playlist_id(playlist_url)
        if not playlist_id:
            raise HTTPException(status_code=400, detail="Playlist id couldn't be extracted")
        
        titles = get_video_titles_from_playlist(playlist_id)
        return {"titles": titles}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
