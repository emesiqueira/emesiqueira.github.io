/* Páginas de case: filete de progresso de leitura + reveal por scroll. */
(function () {
  var bar = document.getElementById("caseProgress");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (bar) {
    var ticking = false;
    function draw() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, h.scrollTop / max) : 0) + ")";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(draw); }
    }, { passive: true });
    window.addEventListener("resize", draw, { passive: true });
    draw();
  }

  // altura real da barra superior -> usada pelo sticky do índice em mobile
  var barEl = document.querySelector(".case-back");
  function measureBar() {
    if (!barEl) return;
    document.documentElement.style.setProperty("--case-bar", Math.round(barEl.getBoundingClientRect().height) + "px");
  }
  measureBar();
  window.addEventListener("resize", measureBar, { passive: true });

  // índice fixo: marca a seção em leitura
  var links = [].slice.call(document.querySelectorAll(".case-toc a"));
  function centerInRail(a) {
    var rail = a.parentElement;
    if (!rail || rail.scrollWidth <= rail.clientWidth + 4) return;
    rail.scrollTo({ left: a.offsetLeft - rail.clientWidth / 2 + a.offsetWidth / 2, behavior: reduce ? "auto" : "smooth" });
  }
  if (links.length && "IntersectionObserver" in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("on"); });
        var a = byId[e.target.id];
        if (a) { a.classList.add("on"); centerInRail(a); }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    Object.keys(byId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  // mobile: texto longo abre sob demanda — encurta a rolagem sem cortar conteúdo
  var mqSmall = window.matchMedia("(max-width:920px)");
  function applyClamp() {
    [].forEach.call(document.querySelectorAll(".case-deep-main .case-body"), function (b) {
      // os parágrafos podem estar direto no .case-body ou dentro da coluna de texto
      var box = b.querySelector(":scope > div:not(.case-body-side)") || b;
      var ps = [].filter.call(box.children, function (n) { return n.tagName === "P"; });
      if (ps.length < 3) return;
      var btn = box.querySelector(".case-more");
      if (mqSmall.matches) {
        if (btn) return;
        box.classList.add("case-clamped");
        btn = document.createElement("button");
        btn.type = "button";
        btn.className = "case-more";
        btn.textContent = "Continuar lendo (" + (ps.length - 2) + ")";
        btn.addEventListener("click", function () { box.classList.remove("case-clamped"); btn.remove(); });
        box.appendChild(btn);
      } else {
        box.classList.remove("case-clamped");
        if (btn) btn.remove();
      }
    });
  }
  applyClamp();
  if (mqSmall.addEventListener) mqSmall.addEventListener("change", applyClamp);

  // copiar e-mail (mesmo comportamento do rodapé da home)
  var mc = document.getElementById("mailCopy");
  var tip = document.getElementById("mailTip");
  if (mc) {
    mc.addEventListener("click", function () {
      var mail = mc.getAttribute("data-mail");
      var done = function () {
        mc.classList.add("copied");
        if (tip) tip.textContent = "Copiado";
        setTimeout(function () {
          mc.classList.remove("copied");
          if (tip) tip.textContent = "Copiar";
        }, 1800);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(mail).then(done, done);
      else done();
    });
  }

  if (reduce || !("IntersectionObserver" in window)) return;
  // inclui .rv escrito na marcação: sem isso, um rv aninhado (neto de
  // .case-section-inner) nunca é observado e fica preso em opacity 0
  var targets = document.querySelectorAll(".case-section-inner > *, .case-related-inner > *, .rv");
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
  targets.forEach(function (el) { el.classList.add("rv"); io.observe(el); });
})();
