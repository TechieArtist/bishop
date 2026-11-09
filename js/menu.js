(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.navigation');
  if (!btn || !nav) return;

  function sync() {
    document.body.classList.toggle('menu-open', nav.classList.contains('active'));
  }

  function closeMenu() {
    btn.classList.remove('active');
    nav.classList.remove('active');
    sync();
  }

  // keep a "menu-open" flag on <body> in step with the menu
  new MutationObserver(sync).observe(nav, { attributes: true, attributeFilter: ['class'] });

  // Esc closes the menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('active')) closeMenu();
  });

  // coming back with the Back button: no stuck menu, no black fade screen
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    closeMenu();
    var pt = document.getElementById('pageTransition');
    if (pt) {
      pt.classList.remove('fade-out');
      pt.classList.add('fade-in');
    }
  });
})();
