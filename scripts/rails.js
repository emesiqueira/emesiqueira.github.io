/* Trilhas horizontais do mobile: controle clicável em vez de instrução escrita.
   [data-rail="dots"]  -> pontos (um por item ou por página)
   [data-rail="tabs"]  -> abas nomeadas, lidas do primeiro h3/h4 de cada painel
   O <nav> vive no elemento apontado por data-rail-nav (ou é criado após a trilha). */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var mqs = {};
  function mqFor(rail) {
    var bp = rail.getAttribute("data-rail-bp") || "760";
    return (mqs[bp] = mqs[bp] || window.matchMedia("(max-width:" + bp + "px)"));
  }

  function itemsOf(rail) {
    return [].filter.call(rail.children, function (n) { return n.nodeType === 1 && !n.classList.contains("rail-nav"); });
  }

  function build(rail) {
    var mode = rail.getAttribute("data-rail");
    var group = parseInt(rail.getAttribute("data-rail-group") || "0", 10);
    var all = itemsOf(rail);
    // agrupado (ex.: 3 logos por página): cada botão representa a página pelo
    // seu item do meio — assim o alvo de rolagem é sempre um ponto de snap real
    var items = group > 1
      ? all.filter(function (_, i) { return i % group === 0; }).map(function (_, p) {
          return all[Math.min(all.length - 1, p * group + Math.floor((group - 1) / 2))];
        })
      : all;
    if (items.length < 2) return null;

    var nav = document.createElement("div");
    nav.className = "rail-nav" + (mode === "tabs" ? " is-tabs" : " is-dots");
    nav.setAttribute("role", "tablist");

    var labels = items.map(function (el, i) {
      if (mode !== "tabs") return "Item " + (i + 1);
      var h = el.querySelector("h3,h4");
      return h ? h.textContent.trim() : "Item " + (i + 1);
    });

    var btns = items.map(function (el, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "rail-btn";
      b.setAttribute("role", "tab");
      if (mode === "tabs") b.textContent = labels[i];
      else b.setAttribute("aria-label", "Ir para " + (i + 1) + " de " + items.length);
      b.addEventListener("click", function () { goTo(el); });
      nav.appendChild(b);
      return b;
    });

    // o alvo precisa ser um ponto de snap ALCANÇÁVEL: com align center, isso é o
    // centro do item menos meia trilha, preso entre 0 e o fim da rolagem.
    function targetOf(el) {
      var max = rail.scrollWidth - rail.clientWidth;
      var left = el.offsetLeft - rail.offsetLeft - (rail.clientWidth - el.offsetWidth) / 2;
      return Math.max(0, Math.min(max, Math.round(left)));
    }

    function goTo(el) {
      var left = targetOf(el);
      var from = rail.scrollLeft;
      rail.scrollTo({ left: left, behavior: reduce ? "auto" : "smooth" });
      // webview que ignora smooth: se não saiu do lugar, atribui direto
      setTimeout(function () {
        if (Math.abs(rail.scrollLeft - from) < 2 && Math.abs(left - from) > 2) rail.scrollLeft = left;
        mark();
      }, 350);
    }

    function mark() {
      var mid = rail.scrollLeft + rail.clientWidth / 2, best = 0, bestD = Infinity;
      items.forEach(function (el, i) {
        var c = el.offsetLeft - rail.offsetLeft + el.offsetWidth / 2;
        var d = Math.abs(c - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      btns.forEach(function (b, i) {
        var on = i === best;
        b.classList.toggle("on", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      var act = btns[best];
      if (nav.scrollWidth > nav.clientWidth + 4 && act) {
        nav.scrollTo({ left: act.offsetLeft - nav.clientWidth / 2 + act.offsetWidth / 2, behavior: reduce ? "auto" : "smooth" });
      }
    }

    // latch zerado ANTES de marcar: se um rAF não chega, o listener não morre
    var tick = 0;
    rail.addEventListener("scroll", function () {
      if (tick) return;
      tick = setTimeout(function () { tick = 0; mark(); }, 80);
    }, { passive: true });

    var host = rail.getAttribute("data-rail-nav") && document.querySelector(rail.getAttribute("data-rail-nav"));
    (host || rail.parentNode).insertBefore(nav, host ? null : rail.nextSibling);
    nav.__mark = mark;
    mark();
    return nav;
  }

  // controle só existe se a trilha realmente rola — nada de ponto morto na tela
  function scrolls(rail) {
    return rail.scrollWidth > rail.clientWidth + 4;
  }

  function sync() {
    [].forEach.call(document.querySelectorAll("[data-rail]"), function (rail) {
      var live = mqFor(rail).matches && scrolls(rail);
      if (live && !rail.__railNav) rail.__railNav = build(rail) || null;
      if (rail.__railNav) {
        rail.__railNav.hidden = !live;
        if (live && rail.__railNav.__mark) rail.__railNav.__mark();
      }
    });
  }

  sync();
  Object.keys(mqs).forEach(function (bp) {
    if (mqs[bp].addEventListener) mqs[bp].addEventListener("change", sync);
  });
  window.addEventListener("resize", sync, { passive: true });
  // troca de idioma: os rótulos das abas vivem no h3 traduzido
  document.addEventListener("i18n:change", function () {
    [].forEach.call(document.querySelectorAll('[data-rail="tabs"]'), function (rail) {
      if (!rail.__railNav) return;
      var items = itemsOf(rail);
      [].forEach.call(rail.__railNav.children, function (b, i) {
        var h = items[i] && items[i].querySelector("h3,h4");
        if (h) b.textContent = h.textContent.trim();
      });
    });
  });
})();
