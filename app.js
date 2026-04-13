/* ===== YAADNEWS APP.JS ===== */

// ===== DATA STORE =====
const Store = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem('yn_' + key); return v ? JSON.parse(v) : fallback; }
    catch(e) { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem('yn_' + key, JSON.stringify(val)); } catch(e) {}
  }
};

// ===== SEED SAMPLE ARTICLES =====
function seedArticles() {
  if (Store.get('articles')) return;
  const now = Date.now();
  const h = (m) => now - m * 60000;
  const articles = [
    {
      id: 'art_1', title: 'PM Holness Announces Major Infrastructure Push for Kingston Metro Corridor',
      excerpt: 'Prime Minister Andrew Holness outlined an ambitious $47 billion infrastructure plan to modernise Kingston\'s transport network and create thousands of jobs.',
      body: '<h2>A New Vision for Kingston</h2><p>Prime Minister Andrew Holness today unveiled a transformative infrastructure agenda that promises to reshape the Kingston Metropolitan Area over the next five years. The $47 billion package, funded through a combination of government bonds and IDB lending, will target road widening, bus rapid transit lanes, and pedestrian infrastructure.</p><p>"This is not just about roads," Holness said during a press conference at Jamaica House. "This is about the future of our capital, the dignity of our commuters, and the productivity of our workforce."</p><h2>Key Projects</h2><p>Among the flagship projects is a dedicated BRT corridor running from Half Way Tree to New Kingston, a complete rehabilitation of Marcus Garvey Drive, and expanded park-and-ride facilities in Portmore and Spanish Town.</p><blockquote>We are building a Kingston that works for every Jamaican, not just those who can afford a car.</blockquote><p>Opposition spokesman Mikael Phillips acknowledged the scope of the plan but called for independent cost verification before public funds are committed.</p>',
      category: 'politics', author: 'Devon Brown', tags: ['politics','infrastructure','Kingston','PM Holness'],
      mediaType: 'image', mediaSrc: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
      extLink: '', breaking: true, featured: true, published: true,
      timestamp: h(45), views: 4823
    },
    {
      id: 'art_2', title: 'Reggae Boyz Secure Stunning 2-1 Victory Over USA in World Cup Qualifier',
      excerpt: 'Jamaica\'s national football team produced a historic upset, defeating the United States 2-1 at National Stadium to boost World Cup qualifying hopes.',
      body: '<h2>Historic Night at National Stadium</h2><p>In front of a capacity 35,000 crowd, the Reggae Boyz delivered one of their finest performances in recent memory, defeating a star-studded USMNT side 2-1 in a pulsating CONCACAF qualifier on Friday night.</p><p>Shamar Nicholson opened the scoring in the 22nd minute with a clinical finish before USA equalised through Christian Pulisic shortly before half-time. The winner came from substitute Ravel Morrison in the 78th minute, sending the packed stadium into euphoria.</p><blockquote>"The boys showed heart and belief. This is what Jamaica is about," said head coach Heimir Hallgrimsson.</blockquote><p>The result pushes Jamaica to fourth in the Octagonal standings, level on points with Panama, with six qualifiers remaining before the 2026 FIFA World Cup.</p>',
      category: 'sports', author: 'Claudette Morris', tags: ['sports','football','Reggae Boyz','World Cup'],
      mediaType: 'image', mediaSrc: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
      extLink: '', breaking: true, featured: false, published: true,
      timestamp: h(90), views: 12441
    },
    {
      id: 'art_3', title: 'Vybz Kartel Freed: Massive Celebrations Erupt Across Jamaica',
      excerpt: 'Following his appeal verdict, dancehall king Vybz Kartel walked free from prison, triggering spontaneous celebrations in Kingston, Spanish Town and across the diaspora.',
      body: '<h2>Freedom at Last</h2><p>Thousands of fans lined the streets of Kingston on Thursday as dancehall superstar Vybz Kartel — born Adidja Azim Palmer — was released after the Privy Council overturned his 2014 murder conviction.</p><p>Scenes of jubilation were reported from Portmore to Half Way Tree, with music blasting from vehicles and impromptu street parties forming within minutes of the ruling being announced.</p><p>Kartel, 48, posted a brief voice note to his official Instagram: "Big up the whole a Jamaica. Gaza fi real. We did always know truth would conquer."</p><h2>Industry Reaction</h2><p>Fellow artistes including Popcaan, Alkaline and Sean Paul took to social media to celebrate. Music industry insiders say Kartel is expected to return to the studio within weeks.</p>',
      category: 'entertainment', author: 'Tamara Reid', tags: ['entertainment','Vybz Kartel','dancehall','music'],
      mediaType: 'image', mediaSrc: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
      extLink: '', breaking: false, featured: true, published: true,
      timestamp: h(180), views: 38201
    },
    {
      id: 'art_4', title: 'Bank of Jamaica Holds Rate Steady at 7% Amid Inflation Concerns',
      excerpt: 'The BOJ Monetary Policy Committee voted unanimously to maintain the policy rate, citing easing core inflation and a stable Jamaican dollar.',
      body: '<h2>Rate Held Steady</h2><p>The Bank of Jamaica on Wednesday held its benchmark interest rate at 7 per cent, a decision welcomed by the private sector but scrutinised by consumer advocates amid persistent food price pressures.</p><p>BOJ Governor Richard Byles said the decision reflects confidence that inflation is on a sustainable downward path, currently at 5.2 per cent year-on-year, approaching the bank\'s 4–6 per cent target band.</p><blockquote>"The Jamaican dollar has shown commendable stability, and we see no need to tighten at this juncture," Byles told reporters.</blockquote><p>The Jamaica Chamber of Commerce praised the decision, stating that rate stability is essential for business planning and investment confidence heading into the second half of the year.</p>',
      category: 'business', author: 'Marcus Levy', tags: ['business','BOJ','economy','interest rates'],
      mediaType: 'image', mediaSrc: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      extLink: '', breaking: false, featured: false, published: true,
      timestamp: h(320), views: 2190
    },
    {
      id: 'art_5', title: 'Hurricane Beryl: Jamaica Under Tropical Storm Watch as System Intensifies',
      excerpt: 'The Caribbean Meteorological Organisation has issued a tropical storm watch for Jamaica as Beryl strengthens over the eastern Caribbean.',
      body: '<h2>System Approaches</h2><p>The Caribbean Meteorological Organisation issued a Tropical Storm Watch for Jamaica on Monday as Hurricane Beryl continued its westward track across the eastern Caribbean, bringing dangerous winds and storm surge to several island nations.</p><p>The Jamaica Meteorological Service says the system could reach Jamaica waters as early as Wednesday, with sustained winds of up to 85 km/h and heavy rainfall expected across all parishes.</p><p>The Office of Disaster Preparedness and Emergency Management (ODPEM) is urging residents to begin preparations now, including securing loose outdoor objects, stocking emergency supplies, and identifying nearby shelters.</p><blockquote>Do not wait. Prepare now. Your safety is not worth the risk of delay.</blockquote>',
      category: 'world', author: 'YaadNews Staff', tags: ['weather','hurricane','Beryl','ODPEM'],
      mediaType: 'image', mediaSrc: 'https://images.unsplash.com/photo-1504608524841-42f4c72c9ecc?w=800&q=80',
      extLink: '', breaking: true, featured: false, published: true,
      timestamp: h(60), views: 9870
    },
    {
      id: 'art_6', title: 'New Technology Hub Launches in New Kingston to Drive Startup Ecosystem',
      excerpt: 'DigiJamaica and JAMPRO unveiled a 22,000 sq ft innovation hub at The Towers, offering co-working, funding access, and mentorship for local tech entrepreneurs.',
      body: '<h2>Silicon Lanes is Open</h2><p>Jamaica\'s technology ecosystem received a major boost on Friday with the official launch of Silicon Lanes — a 22,000 square foot innovation hub in the heart of New Kingston designed to accelerate the growth of local startups and attract foreign tech investment.</p><p>The hub, a joint initiative between DigiJamaica and JAMPRO, offers hot-desking and dedicated office suites, high-speed fibre connectivity, seed funding access through a $200 million venture pool, and a robust mentorship network of over 60 industry veterans.</p><p>"We want Jamaica to be the fintech and creative-tech capital of the Caribbean," said JAMPRO President Shullette Cox at the ribbon-cutting ceremony.</p>',
      category: 'technology', author: 'Kezia Thompson', tags: ['technology','startups','JAMPRO','DigiJamaica'],
      mediaType: 'image', mediaSrc: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      extLink: '', breaking: false, featured: false, published: true,
      timestamp: h(500), views: 1644
    },
    {
      id: 'art_7', title: 'Ministry of Health Launches Island-Wide NCD Screening Campaign',
      excerpt: 'The Ministry of Health and Wellness kicked off a nationwide free screening initiative targeting diabetes, hypertension and cancer detection.',
      body: '<h2>Free Screenings Across Jamaica</h2><p>The Ministry of Health and Wellness on Saturday launched its most comprehensive non-communicable disease (NCD) screening campaign to date, offering free tests for diabetes, hypertension, and select cancers at over 140 locations islandwide over the next six weeks.</p><p>Minister Dr. Christopher Tufton said NCDs account for nearly 60 per cent of all deaths in Jamaica annually and called for Jamaicans to take advantage of the free service.</p><blockquote>"Prevention is always better than cure. We are bringing the clinic to the community."</blockquote><p>Screenings will be available Monday to Saturday, 8am to 4pm, at all Type 3 and Type 4 health centres. Residents are asked to bring a valid ID.</p>',
      category: 'health', author: 'Dr. Andrea Ellis', tags: ['health','NCD','Ministry of Health','diabetes'],
      mediaType: 'image', mediaSrc: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      extLink: '', breaking: false, featured: false, published: true,
      timestamp: h(700), views: 987
    },
    {
      id: 'art_8', title: 'CARIFTA Games: Jamaica Sweeps Sprint Events on Final Day in Grenada',
      excerpt: 'Jamaican athletes dominated the track on the final day of the 2024 CARIFTA Games, claiming gold in all four sprint finals.',
      body: '<h2>Golden Day for Jamaica</h2><p>Jamaica\'s young athletes capped a dominant CARIFTA Games campaign in Grenada by sweeping all four sprint finals on Sunday, reaffirming the island\'s status as the world\'s premier sprint-developing nation.</p><p>Sixteen-year-old Tyrese Thomas won the Under-17 Boys 100m in 10.48 seconds, while Aaliyah Clarke took gold in the Girls Under-20 200m with a new Games record of 23.12 seconds.</p><p>Jamaica finished the four-day championships with 28 gold, 19 silver and 14 bronze medals — comfortably top of the medal standings ahead of Trinidad & Tobago and The Bahamas.</p>',
      category: 'sports', author: 'Claudette Morris', tags: ['sports','athletics','CARIFTA','sprinting'],
      mediaType: 'image', mediaSrc: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80',
      extLink: '', breaking: false, featured: false, published: true,
      timestamp: h(800), views: 3401
    }
  ];
  Store.set('articles', articles);
}

