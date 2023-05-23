const videoSource = 'master.m3u8';
const video = document.getElementById('video-player');
if(Hls.isSupported()) {
  const hls = new Hls();
  hls.on(Hls.Events.Error, function (event, data) {
    console.log("HLS error: ", event, data);
  });
  hls.attachMedia(video);
  hls.on(Hls.Events.MEDIA_ATTACHED, function() {
    hls.loadSource(videoSource);
    hls.on(Hls.Events.MANIFEST_PARSED,function() {
      video.play();
    });
  });
}
else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = videoSource;
  video.addEventListener('loadedmetadata',function() {
    video.play();
  });
}