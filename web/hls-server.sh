#!/bin/sh

echo 'Transpiling RTSP input into HLS stream'

VIDEOSOURCE="rtsp://localhost:8554/cam"

ffmpeg -i "$VIDEOSOURCE" \
-filter_complex \
"[0:v]split=2[v1][v2];\
[v1]copy[v1out];\
[v2]scale=w=160:h=120[v2out]" \
-map [v1out] -c:v:0 libx264 -crf:v:0 1 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:0 6M -maxrate:v:0 6M -minrate:v:0 6M -bufsize:v:0 12M \
-preset medium -g 30 -sc_threshold 0 -keyint_min 120 \
-map [v2out] -c:v:1 libx264 -crf:v:1 21 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:1 0.5M -maxrate:v:1 0.5M -minrate:v:1 0.5M -bufsize:v:1 1M \
-preset medium -g 30 -sc_threshold 0 -keyint_min 120 \
-f hls \
-hls_time 4 \
-hls_list_size 2 \
-hls_flags delete_segments+independent_segments \
-hls_segment_type mpegts \
-hls_segment_filename %v_data%02d.ts \
-master_pl_name master.m3u8 \
-var_stream_map "v:0 v:1" stream_%v.m3u8
