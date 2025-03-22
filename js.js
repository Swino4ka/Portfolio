function openLink(url) {
  window.open(url, '_blank');
}

document.querySelectorAll('.badge-container img').forEach(img => {
  img.addEventListener('mouseover', () => {
    img.style.filter = 'drop-shadow(0 0 5px #00ffff)';
  });
  img.addEventListener('mouseout', () => {
    img.style.filter = 'none';
  });
});

const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      velocity: Math.random() * 0.2 + 0.05
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff55';
  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();

    star.y += star.velocity;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createStars(150);
});

resizeCanvas();
createStars(150);
drawStars();

document.querySelectorAll('.clickable').forEach(el => {
  el.addEventListener('click', () => {
    el.classList.add('clicked');
    setTimeout(() => el.classList.remove('clicked'), 200);
  });
});
