/* ============================================================
   i18n — PT / EN / ES
   - Aplica traduções em [data-i18n] (via innerHTML, suporta markup)
   - Persiste escolha em localStorage ('emerson-lang')
   - Padrão: Português
   ============================================================ */
(function () {
  const DICT = {
    pt: {
      "nav.about": "Sobre mim",
      "nav.projects": "Projetos",
      "nav.cv": "Currículo",
      "nav.contact": "Contate-me",
      "nav.skills": "Habilidades",
      "nav.cta": 'Fale comigo',
      "hero.eyebrow": "UX/UI · Product Designer",
      "hero.avail": "Belo Horizonte &amp; Rio · Remoto e internacional",
      "hero.title": 'Desenho experiências que <span class="em-ink">fazem sentido</span> e funcionam de verdade',
      "hero.lead": "Product Designer com 6 anos de estrada em educação, saúde e fintech. Da pesquisa à entrega: método, protótipo e métricas reais, com uma boa dose de cinema, games e narrativa no caminho.",
      "hero.leadShort": "Product Designer há 6 anos, com pós em IHC e UX pela PUC-Rio. Da pesquisa à entrega: método, protótipo e métricas reais.",
      "hero.d1": "Educação",
      "hero.d2": "Saúde",
      "hero.d3": "Fintech",
      "hero.cta1": 'Ver projetos',
      "hero.cta2": "Ver currículo",
      "about.cv": 'Ver currículo completo',
      "marquee.illu": "Ilustração",
      "about.eyebrow": "Sobre mim",
      "about.title": "Olá, sou o Emerson, designer UX/UI e Product Designer em Belo Horizonte.",
      "stat.years": "Anos de experiência",
      "stat.hours": "Horas de estudo",
      "stat.projects": "Projetos finalizados",
      "stat.clients": "Clientes atendidos",
      "about.p1": 'Minha trajetória começou no <strong>design gráfico</strong>, explorando linguagem visual, composição e narrativa. Ajudando amigos e microempreendedores, o passatempo virou ofício.',
      "about.p2": 'Desde 2020 me especializo em <strong>UX/UI e Product Design</strong>, em produtos de educação, instituições públicas, universidades e verticais digitais. Acredito que clareza é a forma mais alta de cuidado com quem usa.',
      "about.p3": 'Fora da tela, sou movido por <strong>cinema, games e fantasia</strong>, e isso vaza pro meu trabalho: gosto de interfaces com personalidade, ritmo e um toque de encanto.',
      "proj.eyebrow": "Projetos",
      "proj.title": 'Três cases, do problema à <span class="em-ink">entrega</span>',
      "card1.meta": "Case 01 · 2025",
      "card1.desc": "Landing premium e clube de assinatura. Design e front-end de ponta a ponta.",
      "card2.meta": "Case 02 · 2026",
      "card2.title": "Console Administrativo",
      "card2.desc": "Dashboard de engajamento B2C e B2B para simulação médica em VR.",
      "card3.thumb": "Pesquisa<br/>com usuários",
      "card3.meta": "Case 03 · 2026",
      "card3.title": "Médicos residentes",
      "card3.desc": "Pesquisa qualitativa: entrevistas, personas e cenários de problema.",
      "tree.eyebrow": 'Habilidades',
      "tree.title": 'O que eu levo na <span class="em-ink">mochila</span>',
      "tree.root": 'PRODUCT DESIGN · NÍVEL 6',
      "tree.b1": 'Pesquisa &amp; dados',
      "tree.b1n1": '<b>Entrevistas e testes de usabilidade</b>Roteiro, condução e síntese',
      "tree.b1n2": '<b>Auditoria heurística</b>Nielsen, acessibilidade e consistência',
      "tree.b1n3": '<b>Personas e jornadas</b>Construídas a partir de campo',
      "tree.b1n4": '<b>Quantitativa e qualitativa</b>Teste A/B, funil e métricas',
      "tree.b2": 'Interface',
      "tree.b2n1": '<b>Design systems</b>Componentes, tokens e documentação',
      "tree.b2n2": '<b>Prototipagem</b>Baixa e alta fidelidade',
      "tree.b2n3": '<b>Responsivo</b>Desktop, tablet e mobile',
      "tree.b2n4": '<b>Acessibilidade</b>WCAG e design inclusivo',
      "tree.b3": 'Entrega',
      "tree.b3n1": '<b>Figma e FigJam</b>Miro para colaboração',
      "tree.b3n2": '<b>Front-end</b>HTML, CSS e JavaScript, do zero ao ar com apoio de IA',
      "tree.b3n3": '<b>Agile / Scrum</b>Rituais e trabalho junto do time',
      "tree.b3n4": '<b>Motion e 3D</b>Animação de interface e modelagem',
      "contact.quest": '✦ QUADRO DE MISSÕES ✦',
      "contact.rot": 'MANDA JOBS||ENTRE EM CONTATO||CHAMA PRA VAGAS||VAMOS CONVERSAR||BORA CRIAR JUNTO||ABERTO A FREELAS',
      "form.name": "Seu nome",
      "form.name.ph": "Insira seu nome",
      "form.last": "Sobrenome",
      "form.last.ph": "Seu sobrenome",
      "form.email": "E-mail",
      "form.email.ph": "voce@email.com",
      "form.msg": "Mensagem",
      "form.msg.ph": "Conta sua ideia…",
      "form.send": 'Enviar mensagem',
      "form.sending": 'Enviando…',
      "form.fill": "Preencha nome, e-mail e mensagem para enviar.",
      "form.ok": "Mensagem enviada! Em breve retorno o contato. ✦",
      "form.err": "Não foi possível enviar agora. Escreva direto para emersonsiqueira@live.com.",
      "copy.tip": "Copiar",
      "copy.done": "Copiado!",
      "copy.fail": "Abrindo seu e-mail…",
      "contact.note": 'A mensagem cai direto no meu e-mail — <strong>emersonsiqueira@live.com</strong> — e eu respondo por lá. Se preferir, me chama no <a href="https://www.linkedin.com/in/emesiqueira" target="_blank" rel="noopener">LinkedIn</a> ou no <a href="https://www.behance.net/emesiqueira" target="_blank" rel="noopener">Behance</a>.',
      "foot.role": "UX/UI Designer · Product Designer",
      "foot.copy": "© 2026 Emerson Siqueira · UX/UI &amp; Product Designer"
    },
    en: {
      "nav.about": "About",
      "nav.projects": "Projects",
      "nav.cv": "Resume",
      "nav.contact": "Contact",
      "nav.skills": "Skills",
      "nav.cta": 'Let\'s talk',
      "hero.eyebrow": "UX/UI · Product Designer",
      "hero.avail": "Belo Horizonte &amp; Rio · Remote &amp; international",
      "hero.title": 'I design experiences that <span class="em-ink">make sense</span> and actually work',
      "hero.lead": "Product Designer with 6 years across education, health and fintech. From research to delivery: method, prototypes and real metrics, with a healthy dose of cinema, games and storytelling along the way.",
      "hero.leadShort": "Product Designer for 6 years, with a postgrad in HCI &amp; UX at PUC-Rio. From research to delivery: method, prototyping and real metrics.",
      "hero.d1": "Education",
      "hero.d2": "Health",
      "hero.d3": "Fintech",
      "hero.cta1": 'View projects',
      "hero.cta2": "View resume",
      "about.cv": 'View full resume',
      "marquee.illu": "Illustration",
      "about.eyebrow": "About me",
      "about.title": "Hi, I'm Emerson, a UX/UI and Product Designer based in Belo Horizonte, Brazil.",
      "stat.years": "Years of experience",
      "stat.hours": "Hours of study",
      "stat.projects": "Completed projects",
      "stat.clients": "Clients served",
      "about.p1": 'My path began in <strong>graphic design</strong>, exploring visual language, composition and storytelling. Helping friends and small businesses, the hobby became a craft.',
      "about.p2": 'Since 2020 I have specialized in <strong>UX/UI and Product Design</strong>, across education products, public institutions, universities and digital verticals. I believe clarity is the highest form of care for the people who use what we build.',
      "about.p3": 'Off-screen, I am driven by <strong>cinema, games and fantasy</strong>, and that leaks into my work: I like interfaces with personality, rhythm and a touch of enchantment.',
      "proj.eyebrow": "Projects",
      "proj.title": 'Three cases, from problem to <span class="em-ink">delivery</span>',
      "card1.meta": "Case 01 · 2025",
      "card1.desc": "Premium landing page and subscription club. End-to-end design and front-end.",
      "card2.meta": "Case 02 · 2026",
      "card2.title": "Admin Console",
      "card2.desc": "B2C and B2B engagement dashboard for medical simulation in VR.",
      "card3.thumb": "User<br/>research",
      "card3.meta": "Case 03 · 2026",
      "card3.title": "Medical residents",
      "card3.desc": "Qualitative research: interviews, personas and problem scenarios.",
      "tree.eyebrow": 'Skills',
      "tree.title": 'What I carry in my <span class="em-ink">backpack</span>',
      "tree.root": 'PRODUCT DESIGN · LEVEL 6',
      "tree.b1": 'Research &amp; data',
      "tree.b1n1": '<b>Interviews and usability testing</b>Script, moderation and synthesis',
      "tree.b1n2": '<b>Heuristic audits</b>Nielsen, accessibility and consistency',
      "tree.b1n3": '<b>Personas and journeys</b>Grounded in field work',
      "tree.b1n4": '<b>Quantitative and qualitative</b>A/B testing, funnels and metrics',
      "tree.b2": 'Interface',
      "tree.b2n1": '<b>Design systems</b>Components, tokens and docs',
      "tree.b2n2": '<b>Prototyping</b>Low and high fidelity',
      "tree.b2n3": '<b>Responsive</b>Desktop, tablet and mobile',
      "tree.b2n4": '<b>Accessibility</b>WCAG and inclusive design',
      "tree.b3": 'Delivery',
      "tree.b3n1": '<b>Figma and FigJam</b>Miro for collaboration',
      "tree.b3n2": '<b>Front-end</b>HTML, CSS and JavaScript, end-to-end with AI',
      "tree.b3n3": '<b>Agile / Scrum</b>Rituals and daily work with the team',
      "tree.b3n4": '<b>Motion and 3D</b>Interface animation and modeling',
      "contact.quest": '✦ QUEST BOARD ✦',
      "contact.rot": 'HIT ME UP||GET IN TOUCH||HIRE ME||LET US TALK||LET US BUILD IT||OPEN TO FREELANCE',
      "form.name": "First name",
      "form.name.ph": "Enter your name",
      "form.last": "Last name",
      "form.last.ph": "Your last name",
      "form.email": "Email",
      "form.email.ph": "you@email.com",
      "form.msg": "Message",
      "form.msg.ph": "Tell me your idea…",
      "form.send": 'Send message',
      "form.sending": 'Sending…',
      "form.fill": "Please fill in name, email and message to send.",
      "form.ok": "Message sent! I'll get back to you soon. ✦",
      "form.err": "Couldn't send right now. Write me directly at emersonsiqueira@live.com.",
      "copy.tip": "Copy",
      "copy.done": "Copied!",
      "copy.fail": "Opening your mail app…",
      "contact.note": 'Your message lands straight in my inbox — <strong>emersonsiqueira@live.com</strong> — and I reply from there. If you prefer, reach me on <a href="https://www.linkedin.com/in/emesiqueira" target="_blank" rel="noopener">LinkedIn</a> or <a href="https://www.behance.net/emesiqueira" target="_blank" rel="noopener">Behance</a>.',
      "foot.role": "UX/UI Designer · Product Designer",
      "foot.copy": "© 2026 Emerson Siqueira · UX/UI &amp; Product Designer"
    },
    es: {
      "nav.about": "Sobre mí",
      "nav.projects": "Proyectos",
      "nav.cv": "Currículum",
      "nav.contact": "Contáctame",
      "nav.skills": "Habilidades",
      "nav.cta": 'Hablemos',
      "hero.eyebrow": "UX/UI · Product Designer",
      "hero.avail": "Belo Horizonte y Río · Remoto e internacional",
      "hero.title": 'Diseño experiencias que <span class="em-ink">tienen sentido</span> y funcionan de verdad',
      "hero.lead": "Product Designer con 6 años en educación, salud y fintech. De la investigación a la entrega: método, prototipos y métricas reales, con una buena dosis de cine, videojuegos y narrativa en el camino.",
      "hero.leadShort": "Product Designer hace 6 años, con posgrado en IHC y UX en la PUC-Rio. De la investigación a la entrega: método, prototipo y métricas reales.",
      "hero.d1": "Educación",
      "hero.d2": "Salud",
      "hero.d3": "Fintech",
      "hero.cta1": 'Ver proyectos',
      "hero.cta2": "Ver currículum",
      "about.cv": 'Ver currículum',
      "marquee.illu": "Ilustración",
      "about.eyebrow": "Sobre mí",
      "about.title": "Hola, soy Emerson, diseñador UX/UI y Product Designer en Belo Horizonte, Brasil.",
      "stat.years": "Años de experiencia",
      "stat.hours": "Horas de estudio",
      "stat.projects": "Proyectos finalizados",
      "stat.clients": "Clientes atendidos",
      "about.p1": 'Mi trayectoria comenzó en el <strong>diseño gráfico</strong>, explorando lenguaje visual, composición y narrativa. Ayudando a amigos y pequeños negocios, el pasatiempo se convirtió en oficio.',
      "about.p2": 'Desde 2020 me especializo en <strong>UX/UI y Product Design</strong>, en productos de educación, instituciones públicas, universidades y verticales digitales. Creo que la claridad es la forma más alta de cuidar a quien usa lo que construimos.',
      "about.p3": 'Fuera de la pantalla, me mueven el <strong>cine, los videojuegos y la fantasía</strong>, y eso se filtra en mi trabajo: me gustan las interfaces con personalidad, ritmo y un toque de encanto.',
      "proj.eyebrow": "Proyectos",
      "proj.title": 'Tres casos, del problema a la <span class="em-ink">entrega</span>',
      "card1.meta": "Caso 01 · 2025",
      "card1.desc": "Landing premium y club de suscripción. Diseño y front-end de punta a punta.",
      "card2.meta": "Caso 02 · 2026",
      "card2.title": "Consola Administrativa",
      "card2.desc": "Dashboard de engagement B2C y B2B para simulación médica en RV.",
      "card3.thumb": "Investigación<br/>con usuarios",
      "card3.meta": "Caso 03 · 2026",
      "card3.title": "Médicos residentes",
      "card3.desc": "Investigación cualitativa: entrevistas, personas y escenarios de problema.",
      "tree.eyebrow": 'Habilidades',
      "tree.title": 'Lo que llevo en la <span class="em-ink">mochila</span>',
      "tree.root": 'PRODUCT DESIGN · NIVEL 6',
      "tree.b1": 'Investigación &amp; datos',
      "tree.b1n1": '<b>Entrevistas y pruebas de usabilidad</b>Guion, moderación y síntesis',
      "tree.b1n2": '<b>Auditoría heurística</b>Nielsen, accesibilidad y consistencia',
      "tree.b1n3": '<b>Personas y journeys</b>Construidos desde el campo',
      "tree.b1n4": '<b>Cuantitativa y cualitativa</b>Test A/B, embudo y métricas',
      "tree.b2": 'Interfaz',
      "tree.b2n1": '<b>Design systems</b>Componentes, tokens y documentación',
      "tree.b2n2": '<b>Prototipado</b>Baja y alta fidelidad',
      "tree.b2n3": '<b>Responsive</b>Desktop, tablet y mobile',
      "tree.b2n4": '<b>Accesibilidad</b>WCAG y diseño inclusivo',
      "tree.b3": 'Entrega',
      "tree.b3n1": '<b>Figma y FigJam</b>Miro para colaborar',
      "tree.b3n2": '<b>Front-end</b>HTML, CSS y JavaScript, de punta a punta con IA',
      "tree.b3n3": '<b>Agile / Scrum</b>Rituales y trabajo junto al equipo',
      "tree.b3n4": '<b>Motion y 3D</b>Animación de interfaz y modelado',
      "contact.quest": '✦ TABLÓN DE MISIONES ✦',
      "contact.rot": 'HABLEMOS||ESCRÍBEME||LLÁMAME PARA VACANTES||CHARLEMOS UN RATO||CREEMOS ALGO JUNTOS||ABIERTO A FREELANCE',
      "form.name": "Nombre",
      "form.name.ph": "Escribe tu nombre",
      "form.last": "Apellido",
      "form.last.ph": "Tu apellido",
      "form.email": "Correo",
      "form.email.ph": "tu@correo.com",
      "form.msg": "Mensaje",
      "form.msg.ph": "Cuéntame tu idea…",
      "form.send": 'Enviar mensaje',
      "form.sending": 'Enviando…',
      "form.fill": "Completa nombre, correo y mensaje para enviar.",
      "form.ok": "¡Mensaje enviado! Te respondo pronto. ✦",
      "form.err": "No se pudo enviar ahora. Escríbeme directo a emersonsiqueira@live.com.",
      "copy.tip": "Copiar",
      "copy.done": "¡Copiado!",
      "copy.fail": "Abriendo tu correo…",
      "contact.note": 'El mensaje llega directo a mi correo — <strong>emersonsiqueira@live.com</strong> — y respondo desde ahí. Si prefieres, escríbeme por <a href="https://www.linkedin.com/in/emesiqueira" target="_blank" rel="noopener">LinkedIn</a> o <a href="https://www.behance.net/emesiqueira" target="_blank" rel="noopener">Behance</a>.',
      "foot.role": "Diseñador UX/UI · Product Designer",
      "foot.copy": "© 2026 Emerson Siqueira · UX/UI &amp; Product Designer"
    }
  };

  const HTML_LANG = { pt: "pt-BR", en: "en", es: "es" };
  const KEY = "emerson-lang";
  const SUPPORTED = ["pt", "en", "es"];
  let CURRENT = "pt";

  function getInitial() {
    const saved = localStorage.getItem(KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    return "pt";
  }

  function apply(lang) {
    const d = DICT[lang] || DICT.pt;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (d[k] != null) el.innerHTML = d[k];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const k = el.getAttribute("data-i18n-ph");
      if (d[k] != null) el.setAttribute("placeholder", d[k]);
    });
    document.documentElement.lang = HTML_LANG[lang] || "pt-BR";
    const cur = document.getElementById("langCur");
    if (cur) cur.textContent = lang.toUpperCase();
    document.querySelectorAll("#langMenu [data-lang]").forEach((b) => {
      b.setAttribute("aria-current", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    CURRENT = lang;
    document.dispatchEvent(new CustomEvent("i18n:change", { detail: { lang: lang } }));
  }

  function setLang(lang) {
    localStorage.setItem(KEY, lang);
    apply(lang);
  }

  function init() {
    apply(getInitial());

    const sw = document.getElementById("langSwitch");
    const btn = document.getElementById("langBtn");
    const menu = document.getElementById("langMenu");
    if (!sw || !btn) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = sw.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("[data-lang]").forEach((b) => {
      b.addEventListener("click", () => {
        setLang(b.getAttribute("data-lang"));
        sw.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", (e) => {
      if (!sw.contains(e.target)) {
        sw.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { sw.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.I18N = {
    t: function (key) {
      const d = DICT[CURRENT] || DICT.pt;
      return d[key] != null ? d[key] : key;
    },
    lang: function () { return CURRENT; }
  };
})();
