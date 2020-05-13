"use strict";

const resetBtn = document.getElementById("reset-btn"),
  playBtn = document.getElementById("sequencer-active-btn"),
  btnClassList = playBtn.firstElementChild.classList,
  decreaseBtn = document.getElementById("bpm-decrease-btn"),
  increaseBtn = document.getElementById("bpm-increase-btn"),
  currentTempo = document.getElementById("bpm-indicator");

let bpm = 120,
  interval = 30000 / bpm,
  isPause = false;

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
playBtn.addEventListener("click", function () {
  btnClassList.contains("fa-play") ? toggleBtn("play") : toggleBtn("pause");
});

function toggleBtn(condition) {
  condition === "play"
    ? (btnClassList.remove("fa-play"),
      btnClassList.add("fa-pause"),
      (isPause = false),
      playDrums(),
      nowPlaying())
    : (btnClassList.remove("fa-pause"),
      btnClassList.add("fa-play"),
      (isPause = true));
}

// tempo
decreaseBtn.addEventListener("click", () => {
  if (bpm > 60) {
    setTempo("decrease");
  }
});
increaseBtn.addEventListener("click", () => {
  if (bpm < 300) {
    setTempo("increase");
  }
});

function setTempo(condition) {
  toggleBtn("pause");
  bpm = parseInt(currentTempo.value);
  condition === "decrease" ? (bpm -= 10) : (bpm += 10);
  currentTempo.value = bpm;
  interval = 30000 / bpm;
}

// play drums
function playDrums() {
  drums.forEach((drum) => {
    const input = Array.from(drum.querySelectorAll("input"));
    for (const i in input) {
      ((j) => {
        setTimeout(() => {
          removeActive(input);
          input[j].classList.add("active");
          if (input[j].checked) {
            playSound(input[j].getAttribute("data-key"));
          }
        }, j * interval);
      })(i);
    }
  });
}

function nowPlaying() {
  const startPlaying = setInterval(() => {
    if (!isPause) {
      playDrums();
    } else {
      clearInterval(startPlaying);
      removeActive();
    }
  }, interval * 8);
}

function removeActive(input) {
  if (!input) {
    input = document.querySelectorAll(".drum input");
  }
  input.forEach((el) => el.classList.remove("active"));
}

// reset
resetBtn.addEventListener("click", () => {
  const input = Array.from(document.querySelectorAll(".drum input"));
  input.forEach((el) => (el.checked = false));
  toggleBtn("false");
});
