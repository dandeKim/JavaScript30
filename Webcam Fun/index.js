const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const body = document.querySelector("body");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((error) => {
      console.error("OH NO!", error);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);

    if (body.classList.contains("red")) {
      pixels = redEffect(pixels);
    } else if (body.classList.contains("rgb")) {
      pixels = rgbSplit(pixels);
    } else if (body.classList.contains("black_white")) {
      pixels = blackAndWhite(pixels);
    }

    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "my_photo");
  link.innerHTML = `<img src="${data}" alt="my_photo">`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] += 100; // R
    pixels.data[i + 1] -= 50; // G
    pixels.data[i + 2] *= 0.5; // B
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // R
    pixels.data[i + 200] = pixels.data[i + 1]; // G
    pixels.data[i - 550] = pixels.data[i + 2]; // B
  }
  return pixels;
}

function blackAndWhite(pixels) {
  const levels = {};
  document.querySelectorAll(".rgb_controller input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

function toggleFilter(color) {
  body.className = "";
  body.classList.add(color);
}

const filterButtons = document.querySelectorAll(".filters button");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let filterColor = "";
    switch (button.dataset.color) {
      case "red":
        filterColor = "red";
        break;
      case "rgb":
        filterColor = "rgb";
        break;
      case "black_white":
        filterColor = "black_white";
        break;
      default:
        filterColor = "red";
    }
    toggleFilter(filterColor);
  });
});

getVideo();
video.addEventListener("canplay", paintToCanvas);
