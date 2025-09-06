const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

// Create a test mural image (3×2 grid = 3240×2700)
const POST_W = 1080;
const POST_H = 1350;
const cols = 3;
const rows = 2;

const canvas = createCanvas(POST_W * cols, POST_H * rows);
const ctx = canvas.getContext("2d");

// Fill with gradient background
const gradient = ctx.createLinearGradient(0, 0, POST_W * cols, POST_H * rows);
gradient.addColorStop(0, "#ff6b6b");
gradient.addColorStop(0.5, "#4ecdc4");
gradient.addColorStop(1, "#45b7d1");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, POST_W * cols, POST_H * rows);

// Add grid lines to show the slices
ctx.strokeStyle = "white";
ctx.lineWidth = 4;
ctx.setLineDash([10, 10]);

// Vertical lines
for (let i = 1; i < cols; i++) {
  const x = i * POST_W;
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, POST_H * rows);
  ctx.stroke();
}

// Horizontal lines
for (let i = 1; i < rows; i++) {
  const y = i * POST_H;
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(POST_W * cols, y);
  ctx.stroke();
}

// Add numbers in each section
ctx.fillStyle = "white";
ctx.font = "bold 200px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

let order = 1;
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const x = col * POST_W + POST_W / 2;
    const y = row * POST_H + POST_H / 2;
    ctx.fillText(order.toString(), x, y);
    order++;
  }
}

// Add title
ctx.fillStyle = "white";
ctx.font = "bold 100px Arial";
ctx.textAlign = "center";
ctx.fillText("INSTAGRAM MURAL TEST", (POST_W * cols) / 2, 150);

// Save the image
const buffer = canvas.toBuffer("image/png");
const outputPath = path.join(__dirname, "test-mural-3x2.png");
fs.writeFileSync(outputPath, buffer);

console.log(`Test mural image generated: ${outputPath}`);
console.log(`Dimensions: ${POST_W * cols} × ${POST_H * rows}px`);
console.log(`Grid: ${cols} × ${rows} (${cols * rows} total posts)`);
console.log("You can use this image to test the Instagram Grid Slicer!");
