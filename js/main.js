// ============================================
// LOADER
// ============================================
const loader = document.getElementById('loader');
const letters = document.querySelectorAll('.loader-letter');

// Anime les lettres
setTimeout(() => letters[0].classList.add('show'), 100);
setTimeout(() => letters[1].classList.add('show'), 280);

// Cache le loader après 2.2s
setTimeout(() => {
  loader.classList.add('hide');
  setTimeout(() => { loader.style.display = 'none'; }, 800);
}, 2200);

// ============================================
// HERO — ANIMATION LETTRE PAR LETTRE
// ============================================
function animateHeroLetters() {
  const el = document.getElementById('heroLetters');
  if (!el) return;
  const text = el.textContent;
  el.textContent = '';
  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.classList.add('letter');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = (2.15 + i * 0.045) + 's';
    el.appendChild(span);
  });
}
animateHeroLetters();

// ============================================
// CURSOR
// ============================================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower && window.innerWidth > 768) {
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  (function track() {
    fx += (mx - fx) * 0.1;
    fy += (my - fy) * 0.1;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(track);
  })();

  document.querySelectorAll('a, button, .xp-item, .work-item, .stack-category').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '14px';
      cursor.style.height = '14px';
      follower.style.width = '48px';
      follower.style.height = '48px';
      follower.style.borderColor = 'rgba(86,137,199,0.55)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '8px';
      cursor.style.height = '8px';
      follower.style.width = '32px';
      follower.style.height = '32px';
      follower.style.borderColor = 'rgba(86,137,199,0.4)';
    });
  });
}

// ============================================
// NAVBAR
// ============================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ============================================
// SCROLL REVEAL
// ============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll(
  '.section-label, .section-title, .about-text p, .about-photo-wrap, ' +
  '.about-interests-visual, .stack-category, .work-item, ' +
  '.xp-item, .contact-sub, .contact-form, .contact-link-item'
).forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = (i % 6) * 60 + 'ms';
  observer.observe(el);
});

