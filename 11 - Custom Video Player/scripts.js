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

const progressBar = document.querySelector(".progress__filled");
videoPlayer.addEventListener('timeupdate' , handleVideoProgress);
function handleVideoProgress (event) {
    const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressBar.style['flex-basis'] = `${percent}%`;
    console.log(percent);
}

const progress = document.querySelector(".progress")
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => {
    if(mouseDown) {
        const scrubTime = (e.offsetX / progress.offsetWidth);
        videoPlayer.currentTime = scrubTime  * videoPlayer.duration;
    }
});
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth);
    videoPlayer.currentTime = scrubTime  * videoPlayer.duration;
    
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

const inputSlider = document.querySelectorAll("input.player__slider");
inputSlider.forEach(ele => {
    ele.addEventListener("change", handleRangeUpdate);
    ele.addEventListener("mousemove", handleRangeUpdate);
})

function handleRangeUpdate (event) {
    //console.log(event);
    videoPlayer[this.name] = this.value;
}

let mouseDown = false;
progress.addEventListener("mousedown", () => {
    mouseDown = true;
} )

progress.addEventListener("mouseup", () => {
    mouseDown = false;
} )