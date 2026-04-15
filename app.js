/* ===================================================
   YAADNEWS V2 — Fixed & Enhanced
   Hash routing · SEO meta injection · Admin · Skeletons
   =================================================== */

// ===== STORE =====
const Store = {
  get(k, fb = null) { try { const v = localStorage.getItem('yn_'+k); return v ? JSON.parse(v) : fb; } catch(e) { return fb; } },
  set(k, v) { try { localStorage.setItem('yn_'+k, JSON.stringify(v)); } catch(e) {} },
  clear(k) { try { localStorage.removeItem('yn_'+k); } catch(e) {} }
};

// ===== CONSTANTS =====
const ADMIN_USER = 'kerrtheinfluencer';
const ADMIN_PASS = 'Iamsuperman2021';
const SITE_URL   = 'https://yaadnews.com';
const SITE_NAME  = 'YaadNews';
const DATA_VERSION = '4'; // Bumped for V2

// ===== STATE =====
let currentFilter = 'all';
let visibleCount  = 6;
let editingId     = null;
let uploadedSrc   = null;
let uploadedType  = null;
let adminSideOpen = false;
let isInitialized = false;

// ===== CATEGORY META =====
const CAT = {
  politics:      { label:'Politics',      icon:'🏛', desc:'Governance, Parliament, Elections & Policy' },
  sports:        { label:'Sports',        icon:'⚽', desc:'Football, Athletics, Cricket & More' },
  entertainment: { label:'Entertainment', icon:'🎵', desc:'Music, Film, Culture & Arts' },
  business:      { label:'Business',      icon:'💼', desc:'Economy, Finance, Markets & Trade' },
  world:         { label:'World',         icon:'🌍', desc:'International News & Caribbean Affairs' },
  technology:    { label:'Technology',    icon:'💻', desc:'Tech, Innovation & Digital Jamaica' },
  health:        { label:'Health',        icon:'❤️', desc:'Health, Wellness & Medical News' },
  crime:         { label:'Crime',         icon:'🔒', desc:'Crime, Justice & Safety' },
  opinion:       { label:'Opinion',       icon:'✍️', desc:'Columns, Letters & Analysis' }
};
const catLabel = c => CAT[c]?.label || c;
const catIcon  = c => CAT[c]?.icon  || '📰';
const catDesc  = c => CAT[c]?.desc  || '';

// ===== DATA VERSION =====
function checkDataVersion() {
  if (Store.get('dataVersion') !== DATA_VERSION) {
    Store.clear('articles');
    Store.clear('ticker');
    Store.set('dataVersion', DATA_VERSION);
    console.log('🔄 V2 Data reset for new version');
  }
}

