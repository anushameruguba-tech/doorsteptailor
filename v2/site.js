/* ===== Settings: edit these ===== */
const WHATSAPP = '447938020707';
const EMAIL = 'anushamerugu.ba@gmail.com';
/* Add your real profile links. Empty ones are hidden. */
const SOCIAL = {
  whatsapp: 'https://wa.me/447938020707',
  instagram: '',
  facebook: '',
  tiktok: '',
  google: ''
};
/* Add 7-8 REAL customer comments here, with their permission:
   ['Comment text', 'First name, area'] */
const TESTIMONIALS = [
];

/* ===== Price list ===== */
const Q = 'Quote required';
const DATA = {
"Coat":[["Re-stitch button","£4.99"],["New button","£7.99"],["Shorten lined sleeves","£50.99"],["Re-hem – basic","£25.49"],["Waist – take in","£40.79"],["Waist – let out","£40.79"],["Waist + hips – basic","£45.89"],["Vent – basic","£24.49"],["Re-line – full","£71.39"],["Sleeve length alterations",Q],["Other coat alteration",Q]],
"Jacket":[["Button resew","£4.99"],["New button","£7.99"],["Shorten sleeves – normal","£46.99"],["Shorten sleeves – original finish","£61.19"],["Shorten sleeves with vent","£91.79"],["Lengthen sleeve – normal","£46.99"],["Lengthen sleeve with vent","£61.19"],["Lengthen from shoulder","£91.79"],["Re-line","£71.39"],["Elbow patch","£45.89"],["Emblem","£20.39"],["Other jacket alteration",Q]],
"Dress":[["New button","£7.99"],["Sleeves – basic","£30.59"],["Sleeves – same finish","£46.99"],["Sleeves – original finish","£46.99"],["Reverse collar",Q],["Reverse cuff",Q],["Side taper – basic",Q],["Other dress alteration",Q]],
"Skirt":[["Re-hem / shorten",Q],["Waist alteration",Q],["Re-line",Q],["Formal / evening skirt",Q],["Part pleated",Q],["Fully pleated",Q],["Other skirt alteration",Q]],
"Shirt":[["Button resew","£4.99"],["New button","£7.99"],["Shorten sleeves",Q],["Shorten shirt",Q],["Take in sides",Q],["Other shirt alteration",Q]],
"Top":[["Button resew","£4.99"],["New button","£7.99"],["Sleeve alteration",Q],["Take in / taper",Q],["Other top alteration",Q]],
"Trousers":[["Shorten trousers","£30.59"],["Shorten – original finish","£35.69"],["Lengthen trousers","£30.59"],["Re-hem 1 leg","£19.39"],["Re-hem 2 legs","£27.59"],["Take in waist","£33.69"],["Let out waist","£33.69"],["Elastic / waist","£33.69"],["Taper – half","£39.79"],["Taper – full","£50.99"],["New zip – normal","£30.59"],["New zip – invisible","£35.69"],["Renew crotch seam","£19.39"],["Resew seam","£17.39"],["Re-line half","£61.19"],["Re-line full","£71.39"],["½ pocket","£30.59"],["Full pocket","£40.79"],["Belt loop","£20.39"],["Patch – size 1","£23.49"],["Patch – size 2","£30.59"],["Patch – size 3","£37.79"],["Button resew","£4.99"],["New button","£7.99"],["Other trouser alteration",Q]],
"Jeans":[["Shorten jeans",Q],["Original / chain finish",Q],["Taper jeans",Q],["Zip / seam repair",Q],["Other jeans alteration",Q]],
"Bridal & Occasionwear":[["Bridal fitting / alteration",Q],["Dress adjustment",Q],["Hem / length adjustment",Q],["Complex / bespoke work","Personal quotation"]],
"Curtains & Household":[["Curtain shortening",Q],["Curtain lining repair",Q],["Seam / fabric repair",Q],["Other household fabric work",Q]]
};

/* ===== Helpers ===== */
const $ = id => document.getElementById(id);
const num = p => /^£/.test(p) ? parseFloat(p.slice(1)) : null;
const money = n => '£' + n.toFixed(2);
const store = {
  get(){ try { return JSON.parse(sessionStorage.getItem('soc_sel') || '{}'); } catch(e){ return {}; } },
  set(v){ try { sessionStorage.setItem('soc_sel', JSON.stringify(v)); } catch(e){} }
};
let sel = store.get();
document.documentElement.classList.add('js');

