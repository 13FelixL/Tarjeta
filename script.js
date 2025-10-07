const card = document.getElementById('card');
const moneyContainer = document.getElementById('moneyRainContainer');
const soundTech = document.getElementById('sound-tech');
const soundFiesta = document.getElementById('sound-fiesta');

// === Fondo animado del lado programador ===
const mover = document.getElementById('codeMover');
const chunkA = document.getElementById('chunkA');
const chunkB = document.getElementById('chunkB');

const fragment = [
  'const Gloria = {',
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
  if (chunkH && y >= chunkH) y -= chunkH;
  mover.style.transform = `translateY(${-y}px)`;
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

card.addEventListener('mouseenter', () => { speed = 45; });
card.addEventListener('mouseleave', () => { speed = 28; });

// === Lluvia de dinero (emoji) ===
let moneyInterval = null;
const emojis = ['💵', '💰', '🤑', '💸'];

function createMoney() {
  const el = document.createElement('div');
  el.className = 'money';
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  const vw = window.innerWidth;
  const x = Math.random() * vw;
  const size = 1.2 + Math.random() * 1.8;
  const duration = 3 + Math.random() * 3;
  const rotation = Math.random() * 360;

  el.style.left = `${x}px`;
  el.style.fontSize = `${size}rem`;
  el.style.animationDuration = `${duration}s`;
  el.style.transform = `rotate(${rotation}deg)`;
  moneyContainer.appendChild(el);

  setTimeout(() => el.remove(), duration * 1000);
}

function startMoneyRain() {
  if (!moneyInterval) {
    moneyInterval = setInterval(createMoney, 120);
  }
}

function stopMoneyRain() {
  clearInterval(moneyInterval);
  moneyInterval = null;
  moneyContainer.innerHTML = '';
}

// === Volteo con sonido ===
card.addEventListener('click', () => {
  const flippingToBack = !card.classList.contains('is-flipped');
  try {
    if (flippingToBack) {
      soundFiesta.currentTime = 0;
      soundFiesta.play();
      startMoneyRain();
    } else {
      soundTech.currentTime = 0;
      soundTech.play();
      stopMoneyRain();
    }
  } catch (e) {}
  card.classList.toggle('is-flipped');
});