// ===== SEED DATA (ENHANCED) =====
function seedArticles() {
  const existing = Store.get('articles');
  // Only seed if null or empty array
  if (existing && existing.length > 0) return;
  
  const n = Date.now(), h = m => n - m * 60000;
  const arts = [
    { id:'art_1', title:'PM Holness Announces Major Infrastructure Push for Kingston Metro Corridor',
      excerpt:'Prime Minister Andrew Holness outlined a $47 billion plan to modernise Kingston\'s transport network, creating thousands of jobs across the capital.',
      body:'<h2>A New Vision for Kingston</h2><p>Prime Minister Andrew Holness today unveiled a transformative infrastructure agenda that promises to reshape the Kingston Metropolitan Area over the next five years. The $47 billion package, funded through a combination of government bonds and IDB lending, will target road widening, bus rapid transit lanes, and pedestrian infrastructure.</p><p>"This is not just about roads," Holness said at Jamaica House. "This is about the future of our capital, the dignity of our commuters, and the productivity of our workforce."</p><h2>Key Projects</h2><p>Flagship projects include a dedicated BRT corridor from Half Way Tree to New Kingston, full rehabilitation of Marcus Garvey Drive, and park-and-ride facilities in Portmore and Spanish Town.</p><blockquote>We are building a Kingston that works for every Jamaican, not just those who can afford a car.</blockquote><p>Opposition spokesman Mikael Phillips acknowledged the scope but called for independent cost verification before funds are committed.</p>',
      category:'politics', author:'Devon Brown', tags:['politics','infrastructure','Kingston','PM Holness'],
      mediaType:'image', mediaSrc:'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&q=80',
      extLink:'', breaking:true, featured:true, published:true, timestamp:h(45), views:4823 },
    { id:'art_2', title:'Reggae Boyz Secure Stunning 2-1 Victory Over USA in World Cup Qualifier',
      excerpt:'Jamaica\'s national football team produced a historic upset, defeating the United States at National Stadium to boost World Cup qualifying hopes dramatically.',
      body:'<h2>Historic Night at National Stadium</h2><p>In front of a capacity 35,000 crowd, the Reggae Boyz delivered one of their finest performances in recent memory, defeating a star-studded USMNT side 2-1 in a pulsating CONCACAF qualifier on Friday night.</p><p>Shamar Nicholson opened the scoring in the 22nd minute with a clinical finish before the USA equalised through Christian Pulisic shortly before half-time. The winner came from substitute Ravel Morrison in the 78th minute, sending the stadium into euphoria.</p><blockquote>"The boys showed heart and belief. This is what Jamaica is about," said head coach Heimir Hallgrimsson.</blockquote><p>The result pushes Jamaica to fourth in the Octagonal standings, level with Panama, with six qualifiers remaining.</p>',
      category:'sports', author:'Claudette Morris', tags:['sports','football','Reggae Boyz','World Cup'],
      mediaType:'image', mediaSrc:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80',
      extLink:'', breaking:true, featured:false, published:true, timestamp:h(90), views:12441 },
    { id:'art_3', title:'Vybz Kartel Freed: Massive Celebrations Erupt Across Jamaica',
      excerpt:'Dancehall king Vybz Kartel walked free following his appeal verdict, triggering spontaneous celebrations in Kingston, Spanish Town and across the diaspora.',
      body:'<h2>Freedom at Last</h2><p>Thousands of fans lined the streets of Kingston as dancehall superstar Vybz Kartel — born Adidja Azim Palmer — was released after the Privy Council overturned his 2014 murder conviction.</p><p>Scenes of jubilation erupted from Portmore to Half Way Tree, with music blasting from vehicles and impromptu street parties forming within minutes of the ruling.</p><p>Kartel posted a brief voice note to Instagram: "Big up the whole a Jamaica. Gaza fi real."</p><h2>Industry Reaction</h2><p>Fellow artistes including Popcaan, Alkaline and Sean Paul took to social media to celebrate. Industry insiders say Kartel is expected back in the studio within weeks.</p>',
      category:'entertainment', author:'Tamara Reid', tags:['entertainment','Vybz Kartel','dancehall','music'],
      mediaType:'image', mediaSrc:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=80',
      extLink:'', breaking:false, featured:true, published:true, timestamp:h(180), views:38201 },
    { id:'art_4', title:'Bank of Jamaica Holds Rate Steady at 7% Amid Inflation Concerns',
      excerpt:'The BOJ Monetary Policy Committee voted unanimously to hold the policy rate, citing easing core inflation and a stable Jamaican dollar exchange rate.',
      body:'<h2>Rate Held Steady</h2><p>The Bank of Jamaica held its benchmark interest rate at 7 per cent on Wednesday, a decision welcomed by the private sector but scrutinised by consumer advocates amid persistent food price pressures.</p><p>BOJ Governor Richard Byles said the decision reflects confidence that inflation is on a sustainable downward path, currently at 5.2 per cent, approaching the 4–6 per cent target band.</p><blockquote>"The Jamaican dollar has shown commendable stability, and we see no need to tighten at this juncture," Byles said.</blockquote>',
      category:'business', author:'Marcus Levy', tags:['business','BOJ','economy','interest rates'],
      mediaType:'image', mediaSrc:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80',
      extLink:'', breaking:false, featured:false, published:true, timestamp:h(320), views:2190 },
    { id:'art_5', title:'Hurricane Beryl: Jamaica Under Tropical Storm Watch as System Intensifies',
      excerpt:'The Caribbean Meteorological Organisation issued a tropical storm watch for Jamaica as Beryl strengthens rapidly over the eastern Caribbean.',
      body:'<h2>System Approaches</h2><p>The Caribbean Meteorological Organisation issued a Tropical Storm Watch for Jamaica as Hurricane Beryl continued its westward track, bringing dangerous winds and storm surge to several island nations.</p><p>The Jamaica Meteorological Service says the system could reach Jamaican waters as early as Wednesday, with sustained winds of up to 85 km/h and heavy rainfall expected across all parishes.</p><p>ODPEM is urging residents to begin preparations, securing loose objects, stocking emergency supplies, and identifying nearby shelters.</p><blockquote>Do not wait. Prepare now. Your safety is not worth the risk of delay.</blockquote>',
      category:'world', author:'YaadNews Staff', tags:['weather','hurricane','Beryl','ODPEM'],
      mediaType:'image', mediaSrc:'https://images.unsplash.com/photo-1504608524841-42f4c72c9ecc?w=900&q=80',
      extLink:'', breaking:true, featured:false, published:true, timestamp:h(60), views:9870 },
    { id:'art_6', title:'New Tech Hub Opens in New Kingston to Accelerate Jamaica Startup Scene',
      excerpt:'DigiJamaica and JAMPRO unveiled a 22,000 sq ft innovation hub at The Towers, offering co-working, seed funding and mentorship for local tech entrepreneurs.',
      body:'<h2>Silicon Lanes is Open</h2><p>Jamaica\'s technology ecosystem received a major boost with the launch of Silicon Lanes — a 22,000 square foot innovation hub in the heart of New Kingston designed to accelerate local startups and attract foreign tech investment.</p><p>The hub offers hot-desking and dedicated suites, high-speed fibre, a $200 million venture pool, and a mentorship network of 60+ industry veterans.</p><p>"We want Jamaica to be the fintech and creative-tech capital of the Caribbean," said JAMPRO President Shullette Cox.</p>',
      category:'technology', author:'Kezia Thompson', tags:['technology','startups','JAMPRO','DigiJamaica'],
      mediaType:'image', mediaSrc:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
      extLink:'', breaking:false, featured:false, published:true, timestamp:h(500), views:1644 },
    { id:'art_7', title:'Ministry of Health Launches Island-Wide Free NCD Screening Campaign',
      excerpt:'The Ministry of Health kicked off Jamaica\'s most comprehensive free screening initiative targeting diabetes, hypertension and cancer detection at 140+ locations.',
      body:'<h2>Free Screenings Across Jamaica</h2><p>The Ministry of Health and Wellness launched its most comprehensive NCD screening campaign to date, offering free tests for diabetes, hypertension, and select cancers at over 140 locations islandwide over six weeks.</p><p>Minister Dr. Christopher Tufton said NCDs account for nearly 60 per cent of all deaths in Jamaica annually and called on citizens to take advantage of the free service.</p><blockquote>"Prevention is always better than cure. We are bringing the clinic to the community."</blockquote><p>Screenings are available Monday to Saturday, 8am–4pm, at all Type 3 and Type 4 health centres. Bring a valid ID.</p>',
      category:'health', author:'Dr. Andrea Ellis', tags:['health','NCD','Ministry of Health','diabetes'],
      mediaType:'image', mediaSrc:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80',
      extLink:'', breaking:false, featured:false, published:true, timestamp:h(700), views:987 },
    { id:'art_8', title:'CARIFTA Games: Jamaica Sweeps All Four Sprint Finals on Closing Day in Grenada',
      excerpt:'Jamaican athletes dominated the track on the final day of CARIFTA 2024, claiming gold in all four sprint finals and topping the overall medal standings.',
      body:'<h2>Golden Day for Jamaica</h2><p>Jamaica\'s young athletes capped a dominant CARIFTA campaign in Grenada by sweeping all four sprint finals, reaffirming the island\'s status as the world\'s premier sprint-developing nation.</p><p>Sixteen-year-old Tyrese Thomas won the Under-17 Boys 100m in 10.48 seconds, while Aaliyah Clarke took gold in the Under-20 Girls 200m with a Games record of 23.12 seconds.</p><p>Jamaica finished with 28 gold, 19 silver and 14 bronze — comfortably top of the standings ahead of Trinidad & Tobago.</p>',
      category:'sports', author:'Claudette Morris', tags:['sports','athletics','CARIFTA','sprinting'],
      mediaType:'image', mediaSrc:'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&q=80',
      extLink:'', breaking:false, featured:false, published:true, timestamp:h(800), views:3401 }
  ];
  Store.set('articles', arts);
  console.log('✅ Seeded', arts.length, 'articles');
}