function seedTicker() {
  if (Store.get('ticker')) return;
  Store.set('ticker', [
    'Hurricane Beryl: Tropical Storm Watch issued for Jamaica — all residents urged to prepare',
    'Reggae Boyz defeat USA 2-1 in World Cup qualifier — Jamaica moves to 4th in CONCACAF standings',
    'BOJ holds policy rate steady at 7% — Governor cites easing inflationary pressures',
    'PM Holness announces $47B infrastructure plan for Kingston Metropolitan Area',
    'CARIFTA 2024: Jamaica leads medal table with 28 gold on final day'
  ]);
}

// ===== STATE =====
let currentPage = 'home';
let pageHistory = [];
let currentFilter = 'all';
let editingPost = null;
let uploadedMediaData = null;
let uploadedMediaType = null;
let visibleCount = 6;
const ADMIN_USER = 'kerrtheinfluencer';
const ADMIN_PASS = 'Iamsuperman2021';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  seedArticles();
  seedTicker();
  initTicker();
  initHeader();
  initSearch();
  renderHome();
  initDragDrop();
});

// ===== TICKER =====
function initTicker() {
  const items = Store.get('ticker', []);
  const el = document.getElementById('tickerContent');
  if (!el || !items.length) return;
  el.textContent = items.join('   ·   ') + '   ·   ';
}

