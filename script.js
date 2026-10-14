// Interações do cartão Pedro & Luana
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

// Abertura especial: o primeiro toque inicia a surpresa e tenta tocar a música.
const surpriseGate = $('#surpriseGate');
$('#startSurprise').addEventListener('click', () => {
  const player = $('#songPlayer');
  // O toque do usuário permite ao navegador tentar iniciar o vídeo com áudio.
  player.src = 'https://www.youtube-nocookie.com/embed/uuZE_IRwLNI?autoplay=1&rel=0';
  surpriseGate.classList.add('is-opening');
  document.body.classList.remove('gate-active');
  $('#musicToggle').classList.add('playing');
  burstHearts(28);
  window.setTimeout(() => { surpriseGate.hidden = true; }, 800);
  $('#carta').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

$('#openStory').addEventListener('click', () => {
  $('#carta').scrollIntoView({ behavior: 'smooth' });
  burstHearts(18);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach((element) => observer.observe(element));

const startDate = new Date('2026-07-15T20:00:00');
function updateCounter() {
  const now = new Date();
  let diff = Math.max(0, now - startDate);
  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  $('#days').textContent = String(days).padStart(3, '0');
  $('#hours').textContent = String(hours).padStart(2, '0');
  $('#minutes').textContent = String(minutes).padStart(2, '0');
  $('#seconds').textContent = String(seconds).padStart(2, '0');
}
updateCounter();
setInterval(updateCounter, 1000);

// Galeria com ampliação e navegação entre as 10 fotos.
const photos = $$('.photo').map((button) => button.dataset.photo);
let currentPhoto = 0;
const lightbox = $('#lightbox');
function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  $('#lightboxImage').src = photos[currentPhoto];
  $('#lightboxCount').textContent = `${String(currentPhoto + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
}
function openPhoto(index) {
  showPhoto(index);
  lightbox.hidden = false;
  document.body.classList.add('modal-open');
  $('#lightboxClose').focus();
}
function closePhoto() {
  lightbox.hidden = true;
  document.body.classList.remove('modal-open');
}
$$('.photo').forEach((button, index) => button.addEventListener('click', () => openPhoto(index)));
$('#lightboxClose').addEventListener('click', closePhoto);
$('#photoPrev').addEventListener('click', () => showPhoto(currentPhoto - 1));
$('#photoNext').addEventListener('click', () => showPhoto(currentPhoto + 1));
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closePhoto(); });
document.addEventListener('keydown', (event) => {
  if (lightbox.hidden) return;
  if (event.key === 'Escape') closePhoto();
  if (event.key === 'ArrowLeft') showPhoto(currentPhoto - 1);
  if (event.key === 'ArrowRight') showPhoto(currentPhoto + 1);
});

// Botão final: mensagem e corações flutuantes.
$('#loveButton').addEventListener('click', () => {
  $('#loveResponse').textContent = 'Eu também te amo, hoje e em todos os nossos próximos capítulos. ♥';
  burstHearts(34);
});
function burstHearts(amount) {
  const container = $('#floatingHearts');
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart-particle';
    heart.textContent = Math.random() > .25 ? '♥' : '✦';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${10 + Math.random() * 20}px`;
    heart.style.animationDuration = `${3 + Math.random() * 4}s`;
    heart.style.animationDelay = `${Math.random() * .8}s`;
    container.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
  }
}
setInterval(() => {
  if (document.visibilityState === 'visible' && Math.random() > .55) burstHearts(1);
}, 2800);

// O botão leva até o vídeo oficial de "Mirrors"; a pessoa pode iniciar o áudio no player.
$('#musicToggle').addEventListener('click', () => {
  $('#trilha-sonora').scrollIntoView({ behavior: 'smooth', block: 'start' });
  const player = $('#songPlayer');
  if (!player.src.includes('autoplay=1')) player.src = 'https://www.youtube-nocookie.com/embed/uuZE_IRwLNI?autoplay=1&rel=0';
  $('#musicToggle').classList.add('playing');
  $('#musicLabel').textContent = 'Mirrors · nossa trilha';
  $('#musicToggle').setAttribute('aria-label', 'Abrir a música Mirrors, de Justin Timberlake');
  burstHearts(8);
});

// Salva as edições dos textos neste navegador, sem enviar nada para a internet.
const editableSelectors = '[contenteditable="true"]';
$$ (editableSelectors).forEach((element, index) => {
  const key = `pedro-luana-edit-${index}`;
  try {
    const saved = localStorage.getItem(key);
    if (saved !== null) element.innerHTML = saved;
    element.addEventListener('input', () => localStorage.setItem(key, element.innerHTML));
  } catch (error) {
    // Se o navegador bloquear armazenamento, a edição ainda funciona nesta sessão.
  }
});
