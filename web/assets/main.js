// Load the video stream
const loadVideo = async () => {
  const videoSource = await 'master.m3u8';
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
}
loadVideo();

const updateImages = (currentHour) => {
  // Reload the images by updating their source
  const slider = document.querySelector('wee-slider');
  const sliderSlides = [...slider.querySelectorAll('.wee-slider__slide')];
  const sliderImages = [...slider.querySelectorAll('.wee-slider__slide img')];
  const sliderNavdots = [...slider.querySelectorAll('.wee-slider__navdot')];
  sliderImages.forEach((image, index) => {
    const isCurrentHour = index === currentHour;
    console.log(index, isCurrentHour)
    if (isCurrentHour) {
      const src = image.src;
      image.src = '';
      image.src = src;
      slider.handleSlideChange(index);
    }
    sliderSlides[index].classList.toggle('current-hour', isCurrentHour);
    sliderNavdots[index].classList.toggle('current-hour', isCurrentHour);
  });
}

// Update images every hour
// Function to reload the images
const reloadImagesTimer = async (initialLoad) => {
  // Get the current hour and add 1 to get the next hour
  const currentHour = new Date().getHours();
  const nextHour = (currentHour + 1) % 24;

  if (initialLoad) updateImages(currentHour);

  // Wait until one minute after the next hour begins
  const nextHourDate = new Date();
  nextHourDate.setHours(nextHour, 1, 0, 0);
  const timeToWait = nextHourDate - new Date();
  await new Promise((resolve) => setTimeout(resolve, timeToWait));

  updateImages(currentHour);
}

// Initial call to reload the images
reloadImagesTimer(true);

// Schedule the reloadImages function to run every hour
setInterval(reloadImagesTimer, 60 * 60 * 1000);