// ===== HEADER SCROLL =====
function initHeader() {
  const header = document.getElementById('header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    header.classList.toggle('scrolled', s > 20);
    lastScroll = s;
  }, { passive: true });
}

// ===== MOBILE NAV =====
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('overlay');
menuBtn.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  overlay.classList.toggle('active', open);
  menuBtn.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
function closeMobileNav() {
  mobileNav.classList.remove('open');
  overlay.classList.remove('active');
  menuBtn.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== SEARCH =====
function initSearch() {
  const toggle = document.getElementById('searchToggle');
  const bar = document.getElementById('searchBar');
  const input = document.getElementById('searchInput');
  toggle.addEventListener('click', () => {
    bar.classList.toggle('open');
    if (bar.classList.contains('open')) { setTimeout(() => input.focus(), 100); }
  });
  input.addEventListener('input', debounce(doSearch, 250));
  input.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });
}
function closeSearch() {
  document.getElementById('searchBar').classList.remove('open');
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
}
function doSearch() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const res = document.getElementById('searchResults');
  if (!q) { res.innerHTML = ''; return; }
  const arts = getPublished().filter(a =>
    a.title.toLowerCase().includes(q) || (a.excerpt||'').toLowerCase().includes(q) || (a.tags||[]).some(t => t.toLowerCase().includes(q))
  ).slice(0, 6);
  if (!arts.length) { res.innerHTML = '<div style="font-size:13px;color:var(--text-muted);padding:8px 12px;">No results found</div>'; return; }
  res.innerHTML = arts.map(a => `
    <div class="search-result-item" onclick="openArticle('${a.id}');closeSearch()">
      <div>
        <div class="result-cat">${a.category}</div>
        <div class="result-title">${a.title}</div>
      </div>
    </div>`).join('');
}

// ===== PAGE ROUTING =====
function showPage(page) {
  pageHistory.push(currentPage);
  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const categories = ['politics','sports','entertainment','business','world','technology','health','crime','opinion'];
  if (page === 'home') {
    document.getElementById('page-home').classList.add('active');
    visibleCount = 6;
    renderHome();
  } else if (categories.includes(page)) {
    document.getElementById('page-category').classList.add('active');
    renderCategory(page);
  }
}