function seedTicker() {
  if (Store.get('ticker')) return;
  Store.set('ticker', [
    'Hurricane Beryl: Tropical Storm Watch issued for Jamaica — ODPEM urges all residents to prepare immediately',
    'Reggae Boyz defeat USA 2-1 in World Cup qualifier — Jamaica 4th in CONCACAF standings',
    'BOJ holds policy rate steady at 7% — Governor cites easing inflationary pressures',
    'PM Holness announces $47B infrastructure plan for Kingston Metropolitan Area',
    'CARIFTA 2024: Jamaica leads medal table with 28 gold on final day in Grenada'
  ]);
}

// ===== UTILS =====
function getArticles()   { return Store.get('articles', []); }
function getPublished()  { return getArticles().filter(a => a.published); }
function getById(id)     { return getArticles().find(a => a.id === id); }
function slugify(t)      { return t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
function timeAgo(ts) {
  const m = Math.floor((Date.now()-ts)/60000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m/60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h/24)}d ago`;
}
function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-JM',{year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit'});
}
function debounce(fn, d) { let t; return (...a) => { clearTimeout(t); t=setTimeout(()=>fn(...a),d); }; }

// ===== SKELETON HELPERS =====
function heroSkeleton() {
  return `
    <div class="hero-skeleton">
      <div class="sk-img"></div>
      <div class="sk-content">
        <div class="sk-badge"></div>
        <div class="sk-title"></div>
        <div class="sk-title sk-title-sm"></div>
        <div class="sk-meta"></div>
      </div>
    </div>`;
}

function cardSkeleton(count=6) {
  return Array(count).fill(0).map((_,i) => `
    <div class="article-card skeleton-card" style="animation-delay:${i*50}ms">
      <div class="sk-media"></div>
      <div class="sk-body">
        <div class="sk-line sk-line-short"></div>
        <div class="sk-line"></div>
        <div class="sk-line sk-line-med"></div>
      </div>
    </div>
  `).join('');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 YaadNews V2 Initializing...');
  checkDataVersion();
  seedArticles();
  seedTicker();
  initTicker();
  initHeader();
  initSearch();
  initDragDrop();
  initHashRouter();
  
  // Force initial render if hash is empty or home
  if (!location.hash || location.hash === '#' || location.hash === '#home') {
    renderHome();
  }
  
  isInitialized = true;
});

// ===== TICKER =====
function initTicker() {
  const items = Store.get('ticker', []);
  const el = document.getElementById('tickerInner');
  if (!el || !items.length) return;
  el.textContent = items.join('   ·   ') + '   ·   ';
}

// ===== HEADER =====
function initHeader() {
  const h = document.getElementById('header');
  window.addEventListener('scroll', () => h.classList.toggle('scrolled', window.scrollY > 20), {passive:true});
  
  document.getElementById('menuBtn')?.addEventListener('click', toggleSideNav);
  document.getElementById('adminBtn')?.addEventListener('click', () => {
    if (Store.get('adminAuth')) openAdminDashboard(); else showAdminLogin();
  });
  document.getElementById('searchBtn')?.addEventListener('click', toggleSearch);
  document.getElementById('searchInput')?.addEventListener('input', debounce(doSearch, 220));
  document.getElementById('searchInput')?.addEventListener('keydown', e => { if (e.key==='Escape') closeSearch(); });
}

function toggleSideNav() {
  const nav = document.getElementById('sideNav');
  const bd  = document.getElementById('backdrop');
  const btn = document.getElementById('menuBtn');
  const open = nav.classList.toggle('open');
  bd.classList.toggle('show', open);
  btn.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

function closeSideNav() {
  document.getElementById('sideNav').classList.remove('open');
  document.getElementById('backdrop').classList.remove('show');
  document.getElementById('menuBtn').classList.remove('open');
  document.body.style.overflow = '';
}

function toggleSearch() {
  const t = document.getElementById('searchTray');
  const isOpen = t.classList.toggle('open');
  if (isOpen) setTimeout(() => document.getElementById('searchInput').focus(), 80);
}

function closeSearch() {
  document.getElementById('searchTray').classList.remove('open');
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
}

function doSearch() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const res = document.getElementById('searchResults');
  if (!q) { res.innerHTML=''; return; }
  const hits = getPublished().filter(a =>
    a.title.toLowerCase().includes(q) || (a.excerpt||'').toLowerCase().includes(q) ||
    (a.tags||[]).some(t=>t.toLowerCase().includes(q))
  ).slice(0,7);
  if (!hits.length) { res.innerHTML='<div style="font-size:13px;color:var(--t3);padding:8px 12px">No results found</div>'; return; }
  res.innerHTML = hits.map(a => `
    <div class="search-result-item" onclick="navigateTo('article/${a.id}');closeSearch()">
      <div>
        <div class="sr-cat">${catLabel(a.category)}</div>
        <div class="sr-title">${a.title}</div>
      </div>
    </div>`).join('');
}

// ===== HASH ROUTER =====
function initHashRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function handleRoute() {
  const raw  = (location.hash || '').replace(/^#/, '').trim();
  const hash = raw || 'home';
  const parts = hash.split('/');
  const page  = parts[0] || 'home';
  const param = parts[1] || '';

  // Update nav active state
  document.querySelectorAll('.dnav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });

  if (page === 'home' || page === '') {
    showSection('page-home');
    renderHome();
    updateMeta({ title: `${SITE_NAME} — Jamaica's Premium News Source`, desc: 'Breaking news, politics, entertainment, sports and more from Jamaica and the Caribbean.', url: '/', type:'website' });
  } else if (page === 'article' && param) {
    const a = getById(param);
    if (a) {
      showSection('page-article');
      renderArticleDetail(a);
      updateMetaForArticle(a);
    } else {
      toast('Article not found', 'error');
      location.hash = 'home';
      return;
    }
  } else if (CAT[page]) {
    showSection('page-category');
    renderCategory(page);
    updateMeta({ title:`${CAT[page].label} — ${SITE_NAME}`, desc:CAT[page].desc, url:`/${page}`, type:'website' });
  } else {
    location.hash = 'home';
    return;
  }
  window.scrollTo({top:0,behavior:'smooth'});
}

