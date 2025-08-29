# backend/api/transfer.py (updated)
from fastapi import APIRouter, HTTPException
from backend.services.youtube_api import get_authenticated_service
from backend.services.spotify_api import get_spotify_client
from backend.services.transfer_api import transfer_playlist_api
from backend.models.transfer import TransferRequest, TransferResponse

router = APIRouter(tags=["Transfer"])

@router.post("/", response_model=TransferResponse)
def transfer_playlist(request: TransferRequest) -> TransferResponse:
    """
    Transfers a YouTube playlist to Spotify with complete metadata.
    
    This endpoint:
    - Extracts all videos from the YouTube playlist
    - Searches for each song on Spotify
    - Creates a new Spotify playlist
    - Adds found songs to the playlist
    - Returns detailed results for each song
    
    Args:
        request: Transfer request with playlist URL, name, and settings
        
    Returns:
        TransferResponse: Complete transfer results with song details, timing, and statistics
    """
    
    # Get authenticated services
    youtube = get_authenticated_service()
    if not youtube:
        raise HTTPException(status_code=500, detail="YouTube API client not authenticated")
    
    sp = get_spotify_client()
    if not sp:
        raise HTTPException(status_code=500, detail="Spotify API client not authenticated")

    try:
        # Perform the transfer with complete metadata
        result = transfer_playlist_api(
            youtube=youtube,
            sp=sp,
            playlist_url=str(request.playlist_url),
            playlist_name=request.playlist_name,
            is_public=request.is_public,
            description=request.description or "",
        )
        
        return result
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transfer failed: {str(e)}")


# Simple health check endpoint
@router.get("/health")
def health_check():
    """Health check endpoint to verify the service is running."""
    return {"status": "healthy", "service": "playlist-transfer"}