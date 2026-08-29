(function () {
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  var started = false;
  var STORAGE_KEY = 'mcaCursorPos';

  function savePos(x, y) {
    try { sessionStorage.setItem(STORAGE_KEY, x + ',' + y); } catch (e) {}
  }

  function activate() {
    document.documentElement.classList.add('cursor-none');
    dot.classList.add('is-active');
  }

  function deactivate() {
    document.documentElement.classList.remove('cursor-none');
    dot.classList.remove('is-active');
  }

  function ensureStarted(x, y) {
    dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
    if (!started) {
      started = true;
      activate();
    }
  }

  window.addEventListener('mousemove', function (e) {
    ensureStarted(e.clientX, e.clientY);
    savePos(e.clientX, e.clientY);
  });

  try {
    var saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      var parts = saved.split(',');
      var sx = parseFloat(parts[0]), sy = parseFloat(parts[1]);
      if (isFinite(sx) && isFinite(sy) && sx >= 0 && sy >= 0 && sx <= window.innerWidth && sy <= window.innerHeight) {
        ensureStarted(sx, sy);
      }
    }
  } catch (e) {}

  document.addEventListener('mouseleave', deactivate);
  document.addEventListener('mouseenter', function () {
    if (started) activate();
  });

  document.addEventListener('mousedown', function (e) {
    ensureStarted(e.clientX, e.clientY);
    savePos(e.clientX, e.clientY);
    if (e.button === 0) dot.classList.add('is-down');
  });
  document.addEventListener('mouseup', function () {
    dot.classList.remove('is-down');
  });
  window.addEventListener('blur', function () {
    dot.classList.remove('is-down');
  });
})();
