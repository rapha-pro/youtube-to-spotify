import os
import re
from dotenv import load_dotenv
from youtube_api import get_video_titles_from_playlist
from spotify_api import (
    get_spotify_client,
    create_playlist,
    search_track,
    add_tracks_to_playlist,
)
from rich.progress import Progress
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from pathlib import Path
from datetime import datetime
import argparse



load_dotenv()
console = Console()

def parse_args():
    parser = argparse.ArgumentParser(description="Transfer YouTube playlist to Spotify")
    parser.add_argument(
        "--playlist",
        type=str,
        default="YT Playlist Transfer",
        help="Name of the Spotify playlist to create or update."
    )
    parser.add_argument("--public", action="store_true", help="Make the Spotify playlist public")
    parser.add_argument("--dry-run", action="store_true", help="Simulate the playlist transfer without modifying Spotify, just show stats")

    return parser.parse_args()


def main():
    # Setup
    args = parse_args()
    playlist_name = args.playlist
    is_public = args.public
    dry_run = args.dry_run

    yt_url = os.getenv("YOUTUBE_PLAYLIST_URL")
    playlist_id = extract_playlist_id(yt_url)

    console.rule("[bold cyan]YT → Spotify Playlist Transfer")
    log_timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Step 1: Get YouTube Titles
    console.print("[bold yellow]🔍 Fetching video titles from YouTube...")
    titles = get_video_titles_from_playlist(playlist_id)
    console.print(f"[green]✅ {len(titles)} titles fetched.\n")

    # Step 2: Spotify Auth
    sp = get_spotify_client()
    playlist_description = f"{playlist_name} created on {log_timestamp}"
    spotify_playlist_id = create_playlist(sp, name=playlist_name, isPublic=is_public, description=playlist_description)
    console.print(f"[bold magenta]🎵 Using Spotify playlist: [bold underline]{playlist_name}\n")


    # Step 3: Search & Match tracks
    track_ids = []
    unmatched_titles = []

    # Create the Log directory if it does not exist
    log_dir = Path("logs")
    log_dir.mkdir(parents=True, exist_ok=True)
    unmatched_file = log_dir / f"unmatched_songs_for_{playlist_name.replace(' ', '_')}.txt"

    console.print("[cyan]🎯 Searching for tracks on Spotify...\n")

    with Progress() as progress:
        task = progress.add_task("🔍 Matching tracks...", total=len(titles))
        for title in titles:
            track_id = search_track(sp, title)
            if track_id:
                track_ids.append(track_id)
            else:
                unmatched_titles.append(title)
            progress.update(task, advance=1)

    # Step 4: Report Unmatched tracks
    if unmatched_titles:
        with open(unmatched_file, "w", encoding="utf-8") as f:
            for title in unmatched_titles:
                f.write(f"{title}\n")
        console.print(
            Panel.fit(
                f"[red]⚠️ {len(unmatched_titles)} song(s) could not be matched.\nSaved to: {unmatched_file}",
                title="Unmatched Songs",
                style="bold red",
            )
        )
    else:
        console.print("[green]✅ All songs matched successfully!")


    # Step 5: Add Tracks
    if dry_run:
        console.print("\n[bold yellow]➕ Dry run: Adding tracks to Spotify playlist...")
    else:
        console.print("\n[bold yellow]➕ Adding tracks to Spotify playlist...")
        add_tracks_to_playlist(sp, spotify_playlist_id, track_ids)
    console.print("[bold green]🎉 Playlist transfer complete!")


    # Step 6: Summary (on Terminal)
    console.print("\n[bold blue]📊 Transfer Summary:\n")

    summary_table = Table(title="🎵 Playlist Transfer Stats", style="bold white")
    summary_table.add_column("Metric", style="cyan", no_wrap=True)
    summary_table.add_column("Value", style="magenta")

    summary_table.add_row("• Total YouTube Videos", str(len(titles)))
    summary_table.add_row("• Matched on Spotify", str(len(track_ids)))
    summary_table.add_row("• Unmatched", str(len(unmatched_titles)))
    summary_table.add_row("• Playlist Name", playlist_name)

    console.print(summary_table)
    console.rule("[bold green]✅ All Done!")

    # 6b: Save stats to log file
    log_file = log_dir / f"{playlist_name.replace(' ', '_')}_log.txt"

    with log_file.open("a", encoding="utf-8") as f:
        f.write("=== Playlist Transfer Summary ===\n")
        f.write(f"Playlist: {playlist_name}\n")
        f.write(f"Total YouTube Videos: {len(titles)}\n")
        f.write(f"Matched on Spotify: {len(track_ids)}\n")
        f.write(f"Unmatched: {len(unmatched_titles)}\n")
        f.write(f"Log Time: {log_timestamp}\n")
        f.write("=" * 33 + "\n\n")


def extract_playlist_id(youtube_url: str) -> str:
    """
    Extracts the playlist ID from a YouTube URL.

    Args:
        youtube_url (str): The full YouTube playlist URL.

    Returns:
        str: The playlist ID (value after 'list=').
    """

    match = re.search(r"list=([a-zA-Z0-9_-]+)", youtube_url)
    if match:
        return match.group(1)
    raise ValueError("Invalid YouTube playlist URL")



if __name__ == "__main__":
    main()
