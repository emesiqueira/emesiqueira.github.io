/* Título do contato: máquina de escrever que troca de frase.
   Frases vêm do i18n (chave contact.rot, separadas por ||). */
(function () {
  var el = document.getElementById("typeRot");
  if (!el) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var TYPE = 62, ERASE = 28, HOLD = 2200, GAP = 420;
  var phrases = [], idx = 0, timer = null, running = false;

  function load() {
    var raw = window.I18N && window.I18N.t ? window.I18N.t("contact.rot") : "";
    phrases = String(raw || el.textContent || "").split("||").filter(Boolean);
    if (!phrases.length) phrases = [el.textContent];
  }

  function type(text, i) {
    el.textContent = text.slice(0, i);
    if (i < text.length) timer = setTimeout(function () { type(text, i + 1); }, TYPE);
    else timer = setTimeout(erase, HOLD);
  }

  function erase() {
    var text = el.textContent;
    if (text.length) {
      el.textContent = text.slice(0, -1);
      timer = setTimeout(erase, ERASE);
    } else {
      idx = (idx + 1) % phrases.length;
      timer = setTimeout(function () { type(phrases[idx], 1); }, GAP);
    }
  }

  function restart() {
    clearTimeout(timer);
    load();
    idx = 0;
    if (reduce) { el.textContent = phrases[0]; return; }
    el.textContent = "";
    if (running) timer = setTimeout(function () { type(phrases[0], 1); }, GAP);
    else el.textContent = phrases[0];
  }

  document.addEventListener("i18n:change", restart);
  restart();

  if (reduce) return;
  // só roda quando o quadro de missões está visível
  var host = el.closest(".contact-paper") || el;
  if (!("IntersectionObserver" in window)) { running = true; restart(); return; }
  new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !running) { running = true; restart(); }
      else if (!e.isIntersecting && running) { running = false; clearTimeout(timer); }
    });
  }, { threshold: 0.25 }).observe(host);
})();