function goBack() {
  const prev = pageHistory.pop() || 'home';
  currentPage = prev;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  if (prev === 'home') {
    document.getElementById('page-home').classList.add('active');
  } else {
    const categories = ['politics','sports','entertainment','business','world','technology','health'];
    if (categories.includes(prev)) {
      document.getElementById('page-category').classList.add('active');
      renderCategory(prev);
    } else {
      document.getElementById('page-home').classList.add('active');
    }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== DATA HELPERS =====
function getArticles() { return Store.get('articles', []); }
function getPublished() { return getArticles().filter(a => a.published); }
function getById(id) { return getArticles().find(a => a.id === id); }
function getCategoryLabel(cat) {
  const map = { politics:'Politics',sports:'Sports',entertainment:'Entertainment',business:'Business',world:'World',technology:'Technology',health:'Health',crime:'Crime',opinion:'Opinion' };
  return map[cat] || cat;
}
function getCategorySub(cat) {
  const map = {
    politics: 'Governance, Parliament, Elections & Policy',
    sports: 'Football, Athletics, Cricket & More',
    entertainment: 'Music, Film, Culture & Arts',
    business: 'Economy, Finance, Markets & Trade',
    world: 'International News & Caribbean Affairs',
    technology: 'Tech, Innovation & Digital Jamaica',
    health: 'Health, Wellness & Medical News',
    crime: 'Crime, Justice & Safety',
    opinion: 'Columns, Letters & Analysis'
  };
  return map[cat] || '';
}
function timeAgo(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-JM', { year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' });
}

// ===== RENDER HOME =====
function renderHome() {
  renderHero();
  renderGrid();
}

function renderHero() {
  const published = getPublished().sort((a,b) => b.timestamp - a.timestamp);
  const featured = published.find(a => a.featured) || published[0];
  const sides = published.filter(a => a.id !== featured?.id).slice(0, 3);

  const heroEl = document.getElementById('heroFeatured');
  if (!heroEl || !featured) return;

  const mediaHtml = featured.mediaType === 'video'
    ? `<video class="hero-img" src="${featured.mediaSrc}" autoplay muted loop playsinline></video>`
    : featured.mediaSrc
      ? `<img class="hero-img" src="${featured.mediaSrc}" alt="${featured.title}" loading="eager">`
      : `<div style="position:absolute;inset:0;background:linear-gradient(135deg,#0a2a1a,#1a0a2a)"></div>`;

  heroEl.innerHTML = `
    ${mediaHtml}
    <div class="hero-overlay"></div>
    ${featured.breaking ? '<div class="hero-badge">BREAKING</div>' : ''}
    <div class="hero-content">
      <div class="hero-cat">${getCategoryLabel(featured.category)}</div>
      <h1 class="hero-title">${featured.title}</h1>
      <p class="hero-excerpt">${featured.excerpt || ''}</p>
      <div class="hero-meta">
        <span>${featured.author}</span>
        <span class="dot"></span>
        <span>${timeAgo(featured.timestamp)}</span>
        <span class="dot"></span>
        <span>${(featured.views||0).toLocaleString()} views</span>
      </div>
    </div>`;
  heroEl.onclick = () => openArticle(featured.id);

  const sideEl = document.getElementById('heroSide');
  if (!sideEl) return;
  sideEl.innerHTML = sides.map(a => `
    <div class="side-card" onclick="openArticle('${a.id}')">
      ${a.mediaSrc ? `<img class="side-card-img" src="${a.mediaSrc}" alt="${a.title}" loading="lazy">` : `<div class="side-card-img" style="background:rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:center;font-size:24px">📰</div>`}
      <div class="side-card-body">
        <div class="side-card-cat">${getCategoryLabel(a.category)}</div>
        <div class="side-card-title">${a.title}</div>
        <div class="side-card-time">${timeAgo(a.timestamp)}</div>
      </div>
    </div>`).join('');
}

function renderGrid() {
  const grid = document.getElementById('articlesGrid');
  if (!grid) return;
  let arts = getPublished().sort((a,b) => b.timestamp - a.timestamp);
  if (currentFilter !== 'all') arts = arts.filter(a => a.category === currentFilter);
  const slice = arts.slice(0, visibleCount);
  grid.innerHTML = slice.length ? slice.map((a,i) => cardHtml(a, i)).join('') : emptyHtml('No stories found', '📰');
  const btn = document.getElementById('loadMoreBtn');
  if (btn) btn.style.display = arts.length > visibleCount ? 'inline-flex' : 'none';
}

function cardHtml(a, idx = 0) {
  const delay = (idx % 6) * 60;
  const mediaHtml = a.mediaSrc
    ? (a.mediaType === 'video'
        ? `<video class="card-img" src="${a.mediaSrc}" muted loop autoplay playsinline loading="lazy"></video>`
        : `<img class="card-img" src="${a.mediaSrc}" alt="${a.title}" loading="lazy">`)
    : `<div class="card-media-icon">${categoryIcon(a.category)}</div>`;
  const badges = [
    a.breaking ? '<span class="badge badge-breaking">Breaking</span>' : '',
    a.featured ? '<span class="badge badge-featured">Featured</span>' : '',
    a.mediaType === 'video' ? '<span class="badge badge-video">Video</span>' : ''
  ].filter(Boolean).join('');
  return `
    <div class="article-card" style="animation-delay:${delay}ms" onclick="openArticle('${a.id}')">
      <div class="card-media">
        ${mediaHtml}
        ${a.mediaType==='video' ? '<div class="card-video-badge">VIDEO</div>' : ''}
      </div>
      <div class="card-body">
        <div class="card-cat-row">
          <span class="card-cat">${getCategoryLabel(a.category)}</span>
          <span class="card-time">${timeAgo(a.timestamp)}</span>
        </div>
        <div class="card-title">${a.title}</div>
        ${a.excerpt ? `<div class="card-excerpt">${a.excerpt.substring(0,110)}${a.excerpt.length>110?'…':''}</div>` : ''}
        <div class="card-footer">
          <span class="card-author">${a.author}</span>
          <div class="card-badges">${badges}</div>
        </div>
      </div>
    </div>`;
}

