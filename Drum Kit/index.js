// play sound
function playSound(e) {
  const keyCode =
    typeof e === "string"
      ? e
      : e.type === "click"
      ? parseInt(this.getAttribute("data-key"))
      : e.keyCode;

  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`img[data-key="${keyCode}"]`);
  if (!audio) return;

  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
  setTimeout(() => key.classList.remove("playing"), 80);
}

// drum keydown & click
const keys = Array.from(document.querySelectorAll(".drum img"));
keys.forEach((key) => {
  key.addEventListener("click", playSound);
});
window.addEventListener("keydown", playSound);

// drum sequencer
const drums = Array.from(document.querySelectorAll(".drum"));
drums.forEach((drum) => {
  const input = Array.from(drum.querySelectorAll("input"));
  input.forEach((el) => {
    el.addEventListener("change", function () {
      if (this.checked) {
        playSound(drum.getAttribute("data-key"));
      }
    });
  });
});

// play button
const playBtn = document.getElementById("sequencer-active-btn");
playBtn.addEventListener("click", function () {
  const btnClassList = this.firstElementChild.classList;
  btnClassList.contains("fa-play")
    ? (btnClassList.remove("fa-play"),
      btnClassList.add("fa-pause"),
      playingDrums())
    : (btnClassList.remove("fa-pause"), btnClassList.add("fa-play"));
});
