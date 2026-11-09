// volumes.js — V rotary volume carousel.
// Cards sit on a wheel: the current volume is front and centre,
// the others peek out from behind it, tilted. An arrow press turns
// the wheel one step — the incoming card swings up and over in an
// arc, tilted upward slightly, while the outgoing card sinks down
// behind on the other side. The list loops.
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

  var index = 0;
  var busy = false;
  var lastDir = -1;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // A cover that fails to load (e.g. its image is not in the repo
  // yet) drops out of the rotation instead of showing broken.
  function removeCard(card) {
    var at = cards.indexOf(card);
    if (at === -1) return;
    card.el.remove();
    cards.splice(at, 1);
    if (!cards.length) return;
    if (index >= cards.length) index = 0;
    if (at < index) index--;
    layout();
    titleEl.textContent = cards[index].title;
  }

  cards.forEach(function (card) {
    if (!card.img) { removeCard(card); return; }
    card.img.addEventListener('error', function () { removeCard(card); });
    if (card.img.complete && card.img.naturalWidth === 0) removeCard(card);
  });

  if (!cards.length) return;

  // Signed distance from the current card, wrapped to the shortest
  // way round the wheel. Cards further than one step away hide
  // behind the wheel.
  function signedOffset(i) {
    var n = cards.length;
    var raw = (((i - index) % n) + n) % n;
    if (raw > n / 2) raw -= n;
    // With two cards the other one is the antipode: it sits on the
    // side the wheel last turned from, so it is always the next
    // card to swing in. With more cards the antipode hides behind.
    if (n === 2 && raw === 1) raw = lastDir > 0 ? -1 : 1;
    if (Math.abs(raw) > 1) raw = raw > 0 ? 2 : -2;
    return raw;
  }

  function layout() {
    cards.forEach(function (card, i) {
      card.el.setAttribute('data-offset', signedOffset(i));
    });
  }

  function move(dir) {
    if (busy || cards.length < 2) return;
    busy = true;
    lastDir = dir;

    var outgoing = cards[index];
    var next = (index + dir + cards.length) % cards.length;
    var incoming = cards[next];
    index = next;

    titleEl.classList.add('is-leaving');
    setTimeout(function () {
      titleEl.textContent = incoming.title;
      titleEl.classList.remove('is-leaving');
    }, 300);

    if (reduced) {
      layout();
      busy = false;
      return;
    }

    layout();

    var inClass = dir > 0 ? 'anim-in-next' : 'anim-in-prev';
    var outClass = dir > 0 ? 'anim-out-next' : 'anim-out-prev';
    incoming.el.classList.add(inClass);
    outgoing.el.classList.add(outClass);

    var done = false;
    function finish() {
      if (done) return;
      done = true;
      incoming.el.classList.remove(inClass);
      outgoing.el.classList.remove(outClass);
      busy = false;
    }
    incoming.el.addEventListener('animationend', finish, { once: true });
    setTimeout(finish, 750);
  }

  prevBtn.addEventListener('click', function () { move(-1); });
  nextBtn.addEventListener('click', function () { move(1); });

  // Clicking a peeking neighbour card turns the wheel toward it.
  cards.forEach(function (card, i) {
    card.el.addEventListener('click', function () {
      var off = signedOffset(i);
      if (off === 1) move(1);
      else if (off === -1) move(-1);
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

  layout();
})();
