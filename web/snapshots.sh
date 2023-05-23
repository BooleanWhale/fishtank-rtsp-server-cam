#!/bin/bash

echo 'Waiting to take snapshots every hour'

SNAPSHOT_DIR="snapshots"

# Create the snapshot directory if it doesn't exist
mkdir -p "$SNAPSHOT_DIR"

# Get the current hour
current_hour=$(date +%H)

# Wait until the next hour begins
until [[ $(date +%H) -ne $current_hour ]]; do
  sleep 10
done

# Take snapshots at the beginning of each hour
while true; do
  current_hour=$(date +%H)
  snapshot_file="$SNAPSHOT_DIR/hour_$current_hour.jpg"

  # Take the snapshot using camera command
  ffmpeg -y -i rtsp://localhost:8554/cam -ss 5 -frames:v 1 "$snapshot_file"
  echo "Snapshot" "$snapshot_file" "taken!"

  # Wait until the next hour begins
  until [[ $(date +%H) -ne $current_hour ]]; do
    sleep 10
  done
done
