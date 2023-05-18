// Get the canvas and its 2D context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Set initial player position and rotation
let playerX = 250;
let playerY = 250;
let playerRotation = 0;

// Function to draw the player
function drawPlayer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
  ctx.save();  // Save the current canvas state
  ctx.translate(playerX, playerY);  // Move the origin to the player position
  ctx.rotate(playerRotation);  // Rotate the canvas
  ctx.fillStyle = 'blue';  // Set the player color
  ctx.fillRect(-10, -10, 20, 20);  // Draw a square representing the player
  ctx.restore();  // Restore the canvas state
}

// Function to handle keydown events
function handleKeyDown(event) {
  if (event.key === 'd') {
    console.log("d pressed")
    playerRotation += Math.PI / 2;  // Rotate 90 degrees (pi/2 radians) to the right
    drawPlayer();  // Redraw the player after the rotation
  }
}

// Attach the keydown event listener to the document
document.addEventListener('keydown', handleKeyDown);

// Initial player drawing
drawPlayer();