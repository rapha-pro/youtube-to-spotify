from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import youtube, spotify, transfer


tags_metadata = [
    {
        "name": "YouTube",
        "description": "Operations related to importing/exporting playlists from YouTube."
    },
    {
        "name": "Spotify",
        "description": "Endpoints to interact with Spotify"
    },
    {
        "name": "Transfer",
        "description": "Transfer playlists between YouTube and Spotify. This includes creating new playlists, searching for tracks, and adding them to Spotify playlists."
    },
]

app = FastAPI(
    title="Syncwave API",
    description="Transfer playlists from YouTube to Spotify",
    version="1.0.0",
    tags_metadata=tags_metadata,
    openapi_tags=tags_metadata,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(youtube.router, prefix="/youtube", tags=["YouTube"])
app.include_router(spotify.router, prefix="/spotify", tags=["Spotify"])
app.include_router(transfer.router, prefix="/transfer", tags=["Transfer"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Syncwave API"}
