document.addEventListener("keydown", playSound);

function playSound (event) {
    const audio = document.querySelector(`audio[data-key="${event.code}"]`);
    if(!audio) return null;

    const targetDiv = document.querySelector(`div[data-key="${event.code}"]`);
    
    audio.currentTime = 0;
    audio.play();
    targetDiv.classList.add("playing");
};

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend" , (e) => e.target.classList.remove("playing")))