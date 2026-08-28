(function () {
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  var diskConfigs = [
    { size: 10, color: 'rgba(196,187,175,.55)', follow: .10, radius: 26, speed: .020, phase: 0 },
    { size: 6, color: 'rgba(51,51,51,.30)', follow: .14, radius: 20, speed: -.026, phase: 1.2 },
    { size: 8, color: 'rgba(196,187,175,.40)', follow: .07, radius: 34, speed: .015, phase: 2.4 },
    { size: 5, color: 'rgba(51,51,51,.25)', follow: .16, radius: 16, speed: -.032, phase: 3.6 },
    { size: 7, color: 'rgba(196,187,175,.45)', follow: .09, radius: 30, speed: .022, phase: 4.8 },
    { size: 4, color: 'rgba(51,51,51,.28)', follow: .18, radius: 22, speed: -.018, phase: 0.6 }
  ];

  var disks = diskConfigs.map(function (cfg) {
    var el = document.createElement('div');
    el.className = 'cursor-disk';
    el.style.width = cfg.size + 'px';
    el.style.height = cfg.size + 'px';
    el.style.backgroundColor = cfg.color;
    document.body.appendChild(el);
    return { el: el, cfg: cfg, x: 0, y: 0, angle: cfg.phase };
  });

  var mouseX = 0, mouseY = 0, centerX = 0, centerY = 0, started = false;

  function render() {
    centerX += (mouseX - centerX) * 0.18;
    centerY += (mouseY - centerY) * 0.18;

    for (var i = 0; i < disks.length; i++) {
      var d = disks[i];
      d.angle += d.cfg.speed;
      var targetX = centerX + Math.cos(d.angle) * d.cfg.radius;
      var targetY = centerY + Math.sin(d.angle) * d.cfg.radius;
      d.x += (targetX - d.x) * d.cfg.follow;
      d.y += (targetY - d.y) * d.cfg.follow;
      d.el.style.transform = 'translate3d(' + d.x + 'px,' + d.y + 'px,0) translate(-50%,-50%)';
    }

    requestAnimationFrame(render);
  }

  function activate() {
    document.documentElement.classList.add('cursor-none');
    dot.classList.add('is-active');
    for (var i = 0; i < disks.length; i++) disks[i].el.classList.add('is-active');
  }

  function deactivate() {
    document.documentElement.classList.remove('cursor-none');
    dot.classList.remove('is-active');
    for (var i = 0; i < disks.length; i++) disks[i].el.classList.remove('is-active');
  }

  function ensureStarted(x, y) {
    mouseX = x;
    mouseY = y;
    dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
    if (!started) {
      started = true;
      centerX = x;
      centerY = y;
      for (var i = 0; i < disks.length; i++) {
        disks[i].x = x;
        disks[i].y = y;
      }
      activate();
      requestAnimationFrame(render);
    }
  }

  window.addEventListener('mousemove', function (e) {
    ensureStarted(e.clientX, e.clientY);
  });

  document.addEventListener('mouseleave', deactivate);
  document.addEventListener('mouseenter', function () {
    if (started) activate();
  });

  document.addEventListener('mousedown', function (e) {
    ensureStarted(e.clientX, e.clientY);
    dot.classList.add('is-down');
  });
  document.addEventListener('mouseup', function () {
    dot.classList.remove('is-down');
  });
})();
