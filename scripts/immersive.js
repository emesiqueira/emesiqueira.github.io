/* Camada imersiva — reveal + parallax + foco, guiados pelo scroll.
   Modo lido de <body data-immersive="a|b|c">. */
(function () {
  var body = document.body;
  var mode = (body.dataset.immersive || 'a').toLowerCase();
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // x = híbrido escolhido: véu do A + números do B + foco e progresso do C
  var f = {
    counters: mode === 'b' || mode === 'x',
    parallax: mode === 'b',
    focus: mode === 'c' || mode === 'x',
    lines: mode === 'c',
    progress: mode === 'c' || mode === 'x'
  };

  /* ── 1. alvos de reveal, em grupos com escalonamento ── */
  var groups = [
    ['.g-hero-grid > div:first-child > *', 70],
    ['.clients-label, .client-logo', 60],
    ['.g-about .eyebrow, .g-about h2, .g-about .body > *', 70],
    ['.stat', 80],
    ['.g-projects .sec-head-v2 h2, .g-projects .sec-head-v2 .eyebrow', 70],
    ['.proj-card', 110],
    ['.g-tree .sec-head-v2 h2, .g-tree .sec-head-v2 .eyebrow', 70],
    ['.tree-root, .branch', 100],
    ['.contact-paper', 0],
    ['.foot-v2-row, .foot-v2 .copy', 80]
  ];
  var revealed = [];
  groups.forEach(function (g) {
    var els = Array.prototype.slice.call(document.querySelectorAll(g[0]));
    els.forEach(function (el, i) {
      el.classList.add('im');
      el.style.transitionDelay = (i * g[1]) + 'ms';
      revealed.push(el);
    });
  });

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  revealed.forEach(function (el) { io.observe(el); });

  /* ── 2. contadores das estatísticas (modo B) ── */
  if (f.counters && !reduce) {
    document.querySelectorAll('.stat .n').forEach(function (n) {
      var raw = n.childNodes[0];
      if (!raw || raw.nodeType !== 3) return;
      var txt = raw.nodeValue.trim();
      var m = txt.match(/^(\d+)(K?)$/i);
      if (!m) return;
      var target = parseInt(m[1], 10), suffix = m[2];
      var run = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        run.disconnect();
        var t0 = performance.now(), dur = 1100;
        (function step(t) {
          var p = Math.min(1, (t - t0) / dur);
          var e = 1 - Math.pow(1 - p, 3);
          raw.nodeValue = Math.round(target * e) + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      }, { threshold: 0.6 });
      run.observe(n);
    });
  }

  /* ── 3. parallax por camadas (modo B) ── */
  var px = [];
  if (f.parallax && !reduce) {
    var depths = [
      ['.g-portrait-wrap', -0.05],
      ['.g-hero .sticker', 0.13],
      ['.g-about .sticker', 0.16],
      ['.g-projects .sticker, .g-tree .sticker', 0.14],
      ['.proj-thumb', 0.055],
      ['.client-logo', 0.03]
    ];
    depths.forEach(function (d) {
      document.querySelectorAll(d[0]).forEach(function (el, i) {
        el.classList.add('im-px');
        px.push({ el: el, d: d[1] * (1 + (i % 3) * 0.22) });
      });
    });
  }

  /* ── 4. foco por seção + trilha de progresso (modo C) ── */
  var fill = null;
  if (f.focus) {
    var secs = Array.prototype.slice.call(
      document.querySelectorAll('.g-hero, .g-about, .g-projects, .g-tree, .g-contact')
    );
    secs.forEach(function (s) { s.classList.add('im-sec', 'dim'); });
    var focus = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('dim', e.intersectionRatio < 0.32); });
    }, { threshold: [0, 0.32, 0.6] });
    secs.forEach(function (s) { focus.observe(s); });

    // títulos revelados linha a linha, por máscara
    if (f.lines) document.querySelectorAll('.g-hero h1, .g-about h2, .sec-title-v2').forEach(function (h) {
      var words = h.innerHTML.split(/(\s+)/);
      // uma máscara por título é suficiente e preserva o HTML interno
      h.innerHTML = '<span class="im-line"><i>' + words.join('') + '</i></span>';
      var lo = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { es[0].target.classList.add('on'); lo.disconnect(); }
      }, { threshold: 0.3 });
      lo.observe(h.querySelector('.im-line'));
    });

  }
  if (f.progress && !reduce) {
    var bar = document.createElement('div');
    bar.className = 'im-progress';
    bar.innerHTML = '<i></i>';
    document.body.appendChild(bar);
    fill = bar.firstChild;
  }

  /* ── 5. loop de scroll ── */
  var hero = document.querySelector('.g-hero');
  var vh = innerHeight;
  var ticking = false;
  function frame() {
    ticking = false;
    var y = scrollY;
    if (hero) {
      var mob = innerWidth <= 760, ctas = hero.querySelector('.g-hero-ctas');
      var start = mob && ctas ? Math.max(0, ctas.offsetTop + hero.offsetTop - innerHeight * 0.18) : hero.offsetHeight * 0.25;
      var span = hero.offsetHeight * (mob ? 0.35 : 0.65);
      var out = Math.min(1, Math.max(0, (y - start) / span));
      body.style.setProperty('--hero-out', out.toFixed(3));
    }
    for (var i = 0; i < px.length; i++) {
      var o = px[i], r = o.el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      var rel = (r.top + r.height / 2 - vh / 2) / vh;
      o.el.style.setProperty('--py', (rel * o.d * -100).toFixed(1) + 'px');
    }
    if (fill) {
      var max = document.documentElement.scrollHeight - vh;
      fill.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', function () { vh = innerHeight; frame(); }, { passive: true });
  frame();
})();