function categoryIcon(cat) {
  const icons = { politics:'🏛',sports:'⚽',entertainment:'🎵',business:'💼',world:'🌍',technology:'💻',health:'❤️',crime:'🔒',opinion:'✍️' };
  return icons[cat] || '📰';
}

function emptyHtml(msg, icon = '📰') {
  return `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">${icon}</div><p>${msg}</p></div>`;
}

function filterArticles(filter, btn) {
  currentFilter = filter;
  visibleCount = 6;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  renderGrid();
}

function loadMore() {
  visibleCount += 6;
  renderGrid();
}

// ===== CATEGORY PAGE =====
function renderCategory(cat) {
  document.getElementById('catTitle').textContent = getCategoryLabel(cat);
  document.getElementById('catSub').textContent = getCategorySub(cat);
  const arts = getPublished().filter(a => a.category === cat).sort((a,b) => b.timestamp - a.timestamp);
  const grid = document.getElementById('catGrid');
  grid.innerHTML = arts.length ? arts.map((a,i) => cardHtml(a,i)).join('') : emptyHtml(`No ${getCategoryLabel(cat)} stories yet`, categoryIcon(cat));
}

// ===== ARTICLE DETAIL =====
function openArticle(id) {
  const a = getById(id);
  if (!a) return;
  // increment view
  const arts = getArticles();
  const idx = arts.findIndex(x => x.id === id);
  if (idx >= 0) { arts[idx].views = (arts[idx].views || 0) + 1; Store.set('articles', arts); }

  pageHistory.push(currentPage);
  currentPage = 'article';
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-article').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const detail = document.getElementById('articleDetail');
  const mediaHtml = a.mediaSrc
    ? (a.mediaType === 'video'
        ? `<div class="article-cover-media"><video controls src="${a.mediaSrc}"></video></div>`
        : `<div class="article-cover-media" onclick="openLightbox('${a.mediaSrc}','image')" style="cursor:pointer"><img src="${a.mediaSrc}" alt="${a.title}"></div>`)
    : '';

  const embedHtml = a.extLink ? buildEmbed(a.extLink) : '';
  const tagsHtml = (a.tags || []).map(t => `<span class="tag">#${t}</span>`).join('');

  detail.innerHTML = `
    <header class="article-detail-header">
      <div class="article-detail-cat">${getCategoryLabel(a.category)}</div>
      <h1 class="article-detail-title">${a.title}</h1>
      <div class="article-detail-meta">
        <span>✍️ ${a.author}</span>
        <span>🕐 ${formatDate(a.timestamp)}</span>
        <span>👁 ${(a.views||0).toLocaleString()} views</span>
        ${a.breaking ? '<span class="badge badge-breaking">Breaking</span>' : ''}
        ${a.featured ? '<span class="badge badge-featured">Featured</span>' : ''}
      </div>
    </header>
    ${mediaHtml}
    <div class="article-body">${a.body || ''}</div>
    ${embedHtml}
    ${a.extLink ? `<a href="${a.extLink}" target="_blank" rel="noopener" class="article-ext-link">🔗 View External Source →</a>` : ''}
    <div class="article-tags">${tagsHtml}</div>
    <div class="share-row">
      <span class="share-label">Share:</span>
      <button class="share-btn share-twitter" onclick="shareArticle('twitter','${id}')">𝕏 Twitter</button>
      <button class="share-btn share-facebook" onclick="shareArticle('facebook','${id}')">Facebook</button>
      <button class="share-btn share-whatsapp" onclick="shareArticle('whatsapp','${id}')">WhatsApp</button>
      <button class="share-btn share-copy" onclick="copyLink('${id}')">📋 Copy Link</button>
    </div>`;

  // Related articles
  const related = getPublished()
    .filter(x => x.id !== id && x.category === a.category)
    .sort(() => Math.random() - 0.5).slice(0, 3);
  const relGrid = document.getElementById('relatedGrid');
  relGrid.innerHTML = related.length ? related.map((r,i) => cardHtml(r,i)).join('') : '';
}

function buildEmbed(url) {
  if (!url) return '';
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) {
    return `<div class="article-embed"><iframe width="100%" height="360" src="https://www.youtube.com/embed/${ytMatch[1]}" allowfullscreen></iframe></div>`;
  }
  const twMatch = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
  if (twMatch) {
    return `<div class="article-embed" style="padding:16px;background:var(--glass)"><blockquote class="twitter-tweet"><a href="${url}">View Tweet</a></blockquote></div>`;
  }
  return '';
}

function shareArticle(platform, id) {
  const a = getById(id);
  if (!a) return;
  const text = encodeURIComponent(a.title + ' — YaadNews');
  const url = encodeURIComponent(window.location.href);
  let link = '';
  if (platform === 'twitter') link = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  if (platform === 'facebook') link = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  if (platform === 'whatsapp') link = `https://wa.me/?text=${text}%20${url}`;
  if (link) window.open(link, '_blank', 'width=600,height=400');
}
function copyLink(id) {
  navigator.clipboard.writeText(window.location.href).then(() => toast('Link copied to clipboard!', 'success'));
}

