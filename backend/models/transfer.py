from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime

class TransferRequest(BaseModel):
    playlist_url: HttpUrl
    playlist_name: str
    is_public: bool = True
    description: Optional[str] = ""

class YouTubeVideo(BaseModel):
    """Represents a YouTube video with metadata"""
    video_id: str
    title: str
    youtube_url: str
    thumbnail_url: Optional[str] = None
    channel_title: Optional[str] = None
    video_owner_channel: Optional[str] = None

class SpotifyTrack(BaseModel):
    """Represents a Spotify track with metadata"""
    track_id: str
    name: str
    artist: str
    album: Optional[str] = None
    spotify_url: str
    thumbnail_url: Optional[str] = None
    preview_url: Optional[str] = None

class SongResult(BaseModel):
    """Final result for each song in the transfer"""
    id: str  # Unique identifier for this transfer result
    title: str
    artist: str
    album: Optional[str] = None
    thumbnail: Optional[str] = None
    status: str  # "success" | "failed"
    spotify_url: Optional[str] = None
    youtube_url: Optional[str] = None
    error: Optional[str] = None
    
    # Additional metadata
    original_youtube_title: Optional[str] = None
    spotify_match_confidence: Optional[float] = None

class TransferResponse(BaseModel):
    """Complete transfer response with all metadata"""
    success: bool
    playlist_id: str
    playlist_url: str
    total_songs: int
    transferred_songs: int
    failed_songs: int
    songs: List[SongResult]
    transfer_duration: float  # in seconds
    created_at: str
    message: str
    
    # Transfer statistics
    match_rate: float  # percentage of successful matches
    processing_time_per_song: float  # average time per song