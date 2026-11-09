// volumes.js — V planetary orbit carousel.
// Volumes travel on a shallow ellipse seen from the horizon: the
// current volume is front and centre, large, in your face; the
// others follow the orbit line behind it, smaller and higher, and
// the wheel turns one step at a time — the next volume comes
// around the front while the current one recedes behind.
// A single continuous rotation drives every card, so the motion
// is one smooth turn, not a set of separate slides.
//
// To add a volume, add one <figure class="volume-card"> inside
// #volumeStage in v.html with its cover and data-title. To remove
// one, delete its figure.
(function () {
  var stage = document.getElementById('volumeStage');
  var row = document.getElementById('volumeRow');
  var titleEl = document.getElementById('volumeTitle');
  var prevBtn = document.getElementById('volumePrev');
  var nextBtn = document.getElementById('volumeNext');
  if (!stage || !row || !titleEl || !prevBtn || !nextBtn) return;

  var cards = Array.prototype.slice.call(stage.querySelectorAll('.volume-card')).map(function (el) {
    return { el: el, img: el.querySelector('img'), title: el.getAttribute('data-title') || '' };
  });

  var n = cards.length;
  var index = 0;            // card at the front (for the title)
  var wheel = 0;            // wheel rotation in degrees; one step = 360 / n
  var animating = false;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function step() { return 360 / Math.max(n, 1); }

  // A cover that fails to load (e.g. its image is not in the repo
  // yet) drops out of the rotation instead of showing broken.
  function removeCard(card) {
    var at = cards.indexOf(card);
    if (at === -1) return;
    card.el.remove();
    cards.splice(at, 1);
    n = cards.length;
    if (!n) return;
    if (index >= n) index = 0;
    place();
    titleEl.textContent = cards[index].title;
  }

  cards.forEach(function (card) {
    if (!card.img) { removeCard(card); return; }
    card.img.addEventListener('error', function () { removeCard(card); });
    if (card.img.complete && card.img.naturalWidth === 0) removeCard(card);
  });

  if (!n) return;

  // Ellipse radii, from the stage, so the orbit always fits.
  function radii() {
    var narrow = window.matchMedia('(max-width: 720px)').matches;
    return {
      rx: stage.clientWidth * (narrow ? 0.26 : 0.38),
      ry: stage.clientHeight * 0.09
    };
  }

  // Angle of a card on the orbit. Front is 90° — the bottom of the
  // ellipse, nearest the viewer. 270° is the far side, behind.
  function angleOf(i) {
    return 90 + i * step() + wheel;
  }

  function place() {
    var r = radii();
    cards.forEach(function (card, i) {
      var a = angleOf(i) * Math.PI / 180;
      var depth = Math.sin(a);                    // 1 front, -1 back
      var t = (depth + 1) / 2;                    // 1 front, 0 back
      var x = Math.cos(a) * r.rx;
      var y = Math.sin(a) * r.ry;
      var s = 0.70 + 0.30 * t;
      card.el.style.transform =
        'translate(-50%, -50%) translate(' + x.toFixed(1) + 'px, ' + y.toFixed(1) + 'px) scale(' + s.toFixed(3) + ')';
      card.el.style.opacity = (0.55 + 0.45 * t).toFixed(3);
      card.el.style.zIndex = String(1 + Math.round(t * 10));
      card.el.style.cursor = t > 0.99 ? 'default' : 'pointer';
    });
  }

  function easeInOutCubic(p) {
    return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  }

  function move(dir) {
    if (animating || n < 2) return;
    animating = true;
    var from = wheel;
    var to = wheel + dir * step();
    index = (index + dir + n) % n;

    titleEl.classList.add('is-leaving');
    setTimeout(function () {
      titleEl.textContent = cards[index].title;
      titleEl.classList.remove('is-leaving');
    }, 320);

    if (reduced) {
      wheel = to;
      place();
      animating = false;
      return;
    }

    var start = null;
    var duration = 750;
    function frame(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / duration, 1);
      wheel = from + (to - from) * easeInOutCubic(p);
      place();
      if (p < 1) requestAnimationFrame(frame);
      else { wheel = to; place(); animating = false; }
    }
    requestAnimationFrame(frame);
  }

  prevBtn.addEventListener('click', function () { move(-1); });
  nextBtn.addEventListener('click', function () { move(1); });

  // Clicking a card on the orbit turns the wheel to bring it front.
  cards.forEach(function (card, i) {
    card.el.addEventListener('click', function () {
      if (animating || n < 2) return;
      var off = ((angleOf(i) - 90) % 360 + 540) % 360 - 180;
      if (off > 1) move(-1);
      else if (off < -1) move(1);
    });
  });

  // keyboard arrows, unless the full-screen menu is open
  document.addEventListener('keydown', function (e) {
    if (document.body.classList.contains('menu-open')) return;
    if (e.key === 'ArrowLeft') move(-1);
    if (e.key === 'ArrowRight') move(1);
  });

  // swipe support
  var startX = 0;
  row.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  }, { passive: true });

  row.addEventListener('touchend', function (e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) move(diff > 0 ? 1 : -1);
  }, { passive: true });

  window.addEventListener('resize', place);
  window.addEventListener('load', place);
  place();
})();
