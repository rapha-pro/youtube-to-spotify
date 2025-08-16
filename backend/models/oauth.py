from pydantic import BaseModel
from typing import Optional

class OAuthCallbackRequest(BaseModel):
    """Request model for OAuth callback endpoints"""
    code: str
    redirect_uri: str

class SpotifyTokenResponse(BaseModel):
    """Response model for Spotify token exchange"""
    access_token: str
    refresh_token: Optional[str] = None
    expires_in: int
    token_type: str = "Bearer"
    scope: str
    user_info: Optional[dict] = None

class YouTubeTokenResponse(BaseModel):
    """Response model for YouTube/Google token exchange"""
    access_token: str
    refresh_token: Optional[str] = None
    expires_in: int
    token_type: str = "Bearer"
    scope: str
    user_info: Optional[dict] = None

class UserInfo(BaseModel):
    """General user info model"""
    id: str
    name: str
    email: Optional[str] = None
    image: Optional[str] = None
    platform: str  # "spotify" or "youtube"

class OAuthError(BaseModel):
    """OAuth error response model"""
    error: str
    error_description: Optional[str] = None
    detail: str