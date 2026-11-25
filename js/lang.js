(function () {
  var RULES = [
    // ----- all pages -----
    { sel: '.navigation-items a', ja: ['ホーム', 'プロフィール', '展覧会', 'V', '書籍', 'お問い合わせ'] },
    { sel: '.site-footer p', ja: ['©2026 Evan Butler<br>ニューヨーク、ブルックリン<br><a href="mailto:bishopb429@gmail.com">bishopb429@gmail.com</a>'] },

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
      'エヴァン・バトラーは美術家と作家である。美術の正規教育を受けることなく、複数のメディアにまたがる学際的な制作活動を築いてきた。',
      '2022年後半、バトラーは伝統的な絵画技法とデジタルの絵画技法の両方を用いるアーティストとして登場した。2023年を通じて制作を3Dデザインへと広げ、未完成のゲームと、のちに2026年に完成した実験的な短編映画（Untitled）を手がけた。',
      '2023年の夏、バトラーはアニメーション短編映画の制作に着手したが、未完のままとなった。同じ時期に、初期の主要作品のひとつである《Untitled (2023)》を制作した。',
      '2024年初頭、バトラーの制作は、概念的にも技術的にも人工知能を枠組みとする方向へ移り、芸術と学術の両面における軌跡を方向づけた。東アジアに影響を受けたコンセプトアートを制作する傍ら、東京工業大学のAIシステム講座に入学する以前から、生成メディアとしてのAIに取り組んでいた。',
      '2024年末にかけて、バトラーの作品は暴力的なイメージや困窮した都市環境の描写へと次第に傾いていった。その後、不安定な生活状況のもとニュージャージーへ移り住み、制作活動を中断した。',
      '2026年6月、バトラーは初の個展『Propitiation』の制作に着手した。現在はアーカイブされている。現在、バトラーはVというアンソロジーを、巻ごとに展開する形で制作している。'
    ] },

    // ----- contact -----
    { sel: '.contact-box h1', ja: ['お問い合わせ'] },
    { sel: '.contact-place', ja: ['ニューヨーク、ブルックリン'] },
    { sel: '.contact-lead', ja: ['展覧会・取材に関するお問い合わせ：'] },

    // ----- about: CV -----
    { sel: '.cv-title', ja: ['略歴'] },
    { sel: '.cv-heading', ja: ['学歴', '個展', '主な作品'] },
    { sel: '.cv-list li', ja: [
      '<span class="cv-year"></span><span class="cv-text">独学</span>',
      '<span class="cv-year">2024</span><span class="cv-text">東京工業大学 AIシステム講座</span>',
      '<span class="cv-year">2026</span><span class="cv-text"><em>Propitiation</em>（アーカイブされたオンライン展覧会）、evanatelier.com</span>',
      '<span class="cv-year">2023</span><span class="cv-text"><em>Untitled</em> — デジタルアート</span>',
      '<span class="cv-year">2025</span><span class="cv-text"><em>Breaking (割れる)</em> — デジタルアート · 映像</span>',
      '<span class="cv-year">2025</span><span class="cv-text"><em>Tanpeki (丹碧)</em> — デジタルアート</span>',
      '<span class="cv-year">2025</span><span class="cv-text"><em>Untitled</em> — 3Dアニメーション · ミクストメディア映像</span>',
      '<span class="cv-year">2026</span><span class="cv-text"><em>Dante\'s Inferno</em> — デジタルアート · 映像</span>',
      '<span class="cv-year">2026</span><span class="cv-text"><em>Hungry Gull and the Water Vessel</em> — デジタルアート · アニメーション</span>',
      '<span class="cv-year">2026</span><span class="cv-text"><em>Venus\'s Cycle</em> — AIアニメーション · 映像</span>',
      '<span class="cv-year">2026</span><span class="cv-text"><em>Vagabond</em> — AIアニメーション · 3Dアニメーション · クレヨン</span>'
    ] },
    { sel: '.cv-download', ja: ['略歴をダウンロード（PDF）'] },

    // ----- exhibition -----
    { sel: '.exhibition-page .commentary-label', ja: ['Propitiation · オンライン展覧会 · 2026年 — アーカイブ'] },
    { sel: '.exhibition-page .chapter-tag', ja: ['はじめに', '第一章', '第二章', '第三章'] },
    { sel: '.exhibition-page .chapter-title', ja: ['新時代', 'インターネットの人々', '爆弾', '地獄'] },
    { sel: '.exhibition-page .chapter-body', ja: [
      '『<em>Propitiation</em>』を制作するにあたり、私はひとつの単純な考えを示したかった。デジタルアートとは、コンピューターで作られた芸術にとどまらず、それ自身の固有の精神を持つものだということだ。描くことに伴う触覚的な感触が失われることで、この身体的な経験は精神的な経験へと変容し、思考がかたちを成していく。私はこれを、現状に異議を唱える新たな思考の枠組みへの入り口と捉えている。本展で展示される作品は販売しない。',
      '集合的記憶に深く刻み込まれたイメージ。その複製は、描かれた人物その人よりも身近なものとなっている。',
      '世界が嘘をつくとき、誰が真実を語り続けるのか。爆弾は一つの場所だけに落とされたのではない。私たち全員の上に落とされたのだ。',
      '私たちが人生の中でつくり上げるペルソナについて、何を理解すべきなのか。革命家は、自らの生きる社会を曲げるべきか、それとも自分自身を曲げるべきか。人々が革命を必要としているのか、それとも革命家のほうが革命を必要としているのか。'
    ] },
    { sel: '.exhibition-page .special-movie-content h2', ja: ['展覧会<br>スペシャルムービー'] },
    { sel: '.exhibition-page .art-info p', ja: [
      'デジタルアート · 2023',
      'デジタルアート · 映像 · 2025',
      'デジタルアート · 映像 · 2026',
      'デジタルアート · アニメーション · 2026',
      'デジタルアート · 2025',
      '3Dアニメーション · ミクストメディア映像 · 2025',
      'AIアニメーション · 映像 · 2026',
      'AIアニメーション · 3Dアニメーション · クレヨン · 2026'
    ] },

    // ----- V pages (page-scoped: each rule matches exactly one page) -----
    // v.html
    { sel: '.page-v .volumes-intro', ja: ['アンソロジー、巻ごとに展開する'] },
    { sel: '.page-v .coming-soon', ja: ['近日公開'] },
    { sel: '.page-v .books-bar-label', ja: ['書籍'] },
    { sel: '.page-v .shop-bar-label', ja: ['ショップ'] },
    { sel: '.page-v .volumes-signup-line', ja: ['新しい巻を、メールで。'] },
    // volume/wiki page labels, tags, titles (names stay, words translate)
    { sel: '.page-volume1 .commentary-label-text', ja: [' · 用語集'] },
    { sel: '.page-volume2 .commentary-label-text', ja: [' · 第2巻'] },
    { sel: '.page-volume3 .commentary-label-text', ja: [' · 第3巻'] },
    { sel: '.page-volume4 .commentary-label-text', ja: [' · 第4巻'] },
    { sel: '.page-books .commentary-label-text', ja: [' · 書籍'] },
    { sel: '.page-shop .commentary-label-text', ja: [' · ショップ'] },
    { sel: '.page-tanpeki .commentary-label-text', ja: [' · 用語集'] },
    { sel: '.page-vermillion .commentary-label-text', ja: [' · 用語集'] },
    { sel: '.page-volume1 .chapter-tag', ja: ['用語集'] },
    { sel: '.page-volume2 .chapter-tag', ja: ['第2巻'] },
    { sel: '.page-volume3 .chapter-tag', ja: ['第3巻'] },
    { sel: '.page-volume4 .chapter-tag', ja: ['第4巻'] },
    { sel: '.page-books .chapter-tag', ja: ['書籍'] },
    { sel: '.page-shop .chapter-tag', ja: ['ショップ'] },
    { sel: '.page-tanpeki .chapter-tag', ja: ['用語集'] },
    { sel: '.page-vermillion .chapter-tag', ja: ['用語集'] },
    { sel: '.page-volume1 .chapter-title', ja: ['用語集'] },
    { sel: '.page-volume2 .chapter-title', ja: ['丹碧 — ベイビー、目を閉じて'] },
    { sel: '.page-volume3 .chapter-title', ja: ['Vermillion Zyu Hung（朱紅）'] },
    { sel: '.page-books .chapter-title', ja: ['書籍'] },
    { sel: '.page-shop .chapter-title', ja: ['ショップ'] },
    // volume intros (Pierrot / Tanpeki / Vermillion titles stay as-is)
    { sel: '.page-volume2 .chapter-body', ja: ['丹碧とは、生命力が人の頭の上に色のハローとして現れる知覚現象である。悪化はピンク、安定はシアン、健康はグリーン。ハローが見えるのは特定の女性だけであり、男性にとってはそれは歪みでしかなく、生命は見えないままである。『ベイビー、目を閉じて』は、ハローの見える看護師、りんねの物語である。'] },
    { sel: '.page-volume3 .chapter-body', ja: [
      'Vermillion Zyu Hung — Vにおけるデザイナー・ファッションハウス。フランスの心と、香港の心。',
      'Vermillion Zyu Hungは、1920年代に創業したファッションと美容のハウスで、女性のための仕立てのスカート、ジュエリー、メイクアップを手がけている。フランス人デザイナーのガブリエル・フランソワと香港出身のエンジェル・ウィングシーによって再始動し、伝統の職人技を保ちながら、新しい世代のために生まれ変わった。',
      'Vermillion Zyu Hungは、Vにおける架空のハウスである。'
    ] },
    { sel: '.page-volume4 .chapter-body', ja: ['Pierrot — それ自体がひとつの章である。'] },
    // artwork medium lines (artwork titles stay)
    { sel: '.page-volume2 .art-info p', ja: ['デジタルアート · 2026', 'デジタルアート · 2026', 'デジタルアート · 2026', 'デジタルアート · 2025'] },
    { sel: '.page-volume3 .art-info p', ja: ['デジタルアート · 2026', 'デジタルアート · 2026', null, 'デジタルアート · 2026', '$450', 'キャンバスにアクリル · 2026', 'アメリカ人アーティスト、カート・ハートフィールドがヴェルミリオンのために描いた。', 'デジタルアート · 2026', 'デジタルアート · 2026', 'ガブリエル・フランソワ · 2026年春夏 · ウィメンズウェア', 'デジタルアート · 2026'] },
    { sel: '.page-volume4 .art-info p', ja: ['デジタルアート · 2023', 'デジタルアート · 2023', 'デジタルアート · 2023'] },
    // breakdown sections
    { sel: '.page-volume2 .breakdown-label', ja: ['解説'] },
    { sel: '.page-volume2 .breakdown-title', ja: ['丹碧の科学的解説'] },
    { sel: '.page-volume3 .breakdown-title', ja: ['ヴェルミリオンのフィルム'] },
    { sel: '.page-volume2 .volume-footer', ja: ['Tanpeki · 第2巻 · V — アンソロジー'] },
    // wiki articles
    // Glossary list (volume1.html)
    { sel: '.page-volume1 .wiki-body', ja: [
      '<a class="wiki-link" href="tanpeki.html">Tanpeki (丹碧)</a> — 生命力が人の頭の上に色のハローとして現れる知覚現象である。',
      '<a class="wiki-link" href="vermillion.html">Vermillion Zyu Hung (朱紅)</a> — 1920年代に創業したファッションと美容のハウスで、女性のための仕立てのスカート、ジュエリー、メイクアップを手がけている。'
    ] },
    { sel: '.page-tanpeki .wiki-body', ja: [
      '丹碧は、色の見え方を歪ませる知覚現象である。この言葉は、北海道の科学者たちが、身体のエネルギーの中心である丹田から「丹」を取って名付けた。特定の雌だけが、この歪みを通して生命力のスペクトルを読み取り、色の移り変わりとして物の生命を見ることができる。男性も丹碧の影響を受けるが、彼らにとってはそれは歪みでしかなく、生命は見えないままである。',
      '生命力が人の頭の上に色のハローとして現れる知覚現象である。特定の女性にしか、これらのハローは見えない。',
      '丹碧は、まわりの人々の生命力を頭の上の色のハローとして見る看護師、りんねを描く<a class="wiki-link" href="volume2.html">第2巻 — ベイビー、目を閉じて</a>である。'
    ] },
    { sel: '.page-tanpeki .wiki-article h3', ja: ['ハロー', 'Vの中で'] },
    { sel: '.page-tanpeki .wiki-list li', ja: ['<b>悪化</b> — ピンク', '<b>安定</b> — シアン', '<b>健康</b> — グリーン'] },
    { sel: '.page-vermillion .wiki-body', ja: [
      '<i>『VISION Magazine』1967年3月1日号より。</i>',
      'Vermillion Zyu Hungは、1920年代に創業したファッションと美容のハウスで、女性のための仕立てのスカート、ジュエリー、メイクアップを手がけている。フランス人デザイナーのガブリエル・フランソワと香港出身のエンジェル・ウィングシーによって再始動し、伝統の職人技を保ちながら、新しい世代のために生まれ変わった。',
      'Vermillion Zyu Hungは<a class="wiki-link" href="volume3.html">第3巻</a>である。'
    ] },
    { sel: '.page-vermillion .wiki-article h3', ja: ['Vの中で'] },

  ];

  var TITLES = {
    'Evan Butler — Contemporary Artist': 'エヴァン・バトラー — 現代美術家',
    'Evan Butler — Artist and Writer': 'エヴァン・バトラー — 美術家と作家',
    'About Evan Butler': 'エヴァン・バトラー | プロフィール',
    'The Atelier/Propitiation — Evan Butler': 'The Atelier/Propitiation — エヴァン・バトラー',
    'Propitiation (Archived) — Evan Butler': 'Propitiation（アーカイブ）— エヴァン・バトラー',
    'Contact — Evan Butler': 'お問い合わせ — エヴァン・バトラー',
    'V — Evan Butler': 'V — エヴァン・バトラー',
    'Books · V — Evan Butler': 'Books · V — エヴァン・バトラー',
    'Tanpeki · V — Glossary · Evan Butler': 'Tanpeki · V — Glossary · エヴァン・バトラー',
    'Vermillion Zyu Hung · V — Glossary · Evan Butler': 'Vermillion Zyu Hung · V — Glossary · エヴァン・バトラー',
    'Glossary · Evan Butler': 'Glossary · エヴァン・バトラー',
    'Volume 2 — Tanpeki · Evan Butler': 'Volume 2 — Tanpeki · エヴァン・バトラー',
    'Volume 3 — Vermillion Zyu Hung · Evan Butler': 'Volume 3 — Vermillion Zyu Hung · エヴァン・バトラー',
    'Volume 4 — Pierrot · Evan Butler': 'Volume 4 — Pierrot · エヴァン・バトラー'
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
    'html[lang="ja"] body:not(.storefront):not(.research) :not(i){font-family:"Poppins","Noto Sans JP",sans-serif}' +
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
