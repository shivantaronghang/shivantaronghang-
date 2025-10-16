const canvas = document.getElementById("heroParticles");
const ctx = canvas.getContext("2d");
let particlesArray = [];
let sparksArray = [];
const particleCount = 40;
const sparkCount = 20;
const connectionDistance = 120;
let scrollY = 0;

let mouse = { x: null, y: null, radius: 100 };

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

canvas.addEventListener('click', () => {
  for (let i = 0; i < 5; i++) sparksArray.push(new Spark());
});

window.addEventListener('resize', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});

class Particle {
  constructor(){ this.reset(); }
  reset(){ 
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = Math.random()*2+1;
    this.speedX = (Math.random()-0.5)*0.3;
    this.speedY = (Math.random()-0.5)*0.3;
    this.alpha = Math.random()*0.5+0.5;
    this.color = `rgba(168,85,247,${this.alpha})`;
  }
  update(){
    const scrollFactor = Math.min(scrollY/500,1);
    this.x += this.speedX + scrollFactor*0.5;
    this.y += this.speedY + scrollFactor*0.3;
    if(this.x<0||this.x>canvas.width) this.speedX*=-1;
    if(this.y<0||this.y>canvas.height) this.speedY*=-1;

    // Hover repulsion
    if(mouse.x && mouse.y){
      let dx = this.x - mouse.x;
      let dy = this.y - mouse.y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < mouse.radius){
        let angle = Math.atan2(dy, dx);
        this.x += Math.cos(angle)*3;
        this.y += Math.sin(angle)*3;
      }
    }
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 8;
    ctx.fill();
  }
}

class Spark {
  constructor(){ this.reset(); }
  reset(){
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    this.size=Math.random()*1.5+0.5;
    this.speedX=(Math.random()-0.5)*1.5;
    this.speedY=(Math.random()-0.5)*1.5;
    this.alpha=Math.random()*0.8+0.2;
  }
  update(){
    const scrollFactor=Math.min(scrollY/500,1);
    this.x+=this.speedX*(1+scrollFactor);
    this.y+=this.speedY*(1+scrollFactor);
    if(this.x<0||this.x>canvas.width||this.y<0||this.y>canvas.height) this.reset();

    // Hover attraction
    if(mouse.x && mouse.y){
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < mouse.radius){
        this.x += dx*0.03;
        this.y += dy*0.03;
      }
    }
  }
  draw(){
    const scrollFactor=Math.min(scrollY/500,1);
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    const alpha = Math.min(this.alpha + scrollFactor*0.3,1);
    ctx.fillStyle=`rgba(255,255,255,${alpha})`;
    ctx.shadowColor=`rgba(255,255,255,${alpha})`;
    ctx.shadowBlur=12 + scrollFactor*8;
    ctx.fill();
  }
}

function initParticles(){
  particlesArray=[]; sparksArray=[];
  for(let i=0;i<particleCount;i++) particlesArray.push(new Particle());
  for(let i=0;i<sparkCount;i++) sparksArray.push(new Spark());
}
initParticles();

function connectParticles(){
  for(let a=0;a<particlesArray.length;a++){
    for(let b=a;b<particlesArray.length;b++){
      const dx=particlesArray[a].x - particlesArray[b].x;
      const dy=particlesArray[a].y - particlesArray[b].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < connectionDistance){
        const opacity = 1 - dist/connectionDistance;
        ctx.strokeStyle = `rgba(168,85,247,${opacity*0.3})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x,particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x,particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>{ p.update(); p.draw(); });
  sparksArray.forEach(s=>{ s.update(); s.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

