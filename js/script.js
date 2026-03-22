
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight - 120){
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


const headline = document.querySelector(".hero-text h1");
const originalText = headline.innerText;
headline.innerText = "";

let tIndex = 0;
(function typeEffect(){
  if(tIndex < originalText.length){
    headline.innerHTML += originalText[tIndex]==="\n" ? "<br>" : originalText[tIndex];
    tIndex++;
    setTimeout(typeEffect,40);
  }
})();


document.querySelectorAll(".btn").forEach(btn=>{
  btn.addEventListener("mousemove",e=>{
    const r = btn.getBoundingClientRect();
    btn.style.transform =
      `translate(${(e.clientX-r.left-r.width/2)*0.2}px,
                 ${(e.clientY-r.top-r.height/2)*0.2}px)`;
  });
  btn.addEventListener("mouseleave",()=>btn.style.transform="translate(0,0)");
});


const heroImg = document.querySelector(".hero-img img");
window.addEventListener("scroll",()=>{
  if(heroImg){
    heroImg.style.transform=`translateY(${window.scrollY*0.15}px)`;
  }
});

document.querySelectorAll(".pro-card").forEach(card=>{
  card.style.transformStyle = "preserve-3d";

  card.addEventListener("mousemove",e=>{
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const rx = (y - r.height/2) / 25;
    const ry = (r.width/2 - x) / 25;

    card.style.transform =
      `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave",()=>{
    card.style.transform =
      "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
  });
});

const canvas = document.getElementById("cursor-canvas");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize",resize);

let particles=[];

addEventListener("mousemove",e=>{
  particles.push({x:e.clientX,y:e.clientY,a:1});
});

function animateCursor(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach((p,i)=>{
    ctx.beginPath();
    ctx.fillStyle=`rgba(56,189,248,${p.a})`;
    ctx.arc(p.x,p.y,7,0,Math.PI*2);
    ctx.fill();
    p.a -= 0.05;
    if(p.a<=0) particles.splice(i,1);
  });

  requestAnimationFrame(animateCursor);
}
animateCursor();

const bgCanvas=document.createElement("canvas");
document.body.appendChild(bgCanvas);
bgCanvas.style.pointerEvents = "none";
bgCanvas.style.position="fixed";
bgCanvas.style.inset="0";
bgCanvas.style.zIndex="-3";
const bctx=bgCanvas.getContext("2d");

function resizeBg(){
  bgCanvas.width=innerWidth;
  bgCanvas.height=innerHeight;
}
resizeBg();
addEventListener("resize",resizeBg);

const stars=[...Array(120)].map(()=>({
  x:Math.random()*innerWidth,
  y:Math.random()*innerHeight,
  r:Math.random()*1.5,
  s:Math.random()*0.4+0.1
}));

(function bgAnim(){
  bctx.clearRect(0,0,bgCanvas.width,bgCanvas.height);
  stars.forEach(s=>{
    bctx.beginPath();
    bctx.fillStyle="rgba(255,255,255,0.35)";
    bctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    bctx.fill();
    s.y+=s.s;
    if(s.y>innerHeight) s.y=0;
  });
  requestAnimationFrame(bgAnim);
})();

window.addEventListener("load",()=>{
  const loader=document.getElementById("loader");
  loader.style.opacity="0";
  setTimeout(()=>loader.remove(),600);
});

const starCanvas = document.createElement("canvas");
document.body.appendChild(starCanvas);
starCanvas.style.pointerEvents = "none";
starCanvas.style.position = "fixed";
starCanvas.style.inset = "0";
starCanvas.style.zIndex = "-2";
starCanvas.style.pointerEvents = "none";

const sctx = starCanvas.getContext("2d");

function resizeStars(){
  starCanvas.width = innerWidth;
  starCanvas.height = innerHeight;
}
resizeStars();
addEventListener("resize", resizeStars);

let shootingStars = [];

function spawnStar(){
  shootingStars.push({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height * 0.4,
    vx: 9 + Math.random()*5,
vy: 4 + Math.random()*3,

    life: 0
  });
}

setInterval(spawnStar, 2500); 

function animateStars(){
  sctx.clearRect(0,0,starCanvas.width,starCanvas.height);

  shootingStars.forEach((s,i)=>{
    sctx.beginPath();
    sctx.strokeStyle = `rgba(180,230,255,${1 - s.life/80})`;
    sctx.lineWidth = 2;
    sctx.moveTo(s.x, s.y);
    sctx.lineTo(s.x - s.vx*2, s.y - s.vy*2);
    sctx.stroke();

    s.x += s.vx;
    s.y += s.vy;
    s.life++;

    if(s.life > 80){
      shootingStars.splice(i,1);
    }
  });

  requestAnimationFrame(animateStars);
}

animateStars();
document.querySelectorAll(".pro-card").forEach(card=>{
  card.addEventListener("mousemove",e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty("--x",`${e.clientX-r.left}px`);
    card.style.setProperty("--y",`${e.clientY-r.top}px`);
  });
});
