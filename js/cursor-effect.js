(function () {
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(ring);

  var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, started = false;

  function render() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = 'translate3d(' + ringX + 'px,' + ringY + 'px,0) translate(-50%,-50%)';
    requestAnimationFrame(render);
  }

  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!started) {
      started = true;
      ringX = mouseX;
      ringY = mouseY;
      ring.classList.add('is-active');
      requestAnimationFrame(render);
    }
  });

  document.addEventListener('mouseleave', function () {
    ring.classList.remove('is-active');
  });

  document.addEventListener('mouseenter', function () {
    if (started) ring.classList.add('is-active');
  });

  var hoverSelector = 'a, button, input[type="submit"], .button, .w-button';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest && e.target.closest(hoverSelector)) {
      ring.classList.add('is-hover');
    }
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest && e.target.closest(hoverSelector)) {
      ring.classList.remove('is-hover');
    }
  });
})();