/* ===== Price page ===== */
if ($('priceList')) {
  const cats = $('categories'), list = $('priceList');
  let cur = decodeURIComponent((location.hash || '').slice(1)).replace(/-/g,' ');
  const keys = Object.keys(DATA);
  cur = keys.find(k => k.toLowerCase().replace(/&/g,'and').replace(/\s+/g,' ') === cur.toLowerCase().replace(/&/g,'and')) || 'Coat';
  function show(cat){
    cur = cat;
    $('selectedTitle').textContent = cat;
    list.innerHTML = '';
    DATA[cat].forEach(([name, price]) => {
      const k = cat + '|' + name, d = document.createElement('div');
      d.className = 'price-card' + (sel[k] ? ' sel' : '');
      d.tabIndex = 0; d.setAttribute('role','checkbox'); d.setAttribute('aria-checked', !!sel[k]);
      d.innerHTML = '<strong></strong><div class="price"></div>';
      d.children[0].textContent = name; d.children[1].textContent = price;
      const t = () => { if (sel[k]) delete sel[k]; else sel[k] = {c:cat, n:name, p:price}; store.set(sel); show(cat); bar(); };
      d.onclick = t; d.onkeydown = e => { if (e.key===' '||e.key==='Enter'){ e.preventDefault(); t(); } };
      list.appendChild(d);
    });
    document.querySelectorAll('.cat').forEach(b => b.classList.toggle('active', b.dataset.c === cat));
  }
  function bar(){
    const ks = Object.keys(sel); let tot = 0, q = 0;
    ks.forEach(k => { const v = num(sel[k].p); if (v !== null) tot += v; else q++; });
    $('selbar').classList.toggle('show', ks.length > 0);
    $('selTxt').textContent = ks.length + ' selected · ' + money(tot) + (q ? ' + ' + q + ' to quote' : '');
  }
  keys.forEach(c => { const b = document.createElement('button'); b.type='button'; b.className='cat'; b.textContent=c; b.dataset.c=c; b.onclick=()=>show(c); cats.appendChild(b); });
  show(cur); bar();
}

/* ===== Home: category teaser ===== */
if ($('catTeaser')) {
  Object.keys(DATA).forEach(c => {
    const a = document.createElement('a');
    a.href = 'prices.html#' + c.toLowerCase().replace(/&/g,'and').replace(/\s+/g,'-');
    const priced = DATA[c].map(i => num(i[1])).filter(v => v !== null);
    a.innerHTML = '<span></span><small></small>';
    a.children[0].textContent = c;
    a.children[1].textContent = priced.length ? 'from ' + money(Math.min(...priced)) : 'Quote on request';
    $('catTeaser').appendChild(a);
  });
}