// ============================================
// XP TOGGLE
// ============================================
function toggleXp(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.xp-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ============================================
// THEME
// ============================================
const themeBtn = document.getElementById('themeToggle');
const body = document.body;
const sys = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(t) {
  body.classList.toggle('light', t === 'light');
  themeBtn.textContent = t === 'light' ? '●' : '○';
}

const saved = localStorage.getItem('theme');
setTheme(saved || (sys.matches ? 'dark' : 'light'));

sys.addEventListener('change', e => {
  if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
});

themeBtn.addEventListener('click', () => {
  const t = body.classList.contains('light') ? 'dark' : 'light';
  setTheme(t);
  localStorage.setItem('theme', t);
});

// ============================================
// TRADUCTION
// ============================================
const langBtn = document.getElementById('langToggle');
let lang = 'fr';

const translations = {
  fr: {
    heroTag: 'Data Analyst · Gestion · RH',
    heroClaim: 'Je donne du sens aux données pour que les organisations décident mieux.',
    heroMeta: 'BUT GEA GEMA',
    heroCta: 'Explorer ↓',
    heroAvailable: 'Disponible · Master 2026',
    aboutLabel: 'À propos',
    aboutT1: 'Analytique', aboutT2: 'par nature.',
    aboutP1: "Je m'appelle Sylian, j'ai 20 ans et je suis Data Analyst RH en alternance chez BNP Paribas IT Group. Mon profil est né d'une conviction simple : la gestion sans la donnée reste intuitive, la donnée sans compréhension des organisations peine à produire des décisions pertinentes.",
    aboutP2: "Trois ans de BUT GEA m'ont donné la culture des organisations en management, stratégie et entrepreneuriat. Mes expériences chez BNP Paribas m'ont confronté à la réalité de la data en grande entreprise : pipelines ETL, dashboards décisionnels, RGPD, structuration d'indicateurs RH.",
    aboutP3: "Mon objectif : devenir Data Analyst dans un environnement exigeant, avec une ambition à long terme d'exercer à l'international.",
    i1: 'Football', i1sub: 'Stats xG · FC 93 · 6 ans en club',
    i2: 'Jeux vidéo', i2sub: 'Simulation sportive · Jeux narratifs · 10 ans',
    i3: 'International', i3sub: "Ambition d'exercer en Asie du Sud-Est",
    stackLabel: 'Stack & outils',
    stackT1: 'Ce que', stackT2: 'je maîtrise.',
    stackCat2: 'Analyse & traitement', stackCat3: 'Bureautique',
    stackCat4: 'Montage & créatif', stackCat5: 'En apprentissage', stackCat6: 'Langues',
    workLabel: 'Projets',
    workT1: 'Ce que', workT2: "j'ai construit.",
    wt1: 'Projet personnel',
    wt2: 'Projet universitaire', wt3: 'Projet universitaire',
    wt4: 'Projet universitaire', wt5: 'Projet universitaire',
    wd1: 'Dashboard data analytics sur 14 saisons du PSG. Base SQLite, scripts Python, 10 requêtes SQL analytiques, interface web interactive déployée sur Vercel.',
    wd2: "Étude de faisabilité d'une épicerie solidaire étudiante. Enquête terrain, benchmarking national, entretiens experts, modélisation de scénarios.",
    wd3: "Co-fondation d'une solution d'accompagnement à l'insertion professionnelle. Étude de marché, business plan 3 ans, pitch investisseur.",
    wd4: 'Mission de conseil junior : audit de maturité numérique via le modèle DIMM. 4 entretiens experts, diagnostic comparatif, préconisations stratégiques.',
    wd5: 'Mission de conseil en performance financière. États financiers, bilan, analyse des SIG, recommandations sur la politique commerciale.',
    xpLabel: 'Expériences',
    xpT1: 'Ce que', xpT2: "j'ai vécu.",
    bAlt: 'Alternance', bStage: 'Stage', bJob: 'Job étudiant',
    xb1: "J'assure l'interface entre les équipes data et formation pour la gestion et la valorisation des données RH du groupe. Je participe au pilotage du projet ReCode, consistant à analyser les données démographiques et les compétences des développeurs à travers le monde afin d'éclairer la stratégie de formation face à l'essor de l'IA. Je participe également à la mise à jour mensuelle d'un pipeline ETL sous Alteryx, restitué sous Tableau Desktop dans le respect des exigences RGPD, qui alimente le tableau de bord global des KPI formation.",
    xb2: "Gestion opérationnelle d'un centre sportif municipal : accueil, surveillance des installations, suivi des fréquentations et gestion des plannings.",
    xb3: "Conception en autodidacte de tableaux de bord interactifs sous Power BI pour le pilotage de deux parcours de formation, générant un gain de productivité de 30% sur le reporting RH. Développement d'une moulinette Excel entièrement automatisée, avec menu interactif et mode d'emploi intégré. Ce stage a conduit la direction à me proposer de poursuivre en alternance.",
    xb4: "Mise en rayon, gestion des stocks et conseil client dans un hypermarché à fort volume. Exercé en parallèle de ma deuxième année de BUT.",
    xb5: "Première mission au sein d'un centre sportif municipal de la Ville de Paris.",
    xb6: "Fiabilisation de la base de données du SIRH \"FNA\" (Fiche Nouvel Arrivant) : identification et correction d'une centaine d'incohérences. Participation à l'ensemble des fonctions RH : paie, formation, santé et qualité de vie au travail.",
    xb7: "Service en salle dans un restaurant : accueil des clients, prise de commandes, service et gestion des stocks. Première expérience professionnelle.",
    contactLabel: 'Contact',
    contactT1: 'Travaillons', contactT2: 'ensemble.',
    contactSub: 'Disponible pour échanger sur une opportunité, un projet data ou simplement pour se connecter.',
    formName: 'Nom', formSubject: 'Sujet', formMessage: 'Message', formSend: 'Envoyer ↗',
    footerCopy: '© 2026 Sylian Aoudia · Data Analyst',
    footerBuilt: 'Conçu & développé par Sylian Aoudia',
  },
  en: {
    heroTag: 'Data Analyst · Management · HR',
    heroClaim: 'I turn data into decisions that move organizations forward.',
    heroMeta: 'Bachelor in Business Administration',
    heroCta: 'Explore ↓',
    heroAvailable: 'Available · Master 2026',
    aboutLabel: 'About',
    aboutT1: 'Analytical', aboutT2: 'by nature.',
    aboutP1: "My name is Sylian, I'm 20 and I work as an HR Data Analyst apprentice at BNP Paribas IT Group. My profile was born from a simple conviction: management without data stays intuitive, data without understanding of organizations struggles to produce relevant decisions.",
    aboutP2: "Three years of a Business Administration degree gave me a culture of organizations in management, strategy and entrepreneurship. My experiences at BNP Paribas confronted me with data reality in a large corporation: ETL pipelines, decision dashboards, GDPR compliance, HR indicator structuring.",
    aboutP3: "My goal: become a Data Analyst in a demanding environment, with a long-term ambition to work internationally.",
    i1: 'Football', i1sub: 'xG Stats · FC 93 · 6 years in club',
    i2: 'Video games', i2sub: 'Sports simulation · Narrative games · 10 years',
    i3: 'International', i3sub: 'Ambition to work in Southeast Asia',
    stackLabel: 'Stack & tools',
    stackT1: 'What', stackT2: 'I master.',
    stackCat2: 'Analysis & processing', stackCat3: 'Office tools',
    stackCat4: 'Design & creative', stackCat5: 'Learning', stackCat6: 'Languages',
    workLabel: 'Projects',
    workT1: 'What', workT2: "I've built.",
    wt1: 'Personal project',
    wt2: 'University project', wt3: 'University project',
    wt4: 'University project', wt5: 'University project',
    wd1: 'Data analytics dashboard on 14 PSG seasons. SQLite database, Python scripts, 10 SQL queries, interactive interface deployed on Vercel.',
    wd2: 'Feasibility study for a student food bank. Field survey, benchmarking, expert interviews, scenario modelling.',
    wd3: 'Co-founded a professional insertion support solution. Market research, 3-year business plan, investor pitch.',
    wd4: 'Junior consulting mission: digital maturity audit via the DIMM model. 4 expert interviews, comparative diagnosis, strategic recommendations.',
    wd5: 'Financial performance consulting. Financial statements, balance sheet, SIG analysis, commercial policy recommendations.',
    xpLabel: 'Experience',
    xpT1: 'What', xpT2: "I've lived.",
    bAlt: 'Apprenticeship', bStage: 'Internship', bJob: 'Student job',
    xb1: "I serve as the interface between data and training teams for managing HR data. I participate in steering the ReCode project, analyzing demographic data and developer skills worldwide. I also contribute to the monthly ETL pipeline update under Alteryx, output to Tableau Desktop in GDPR compliance, feeding the global training KPI dashboard.",
    xb2: "Operational management of a municipal sports center: user reception, facility supervision, attendance tracking.",
    xb3: "Self-taught Power BI dashboards generating a 30% productivity gain on HR reporting. Fully automated Excel tool with interactive menu and user guide. Led to an apprenticeship offer.",
    xb4: "Shelf stocking, inventory management and customer service. Worked alongside my second year of university.",
    xb5: "First mission at a municipal sports center in Paris.",
    xb6: 'HRIS "FNA" database reliability improvement: identifying and correcting around a hundred inconsistencies. Participation in all HR functions.',
    xb7: "Restaurant floor service. First professional experience.",
    contactLabel: 'Contact',
    contactT1: "Let's work", contactT2: 'together.',
    contactSub: 'Available to discuss an opportunity, a data project or simply to connect.',
    formName: 'Name', formSubject: 'Subject', formMessage: 'Message', formSend: 'Send ↗',
    footerCopy: '© 2026 Sylian Aoudia · Data Analyst',
    footerBuilt: 'Designed & developed by Sylian Aoudia',
  }
};

function applyLang(l) {
  document.querySelectorAll('[data-translate]').forEach(el => {
    const k = el.getAttribute('data-translate');
    if (translations[l][k] !== undefined) el.textContent = translations[l][k];
  });
}

langBtn.addEventListener('click', () => {
  lang = lang === 'fr' ? 'en' : 'fr';
  langBtn.textContent = lang === 'fr' ? 'EN' : 'FR';
  applyLang(lang);
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});