const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Create an array to hold all particle explosions
let explosions = [];

// Define the Particle class
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 3;
    this.velocity = {
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 8
    };
    this.alpha = 1;
  }

  // Update the particle's position and opacity
  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }

  // Draw the particle on the canvas
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

// Function to create a particle explosion at a given position
function createExplosion(x, y) {
  let particles = [];
  for (let i = 0; i < 50; i++) {
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    const particle = new Particle(x, y, color);
    particles.push(particle);
  }
  explosions.push(particles);
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw all particle explosions
  explosions.forEach(explosion => {
    explosion.forEach(particle => {
      particle.update();
      particle.draw();

      // Remove faded-out particles from the explosion
      if (particle.alpha <= 0) {
        const index = explosion.indexOf(particle);
        explosion.splice(index, 1);
      }
    });

    // Remove empty explosions from the array
    if (explosion.length === 0) {
      const index = explosions.indexOf(explosion);
      explosions.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

// Event listener for mouse click
canvas.addEventListener('click', function(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  createExplosion(x, y);
});

// Start the animation
animate();