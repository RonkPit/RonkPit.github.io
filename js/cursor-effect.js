(function () {
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(ring);

  var diskConfigs = [
    { size: 10, color: 'rgba(196,187,175,.55)', follow: .10, radius: 22, speed: .020, phase: 0 },
    { size: 6, color: 'rgba(51,51,51,.30)', follow: .14, radius: 16, speed: -.026, phase: 1.2 },
    { size: 8, color: 'rgba(196,187,175,.40)', follow: .07, radius: 30, speed: .015, phase: 2.4 },
    { size: 5, color: 'rgba(51,51,51,.25)', follow: .16, radius: 12, speed: -.032, phase: 3.6 },
    { size: 7, color: 'rgba(196,187,175,.45)', follow: .09, radius: 26, speed: .022, phase: 4.8 },
    { size: 4, color: 'rgba(51,51,51,.28)', follow: .18, radius: 18, speed: -.018, phase: 0.6 }
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

  var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, started = false;

  function render() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = 'translate3d(' + ringX + 'px,' + ringY + 'px,0) translate(-50%,-50%)';

    for (var i = 0; i < disks.length; i++) {
      var d = disks[i];
      d.angle += d.cfg.speed;
      var targetX = ringX + Math.cos(d.angle) * d.cfg.radius;
      var targetY = ringY + Math.sin(d.angle) * d.cfg.radius;
      d.x += (targetX - d.x) * d.cfg.follow;
      d.y += (targetY - d.y) * d.cfg.follow;
      d.el.style.transform = 'translate3d(' + d.x + 'px,' + d.y + 'px,0) translate(-50%,-50%)';
    }

    requestAnimationFrame(render);
  }

  function activate() {
    ring.classList.add('is-active');
    for (var i = 0; i < disks.length; i++) disks[i].el.classList.add('is-active');
  }

  function deactivate() {
    ring.classList.remove('is-active');
    for (var i = 0; i < disks.length; i++) disks[i].el.classList.remove('is-active');
  }

  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!started) {
      started = true;
      ringX = mouseX;
      ringY = mouseY;
      for (var i = 0; i < disks.length; i++) {
        disks[i].x = mouseX;
        disks[i].y = mouseY;
      }
      activate();
      requestAnimationFrame(render);
    }
  });

  document.addEventListener('mouseleave', deactivate);
  document.addEventListener('mouseenter', function () {
    if (started) activate();
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
