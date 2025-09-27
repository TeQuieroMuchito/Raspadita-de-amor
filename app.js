const canvas = document.getElementById("scratch");
const ctx = canvas.getContext("2d");
const sorpresa = document.getElementById("sorpresa");
const textoSorpresa = document.getElementById("textoSorpresa");

const nombre = "Ingrid 💖";

const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
grad.addColorStop(0, "#b5b5b5");
grad.addColorStop(1, "#e0e0e0");
ctx.fillStyle = grad;
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "#333";
ctx.font = "20px Arial";
ctx.fillText("✨ Rasca aquí ✨", 90, 110);

let isDrawing = false;

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
    y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top,
  };
}

function start(e) {
  isDrawing = true;
  draw(e);
}

function end() {
  isDrawing = false;
  ctx.beginPath();
  checkScratch();
}

function draw(e) {
  if (!isDrawing) return;

  const pos = getPos(e);
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
  ctx.fill();
}

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", end);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("touchstart", start);
canvas.addEventListener("touchend", end);
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  draw(e);
});

function checkScratch() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let transparent = 0;
  const step = 4 * 10;

  for (let i = 3; i < imageData.data.length; i += step) {
    if (imageData.data[i] === 0) transparent++;
  }

  const total = imageData.data.length / step;
  const porcentaje = (transparent / total) * 100;

  if (porcentaje > 0.1) {
    textoSorpresa.textContent = `Te quiero mucho, ${nombre} ❤️`;
    sorpresa.classList.add("mostrar");
  }
}
function crearCorazon() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.animationDuration = 3 + Math.random() * 2 + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(crearCorazon, 700);
