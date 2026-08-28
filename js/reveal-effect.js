(function () {
  var els = document.querySelectorAll('.reveal-el');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    for (var i = 0; i < els.length; i++) els[i].classList.add('is-revealed');
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  for (var j = 0; j < els.length; j++) io.observe(els[j]);
})();
