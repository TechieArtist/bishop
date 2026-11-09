// volumes.js — V volume carousel.
// Add a volume here and it appears in the rotation, in order.
// The list loops: past the last volume it returns to the first.
(function () {
  var VOLUMES = [
    { title: 'Untitled 2023', cover: 'assets/images/Untitled2023.jpg', alt: 'Untitled, 2023' }
  ];

  var row = document.getElementById('volumeRow');
  var cover = document.getElementById('volumeCover');
  var img = document.getElementById('volumeImg');
  var title = document.getElementById('volumeTitle');
  var prevBtn = document.getElementById('volumePrev');
  var nextBtn = document.getElementById('volumeNext');
  if (!row || !cover || !img || !title || !prevBtn || !nextBtn) return;

  var index = 0;
  var busy = false;

  function preload(i) {
    var pre = new Image();
    pre.src = VOLUMES[i].cover;
  }

  function show(dir) {
    if (busy || !VOLUMES.length) return;
    busy = true;

    var next = (index + dir + VOLUMES.length) % VOLUMES.length;

    // rotate direction follows the arrow pressed
    row.style.setProperty('--v-rot', dir > 0 ? '4deg' : '-4deg');
    cover.classList.add('is-leaving');
    title.classList.add('is-leaving');

    setTimeout(function () {
      index = next;
      var volume = VOLUMES[index];
      img.src = volume.cover;
      img.alt = volume.alt;
      title.textContent = volume.title;
      preload((index + 1) % VOLUMES.length);

      // removing the class fades + rotates the new volume in
      cover.classList.remove('is-leaving');
      title.classList.remove('is-leaving');
      busy = false;
    }, 350);
  }

  prevBtn.addEventListener('click', function () { show(-1); });
  nextBtn.addEventListener('click', function () { show(1); });

  // keyboard arrows, unless the full-screen menu is open
  document.addEventListener('keydown', function (e) {
    if (document.body.classList.contains('menu-open')) return;
    if (e.key === 'ArrowLeft') show(-1);
    if (e.key === 'ArrowRight') show(1);
  });

  // swipe support
  var startX = 0;
  row.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  }, { passive: true });

  row.addEventListener('touchend', function (e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) show(diff > 0 ? 1 : -1);
  }, { passive: true });

  preload(0);
})();
