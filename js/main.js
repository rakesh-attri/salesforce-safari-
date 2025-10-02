// Minimal JS for carousel, mobile nav, and contact form handling
(function(){
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if(navToggle && nav){
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    nav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
    }));
  }

  // Simple carousel
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dotsWrap = document.getElementById('carouselDots');
  let index = 0;

  function goTo(i){
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  function updateDots(){
    dotsWrap.innerHTML = '';
    slides.forEach((s, i)=>{
      const b = document.createElement('button');
      b.className = i===index? 'active':'';
      b.setAttribute('aria-label', `Go to slide ${i+1}`);
      b.addEventListener('click', ()=> goTo(i));
      dotsWrap.appendChild(b);
    });
  }

  if(prevBtn) prevBtn.addEventListener('click', ()=> goTo(index-1));
  if(nextBtn) nextBtn.addEventListener('click', ()=> goTo(index+1));

  // Keyboard support
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft') goTo(index-1);
    if(e.key === 'ArrowRight') goTo(index+1);
  });

  let auto = setInterval(()=> goTo(index+1), 6000);
  const carousel = document.getElementById('carousel');
  if(carousel){
    carousel.addEventListener('mouseenter', ()=> clearInterval(auto));
    carousel.addEventListener('mouseleave', ()=> auto = setInterval(()=> goTo(index+1), 6000));
  }

  goTo(0);

  // Contact form (fake local submit)
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(note) note.textContent = 'Sending...';
      setTimeout(()=>{
        if(note) note.textContent = 'Thanks! Your message has been received.';
        form.reset();
      },900);
    });
  }

  // Set footer year
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Image error fallback: replace broken images with an inline SVG placeholder
  function makePlaceholderSVG(w=400,h=200,text='Image'){
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'><rect width='100%' height='100%' fill='#f4f0ea'/><text x='50%' y='50%' fill='#c65b2e' font-family='Montserrat, Arial' font-size='20' text-anchor='middle' dominant-baseline='middle'>${text}</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  document.querySelectorAll('img').forEach(img=>{
    img.addEventListener('error', ()=>{
      // avoid infinite loop if placeholder also fails
      if(!img.dataset.fallback){
        img.dataset.fallback = '1';
        const w = img.width || 400;
        const h = img.height || 200;
        img.src = makePlaceholderSVG(w,h,'Placeholder');
      }
    });
  });
})();