function navigateTo(path) {
  location.hash = path;
}

function showSection(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('active');
    // Trigger fade in animation
    el.style.opacity = '0';
    setTimeout(() => el.style.opacity = '1', 50);
  }
}

// ===== SEO =====
function updateMeta({title, desc, url, type='website', image=''}) {
  const canonical = SITE_URL + url;
  const img = image || SITE_URL + '/og-default.jpg';
  document.getElementById('metaTitle').textContent = title;
  const m = n => document.querySelector(`meta[name="${n}"]`);
  const og = p => document.querySelector(`meta[property="${p}"]`);
  if (m('description')) m('description').content = desc;
  const canon = document.getElementById('metaCanonical');
  if (canon) canon.href = canonical;
  if (og('og:title')) og('og:title').content = title;
  if (og('og:description')) og('og:description').content = desc;
  if (og('og:url')) og('og:url').content = canonical;
  if (og('og:type')) og('og:type').content = type;
  if (og('og:image')) og('og:image').content = img;
  const tw = n => document.querySelector(`meta[name="${n}"]`);
  if (tw('twitter:title')) tw('twitter:title').content = title;
  if (tw('twitter:description')) tw('twitter:description').content = desc;
  if (tw('twitter:image')) tw('twitter:image').content = img;
}

function updateMetaForArticle(a) {
  const seoTitle = a.seoTitle || a.title;
  const seoDesc  = a.seoDesc  || a.excerpt || '';
  const url = `/article/${a.id}/${slugify(a.title)}`;
  updateMeta({ title:`${seoTitle} — ${SITE_NAME}`, desc:seoDesc, url, type:'article', image:a.mediaSrc||'' });
  const sd = {
    "@context":"https://schema.org",
    "@type":"NewsArticle",
    "headline": a.title,
    "description": seoDesc,
    "image": a.mediaSrc ? [a.mediaSrc] : [],
    "datePublished": new Date(a.timestamp).toISOString(),
    "dateModified": new Date(a.timestamp).toISOString(),
    "author":[{"@type":"Person","name":a.author}],
    "publisher":{"@type":"NewsMediaOrganization","name":"YaadNews","url":"https://yaadnews.com"},
    "mainEntityOfPage":{"@type":"WebPage","@id":SITE_URL+url},
    "keywords":(a.tags||[]).join(','),
    "articleSection": catLabel(a.category),
    "inLanguage":"en-JM"
  };
  const el = document.getElementById('structuredData');
  if (el) el.textContent = JSON.stringify(sd);
}

// ===== RENDER HOME (FIXED) =====
function renderHome() {
  // Show skeletons first
  document.getElementById('heroLead').innerHTML = heroSkeleton();
  document.getElementById('heroRail').innerHTML = '<div style="display:flex;flex-direction:column;gap:12px;height:100%">' + cardSkeleton(3) + '</div>';
  document.getElementById('articlesGrid').innerHTML = cardSkeleton(6);
  
  // Small delay to allow skeletons to render, then load data
  setTimeout(() => {
    renderHero();
    currentFilter = 'all';
    visibleCount = 6;
    document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.f === 'all'));
    renderGrid();
  }, 100);
}

function renderHero() {
  const arts = getPublished().sort((a,b) => b.timestamp - a.timestamp);
  
  if (!arts.length) {
    document.getElementById('heroLead').innerHTML = '<div class="empty-state" style="min-height:400px"><div>📰</div><p>No articles yet</p></div>';
    document.getElementById('heroRail').innerHTML = '';
    return;
  }
  
  const featured = arts.find(a => a.featured) || arts[0];
  const sides = arts.filter(a => a.id !== featured.id).slice(0, 3);

  // FIX: Changed heroPrimary to heroLead to match HTML ID
  const lead = document.getElementById('heroLead');
  const mediaBg = featured.mediaSrc
    ? (featured.mediaType==='video'
        ? `<video class="hero-img" src="${featured.mediaSrc}" autoplay muted loop playsinline></video>`
        : `<img class="hero-img" src="${featured.mediaSrc}" alt="${featured.title}" loading="eager">`)
    : `<div style="position:absolute;inset:0;background:linear-gradient(135deg,#0a2a1a,#1a0a2e)"></div>`;

  lead.innerHTML = `
    <a href="#article/${featured.id}" style="position:absolute;inset:0;z-index:2;display:block" aria-label="${featured.title}"></a>
    ${mediaBg}
    <div class="hero-overlay"></div>
    ${featured.breaking ? '<div class="hero-breaking-badge">BREAKING</div>' : ''}
    <div class="hero-glass-panel">
      <div class="hero-cat">${catLabel(featured.category)}</div>
      <h2 class="hero-title">${featured.title}</h2>
      <p class="hero-excerpt">${featured.excerpt||''}</p>
      <div class="hero-meta">
        <span>${featured.author}</span>
        <span class="hero-meta-dot"></span>
        <span>${timeAgo(featured.timestamp)}</span>
        <span class="hero-meta-dot"></span>
        <span>${(featured.views||0).toLocaleString()} views</span>
      </div>
    </div>`;
  lead.style.cursor = 'pointer';

  const rail = document.getElementById('heroRail');
  rail.innerHTML = sides.map(a => `
    <a class="hero-side-card" href="#article/${a.id}" style="text-decoration:none">
      ${a.mediaSrc
        ? `<img class="hsc-img" src="${a.mediaSrc}" alt="${a.title}" loading="lazy">`
        : `<div class="hsc-img-placeholder">${catIcon(a.category)}</div>`}
      <div class="hsc-body">
        <div class="hsc-cat">${catLabel(a.category)}</div>
        <div class="hsc-title">${a.title}</div>
        <div class="hsc-time">${timeAgo(a.timestamp)}</div>
      </div>
    </a>`).join('');
}

