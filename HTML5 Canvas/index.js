const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 30;

let isPainting = false;
let isFilling = false;
let isHue = false;
let hue = 0;
let color = INITIAL_COLOR;

function stopPainting() {
  isPainting = false;
}

function startPainting() {
  isPainting = true;
}

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;

  if (!isPainting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  if (isHue) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    color = `hsl(${hue}, 100%, 70%)`;
    hue++;
  }

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleColorClick(e) {
  const changeColor = e.target.style.backgroundColor;
  changeColor ? ((isHue = false), (color = changeColor)) : (isHue = true);
}

function handleRangeChange(e) {
  const size = e.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  isFilling
    ? ((isFilling = false), (mode.innerText = "Fill"))
    : ((isFilling = true), (mode.innerText = "Paint"));
}
function handleCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "Your_Artwork!";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