/* ===== Home: quote form ===== */
if ($('quoteForm')) {
  const svc = $('service');
  Object.keys(DATA).forEach(c => { const o = document.createElement('option'); o.value = o.textContent = c; svc.appendChild(o); });
  function summ(){
    const ks = Object.keys(sel), ul = $('selList'); let tot = 0, q = 0; ul.innerHTML = '';
    if (!ks.length) { ul.innerHTML = '<li class="empty"><span>Nothing selected yet. <a href="prices.html">Choose from the price list</a>, or just describe the work below.</span></li>'; $('clearSel').style.display='none'; return; }
    $('clearSel').style.display='inline';
    ks.forEach(k => { const s = sel[k], v = num(s.p), li = document.createElement('li'); if (v !== null) tot += v; else q++;
      li.innerHTML = '<span></span><span></span>'; li.children[0].textContent = s.c + ' – ' + s.n; li.children[1].textContent = v !== null ? money(v) : 'quote'; ul.appendChild(li); });
    const li = document.createElement('li'); li.className = 'tot';
    li.innerHTML = '<span>Estimated total' + (q ? ' (+' + q + ' to quote)' : '') + '</span><span>' + money(tot) + '</span>'; ul.appendChild(li);
    svc.value = sel[ks[0]].c;
  }
  $('clearSel').onclick = () => { sel = {}; store.set(sel); summ(); };
  summ();
  let via = 'wa', photos = [];
  document.querySelectorAll('[data-via]').forEach(b => b.addEventListener('click', () => via = b.dataset.via));
  $('photos').addEventListener('change', function(){ const t = $('thumbs'); t.innerHTML = ''; photos = [...this.files];
    photos.forEach(f => { const i = document.createElement('img'); i.alt = f.name; i.src = URL.createObjectURL(f); t.appendChild(i); }); });
  $('quoteForm').addEventListener('submit', e => {
    e.preventDefault();
    const g = id => $(id).value.trim(), ks = Object.keys(sel); let tot = 0;
    const L = ['New quote request – The Seamstress of Chelsea','','Name: '+g('name'),'Mobile: '+g('mobile'),'Postcode: '+g('postcode')];
    if (!ks.length) L.push('Garment: ' + g('service'));
    L.push('');
    if (ks.length) { L.push('Selected:'); ks.forEach(k => { const s = sel[k], v = num(s.p); if (v !== null) tot += v; L.push('- ' + s.c + ' – ' + s.n + ' (' + s.p + ')'); }); L.push('Reference estimate: ' + money(tot), ''); }
    L.push('Instructions: ' + g('details'));
    if (photos.length) L.push('', 'Photos: ' + photos.length + ' (attached)');
    const txt = L.join('\n');
    const url = via === 'wa' ? 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(txt)
      : 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Quote request – ' + g('name')) + '&body=' + encodeURIComponent(txt);
    $('formMessage').innerHTML = 'Thank you. Your request is ready.' + (photos.length ? ' <b>Please attach your ' + photos.length + ' photo' + (photos.length > 1 ? 's' : '') + ' before sending.</b>' : '') + ' <a target="_blank" rel="noopener" href="' + url + '">Open ' + (via === 'wa' ? 'WhatsApp' : 'Email') + ' →</a>';
    try { window.open(url, '_blank'); } catch(x) {}
  });
}

/* ===== Testimonials (only shown when real ones are added) ===== */
if ($('testimonials') && TESTIMONIALS.length) {
  $('testimonialsSec').hidden = false;
  TESTIMONIALS.forEach(([t, who]) => { const d = document.createElement('div'); d.className = 'review reveal';
    d.innerHTML = '<div class="stars">★★★★★</div><p></p><small></small>'; d.children[1].textContent = '“' + t + '”'; d.children[2].textContent = '— ' + who; $('testimonials').appendChild(d); });
}

/* ===== Social links ===== */
const ICONS = {
  whatsapp:'<path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 1.9 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.4.2.5.3 0 .2 0 .8-.2 1.4z"/>',
  instagram:'<path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zM17.3 5.5a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM12 2c-2.7 0-3 0-4.1.1C4.3 2.2 2.3 4.2 2.1 7.9 2 9 2 9.3 2 12s0 3 .1 4.1c.2 3.6 2.2 5.6 5.8 5.8 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c3.6-.2 5.6-2.2 5.8-5.8.1-1.1.1-1.4.1-4.1s0-3-.1-4.1c-.2-3.6-2.2-5.6-5.8-5.8C15 2 14.7 2 12 2z"/>',
  facebook:'<path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.6V14h2.7v8z"/>',
  tiktok:'<path d="M16.6 5.8A4.3 4.3 0 0115.5 3h-3.2v12.4a2.6 2.6 0 11-1.8-2.5V9.6a5.8 5.8 0 105 5.8V9.1a7.4 7.4 0 004.3 1.4V7.3a4.3 4.3 0 01-3.2-1.5z"/>',
  google:'<path d="M21.6 10.2H12v3.9h5.5c-.5 2.5-2.6 3.9-5.5 3.9a6 6 0 010-12c1.5 0 2.9.5 3.9 1.5l2.9-2.9A10 10 0 1012 22c5.8 0 9.7-4.1 9.7-9.8 0-.7-.1-1.4-.1-2z"/>'
};
const LABELS = {whatsapp:'WhatsApp',instagram:'Instagram',facebook:'Facebook',tiktok:'TikTok',google:'Google reviews'};
if ($('socialIcons')) {
  Object.keys(SOCIAL).forEach(k => { if (!SOCIAL[k]) return; const a = document.createElement('a'); a.href = SOCIAL[k]; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', LABELS[k]); a.title = LABELS[k];
    a.innerHTML = '<svg viewBox="0 0 24 24">' + ICONS[k] + '</svg>'; $('socialIcons').appendChild(a); });
}

