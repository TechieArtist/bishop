// volumes.js — V planetary orbit carousel.
// Volumes travel on a shallow ellipse seen from the horizon: the
// current volume is front and centre, large, in your face; the
// others follow the orbit line behind it, smaller and higher, and
// the wheel turns one step at a time — the next volume comes
// around the front while the current one recedes behind.
// A single continuous rotation drives every card, so the motion
// is one smooth turn, not a set of separate slides.
// The arrows, keys and swipes turn the wheel in volume order
// (Untitled 2023 → Volume 2 → Volume 3 → Volume 4 → loop).
// Clicking a card opens that volume's page: the orbit fades up
// first, then the volume's page fades in on arrival.
//
// To add a volume, add one <figure class="volume-card"> inside
// #volumeStage in v.html with its cover and data-title. To remove
// one, delete its figure.
(function () {
  var stage = document.getElementById('volumeStage');
  var row = document.getElementById('volumeRow');
  var volumesEl = document.querySelector('.volumes');
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
  var leaving = false;      // the orbit is fading out to a volume page
  var lastSwipeAt = 0;      // a swipe just ended — the tap after it is not a click
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
      card.el.style.cursor = 'pointer';
    });
  }

  function easeInOutCubic(p) {
    return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  }

  function move(dir) {
    if (animating || n < 2) return;
    animating = true;
    var from = wheel;
    // The wheel turns the other way from the title index, so the
    // rotation has to run opposite to the index step for the front
    // card and the title to agree: Next brings Volume 2 to the
    // front after Untitled 2023, then 3, then 4, then loops.
    var to = wheel - dir * step();
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

  // Clicking a volume opens its page: the orbit fades up and
  // out, then the volume's page fades in on arrival (its own
  // page transition). The arrows, keys and swipes still turn
  // the wheel; a tap is what opens a volume.
  cards.forEach(function (card) {
    card.el.addEventListener('click', function () {
      if (leaving || animating || n < 2) return;
      if (Date.now() - lastSwipeAt < 500) return; // a swipe just ended, not a tap
      var page = card.el.getAttribute('data-page');
      if (!page) return;
      leaving = true;
      if (reduced) { window.location.href = page; return; }
      if (volumesEl) volumesEl.classList.add('is-leaving');
      setTimeout(function () { window.location.href = page; }, 480);
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
    if (Math.abs(diff) > 40) {
      lastSwipeAt = Date.now();
      move(diff > 0 ? 1 : -1);
    }
  }, { passive: true });

  window.addEventListener('resize', place);
  window.addEventListener('load', place);
  place();
})();
