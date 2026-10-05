// desktop.js — alternating wall labels, Tanpeki arrows, keyboard, lightbox arrows
(function () {
  // 1. Alternate label side: every second work flips
  document.querySelectorAll('.artwork').forEach((work, i) => {
    work.classList.toggle('flip', i % 2 === 1);
  });

  // 2. Arrows on image sliders (Tanpeki)
  const sliders = [];
  document.querySelectorAll('.artwork').forEach(work => {
    const slider = work.querySelector('.art-slider');
    const dots = Array.from(work.querySelectorAll('.dot'));
    if (!slider || !dots.length) return;

    const frame = slider.closest('.artwork-frame');
    const current = () => dots.findIndex(d => d.classList.contains('active'));
    const step = dir => {
      const n = Math.max(0, Math.min(dots.length - 1, current() + dir));
      dots[n].click(); // reuses the existing slide logic
    };

    const make = (cls, label, text, dir) => {
      const b = document.createElement('button');
      b.className = 'slider-arrow ' + cls;
      b.type = 'button';
      b.setAttribute('aria-label', label);
      b.textContent = text;
      b.addEventListener('click', e => { e.stopPropagation(); step(dir); }); // don't open lightbox
      frame.appendChild(b);
      return b;
    };
    const prev = make('prev', 'Previous image', '‹', -1);
    const next = make('next', 'Next image', '›', 1);

    const sync = () => {
      prev.disabled = current() <= 0;
      next.disabled = current() >= dots.length - 1;
    };
    sync();
    new MutationObserver(sync).observe(work.querySelector('.art-slider-nav'),
      { attributes: true, subtree: true, attributeFilter: ['class'] });

    slider._step = step;
    sliders.push(slider);
  });

  // 3. Lightbox arrows (needs window.lightboxAPI from the patched page script)
  const lb = document.getElementById('lightbox');
  const api = () => window.lightboxAPI;
  if (lb) {
    const mk = (cls, label, text, dir) => {
      const b = document.createElement('button');
      b.className = 'lightbox-arrow ' + cls;
      b.type = 'button';
      b.setAttribute('aria-label', label);
      b.textContent = text;
      b.addEventListener('click', e => { e.stopPropagation(); if (api()) api().go(api().index() + dir); });
      lb.appendChild(b);
    };
    mk('prev', 'Previous work', '‹', -1);
    mk('next', 'Next work', '›', 1);
  }

  // 4. Keyboard
  document.addEventListener('keydown', e => {
    const dir = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0;

    if (api() && api().isOpen()) {
      if (e.key === 'Escape') { api().close(); return; }
      if (dir) { e.preventDefault(); api().go(api().index() + dir); }
      return;
    }

    // Lightbox closed: arrows drive the slider currently at mid-screen
    if (!dir) return;
    const mid = window.innerHeight / 2;
    const s = sliders.find(el => {
      const r = el.getBoundingClientRect();
      return r.top < mid && r.bottom > mid;
    });
    if (s) { e.preventDefault(); s._step(dir); }
  });
})();