// ===== LIGHTBOX =====
function openLightbox(src, type) {
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lightboxContent');
  content.innerHTML = type === 'video'
    ? `<video src="${src}" controls autoplay style="max-width:90vw;max-height:90vh;border-radius:12px"></video>`
    : `<img src="${src}" alt="Media" style="max-width:90vw;max-height:90vh;border-radius:12px;object-fit:contain">`;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== ADMIN LOGIN =====
function showAdminLogin() {
  if (Store.get('adminAuth')) { openAdminDashboard(); return; }
  document.getElementById('adminLoginModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeAdminLogin(e) {
  if (e && e.target !== document.getElementById('adminLoginModal')) return;
  document.getElementById('adminLoginModal').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('loginError').classList.remove('show');
}
function doLogin() {
  const u = document.getElementById('adminUser').value.trim();
  const p = document.getElementById('adminPass').value;
  const err = document.getElementById('loginError');
  if (u === ADMIN_USER && p === ADMIN_PASS) {
    Store.set('adminAuth', true);
    document.getElementById('adminLoginModal').classList.remove('open');
    document.body.style.overflow = '';
    openAdminDashboard();
    toast('Welcome back, Editor!', 'success');
  } else {
    err.textContent = 'Invalid username or password. Please try again.';
    err.classList.add('show');
    document.getElementById('adminPass').value = '';
  }
}
function togglePw(btn) {
  const inp = btn.previousElementSibling;
  inp.type = inp.type === 'password' ? 'text' : 'password';
}

// ===== ADMIN DASHBOARD =====
function openAdminDashboard() {
  document.getElementById('adminDashboard').classList.add('open');
  document.body.style.overflow = 'hidden';
  adminTab('posts', document.querySelector('.admin-nav-item'));
}
function adminLogout() {
  Store.set('adminAuth', false);
  document.getElementById('adminDashboard').classList.remove('open');
  document.body.style.overflow = '';
  toast('Logged out successfully', 'info');
}

function adminTab(tab, btn) {
  document.querySelectorAll('.admin-nav-item').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const content = document.getElementById('adminContent');
  if (tab === 'posts') renderAdminPosts(content);
  if (tab === 'new') openEditor(null);
  if (tab === 'media') renderAdminMedia(content);
  if (tab === 'ticker') renderAdminTicker(content);
  if (tab === 'settings') renderAdminSettings(content);
}

function renderAdminPosts(content) {
  const arts = getArticles().sort((a,b) => b.timestamp - a.timestamp);
  const published = arts.filter(a => a.published).length;
  const drafts = arts.length - published;
  const breaking = arts.filter(a => a.breaking).length;
  const totalViews = arts.reduce((sum, a) => sum + (a.views||0), 0);
  content.innerHTML = `
    <h2 class="admin-page-title">All Posts</h2>
    <div class="admin-stats">
      <div class="stat-card"><div class="stat-value">${arts.length}</div><div class="stat-label">Total Posts</div></div>
      <div class="stat-card"><div class="stat-value">${published}</div><div class="stat-label">Published</div></div>
      <div class="stat-card"><div class="stat-value">${drafts}</div><div class="stat-label">Drafts</div></div>
      <div class="stat-card"><div class="stat-value">${totalViews.toLocaleString()}</div><div class="stat-label">Total Views</div></div>
    </div>
    <button class="admin-new-btn" onclick="openEditor(null)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
      New Post
    </button>
    <div id="adminPostList">
      ${arts.map(a => `
        <div class="admin-post-row">
          <div class="status-dot ${a.published?'published':'draft'}"></div>
          ${a.mediaSrc
            ? `<img class="admin-post-thumb" src="${a.mediaSrc}" alt="">`
            : `<div class="admin-post-thumb-placeholder">${categoryIcon(a.category)}</div>`}
          <div class="admin-post-info">
            <div class="admin-post-title">${a.title}</div>
            <div class="admin-post-meta">${getCategoryLabel(a.category)} · ${formatDate(a.timestamp)} · ${(a.views||0).toLocaleString()} views · ${a.published?'Published':'Draft'}</div>
          </div>
          <div class="admin-post-actions">
            <button class="btn-edit" onclick="openEditor('${a.id}')">Edit</button>
            <button class="btn-delete" onclick="deletePost('${a.id}')">Delete</button>
          </div>
        </div>`).join('')}
    </div>`;
}

function renderAdminMedia(content) {
  const arts = getArticles().filter(a => a.mediaSrc);
  content.innerHTML = `
    <h2 class="admin-page-title">Media Library</h2>
    <p style="color:var(--text-muted);font-size:13px;margin-bottom:20px">${arts.length} media item${arts.length!==1?'s':''} from published posts</p>
    <div class="media-grid">
      ${arts.map(a => `
        <div class="media-item" onclick="openLightbox('${a.mediaSrc}','${a.mediaType||'image'}')">
          ${a.mediaType==='video'
            ? `<video src="${a.mediaSrc}" muted></video>`
            : `<img src="${a.mediaSrc}" alt="${a.title}" loading="lazy">`}
          <div class="media-item-overlay"><div style="color:#fff;font-size:11px;text-align:center;padding:8px">${a.mediaType==='video'?'▶ Video':'🔍 View'}</div></div>
        </div>`).join('')}
      ${!arts.length ? '<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🖼</div><p>No media yet. Add images/videos when publishing posts.</p></div>' : ''}
    </div>`;
}

function renderAdminTicker(content) {
  const items = Store.get('ticker', []);
  content.innerHTML = `
    <h2 class="admin-page-title">Breaking News Ticker</h2>
    <p style="color:var(--text-muted);font-size:13px;margin-bottom:20px">Manage the scrolling ticker shown at the top of the site.</p>
    <div class="ticker-add-row">
      <input type="text" id="newTickerText" placeholder="Enter breaking news headline..." onkeydown="if(event.key==='Enter')addTickerItem()">
      <button class="btn-primary" style="width:auto;padding:10px 20px;white-space:nowrap" onclick="addTickerItem()">Add</button>
    </div>
    <div class="ticker-admin-list" id="tickerAdminList">
      ${items.map((item, i) => `
        <div class="ticker-item">
          <span class="ticker-text">${item}</span>
          <button class="ticker-remove" onclick="removeTickerItem(${i})">✕</button>
        </div>`).join('')}
      ${!items.length ? '<div style="color:var(--text-muted);font-size:13px;padding:12px">No ticker items. Add one above.</div>' : ''}
    </div>`;
}

function addTickerItem() {
  const inp = document.getElementById('newTickerText');
  const text = inp.value.trim();
  if (!text) return;
  const items = Store.get('ticker', []);
  items.unshift(text);
  Store.set('ticker', items);
  inp.value = '';
  initTicker();
  renderAdminTicker(document.getElementById('adminContent'));
  toast('Ticker updated', 'success');
}

function removeTickerItem(idx) {
  const items = Store.get('ticker', []);
  items.splice(idx, 1);
  Store.set('ticker', items);
  initTicker();
  renderAdminTicker(document.getElementById('adminContent'));
}

function renderAdminSettings(content) {
  content.innerHTML = `
    <h2 class="admin-page-title">Settings</h2>
    <div style="max-width:480px">
      <div class="form-group">
        <label>Site Name</label>
        <input type="text" value="YaadNews" placeholder="Site name">
      </div>
      <div class="form-group">
        <label>Tagline</label>
        <input type="text" value="Jamaica's Pulse" placeholder="Tagline">
      </div>
      <div class="form-group">
        <label>Change Admin Password</label>
        <input type="password" placeholder="New password">
      </div>
      <button class="btn-primary" style="width:auto;padding:12px 28px" onclick="toast('Settings saved!','success')">Save Settings</button>
      <div style="margin-top:32px;padding-top:20px;border-top:1px solid var(--glass-border)">
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">Danger Zone</p>
        <button class="btn-secondary" onclick="if(confirm('Clear all articles? This cannot be undone.'))clearAllPosts()">🗑 Clear All Posts</button>
      </div>
    </div>`;
}

function clearAllPosts() {
  Store.set('articles', []);
  toast('All posts cleared', 'info');
  renderAdminPosts(document.getElementById('adminContent'));
}

function deletePost(id) {
  if (!confirm('Delete this post?')) return;
  const arts = getArticles().filter(a => a.id !== id);
  Store.set('articles', arts);
  renderAdminPosts(document.getElementById('adminContent'));
  renderHome();
  toast('Post deleted', 'info');
}

// ===== EDITOR =====
function openEditor(id) {
  editingPost = id;
  uploadedMediaData = null;
  uploadedMediaType = null;
  const modal = document.getElementById('editorModal');
  document.getElementById('editorTitle').textContent = id ? 'Edit Post' : 'New Post';

  if (id) {
    const a = getById(id);
    if (a) {
      document.getElementById('postTitle').value = a.title || '';
      document.getElementById('postExcerpt').value = a.excerpt || '';
      document.getElementById('editorArea').innerHTML = a.body || '';
      document.getElementById('postCategory').value = a.category || '';
      document.getElementById('postAuthor').value = a.author || '';
      document.getElementById('postTags').value = (a.tags||[]).join(', ');
      document.getElementById('postExtLink').value = a.extLink || '';
      document.getElementById('postBreaking').checked = !!a.breaking;
      document.getElementById('postFeatured').checked = !!a.featured;
      document.getElementById('postPublished').checked = a.published !== false;
      if (a.mediaSrc) {
        const prev = document.getElementById('mediaPreview');
        prev.innerHTML = a.mediaType === 'video'
          ? `<video src="${a.mediaSrc}" controls style="width:100%"></video>`
          : `<img src="${a.mediaSrc}" alt="Cover">`;
        uploadedMediaData = a.mediaSrc;
        uploadedMediaType = a.mediaType || 'image';
      } else {
        document.getElementById('mediaPreview').innerHTML = '';
      }
    }
  } else {
    document.getElementById('postTitle').value = '';
    document.getElementById('postExcerpt').value = '';
    document.getElementById('editorArea').innerHTML = '';
    document.getElementById('postCategory').value = '';
    document.getElementById('postAuthor').value = 'YaadNews Staff';
    document.getElementById('postTags').value = '';
    document.getElementById('postExtLink').value = '';
    document.getElementById('postBreaking').checked = false;
    document.getElementById('postFeatured').checked = false;
    document.getElementById('postPublished').checked = true;
    document.getElementById('mediaPreview').innerHTML = '';
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeEditor(e) {
  if (e && e.target !== document.getElementById('editorModal')) return;
  document.getElementById('editorModal').classList.remove('open');
  document.body.style.overflow = '';
}

function fmt(cmd) { document.execCommand(cmd, false, null); document.getElementById('editorArea').focus(); }
function insertHeading() { document.execCommand('formatBlock', false, 'h2'); }
function insertQuote() { document.execCommand('formatBlock', false, 'blockquote'); }
function insertLink() {
  const url = prompt('Enter URL:');
  if (url) { document.execCommand('createLink', false, url); }
}
function insertMediaInline() {
  const url = prompt('Enter image/video URL or YouTube link:');
  if (!url) return;
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) {
    const iframe = `<div contenteditable="false" class="article-embed"><iframe width="100%" height="315" src="https://www.youtube.com/embed/${ytMatch[1]}" allowfullscreen></iframe></div><p></p>`;
    document.execCommand('insertHTML', false, iframe);
  } else if (/\.(mp4|webm|ogg)$/i.test(url)) {
    document.execCommand('insertHTML', false, `<video src="${url}" controls style="max-width:100%;border-radius:8px"></video><p></p>`);
  } else {
    document.execCommand('insertHTML', false, `<img src="${url}" style="max-width:100%;border-radius:8px"><p></p>`);
  }
}

function handleMediaUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    uploadedMediaData = ev.target.result;
    uploadedMediaType = file.type.startsWith('video') ? 'video' : 'image';
    const prev = document.getElementById('mediaPreview');
    prev.innerHTML = uploadedMediaType === 'video'
      ? `<video src="${uploadedMediaData}" controls style="width:100%;border-radius:8px"></video>`
      : `<img src="${uploadedMediaData}" alt="Cover" style="border-radius:8px">`;
    toast('Media uploaded ✓', 'success');
  };
  reader.readAsDataURL(file);
}

function savePost(mode) {
  const title = document.getElementById('postTitle').value.trim();
  const category = document.getElementById('postCategory').value;
  const body = document.getElementById('editorArea').innerHTML.trim();
  if (!title) { toast('Please enter a headline', 'error'); return; }
  if (!category) { toast('Please select a category', 'error'); return; }

  const arts = getArticles();
  const now = Date.now();
  const post = {
    id: editingPost || 'art_' + now,
    title,
    excerpt: document.getElementById('postExcerpt').value.trim(),
    body,
    category,
    author: document.getElementById('postAuthor').value.trim() || 'YaadNews Staff',
    tags: document.getElementById('postTags').value.split(',').map(t => t.trim()).filter(Boolean),
    mediaSrc: uploadedMediaData || (editingPost ? (getById(editingPost)||{}).mediaSrc : null) || null,
    mediaType: uploadedMediaType || (editingPost ? (getById(editingPost)||{}).mediaType : 'image') || 'image',
    extLink: document.getElementById('postExtLink').value.trim(),
    breaking: document.getElementById('postBreaking').checked,
    featured: document.getElementById('postFeatured').checked,
    published: mode === 'publish' ? true : document.getElementById('postPublished').checked,
    timestamp: editingPost ? (getById(editingPost)||{timestamp:now}).timestamp : now,
    views: editingPost ? (getById(editingPost)||{views:0}).views : 0
  };

  if (editingPost) {
    const idx = arts.findIndex(a => a.id === editingPost);
    if (idx >= 0) arts[idx] = post; else arts.unshift(post);
  } else {
    arts.unshift(post);
  }
  Store.set('articles', arts);
  closeEditor();
  renderHome();
  toast(mode === 'publish' ? '🎉 Post published!' : '💾 Draft saved', 'success');
  if (Store.get('adminAuth')) {
    renderAdminPosts(document.getElementById('adminContent'));
  }
  if (post.breaking) {
    const items = Store.get('ticker', []);
    if (!items.includes(title)) { items.unshift(title); Store.set('ticker', items); initTicker(); }
  }
}

// ===== DRAG & DROP =====
function initDragDrop() {
  const area = document.getElementById('mediaUploadArea');
  if (!area) return;
  area.addEventListener('dragover', e => { e.preventDefault(); area.classList.add('drag-over'); });
  area.addEventListener('dragleave', () => area.classList.remove('drag-over'));
  area.addEventListener('drop', e => {
    e.preventDefault(); area.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) { document.getElementById('mediaFileInput').files = e.dataTransfer.files; handleMediaUpload({ target: { files: e.dataTransfer.files } }); }
  });
}

// ===== TOAST =====
function toast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  el.innerHTML = `<span style="font-size:16px">${icon}</span><span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 350); }, 3200);
}

// ===== UTILITIES =====
function debounce(fn, delay) {
  let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}
