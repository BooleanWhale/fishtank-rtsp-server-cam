#!/bin/sh

echo 'Starting fishie cam scripts in new terminal windows'

cd "cam"
lxterminal -e "./rtsp-simple-server.sh" &
cd ".."
cd "web"
sleep 3
lxterminal -e "./hls-server.sh" &
lxterminal -e "./web-server.sh" &
cd ".."
watch --interval=3600 lxterminal -e "./cloudflare-ddns-updater.sh"