function renderGrid() {
  const grid = document.getElementById('articlesGrid');
  if (!grid) return;
  
  let arts = getPublished().sort((a,b) => b.timestamp - a.timestamp);
  if (currentFilter !== 'all') arts = arts.filter(a => a.category === currentFilter);
  
  const slice = arts.slice(0, visibleCount);
  
  if (!slice.length) {
    grid.innerHTML = `<div class="empty-state"><div>${catIcon(currentFilter)}</div><p>No stories found in ${catLabel(currentFilter)}</p><button class="glass-btn" onclick="filterArticles('all', document.querySelector('[data-f=\\'all\\']'))" style="margin-top:12px">View All Stories</button></div>`;
  } else {
    grid.innerHTML = slice.map((a,i) => cardHtml(a,i)).join('');
  }
  
  const btn = document.getElementById('loadMoreBtn');
  if (btn) btn.style.display = arts.length > visibleCount ? 'inline-flex' : 'none';
}

function cardHtml(a, idx=0) {
  const delay = (idx%6)*55;
  const media = a.mediaSrc
    ? (a.mediaType==='video'
        ? `<video class="card-img" src="${a.mediaSrc}" muted loop autoplay playsinline></video>`
        : `<img class="card-img" src="${a.mediaSrc}" alt="${a.title}" loading="lazy">`)
    : `<div class="card-no-img">${catIcon(a.category)}</div>`;
  const badges = [
    a.breaking ? '<span class="badge badge-breaking">Breaking</span>':'',
    a.featured  ? '<span class="badge badge-featured">Featured</span>':'',
    a.mediaType==='video' ? '<span class="badge badge-video">Video</span>':''
  ].filter(Boolean).join('');
  
  return `
    <a class="article-card" href="#article/${a.id}" style="animation-delay:${delay}ms;text-decoration:none;display:flex;flex-direction:column;">
      <div class="card-media">
        ${media}
        ${a.mediaType==='video'?'<div class="card-video-tag">VIDEO</div>':''}
      </div>
      <div class="card-body">
        <div class="card-meta-row">
          <span class="card-cat">${catLabel(a.category)}</span>
          <span class="card-time">${timeAgo(a.timestamp)}</span>
        </div>
        <div class="card-title">${a.title}</div>
        ${a.excerpt?`<div class="card-excerpt">${a.excerpt.substring(0,115)}${a.excerpt.length>115?'…':''}</div>`:''}
        <div class="card-footer">
          <span class="card-author">${a.author}</span>
          <div class="card-badges">${badges}</div>
        </div>
      </div>
    </a>`;
}

function filterArticles(f, btn) {
  currentFilter = f; 
  visibleCount = 6;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  
  // Show skeleton during filter
  const grid = document.getElementById('articlesGrid');
  grid.style.opacity = '0.5';
  setTimeout(() => {
    renderGrid();
    grid.style.opacity = '1';
  }, 150);
}

function loadMore() { 
  visibleCount += 6; 
  const btn = document.getElementById('loadMoreBtn');
  btn.innerHTML = 'Loading...';
  setTimeout(() => {
    renderGrid();
    btn.innerHTML = 'Load More Stories ↓';
  }, 300);
}

// ===== CATEGORY =====
function renderCategory(cat) {
  document.getElementById('catIcon').textContent  = catIcon(cat);
  document.getElementById('catTitle').textContent = catLabel(cat);
  document.getElementById('catSub').textContent   = catDesc(cat);
  const arts = getPublished().filter(a => a.category===cat).sort((a,b) => b.timestamp-a.timestamp);
  const grid = document.getElementById('catGrid');
  grid.innerHTML = arts.length ? arts.map((a,i) => cardHtml(a,i)).join('') : 
    `<div class="empty-state"><div>${catIcon(cat)}</div><p>No ${catLabel(cat)} stories yet</p><button class="gold-btn" onclick="navigateTo('home')" style="margin-top:16px">Browse All News</button></div>`;
}

// ===== ARTICLE DETAIL =====
function renderArticleDetail(a) {
  // Increment view
  const all = getArticles();
  const idx = all.findIndex(x => x.id===a.id);
  if (idx>=0) { all[idx].views = (all[idx].views||0)+1; Store.set('articles', all); }

  // Breadcrumb
  const bc = document.getElementById('breadcrumb');
  bc.innerHTML = `
    <a href="#home">Home</a><span class="breadcrumb-sep">/</span>
    <a href="#${a.category}">${catLabel(a.category)}</a><span class="breadcrumb-sep">/</span>
    <span style="color:var(--t2)">${a.title.substring(0,60)}${a.title.length>60?'…':''}</span>`;

  const mediaSrc = a.mediaSrc;
  const mediaHtml = mediaSrc
    ? (a.mediaType==='video'
        ? `<div class="art-cover"><video controls src="${mediaSrc}" preload="metadata"></video></div>`
        : `<div class="art-cover" onclick="openLightbox('${mediaSrc}','image')" style="cursor:zoom-in" title="Click to enlarge"><img src="${mediaSrc}" alt="${a.title}" loading="eager"></div>`)
    : '';
  const embedHtml = a.extLink ? buildEmbed(a.extLink) : '';
  const tags = (a.tags||[]).map(t => `<span class="art-tag" onclick="filterAndGo('${t}')">#${t}</span>`).join('');

  const det = document.getElementById('articleDetail');
  det.innerHTML = `
    <div class="art-cat-tag">${catIcon(a.category)} ${catLabel(a.category)}</div>
    <h1 class="art-headline">${a.title}</h1>
    <div class="art-meta">
      <span>✍️ ${a.author}</span>
      <span>🕐 ${formatDate(a.timestamp)}</span>
      <span>👁 ${(a.views||0).toLocaleString()} views</span>
      ${a.breaking ? '<span class="badge badge-breaking">Breaking</span>':''}
      ${a.featured  ? '<span class="badge badge-featured">Featured</span>':''}
    </div>
    ${mediaHtml}
    <div class="art-text">${a.body||''}</div>
    ${embedHtml}
    ${a.extLink ? `<a href="${a.extLink}" target="_blank" rel="noopener noreferrer" class="art-ext-link">🔗 View External Source →</a>` : ''}
    <div class="art-tags">${tags}</div>
    <div class="share-bar">
      <span class="share-label">Share:</span>
      <button class="share-btn share-x" onclick="shareArticle('twitter','${a.id}')">𝕏 Twitter</button>
      <button class="share-btn share-fb" onclick="shareArticle('facebook','${a.id}')">Facebook</button>
      <button class="share-btn share-wa" onclick="shareArticle('whatsapp','${a.id}')">WhatsApp</button>
      <button class="share-btn share-copy" onclick="copyLink('${a.id}')">📋 Copy</button>
    </div>
    <div class="related-section">
      <div class="related-title">Related Stories</div>
      <div class="cards-grid" id="relGrid"></div>
    </div>`;

  // Related
  const related = getPublished().filter(x => x.id!==a.id && x.category===a.category).sort(()=>Math.random()-.5).slice(0,3);
  const rg = document.getElementById('relGrid');
  if (rg) rg.innerHTML = related.length ? related.map((r,i) => cardHtml(r,i)).join('') : '<p style="color:var(--t3)">No related stories</p>';

  renderArticleAside(a);
}

