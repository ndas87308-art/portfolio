const slides = [
  { src: 'n (2).jpg', alt: 'Artwork' },
  { src: 'n (3).jpg', alt: 'Artwork' },
  { src: 'n (4).jpg', alt: 'Artwork' },
  { src: 'n (5).jpg', alt: 'Artwork' },
  { src: 'n (6).jpg', alt: 'Artwork' },
  { src: 'n (7).jpg', alt: 'Artwork' },
  { src: 'n (8).jpg', alt: 'Artwork' },
];

const card = document.querySelector('.image-card');
const image = document.querySelector('.hero-image');
const stage = document.querySelector('.card-stage');
let current = 0;

function changeSlide() {
  card.classList.remove('arriving');
  card.classList.add('switching');

  setTimeout(() => {
    current = (current + 1) % slides.length;
    const slide = slides[current];
    image.src = slide.src;
    image.alt = slide.alt;
    card.classList.remove('switching');
    card.classList.add('arriving');
  }, 720);
}

setInterval(changeSlide, 4400);

document.addEventListener('pointermove', event => {
  if (window.matchMedia('(max-width: 800px)').matches) return;
  const x = (event.clientX / window.innerWidth - .5) * 8;
  const y = (event.clientY / window.innerHeight - .5) * -7;
  stage.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});

document.addEventListener('pointerleave', () => {
  stage.style.transform = '';
});