/* ===== Scissors cutting fabric on scroll ===== */
(function(){
  const cut = $('cut'); if (!cut || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const svg = cut.querySelector('svg'), slit = cut.querySelector('.slit'), a = $('bladeA'), b = $('bladeB');
  let last = 0, ticking = false;
  function draw(){
    ticking = false;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const p = Math.min(1, Math.max(0, scrollY / max));
    const h = cut.clientHeight, sh = svg.clientHeight;
    const y = p * (h - sh);
    svg.style.transform = 'translateY(' + y + 'px)';
    slit.style.height = (y + sh * 0.55) + 'px';
    const ang = 4 + Math.abs(Math.sin(scrollY / 22)) * 16;
    a.setAttribute('transform', 'rotate(' + (-ang) + ' 20 30)');
    b.setAttribute('transform', 'rotate(' + ang + ' 20 30)');
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(draw); } }, {passive:true});
  addEventListener('resize', draw); draw();
})();

/* ===== Reveal on scroll ===== */
(function(){
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.12});
  els.forEach(e => io.observe(e));
  setTimeout(() => els.forEach(e => e.classList.add('in')), 2500);
})();

/* ===== Chat assistant ===== */
(function(){
  if (!$('cbBtn')) return;
  const A = {
    prices: "See our price list for every garment. For example, shortening trousers is £30.59. Prices are for reference, and regular work can be discounted.",
    collect: "We collect and return across Chelsea. There is no shop to visit.",
    quote: "Choose your alterations, then add photos and your details in the quote form. WhatsApp is the quickest way to reach us.",
    discount: "Yes. Prices are for reference, and we offer discounts for regular or repeat work. Just ask when we call.",
    bridal: "Yes, we work on bridal and occasionwear. Send photos for a personal quotation.",
    curtain: "Yes, we shorten and repair curtains and household fabrics. Send photos and dimensions.",
    human: "Of course. Call or WhatsApp us on 07938 020707 and a person will help.",
    hi: "Hello! I can help with prices, collection or quotes.",
    fb: "I'm not sure about that. Please WhatsApp us on 07938 020707 and we'll help."
  };
  const K = [['human',/human|person|talk|call|whatsapp|speak/],['discount',/discount|regular|offer|deal|cheaper/],['prices',/price|cost|how much|£/],['collect',/collect|pick|deliver|shop|visit|where|area/],['quote',/quote|photo|book|order/],['bridal',/bridal|wedding|gown|occasion/],['curtain',/curtain|household|fabric/],['hi',/^(hi|hello|hey)/]];
  const log = $('cbLog'), box = $('cb'); let st = 0;
  const add = (t, w) => { const d = document.createElement('div'); d.className = 'm ' + w; d.textContent = t; log.appendChild(d); log.scrollTop = log.scrollHeight; };
  const rep = k => setTimeout(() => add(A[k], 'bot'), 300);
  [['Prices','prices'],['Discounts','discount'],['Collection','collect'],['Get a quote','quote'],['Talk to a person','human']].forEach(([l,k]) => {
    const b = document.createElement('button'); b.type = 'button'; b.textContent = l; b.onclick = () => { add(l,'me'); rep(k); }; $('cbQ').appendChild(b); });
  $('cbBtn').onclick = () => { box.classList.toggle('open'); if (!st) { st = 1; add('Hello, welcome to The Seamstress of Chelsea. How can I help?', 'bot'); } };
  $('cbX').onclick = () => box.classList.remove('open');
  $('cbF').addEventListener('submit', e => { e.preventDefault(); const i = $('cbI'), v = i.value.trim(); if (!v) return; add(v,'me'); let k = 'fb'; for (const [kk, re] of K) if (re.test(v.toLowerCase())) { k = kk; break; } rep(k); i.value = ''; });
})();
