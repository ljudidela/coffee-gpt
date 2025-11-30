import AOS from 'aos';
import gsap from 'gsap';

AOS.init({duration:1000, once:true});

// Canvas particles: coffee beans as stars
const canvas = document.getElementById('coffee-particles');
const ctx = canvas.getContext('2d');
let beans = [];
let w, h;
function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function createBeans(){
  beans = Array.from({length:80}, () => ({
    x:Math.random()*w,
    y:Math.random()*h,
    size:Math.random()*3+2,
    speed:Math.random()*0.5+0.2,
    twinkle:Math.random()*100
  }));
}
createBeans();

function drawBeans(){
  ctx.clearRect(0,0,w,h);
  beans.forEach(b => {
    ctx.save();
    ctx.translate(b.x,b.y);
    ctx.rotate(Math.sin(Date.now()/500 + b.twinkle));
    ctx.fillStyle = '#6F4E37';
    ctx.beginPath();
    ctx.ellipse(0,0,b.size,b.size/1.5,0,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
    b.y += b.speed;
    if(b.y > h) b.y = -10;
  });
  requestAnimationFrame(drawBeans);
}
drawBeans();

// GSAP animations
const cup = document.getElementById('coffee-cup');
AOS.refresh();

// Order form confetti effect
const orderForm = document.getElementById('order-form');
orderForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = orderForm.querySelector('button');
  gsap.to(btn, {scale:1.2, yoyo:true, repeat:1, duration:0.2});
  for(let i=0;i<20;i++){
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.left = (btn.getBoundingClientRect().left + btn.offsetWidth/2) + 'px';
    div.style.top = (btn.getBoundingClientRect().top + btn.offsetHeight/2) + 'px';
    div.style.width = '5px';
    div.style.height = '5px';
    div.style.background = `hsl(${Math.random()*360}, 100%, 50%)`;
    div.style.borderRadius = '50%';
    document.body.appendChild(div);
    gsap.to(div, {x:(Math.random()-0.5)*200, y:(Math.random()-0.5)*200, scale:0, duration:1, onComplete:()=>div.remove()});
  }
});