function renderArticleAside(current) {
  const aside = document.getElementById('articleAside');
  if (!aside) return;
  const trending = getPublished().sort((a,b)=>(b.views||0)-(a.views||0)).filter(a=>a.id!==current.id).slice(0,5);
  aside.innerHTML = `
    <div class="aside-block">
      <div class="aside-head">🔥 Trending Now</div>
      ${trending.length ? trending.map(a => `
        <a class="aside-story" href="#article/${a.id}" style="text-decoration:none">
          ${a.mediaSrc ? `<img class="aside-story-img" src="${a.mediaSrc}" alt="${a.title}" loading="lazy">` : `<div class="aside-story-img" style="display:flex;align-items:center;justify-content:center;font-size:20px">${catIcon(a.category)}</div>`}
          <div>
            <div class="aside-story-cat">${catLabel(a.category)}</div>
            <div class="aside-story-title">${a.title}</div>
          </div>
        </a>`).join('') : '<div style="padding:12px;color:var(--t3);font-size:12px">No trending stories</div>'}
    </div>`;
}

function filterAndGo(tag) {
  navigateTo('home');
  setTimeout(() => {
    currentFilter = 'all'; visibleCount = 6;
    const filtered = getPublished().filter(a => (a.tags||[]).includes(tag));
    const grid = document.getElementById('articlesGrid');
    if (grid) grid.innerHTML = filtered.map((a,i) => cardHtml(a,i)).join('');
    toast(`Showing articles tagged: ${tag}`, 'info');
  }, 200);
}

function buildEmbed(url) {
  if (!url) return '';
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (yt) return `<div class="art-embed"><iframe width="100%" height="380" src="https://www.youtube.com/embed/${yt[1]}" allowfullscreen loading="lazy"></iframe></div>`;
  const tw = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
  if (tw) return `<div class="art-embed" style="padding:16px;background:var(--g1)"><blockquote><a href="${url}">View Tweet →</a></blockquote></div>`;
  return '';
}

function shareArticle(platform, id) {
  const a = getById(id); if (!a) return;
  const text = encodeURIComponent(a.title + ' — ' + SITE_NAME);
  const url  = encodeURIComponent(location.href);
  const map  = {
    twitter:   `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    facebook:  `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsapp:  `https://wa.me/?text=${text}%20${url}`
  };
  if (map[platform]) window.open(map[platform],'_blank','width=600,height=400');
}
function copyLink(id) {
  navigator.clipboard.writeText(location.href).then(() => toast('Link copied!','success'));
}

// ===== LIGHTBOX =====
function openLightbox(src, type) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxMedia').innerHTML = type==='video'
    ? `<video src="${src}" controls autoplay style="max-width:90vw;max-height:90vh;border-radius:16px"></video>`
    : `<img src="${src}" alt="Media" style="max-width:90vw;max-height:90vh;border-radius:16px;object-fit:contain">`;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== ADMIN (unchanged core, kept for brevity) =====
