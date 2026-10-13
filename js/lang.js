(function () {
  var RULES = [
    // ----- all pages -----
    { sel: '.navigation-items a', ja: ['ホーム', 'プロフィール', '展覧会'] },
    { sel: '.site-footer p', ja: ['©2026 Evan Butler<br>ニューヨーク、ブルックリン'] },

    // ----- home -----
    { sel: '.home .content p', ja: [
      null,
      '私の絵は、家から離れているとき、夜が私の人生の音を増幅するように感じられる場所でこそ、最も良いものになると思う。',
      'そのカモメは、ハイになるためなら何でもする。紫陽花を吸うことさえも。'
    ] },
    { sel: '.home .content a', ja: ['詳しく見る', '詳しく見る', '詳しく見る'] },

    // ----- about -----
    { sel: '.about-box h1', ja: ['プロフィール'] },
    { sel: '.bio-meta', ja: ['2002年生まれ<br>ニューヨーク、ブルックリン'] },
    { sel: '.about-box p:not(.bio-meta)', ja: [
      'エヴァン・バトラーはアメリカの画家である。美術の正規教育を受けることなく、複数のメディアにまたがる学際的な制作活動を築いてきた。',
      '2022年後半、バトラーは伝統的な絵画技法とデジタルの絵画技法の両方を用いるアーティストとして登場した。2023年を通じて制作を3Dデザインへと広げ、未完成のゲームと、のちに2026年に完成した実験的な短編映画（Untitled）を手がけた。',
      '2023年の夏、バトラーはアニメーション短編映画の制作に着手したが、未完のままとなった。同じ時期に、初期の主要作品のひとつである《Untitled (2023)》を制作した。',
      '2024年初頭、バトラーの制作は、概念的にも技術的にも人工知能を枠組みとする方向へ移り、芸術と学術の両面における軌跡を方向づけた。東アジアに影響を受けたコンセプトアートを制作する傍ら、東京工業大学のAIシステム講座に入学する以前から、生成メディアとしてのAIに取り組んでいた。',
      '2024年末にかけて、バトラーの作品は暴力的なイメージや困窮した都市環境の描写へと次第に傾いていった。その後、不安定な生活状況のもとニュージャージーへ移り住み、制作活動を中断した。',
      '2026年6月、バトラーは初の個展『The Atelier/Propitiation』の制作に着手した。'
    ] },

    // ----- exhibition -----
    { sel: '.chapter-tag', ja: ['はじめに', '第一章', '第二章', '第三章'] },
    { sel: '.chapter-title', ja: ['新時代', 'インターネットの人々', '爆弾', '地獄'] },
    { sel: '.chapter-body', ja: [
      '『<em>The Atelier/Propitiation</em>』を制作するにあたり、私はひとつの単純な考えを示したかった。デジタルアートとは、コンピューターで作られた芸術にとどまらず、それ自身の固有の精神を持つものだということだ。描くことに伴う触覚的な感触が失われることで、この身体的な経験は精神的な経験へと変容し、思考がかたちを成していく。私はこれを、現状に異議を唱える新たな思考の枠組みへの入り口と捉えている。本展で展示される作品は販売しない。',
      '集合的記憶に深く刻み込まれたイメージ。その複製は、描かれた人物その人よりも身近なものとなっている。',
      '世界が嘘をつくとき、誰が真実を語り続けるのか。爆弾は一つの場所だけに落とされたのではない。私たち全員の上に落とされたのだ。',
      '私たちが人生の中でつくり上げるペルソナについて、何を理解すべきなのか。革命家は、自らの生きる社会を曲げるべきか、それとも自分自身を曲げるべきか。人々が革命を必要としているのか、それとも革命家のほうが革命を必要としているのか。'
    ] },
    { sel: '.special-movie-content h2', ja: ['展覧会<br>スペシャルムービー'] },
    { sel: '.movie-link span', ja: ['1作目'] },
    { sel: '.art-info p', ja: [
      'デジタルアート · 2023',
      'デジタルアート · 映像 · 2025',
      'デジタルアート · 映像 · 2026',
      'デジタルアート · アニメーション · 2026',
      'デジタルアート · 2025',
      '3Dアニメーション · ミクストメディア映像 · 2025',
      'AIアニメーション · 映像 · 2026',
      'AIアニメーション · 3Dアニメーション · クレヨン · 2026'
    ] }
  ];

  var TITLES = {
    'Exhibition': '展覧会',
    'About Evan Butler': 'エヴァン・バトラー | プロフィール'
  };

  var items = [];
  RULES.forEach(function (rule) {
    var els = document.querySelectorAll(rule.sel);
    if (!els.length) return;
    if (els.length !== rule.ja.length) {
      console.warn('[lang] ' + rule.sel + ': found ' + els.length + ' elements but ' + rule.ja.length + ' translations. Skipped.');
      return;
    }
    els.forEach(function (el, i) {
      if (rule.ja[i] == null) return;
      items.push({ el: el, en: el.innerHTML, ja: rule.ja[i] });
    });
  });

  var origTitle = document.title;

  var style = document.createElement('style');
  style.textContent =
    '.lang-toggle{margin-left:auto;margin-right:18px;background:none;border:none;color:#fff;font:inherit;font-size:1em;font-weight:500;letter-spacing:1px;cursor:pointer;padding:6px 4px;transition:opacity .3s}' +
    '.lang-toggle:hover{opacity:.7}' +
    'html[lang="ja"] :not(i){font-family:"Poppins","Noto Sans JP",sans-serif}' +
    'html[lang="ja"] .chapter-title{font-family:"Hahmlet","Noto Serif JP",serif}' +
    'html[lang="ja"] p{line-break:strict}';
  document.head.appendChild(style);

  var fontsLoaded = false;
  function loadFonts() {
    if (fontsLoaded) return;
    fontsLoaded = true;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Serif+JP:wght@400;500&display=swap';
    document.head.appendChild(l);
  }

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'lang-toggle';
  var brand = document.querySelector('header .brand');
  if (brand) brand.insertAdjacentElement('afterend', btn);

  function apply(lang) {
    items.forEach(function (it) {
      it.el.innerHTML = (lang === 'ja') ? it.ja : it.en;
    });
    document.documentElement.lang = lang;
    document.title = (lang === 'ja') ? (TITLES[origTitle] || origTitle) : origTitle;
    btn.textContent = (lang === 'ja') ? 'EN' : 'JP';
    btn.setAttribute('aria-label', (lang === 'ja') ? 'Switch to English' : '日本語に切り替える');
    if (lang === 'ja') loadFonts();
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  var current = 'en';
  try { current = localStorage.getItem('lang') || 'en'; } catch (e) {}
  apply(current);

  btn.addEventListener('click', function () {
    current = (current === 'en') ? 'ja' : 'en';
    apply(current);
  });
})();
