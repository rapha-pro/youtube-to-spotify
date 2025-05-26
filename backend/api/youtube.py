from fastapi import APIRouter, HTTPException, Query
from typing import List, Annotated
from services.youtube_api import get_video_titles_from_playlist


router = APIRouter()

@router.get("/titles", tags=["YouTube"])
def fetch_titles(
    playlist_id: Annotated[
        str,
        Query(
            ..., 
            title="YouTube Playlist ID", 
            description="The ID of the YouTube playlist (from the URL)"
        )
    ] = None
) -> dict:
    """
    Fetches video titles from a YouTube playlist.
    
    Args:
        playlist_id (str): The YouTube playlist ID.

    Returns:
        dict: A list of video titles.
    """
    try:
        titles = get_video_titles_from_playlist(playlist_id)
        return {"titles": titles}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
