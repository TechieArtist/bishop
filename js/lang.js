(function () {
  var RULES = [
    // ----- all pages -----
    { sel: '.navigation-items a', ja: ['ホーム', 'プロフィール', '展覧会', 'V', 'お問い合わせ'] },
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
      '2026年6月、バトラーは初の個展『Propitiation』の制作に着手した。現在はアーカイブされている。現在、バトラーはVという歪んだ世界を、巻ごとに展開する形で制作している。'
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
    { sel: '.page-v .volumes-intro', ja: ['Vは現実に忠実なはずの世界だった。歪みが現れるまでは。'] },
    { sel: '.page-v .distortion-counter-label', ja: ['記録された歪み'] },
    { sel: '.page-v .distortion-counter-note', ja: ['43が来ると想定されている'] },
    { sel: '.page-v .coming-soon', ja: ['近日公開'] },
    { sel: '.page-v .books-bar-label', ja: ['書籍'] },
    { sel: '.page-v .shop-bar-label', ja: ['ショップ'] },
    { sel: '.page-v .volumes-signup-line', ja: ['新しい巻を、メールで。'] },
    // volume/wiki page labels, tags, titles (names stay, words translate)
    { sel: '.page-volume1 .commentary-label-text', ja: [' · プロローグ'] },
    { sel: '.page-volume4 .commentary-label-text', ja: [' · 第4巻'] },
    { sel: '.page-books .commentary-label-text', ja: [' · 書籍'] },
    { sel: '.page-shop .commentary-label-text', ja: [' · ショップ'] },
    { sel: '.page-kowloon .commentary-label-text', ja: [' · システム'] },
    { sel: '.page-breaking .commentary-label-text', ja: [' · システム'] },
    { sel: '.page-tanpeki .commentary-label-text', ja: [' · システム'] },
    { sel: '.page-vermillion .commentary-label-text', ja: [' · システム'] },
    { sel: '.page-distortion .commentary-label-text', ja: [' · システム'] },
    { sel: '.page-volume1 .chapter-tag', ja: ['プロローグ'] },
    { sel: '.page-volume4 .chapter-tag', ja: ['第4巻'] },
    { sel: '.page-books .chapter-tag', ja: ['書籍'] },
    { sel: '.page-shop .chapter-tag', ja: ['ショップ'] },
    { sel: '.page-kowloon .chapter-tag', ja: ['システム'] },
    { sel: '.page-breaking .chapter-tag', ja: ['システム'] },
    { sel: '.page-tanpeki .chapter-tag', ja: ['システム'] },
    { sel: '.page-vermillion .chapter-tag', ja: ['システム'] },
    { sel: '.page-distortion .chapter-tag', ja: ['システム'] },
    { sel: '.page-volume1 .chapter-title', ja: ['プロローグ'] },
    { sel: '.page-books .chapter-title', ja: ['書籍'] },
    { sel: '.page-shop .chapter-title', ja: ['ショップ'] },
    { sel: '.page-kowloon .chapter-title', ja: ['九龍'] },
    { sel: '.page-distortion .chapter-title', ja: ['歪み'] },
    // volume intros (Pierrot / Breaking / Tanpeki / Vermillion titles stay as-is)
    { sel: '.page-volume1 .chapter-body', ja: ['世界は現実に忠実であるはずだった。どこかで、歪みが現れた。'] },
    { sel: '.page-volume4 .chapter-body', ja: ['Pierrot — それ自体がひとつの章である。'] },
    // artwork medium lines (artwork titles stay)
    { sel: '.page-volume1 .art-info p', ja: ['デジタルアート · 2026'] },
    { sel: '.page-volume4 .art-info p', ja: ['デジタルアート · 2023', 'デジタルアート · 2023', 'デジタルアート · 2023'] },
    // breakdown sections
    { sel: '.page-volume1 .breakdown-label', ja: ['解説'] },
    { sel: '.page-volume1 .breakdown-title', ja: ['歪みの概要'] },
    { sel: '.page-volume1 .breakdown-date', ja: ['1800年代', '1960年代', '2000年代'] },
    { sel: '.page-volume1 .breakdown-text', ja: ['最初の歪みが九龍で始まる。', 'Breakingが大規模な消去を始める。', '丹碧のメディア報道が始まる。'] },
    { sel: '.page-volume1 .breakdown-note', ja: ['歪みは九龍半島で始まった。天の川銀河の初期質量関数（IMF）から得た係数0.3で、その不規則な人口を割ると、約43.00という近似値が得られる。その意味はまだ理解されていないが、重大な数である。それが、まだ起こっていない歪みの数と関係しているのではないかと推測する者もいる。'] },
    // wiki articles
    { sel: '.page-kowloon .wiki-body', ja: [
      '歪みは九龍半島で始まった。天の川銀河の初期質量関数（IMF）から得た係数0.3で、その不規則な人口を割ると、約43.00という近似値が得られる。その意味はまだ理解されていないが、重大な数である。',
      '最初の歪みは、1800年代に九龍で始まる。<i>People of Kowloon</i>は、そこを舞台にした作品である。',
      'それが、まだ起こっていない歪みの数と関係しているのではないかと推測する者もいる。',
      '九龍は、<a class="wiki-link" href="volume1.html">プロローグ</a>のEvents年表の始まりである。'
    ] },
    { sel: '.page-kowloon .wiki-article h3', ja: ['最初の歪み', '43.00', 'Vの中で'] },
    { sel: '.page-breaking .wiki-body', ja: [
      'Breakingはマルウェアであり、ハードウェア全体に広がると、ストレージデバイスの中身をすべて吸い上げてから消去する。',
      'このマルウェアが、インターネット全体のストレージをひとつに統合するクラウドストレージの起源であったという説もある。',
      '1960年代のコンピューター軍拡競争のさなかに、中国政府が開発したとの噂がある。数十年間眠っていたといわれ、ウェブの普及とともに1990年代に再び現れ、ポルノサイトを狙い始めた。物理ストレージがますます時代遅れになっていく現代においても、その有効性は続いているが、噂は未確認のままである。',
      'Breakingは、<a class="wiki-link" href="volume1.html">プロローグ</a>のEvents年表における1960年代の項目である。'
    ] },
    { sel: '.page-breaking .wiki-article h3', ja: ['Vの中で'] },
    { sel: '.page-tanpeki .wiki-body', ja: [
      '丹碧は、色の見え方を歪ませる知覚現象である。この言葉は、北海道の科学者たちが、身体のエネルギーの中心である丹田から「丹」を取って名付けた。特定の雌だけが、この歪みを通して生命力のスペクトルを読み取り、色の移り変わりとして物の生命を見ることができる。男性も丹碧の影響を受けるが、彼らにとってはそれは歪みでしかなく、生命は見えないままである。',
      '生命力が人の頭の上に色のハローとして現れる知覚現象である。特定の女性にしか、これらのハローは見えない。',
      '丹碧は、ベッドも場所も不足し、救急外来が圧倒的な数のホームレスの人々を抱えていた医療システムに到来した。ハローは、そのひっ迫を目に見えるものにした。',
      'ハローの色分けはトリアージの区分にそのまま対応するため、世界は振り分けの言葉を発明する必要がなかった — 丹碧はそれを持って到来した。病院は、繰り返し訪れる同じ名前のリストをすでに持っていた。ハローはそのリストを身体の上に載せ、どの部屋でも見えるようにする。',
      'その可視化が何をもたらすかは未解決である。ピンクのハローは優先を意味しうる — 最も悪化した者が最初に並ぶ — あるいは選別を意味しうる。治療成績の統計は、ベッドにいるグリーンの患者を有利にするからである。丹碧はシステムを分裂させかねない。目に見えるピンクに溺れる公立の救急外来と、静かにグリーンを選別する私立病棟。ホームレスの人のハローは慢性的な悪化であり、状態であって緊急事態ではない。必要性が否定できなくなるか、患者が目に見える「見込みなし」となり、回復するかもしれないピンクのハローにベッドが行くため、最後に回される。',
      '特定の女性にしかハローは見えないため、病院はハローを読み取れる職員を置く必要がある。',
      '丹碧は、まわりの人々の生命力を頭の上の色のハローとして見る看護師、りんねを描く<a class="wiki-link" href="volume2.html">第2巻 — ベイビー、目を閉じて</a>である。'
    ] },
    { sel: '.page-tanpeki .wiki-article h3', ja: ['ハロー', '病院', 'Vの中で'] },
    { sel: '.page-tanpeki .wiki-list li', ja: ['<b>悪化</b> — ピンク', '<b>安定</b> — シアン', '<b>健康</b> — グリーン'] },
    { sel: '.page-vermillion .wiki-body', ja: [
      '<i>『VISION Magazine』1967年3月1日号より。</i>',
      'Vermillion Zyu Hungは、1920年代に創業したファッションと美容のハウスで、女性のための仕立てのスカート、ジュエリー、メイクアップを手がけている。フランス人デザイナーのガブリエル・フランソワと香港出身のエンジェル・ウィングシーによって再始動し、伝統の職人技を保ちながら、新しい世代のために生まれ変わった。',
      'Vermillion Zyu Hungは<a class="wiki-link" href="volume3.html">第3巻</a>である。'
    ] },
    { sel: '.page-vermillion .wiki-article h3', ja: ['Vの中で'] },
    { sel: '.page-distortion .wiki-body', ja: [
      'あるものが歪みとして認められるかどうかは、政府の分類規則によって決まる。歪みと認められるには、3つの条件のうち少なくとも2つが必要である。',
      '記録された歪みの数は、<a class="wiki-link" href="v.html">Vのトップページ</a>に表示されている。'
    ] },
    { sel: '.page-distortion .wiki-article h3', ja: ['Vの中で'] },
    { sel: '.page-distortion .wiki-list li', ja: ['確立された自然法則からの、文書に記録された逸脱。', '一か所にとどまらず、世界的に拡大する能力。', '放っておけば社会を不安定化させる可能性。'] },

    // ----- storefront (volume3.html) -----
    { sel: '.storefront .utility .vol', ja: ['第3巻'] },
    { sel: '.storefront .masthead .sub', ja: ['Vにおけるデザイナー・ファッションハウス · フランスの心と、香港の心'] },
    { sel: '.storefront .masthead .fiction', ja: ['Vermillion Zyu Hungは、Vにおける架空のハウスである。'] },
    { sel: '.storefront .hero .eyebrow', ja: ['2026年春夏 · ウィメンズウェア'] },
    { sel: '.storefront .house h2', ja: ['ハウスについて'] },
    { sel: '.storefront .house p', ja: ['Vermillion Zyu Hungは、1920年代に創業したファッションと美容のハウスで、女性のための仕立てのスカート、ジュエリー、メイクアップを手がけている。フランス人デザイナーのガブリエル・フランソワと香港出身のエンジェル・ウィングシーによって再始動し、伝統の職人技を保ちながら、新しい世代のために生まれ変わった。'] },
    { sel: '.storefront .collection h2', ja: ['コレクション'] },
    { sel: '.storefront .collection .count', ja: ['4作品'] },
    { sel: '.storefront .p-info-inner .meta', ja: ['デジタルアート · 2026', 'キャンバスにアクリル · 2026', 'デジタルアート · 2026', 'デジタルアート · 2026'] },
    { sel: '.storefront .p-info-inner .note', ja: ['アメリカ人アーティスト、カート・ハートフィールドがヴェルミリオンのために描いた。'] },
    { sel: '.storefront .p-buy-main', ja: ['クリック＆コレクト'] },
    { sel: '.storefront .sketch h2', ja: ['スケッチ'] },
    { sel: '.storefront .s-slide .meta', ja: ['ガブリエル・フランソワ · 2026年春夏 · ウィメンズウェア', 'ガブリエル・フランソワ · 2026年春夏 · ウィメンズウェア'] },
    { sel: '.storefront .art-eyebrow', ja: ['Vision Magazine · 1967年3月1日'] },
    { sel: '.storefront .art-headline', ja: ['Vermillion Zyu Hung'] },
    { sel: '.storefront .art-body p', ja: [
      'Vermillion Zyu Hungは、1920年代に創業したファッションと美容のハウスで、女性のための仕立てのスカート、ジュエリー、メイクアップを手がけている。フランス人デザイナーのガブリエル・フランソワと香港出身のエンジェル・ウィングシーによって再始動し、伝統の職人技を保ちながら、新しい世代のために生まれ変わった。'
    ] },
    { sel: '.storefront .art-foot', ja: ['Vision Magazine · 1967年3月1日'] },
    { sel: '.storefront .film .eyebrow', ja: ['ヴェルミリオン · スペシャル'] },
    { sel: '.storefront .film h2', ja: ['ヴェルミリオンのフィルム'] },
    { sel: '.storefront .services h4', ja: ['お問い合わせ', 'Vの世界', '新しい巻を、メールで。'] },
    { sel: '.storefront .services p a', ja: [null, 'Vに戻る', '購読する'] },
    { sel: '.storefront footer', ja: ['© 2026 Evan Butler · ニューヨーク、ブルックリン<br>Vermillion Zyu Hung — V 第3巻'] },

    // ----- research dossier (volume2.html) -----
    { sel: '.research .topbar a', ja: ['V · 第2巻'] },
    { sel: '.research .topbar span', ja: ['研究ノートと図版'] },
    { sel: '.research .subtitle', ja: ['<span class="jp">丹碧</span> &nbsp;·&nbsp; 対立色空間における錐体順応'] },
    { sel: '.research .epigraph', ja: ['“知覚は牢獄である。”'] },
    { sel: '.research .epigraph-attr', ja: ['丹碧と題されたノート、2023年8月'] },
    { sel: '.research .seclabel', ja: [
      '<b>概要</b>',
      '<b>ハロー</b> — 読み方',
      '<b>01</b> · 錐体順応',
      '<b>02</b> · 対立色の基盤',
      '<b>03</b> · 残像',
      '<b>04</b> · 解説',
      '<b>05</b> · ノート、2023年8月',
      '<b>参考文献</b>'
    ] },
    { sel: '.research .abstract p', ja: ['丹碧とは、生命力が人の頭の上に色のハローとして現れる知覚現象である。悪化はピンク、安定はシアン、健康はグリーン。ハローが見えるのは特定の女性だけであり、男性にとってはそれは歪みでしかなく、生命は見えないままである。『ベイビー、目を閉じて』は、ハローの見える看護師、りんねの物語である。'] },
    { sel: '.research .basis', ja: ['研究基盤 — ヒトの色覚：対立処理 · 錐体順応 · 残像'] },
    { sel: '.research .halokey .cname', ja: ['ピンク', 'シアン', 'グリーン'] },
    { sel: '.research .halokey .state', ja: ['— 悪化', '— 安定', '— 健康'] },
    { sel: '.research .intro', ja: [
      'プロットは、錐体が疲労するにつれて、中心窩が順応している状態に対して、ニュートラルグレーが今どのように見えるかを追跡する。色順応の古典的な説明はフォン・クリースである <a href="#ref2">[2]</a>。',
      'プロットの軸は、色空間の基底方向であり <a href="#ref6">[6]</a>、外側膝状体で測定されたものである <a href="#ref7">[7]</a> — マクラウド–ボイントン色度図に基づく <a href="#ref5">[5]</a>。対立色の説明はヘリングに始まり <a href="#ref1">[1]</a>、その定量的な形がハーヴィッチとジェイムソンである <a href="#ref4">[4]</a>。',
      '2023年のノートには、受容体が疲労するにつれて、明るい黄色の面がシアンとマゼンタへと移っていくことが記録されている。'
    ] },
    { sel: '.research figcaption', ja: [
      '<b>図1</b> — 対立色空間における錐体順応。t = 0.1 s、フレーム1/5、look 1/2。左：対立空間における位置 — green ← L−M → red、yellow ← S−(L+M)/2 → violet-blue、明るさ。右：画面上 / 見えるもの、および中心窩における錐体疲労。',
      '<b>図2</b> — t = 1.2 sにおける同じ空間、フレーム1/5、look 1/2。画面上 / 見えるもの。中心窩における錐体疲労（L、M、S）。',
      '<b>図3</b> — 対立色：波長に対する応答、400–700 nm。図表：CBlackwell、2012年。',
      '<b>図4</b> — CIE標準観測者、1931年xyz等色関数 <a href="#ref3">[3]</a>。図：Roger N. Clark、clarkvision.com。',
      '<b>図5</b> — 5フレーム。列：原画像、着地時の見え、フレーム終了時の見え、グレー上の残像。',
      '<b>図6</b> — 赤、緑、青のチャンネル分布。',
      '<b>映像</b> — 丹碧の科学的解説。'
    ] },
    { sel: '.research .reading', ja: [
      '<span class="rl">解釈</span>目が報告するものは、決して光そのものではない。それは、目がすでに順応している状態を通して濾過された光であり — 丹碧はその隔たりの中に生きている。0.1秒の時点では、ハローはまだ世界から分離していない。目はまだ画面を見ており、自分自身を見ているのではない。',
      '<span class="rl">解釈</span>図1と図2の間で、画面上のものは何も変わっていない。変わったのは目であり — 絵もそれとともに変わった。',
      '<span class="rl">解釈</span>目は決して波長を報告しない。報告するのは差異である — 緑に対する赤、紫に対する黄 — そしてハローは、可視化された差異である。ピンクとグリーンは対立する状態である。悪化と健康が、ひとつのチャンネルの両端として。',
      '<span class="rl">解釈</span>これは平均的な目を地図化したものである。知覚者は同じ色を見る — そしてもうひとつ、平均的な目が決して読み取らない状態を。丹碧とは、平均的な目が見逃すものである。',
      '<span class="rl">解釈1</span>残像とは、目が自分自身の疲労を見ているものである。ハローも同じように働く。生命力は現実のものであるが、その色は知覚者の目が翻訳したものである。',
      '<span class="rl">解釈2</span>残像とは、その背後に光のない色である。ハローはその逆である。ほとんどの目には捉えられない光を、知覚者の目には捉えることができる。'
    ] },
    { sel: '.research .notes p', ja: [
      '“片頭痛を描くこと、熱に浮かされた夢を地図化すること。”',
      '“せん妄の軸が十字に折れて、無限の色へ。”',
      '“RGB空間におけるベクトルとしての色が、自身へとループして戻る。”',
      '“混ざり合っても同じ色のままでいられる2色 — 無限の色。”'
    ] },
    { sel: '.research .notes-attr', ja: ['丹碧と題された手書きのノート。TanpekiはAdobe Illustratorで、組み合わせたベクトルシェイプから作られ、ソフトウェアがクラッシュするまで続けられた。ファイルはProcreateにアップロードするために縮小され、そこでCurvesとHue/Saturationが色覚の実験を担った。'] },
    { sel: '.research footer', ja: ['Tanpeki · 第2巻 · V — 歪んだ世界<br>図版：Evan Butler（クレジットのあるものを除く）。'] }
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
    'Breaking · V — Systems · Evan Butler': 'Breaking · V — Systems · エヴァン・バトラー',
    'Distortion · V — Systems · Evan Butler': 'Distortion · V — Systems · エヴァン・バトラー',
    'Kowloon · V — Systems · Evan Butler': 'Kowloon · V — Systems · エヴァン・バトラー',
    'Tanpeki · V — Systems · Evan Butler': 'Tanpeki · V — Systems · エヴァン・バトラー',
    'Vermillion Zyu Hung · V — Systems · Evan Butler': 'Vermillion Zyu Hung · V — Systems · エヴァン・バトラー',
    'Prologue · Evan Butler': 'Prologue · エヴァン・バトラー',
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
