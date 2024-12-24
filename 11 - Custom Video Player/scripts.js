const videoPlayer = document.querySelector("video.player__video");

// handle play button
const playBtn = document.querySelector("button.player__button");

playBtn.addEventListener("click" , togglePlay);

function togglePlay (event) {
    if (videoPlayer.paused){
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
}

videoPlayer.addEventListener('click', togglePlay);
videoPlayer.addEventListener('play', updateButton);
videoPlayer.addEventListener('pause' , updateButton);

function updateButton (event) {
    const icon = this.paused ? '►' : '❚ ❚';
    playBtn.textContent = icon;
}

function videoProgress (event) {

}

// handle skip button;
const skipBtns = document.querySelectorAll("button.player__skip");

skipBtns.forEach((ele) => ele.addEventListener("click" , skip));

function skip (event) {
    const videoDuration = videoPlayer.duration;

    let seekValue = ((parseFloat(this.dataset.skip) + videoPlayer.currentTime) > videoDuration) ? videoDuration :
        parseFloat(this.dataset.skip) + videoPlayer.currentTime;

    seekValue = (seekValue < 0) ? 0 : seekValue;

    videoPlayer.currentTime = seekValue;
}

const volumeSlider = document.querySelector("input.player__slider");

volumeSlider.addEventListener("change", adjustVolume);

function adjustVolume (event) {
    videoPlayer.volume(this.value);
}