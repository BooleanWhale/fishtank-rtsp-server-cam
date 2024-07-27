# Fishtank RTSP Server & Camera System

This project provides a real-time streaming solution for monitoring a fishtank via an RTSP stream, with a web interface featuring a video player and an hourly image carousel. Recomended use with RaspberryPi and standard USB webcam.

https://github.com/user-attachments/assets/3bc8c161-7540-4065-8346-4b2f0046e91c

## Features
- RTSP Streaming: Real-time streaming from the fishtank camera.
- HLS Transcoding: Transcodes the RTSP stream to HLS for web playback.
- Hourly Image Capture: A bash script captures images from the stream every hour.
- Web Interface: A simple web server hosts a video player and an image carousel.

## Getting Started
### Prerequisites
- A Linux-based system with ffmpeg installed.
- Basic knowledge of shell scripting and web servers.
### Installation
##### Clone the repository:
```sh
git clone https://github.com/your-repo/fishtank-rtsp-server-cam.git
cd fishtank-rtsp-server-cam
```
##### Install Dependencies:
Ensure ffmpeg is installed on your system:
```sh
sudo apt-get update
sudo apt-get install ffmpeg
```
##### Start the Servers:
The provided script start.sh launches the necessary services:
```sh
chmod +x start.sh
./start.sh
```

## Directory Structure
```
fishtank-rtsp-server-cam/
├── cam/
│   ├── rtsp-simple-server.sh
│   └── cloudflare-ddns-updater.sh
├── web/
│   ├── hls-server.sh
│   ├── web-server.sh
│   └── index.html
└── start.sh
```
cam/: Contains scripts related to camera setup and RTSP server.
web/: Contains web server scripts and the HTML interface.
start.sh: Main script to start all services.

## Configuration
### General Parameters
##### Logging:
logLevel: Controls the verbosity of logs (error, warn, info, debug).
logDestinations: Outputs logs to stdout, file, or syslog.
##### Timeouts:
readTimeout and writeTimeout: Set the timeout durations for read and write operations.
##### API and Metrics:
Enable/Disable API and metrics endpoints as required.

### RTSP Parameters
Configure the RTSP server parameters including port numbers, encryption, and authentication methods.

### HLS Parameters
Configure HLS streaming options, such as segment duration and maximum size.

### Web Interface
The web interface includes:
- A video player for streaming live video using HLS.
- An image carousel displaying hourly snapshots, with the most recent image highlighted.

### Running the Web Server
To start the web server:
```sh
Copy code
cd web
python3 -m http.server 9001
Access the web interface by navigating to http://localhost:9001 in your web browser.
```

### Scripts
- rtsp-simple-server.sh: Starts the RTSP server.
- hls-server.sh: Transcodes RTSP to HLS.
- web-server.sh: Serves the web interface.
- cloudflare-ddns-updater.sh: Updates Cloudflare DNS with the server's current IP.


