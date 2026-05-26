const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));

// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Loading screen =====
(function loading(){
  const loadingEl = document.getElementById('loading');
  const fill = document.getElementById('loadingFill');
  const logs = document.getElementById('loadingLogs');
  const steps = [
    'synthesizing signal…',
    'aligning glitch typography…',
    'warming up glass cards…',
    'spawning ambient particles…',
    'calibrating cursor drift…',
    'checking feed integrity…'
  ];

  let i=0;
  const t = setInterval(()=>{
    if(i < steps.length){
      const line = document.createElement('div');
      line.textContent = `[${String(i+1).padStart(2,'0')}] ${steps[i]}`;
      logs.appendChild(line);
      i++;
      const w = 25 + i*10;
      fill.style.width = Math.min(w, 95) + '%';
    } else {
      clearInterval(t);
      setTimeout(()=>{
        loadingEl.style.transition = 'opacity .35s ease, transform .35s ease';
        loadingEl.style.opacity = '0';
        loadingEl.style.transform = 'scale(.98)';
        setTimeout(()=> loadingEl.remove(), 400);
      }, 500);
    }
  }, 220);
})();



// ===== Ambient particles =====
(function particles(){
  const canvas = document.getElementById('particles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced) return;

  let w=0,h=0,dpr=1;
  const setSize = ()=>{
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(w*dpr);
    canvas.height = Math.floor(h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  };
  setSize();
  window.addEventListener('resize', setSize);

  const count = Math.floor(Math.min(140, Math.max(60, (w*h)/22000)));
  const dots = Array.from({length: count}).map(()=>({
    x: Math.random()*w,
    y: Math.random()*h,
    vx: (Math.random()-.5)*0.35,
    vy: (Math.random()-.5)*0.25,
    r: Math.random()*1.6 + .4,
    a: Math.random()*0.45 + 0.15,
    hue: Math.random() < .18 ? 0 : 210
  }));

  const draw = ()=>{
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<dots.length;i++){
      const p=dots[i];
      p.x += p.vx; p.y += p.vy;
      if(p.x< -20) p.x=w+20; if(p.x> w+20) p.x=-20;
      if(p.y< -20) p.y=h+20; if(p.y> h+20) p.y=-20;

      ctx.beginPath();
      const color = p.hue === 0 ? `rgba(255,45,45,${p.a})` : `rgba(10,132,255,${p.a})`;
      ctx.fillStyle = color;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }

    // subtle linking
    for(let i=0;i<dots.length;i++){
      for(let j=i+1;j<dots.length;j++){
        const a=dots[i], b=dots[j];
        const dx=a.x-b.x, dy=a.y-b.y;
        const dist=Math.hypot(dx,dy);
        if(dist<95){
          ctx.strokeStyle = `rgba(255,255,255,${(1-dist/95)*0.06})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  };
  draw();
})();

// ===== Scroll reveal =====
(function reveal(){
  const els = $$('.reveal');
  if(!('IntersectionObserver' in window) || els.length===0){
    els.forEach(el=>el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    })
  }, {threshold:.12});

  els.forEach(el=>obs.observe(el));
})();

// ===== Dummy posts =====
const posts = [
  {
    title: 'Algorithm Finds a New Personality',
    category: 'Tech',
    date: '2 HOURS AGO',
    desc: 'A recommender system began posting opinions unprompted. Scientists call it “emergent marketing.”',
    tags: ['glitch', 'feeds', 'opinions'] ,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=70'
  },
  {
    title: 'Breaking: Reality Buffering in 4K',
    category: 'Breaking',
    date: '6 HOURS AGO',
    desc: 'Users report smooth visuals with occasional paradox stutters. The internet insists it is “fine.”',
    tags: ['LIVE', 'parody', 'signal'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa89?auto=format&fit=crop&w=1200&q=70'
  },
  {
    title: 'Memes Move Markets (Allegedly)',
    category: 'Finance',
    date: '10 HOURS AGO',
    desc: 'Charts were updated after a single reaction GIF triggered a minor economic event.',
    tags: ['stocks', 'chaos', 'meme-economy'],
    image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1200&q=70'
  },
  {
    title: 'Analog Horror Returns to the Comment Section',
    category: 'Culture',
    date: '1 DAY AGO',
    desc: 'New accounts whisper in lowercase and ask “what did you see?” before disappearing.',
    tags: ['commentary', 'spooky', 'nets'],
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=70'
  },
  {
    title: 'Patch Notes: Humans Included (Again)',
    category: 'Tech',
    date: '1 DAY AGO',
    desc: 'Update adds new features: “overthinking,” “low battery anxiety,” and improved notifications for vibes.',
    tags: ['release', 'vibes', 'updates'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=70'
  },
  {
    title: 'The Newsroom Becomes a Stage',
    category: 'Politics',
    date: '2 DAYS AGO',
    desc: 'Press briefings now include prop fog, dramatic lighting, and a disclaimer nobody reads.',
    tags: ['broadcast', 'mystery', 'stagecraft'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=70'
  }
];

(function renderPosts(){
  const grid = document.querySelector('.grid');
  if(!grid) return;

  grid.innerHTML = posts.map((p, idx)=>{
    const glowTag = idx===0 ? 'glow' : '';
    const tagPills = p.tags.slice(0,3).map((t,i)=>`<span class="pill ${i===0 && idx===0 ? 'glow' : ''}">${t}</span>`).join('');

    return `
      <article class="post-card reveal">
        <div class="card" role="button" tabindex="0" aria-label="Open post: ${escapeHtml(p.title)}">
          <div class="glitchHover" aria-hidden="true"></div>
          <div class="thumb">
            <img src="${p.image}" alt="${escapeHtml(p.title)} thumbnail" loading="lazy" />
          </div>
          <div class="card-body">
            <div class="meta">
              <span class="cat">${escapeHtml(p.category)}</span>
              <span class="time">${escapeHtml(p.date)}</span>
            </div>
            <h3 class="title">${escapeHtml(p.title)}</h3>
            <p class="desc">${escapeHtml(p.desc)}</p>
            <div class="tags">${tagPills}</div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // click behavior (fake)
  $$('.card').forEach((card)=>{
    const article = card.closest('.post-card');
    const title = card.querySelector('.title')?.textContent || 'post';
    const open = ()=>{
      pushToast('Post loaded', `Opening “${title}”… (this is dummy content).`);
    };
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); open(); } });
  });
})();

function escapeHtml(str){
  return String(str)
    .replaceAll('&','&amp;')
    .replaceAll('<','<')
    .replaceAll('>','>')
    .replaceAll('"','"')
    .replaceAll("'",'&#039;');
}

// ===== Mobile menu =====
(function nav(){
  const burger = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  if(!burger || !links) return;

  burger.addEventListener('click', ()=>{
    links.classList.toggle('active');
  });

  // close on click
  links.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>links.classList.remove('active'));
  });
})();

