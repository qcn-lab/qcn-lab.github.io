(()=>{const root=document.querySelector('.qcn-photo-carousel');if(!root)return;
const slides=Array.from(root.querySelectorAll('.qcn-carousel-slide'));
const dots=Array.from(root.querySelectorAll('.qcn-carousel-dots button'));
const previous=root.querySelector('.qcn-carousel-prev');const next=root.querySelector('.qcn-carousel-next');
let index=0,timer=null;const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function show(n){index=(n+slides.length)%slides.length;slides.forEach((el,i)=>{el.classList.toggle('is-active',i===index);el.setAttribute('aria-hidden',String(i!==index));if('inert' in el)el.inert=i!==index});dots.forEach((el,i)=>{el.classList.toggle('is-active',i===index);if(i===index)el.setAttribute('aria-current','true');else el.removeAttribute('aria-current')})}
function stop(){if(timer!==null){clearInterval(timer);timer=null}}
function start(){stop();if(!reduceMotion&&!document.hidden)timer=setInterval(()=>show(index+1),5000)}
function advance(n){show(n);start()}
previous.addEventListener('click',()=>advance(index-1));next.addEventListener('click',()=>advance(index+1));
dots.forEach((dot,i)=>dot.addEventListener('click',()=>advance(i)));
root.addEventListener('mouseenter',stop);root.addEventListener('mouseleave',start);
root.addEventListener('focusin',stop);root.addEventListener('focusout',e=>{if(!root.contains(e.relatedTarget))start()});
root.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();advance(index-1)}else if(e.key==='ArrowRight'){e.preventDefault();advance(index+1)}});
document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
show(0);start();})();