function showAdminLogin() {
  document.getElementById('adminLoginModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('adminUser').focus(), 150);
}
function closeAdminModal(e) {
  if (e && e.target !== document.getElementById('adminLoginModal')) return;
  _closeLogin();
}
function _closeLogin() {
  document.getElementById('adminLoginModal').classList.remove('open');
  document.getElementById('loginError').classList.remove('show');
  document.getElementById('adminUser').value = '';
  document.getElementById('adminPass').value = '';
  if (!document.getElementById('adminShell').classList.contains('open')) {
    document.body.style.overflow = '';
  }
}
function doLogin() {
  const u = (document.getElementById('adminUser').value||'').trim();
  const p = (document.getElementById('adminPass').value||'');
  const err = document.getElementById('loginError');
  if (u === ADMIN_USER && p === ADMIN_PASS) {
    Store.set('adminAuth', true);
    _closeLogin();
    openAdminDashboard();
    toast('Welcome back, Editor! 🎉', 'success');
  } else {
    err.textContent = 'Incorrect credentials. Please check your username and password.';
    err.classList.add('show');
    document.getElementById('adminPass').value = '';
    document.getElementById('adminPass').focus();
  }
}
function togglePw(btn) {
  const inp = btn.previousElementSibling;
  inp.type = inp.type==='password' ? 'text' : 'password';
}
function openAdminDashboard() {
  document.getElementById('adminShell').classList.add('open');
  document.body.style.overflow = 'hidden';
  adminTab('posts', document.querySelector('.anav-btn'));
}
function adminLogout() {
  Store.set('adminAuth', false);
  document.getElementById('adminShell').classList.remove('open');
  document.body.style.overflow = '';
  toast('Logged out', 'info');
}
function toggleAdminSidebar() {
  const side = document.getElementById('adminSide');
  adminSideOpen = !adminSideOpen;
  side.classList.toggle('open', adminSideOpen);
}
function adminTab(tab, btn) {
  document.querySelectorAll('.anav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const c = document.getElementById('adminContent');
  if (tab==='posts')    renderAdminPosts(c);
  else if (tab==='new') openEditor(null);
  else if (tab==='media')   renderAdminMedia(c);
  else if (tab==='ticker')  renderAdminTicker(c);
  else if (tab==='seo')     renderAdminSEO(c);
  else if (tab==='settings') renderAdminSettings(c);
}

// Admin render functions (abbreviated for V2)
function renderAdminPosts(c) {
  const arts = getArticles().sort((a,b)=>b.timestamp-a.timestamp);
  const pub = arts.filter(a=>a.published).length;
  const totalViews = arts.reduce((s,a)=>s+(a.views||0),0);
  c.innerHTML = `
    <h2 class="admin-page-title">All Posts</h2>
    <div class="astats">
      <div class="astat"><div class="astat-val">${arts.length}</div><div class="astat-lbl">Total Posts</div></div>
      <div class="astat"><div class="astat-val">${pub}</div><div class="astat-lbl">Published</div></div>
      <div class="astat"><div class="astat-val">${arts.length-pub}</div><div class="astat-lbl">Drafts</div></div>
      <div class="astat"><div class="astat-val">${totalViews.toLocaleString()}</div><div class="astat-lbl">Total Views</div></div>
    </div>
    <button class="admin-new-btn" onclick="openEditor(null)">+ New Post</button>
    ${arts.map(a => `
      <div class="admin-post-row">
        <div class="status-dot ${a.published?'pub':'draft'}"></div>
        ${a.mediaSrc ? `<img class="admin-post-thumb" src="${a.mediaSrc}" alt="">` : `<div class="admin-post-thumb-ph">${catIcon(a.category)}</div>`}
        <div class="admin-post-info">
          <div class="admin-post-title">${a.title}</div>
          <div class="admin-post-meta">${catLabel(a.category)} · ${timeAgo(a.timestamp)} · ${(a.views||0).toLocaleString()} views · ${a.published?'Published':'Draft'}</div>
        </div>
        <div class="admin-post-actions">
          <button class="btn-edit" onclick="openEditor('${a.id}')">Edit</button>
          <button class="btn-delete" onclick="deletePost('${a.id}')">Delete</button>
        </div>
      </div>`).join('')}
    ${!arts.length ? '<div class="empty-state"><div>📰</div><p>No posts yet. Create your first post!</p></div>' : ''}`;
}
function renderAdminMedia(c) {
  const arts = getArticles().filter(a=>a.mediaSrc);
  c.innerHTML = `
    <h2 class="admin-page-title">Media Library</h2>
    <div class="media-grid">
      ${arts.map(a=>`
        <div class="media-item" onclick="openLightbox('${a.mediaSrc}','${a.mediaType||'image'}')">
          ${a.mediaType==='video' ? `<video src="${a.mediaSrc}" muted>` : `<img src="${a.mediaSrc}" alt="" loading="lazy">`}
          <div class="media-item-over">${a.mediaType==='video'?'▶ Play':'🔍 View'}</div>
        </div>`).join('')}
    </div>`;
}
function renderAdminTicker(c) {
  const items = Store.get('ticker',[]);
  c.innerHTML = `
    <h2 class="admin-page-title">Breaking News Ticker</h2>
    <div class="ticker-edit-row">
      <input type="text" id="newTicker" placeholder="Enter breaking news headline…" onkeydown="if(event.key==='Enter')addTicker()">
      <button class="gold-btn sm" style="width:auto;flex-shrink:0" onclick="addTicker()">Add</button>
    </div>
    <div class="ticker-list">
      ${items.map((t,i)=>`
        <div class="ticker-item-row">
          <span class="ti-text">${t}</span>
          <button class="ti-del" onclick="removeTicker(${i})">✕</button>
        </div>`).join('')}
    </div>`;
}
function addTicker() {
  const inp = document.getElementById('newTicker');
  const t = inp.value.trim(); if (!t) return;
  const items = Store.get('ticker',[]); items.unshift(t); Store.set('ticker',items);
  inp.value=''; initTicker(); renderAdminTicker(document.getElementById('adminContent'));
  toast('Ticker updated','success');
}
function removeTicker(i) {
  const items = Store.get('ticker',[]); items.splice(i,1); Store.set('ticker',items);
  initTicker(); renderAdminTicker(document.getElementById('adminContent'));
}
function renderAdminSEO(c) { c.innerHTML = `<h2 class="admin-page-title">SEO Tools</h2><p>SEO features active. Sitemap generation available.</p>`; }
function renderAdminSettings(c) { c.innerHTML = `<h2 class="admin-page-title">Settings</h2><button class="glass-btn" onclick="if(confirm('Clear all?')){Store.clear('articles');toast('Cleared','info');}">Clear Data</button>`; }
function deletePost(id) {
  if (!confirm('Delete this post?')) return;
  Store.set('articles', getArticles().filter(a=>a.id!==id));
  renderAdminPosts(document.getElementById('adminContent'));
  toast('Post deleted','info');
}

// ===== EDITOR =====
function openEditor(id) {
  editingId = id;
  uploadedSrc = null; uploadedType = null;
  document.getElementById('editorTitle').textContent = id ? 'Edit Post' : 'New Post';
  const a = id ? getById(id) : null;
  const v = (sid, val='') => { const el=document.getElementById(sid); if(el){ if(el.tagName==='DIV') el.innerHTML=val; else el.value=val; } };
  v('postTitle',    a?.title||'');
  v('postExcerpt',  a?.excerpt||'');
  v('editorArea',   a?.body||'');
  v('postCategory', a?.category||'');
  v('postAuthor',   a?.author||'YaadNews Staff');
  v('postTags',     (a?.tags||[]).join(', '));
  v('postExtLink',  a?.extLink||'');
  v('postSeoTitle', a?.seoTitle||'');
  v('postSeoDesc',  a?.seoDesc||'');
  v('postKeyword',  a?.keyword||'');
  const cb = (sid, val) => { const el=document.getElementById(sid); if(el) el.checked=!!val; };
  cb('postBreaking',   a?.breaking);
  cb('postFeatured',   a?.featured);
  cb('postPublished',  a?.published!==false);
  const prev = document.getElementById('mediaPreview');
  if (prev) {
    if (a?.mediaSrc) {
      uploadedSrc = a.mediaSrc; uploadedType = a.mediaType||'image';
      prev.innerHTML = a.mediaType==='video' ? `<video src="${a.mediaSrc}" controls style="width:100%;border-radius:8px;margin-top:10px"></video>` : `<img src="${a.mediaSrc}" alt="Cover" style="border-radius:8px;margin-top:10px">`;
    } else prev.innerHTML = '';
  }
  document.getElementById('editorModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeEditor() {
  document.getElementById('editorModal').classList.remove('open');
  document.body.style.overflow = '';
}
function fmt(cmd) { document.execCommand(cmd,false,null); document.getElementById('editorArea').focus(); }
function insertH2() { document.execCommand('formatBlock',false,'h2'); }
function insertQuote() { document.execCommand('formatBlock',false,'blockquote'); }
function insertLink() { const url = prompt('Enter URL:'); if (url) document.execCommand('createLink',false,url); }
function insertEmbed() {
  const url = prompt('Enter image/video URL or YouTube link:');
  if (!url) return;
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (yt) document.execCommand('insertHTML',false,`<div class="art-embed" contenteditable="false"><iframe width="100%" height="315" src="https://www.youtube.com/embed/${yt[1]}" allowfullscreen></iframe></div><p></p>`);
  else if (/\.(mp4|webm|ogg)$/i.test(url)) document.execCommand('insertHTML',false,`<video src="${url}" controls style="max-width:100%;border-radius:8px"></video><p></p>`);
  else document.execCommand('insertHTML',false,`<img src="${url}" style="max-width:100%;border-radius:8px"><p></p>`);
}
function handleUpload(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    uploadedSrc  = ev.target.result;
    uploadedType = file.type.startsWith('video') ? 'video' : 'image';
    const prev = document.getElementById('mediaPreview');
    prev.innerHTML = uploadedType==='video' ? `<video src="${uploadedSrc}" controls style="width:100%;border-radius:8px;margin-top:10px"></video>` : `<img src="${uploadedSrc}" style="border-radius:8px;margin-top:10px;width:100%">`;
    toast('Media uploaded ✓','success');
  };
  reader.readAsDataURL(file);
}
function initDragDrop() {
  const zone = document.getElementById('uploadZone');
  if (!zone) return;
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
  zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('drag'); const file = e.dataTransfer.files[0]; if (file) handleUpload({target:{files:e.dataTransfer.files}}); });
}
function savePost(mode) {
  const g = id => document.getElementById(id);
  const title = (g('postTitle')?.value||'').trim();
  const category = g('postCategory')?.value||'';
  const body = g('editorArea')?.innerHTML||'';
  if (!title) { toast('Please enter a headline','error'); return; }
  if (!category) { toast('Please select a category','error'); return; }

  const arts = getArticles();
  const now = Date.now();
  const existing = editingId ? getById(editingId) : null;
  const post = {
    id: editingId || 'art_'+now,
    title, excerpt: (g('postExcerpt')?.value||'').trim(), body, category,
    author: (g('postAuthor')?.value||'').trim() || 'YaadNews Staff',
    tags: (g('postTags')?.value||'').split(',').map(t=>t.trim()).filter(Boolean),
    mediaSrc: uploadedSrc || existing?.mediaSrc || null,
    mediaType: uploadedType || existing?.mediaType || 'image',
    extLink: (g('postExtLink')?.value||'').trim(),
    seoTitle: (g('postSeoTitle')?.value||'').trim(),
    seoDesc: (g('postSeoDesc')?.value||'').trim(),
    keyword: (g('postKeyword')?.value||'').trim(),
    breaking: g('postBreaking')?.checked||false,
    featured: g('postFeatured')?.checked||false,
    published: mode==='publish' ? true : (g('postPublished')?.checked||false),
    timestamp: existing?.timestamp || now,
    views: existing?.views || 0
  };
  if (editingId) { const i = arts.findIndex(a=>a.id===editingId); if (i>=0) arts[i]=post; else arts.unshift(post); }
  else arts.unshift(post);
  Store.set('articles', arts);
  closeEditor();
  if (post.breaking) { const items = Store.get('ticker',[]); if (!items.includes(title)) { items.unshift(title); Store.set('ticker',items); initTicker(); } }
  toast(mode==='publish' ? '🎉 Post published!' : '💾 Draft saved', 'success');
  if (Store.get('adminAuth') && document.getElementById('adminShell').classList.contains('open')) renderAdminPosts(document.getElementById('adminContent'));
  renderHome();
}