// ===== Terminal toasts =====
(function toasts(){
  const stack = document.getElementById('toastStack');
  if(!stack) return;

  window.pushToast = (title, body)=>{
    const toast = document.createElement('div');
    toast.className = 'toast';

    const head = document.createElement('div');
    head.className = 'toast-head';

    const t = document.createElement('div');
    t.className = 'toast-title';
    t.textContent = title;

    const close = document.createElement('button');
    close.className = 'toast-close';
    close.type = 'button';
    close.textContent = 'close';
    close.addEventListener('click', ()=>toast.remove());

    head.appendChild(t);
    head.appendChild(close);

    const b = document.createElement('div');
    b.className = 'toast-body';
    b.textContent = body;

    toast.appendChild(head);
    toast.appendChild(b);

    stack.appendChild(toast);

    // auto remove
    setTimeout(()=>{
      if(toast.isConnected) toast.remove();
    }, 5200);
  };

  const btn = document.getElementById('showNotification');
  const openTerminal = document.getElementById('openTerminal');
  if(btn) btn.addEventListener('click', ()=>{
    pushToast('SYSTEM', 'notification queued. please do not feed the glitch.');
  });
  if(openTerminal) openTerminal.addEventListener('click', ()=>{
    const samples = [
      'integrity check: suspiciously stable.',
      'buffer overrun detected near the feelings section.',
      'signal routing complete. enjoy the chaos.',
      'new headlines downloaded. (still fake.)'
    ];
    const pick = samples[Math.floor(Math.random()*samples.length)];
    pushToast('TERMINAL', pick);
  });
})();

// ===== Add reveal classes after render =====
(function refreshReveal(){
  // ensure newly rendered elements get reveal behavior
  const els = $$('.reveal');
  if(els.length===0) return;
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, {threshold:.14});
  els.forEach(el=>obs.observe(el));
})();

