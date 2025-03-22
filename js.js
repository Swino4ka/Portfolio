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

const terminalLoaderLines = [
  "> Initializing portfolio...",
  "> index.html detected...",
  "> css.css detected...",
  "> js.js detected...",
  "> images detected...",
  "> Web Developer with 5+ years of experience | Based in Poland"
];

const loaderTypingSpeed = 45;
let loaderCurrentLine = 0;
let loaderCurrentChar = 0;

function typeLoaderLine() {
  if (loaderCurrentLine >= terminalLoaderLines.length) {
    // Hide loader after delay
    setTimeout(() => {
        const loader = document.getElementById("terminal-loader");
        loader.classList.add("hidden-loader");
      
        // Wait for DOM update to complete before glitching
        requestAnimationFrame(() => {
          setTimeout(() => {
            const glitchEl = document.querySelector(".glitch-text");
            const target = glitchEl.getAttribute("data-text");
            glitchText(glitchEl, target, 40);
          }, 100); // slight delay so .hidden-loader transition completes
        });
      }, 600);         
    return;
  }

  const lineElement = document.getElementById(`line${loaderCurrentLine + 1}`);
  const lineText = terminalLoaderLines[loaderCurrentLine];

  lineElement.innerHTML =
    lineText.slice(0, loaderCurrentChar) + '<span class="blinking-cursor"></span>';

  if (loaderCurrentChar < lineText.length) {
    loaderCurrentChar++;
    setTimeout(typeLoaderLine, loaderTypingSpeed);
  } else {
    loaderCurrentChar = 0;
    loaderCurrentLine++;
    setTimeout(typeLoaderLine, 400);
  }
}

window.addEventListener("load", () => {
  typeLoaderLine();
});

document.getElementById("skip-btn").addEventListener("click", () => {
  const loader = document.getElementById("terminal-loader");
  loader.classList.add("hidden-loader");

  requestAnimationFrame(() => {
    setTimeout(() => {
      const glitchEl = document.querySelector(".glitch-text");
      const target = glitchEl.getAttribute("data-text");
      glitchText(glitchEl, target, 40);
    }, 100);
  });
});

function glitchText(element, finalText, speed = 30) {
  const chars = "!@#$%^&*()_+=-[]{}|;:',.<>?/\\`~▒▓█";
  let currentText = new Array(finalText.length).fill("");
  let iterations = 0;

  const interval = setInterval(() => {
    for (let i = 0; i < finalText.length; i++) {
      if (i <= iterations) {
        currentText[i] = finalText[i];
      } else {
        currentText[i] = chars[Math.floor(Math.random() * chars.length)];
      }
    }

    element.textContent = currentText.join("");

    iterations++;
    if (iterations > finalText.length) clearInterval(interval);
  }, speed);
}

const bubble = document.getElementById("kv-bubble");
const bubbleText = document.getElementById("kv-text");

let defaultMessages = [
  "👋 Welcome, Commander.",
  "👀 Hover over a project!",
  "🔥 Feeling the heat yet?",
  "🎯 Target locked: Kvartiuk.",
  "💡 Press 'K' for a surprise?",
  "⚡ Boot sequence complete.",
  "🧠 Full stack. Full power.",
];

let lastMessageTime = 0;
let customMessageTimeout;

function showMessage(message) {
  clearTimeout(customMessageTimeout);
  bubbleText.textContent = message;
  bubble.classList.remove("hide");
  lastMessageTime = Date.now();

  // Auto-hide after 4 seconds unless replaced
  customMessageTimeout = setTimeout(() => {
    bubble.classList.add("hide");
  }, 4000);
}

// Handle default idle messages while moving
document.addEventListener("mousemove", (e) => {
  bubble.style.top = `${e.clientY - 40}px`;
  bubble.style.left = `${e.clientX + 20}px`;

  if (Date.now() - lastMessageTime > 6000) {
    const randomMessage = defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
    showMessage(randomMessage);
  }
});

// Show custom bubble message on hover
document.querySelectorAll("[data-bubble]").forEach(el => {
  el.addEventListener("mouseenter", () => {
    const msg = el.getAttribute("data-bubble");
    if (msg) showMessage(msg);
  });
});
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

// Update mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Immediate follow for main cursor
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});