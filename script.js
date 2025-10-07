const card = document.getElementById('card');
const backFace = document.getElementById('backFace');
const soundTech = document.getElementById('sound-tech');
const soundFiesta = document.getElementById('sound-fiesta');

// === Fondo con código animado ===
const mover = document.getElementById('codeMover');
const chunkA = document.getElementById('chunkA');
const chunkB = document.getElementById('chunkB');

const fragment = [
  'const Felix = {',
  '  profesion: "Programador",',
  '  modo: "Día",',
  '  skills: ["HTML","CSS","JS","Data Analysis"],',
  '  switchVida(){ this.modo = (this.modo==="Día")?"Noche":"Día"; }',
  '};',
  '',
  'function build(){',
  '  console.log("Compilando ideas...");',
  '  console.log("Ejecutando sueños...");',
  '  console.log("Desplegando en producción 🚀");',
  '}',
  ''
].join('\n');

function makeLongText(mult = 40) {
  let out = '';
  for (let i = 0; i < mult; i++) {
    out += fragment.replace(/Felix/g, (i % 9 === 0 ? `Felix_v${i}` : 'Felix')) + '\n';
  }
  return out;
}

const longA = makeLongText(42);
chunkA.textContent = longA;
chunkB.textContent = longA;

let y = 0, last = null, speed = 28, chunkH = 0;
requestAnimationFrame(() => { chunkH = chunkA.offsetHeight; });

function tick(ts) {
  if (last == null) last = ts;
  const dt = (ts - last) / 1000;
  last = ts;
  y += speed * dt;
  if (chunkH && y >= chunkH) { y -= chunkH; }
  mover.style.transform = `translateY(${-y}px)`;
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

card.addEventListener('mouseenter', () => { speed = 45; });
card.addEventListener('mouseleave', () => { speed = 28; });

// === Partículas en modo noche ===
function spawnParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  const colors = ['#fff9', '#ff66cc', '#ffd166', '#66ffea', '#ff55aa'];
  p.style.background = colors[(Math.random() * colors.length) | 0];
  const bw = backFace.clientWidth, bh = backFace.clientHeight;
  const startX = Math.random() * bw;
  const startY = bh + (Math.random() * 60);
  p.style.left = startX + 'px';
  p.style.top = startY + 'px';
  const size = Math.random() * 10 + 4;
  p.style.width = size + 'px';
  p.style.height = size + 'px';
  backFace.appendChild(p);
  const duration = 2800 + Math.random() * 2200;
  const deltaX = (Math.random() - 0.5) * 120;
  const deltaY = -(200 + Math.random() * 240);
  const start = performance.now();

  (function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const ease = 1 - Math.pow(1 - t, 3);
    p.style.transform = `translate(${deltaX * ease}px, ${deltaY * ease}px) scale(${1 - 0.35 * ease})`;
    p.style.opacity = `${1 - ease}`;
    if (t < 1) requestAnimationFrame(frame);
    else p.remove();
  })(start);
}
setInterval(spawnParticle, 260);

// === Volteo con sonido ===
card.addEventListener('click', () => {
  const flippingToBack = !card.classList.contains('is-flipped');
  try {
    if (flippingToBack) { soundFiesta.currentTime = 0; soundFiesta.play(); }
    else { soundTech.currentTime = 0; soundTech.play(); }
  } catch (e) { }
  card.classList.toggle('is-flipped');
});
