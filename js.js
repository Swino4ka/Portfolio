function openLink(url) {
  window.open(url, '_blank');
}

// Optional: animate badges on hover
document.querySelectorAll('.badge-container img').forEach(img => {
  img.addEventListener('mouseover', () => {
    img.style.filter = 'drop-shadow(0 0 5px #00ffff)';
  });
  img.addEventListener('mouseout', () => {
    img.style.filter = 'none';
  });
});