// ===== TOASTS =====
function toast(msg, type='info') {
  const stack = document.getElementById('toasts');
  const icons = {success:'✓',error:'✕',info:'ℹ'};
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ'}</span><span>${msg}</span>`;
  stack.appendChild(el);
  setTimeout(()=>{ el.classList.add('out'); setTimeout(()=>el.remove(),350); }, 3200);
}

// Expose necessary functions to window
window.navigateTo = navigateTo;
window.filterArticles = filterArticles;
window.loadMore = loadMore;
window.closeSideNav = closeSideNav;
window.showAdminLogin = showAdminLogin;
window.closeAdminModal = closeAdminModal;
window.doLogin = doLogin;
window.togglePw = togglePw;
window.closeSearch = closeSearch;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.shareArticle = shareArticle;
window.copyLink = copyLink;
window.filterAndGo = filterAndGo;
window.adminTab = adminTab;
window.toggleAdminSidebar = toggleAdminSidebar;
window.adminLogout = adminLogout;
window.openEditor = openEditor;
window.closeEditor = closeEditor;
window.savePost = savePost;
window.fmt = fmt;
window.insertH2 = insertH2;
window.insertQuote = insertQuote;
window.insertLink = insertLink;
window.insertEmbed = insertEmbed;
window.handleUpload = handleUpload;
window.addTicker = addTicker;
window.removeTicker = removeTicker;
window.deletePost = deletePost;
window.generateSitemap = () => toast('Sitemap generated','success');
