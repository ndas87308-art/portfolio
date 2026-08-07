const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  window.setTimeout(() => loader.classList.add('loader-done'), 850);
});

const words = ['Computer Science Student', 'Frontend Developer', 'UI Designer', 'Creative Problem Solver'];
const typing = document.getElementById('typing');
let word = 0, character = 0, deleting = false;
function typeWord() {
  const current = words[word];
  typing.textContent = current.slice(0, character);
  if (!deleting && character < current.length) character += 1;
  else if (!deleting) { deleting = true; return setTimeout(typeWord, 1500); }
  else if (character > 0) character -= 1;
  else { deleting = false; word = (word + 1) % words.length; }
  setTimeout(typeWord, deleting ? 38 : 75);
}
typeWord();

const menu = document.getElementById('menu');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => nav.classList.toggle('show'));
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('show')));

const sections = [...document.querySelectorAll('section')];
const navLinks = [...document.querySelectorAll('nav a')];
const header = document.querySelector('header');
const progress = document.createElement('div');
progress.className = 'page-progress';
document.body.appendChild(progress);

const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('in-view');
}), { threshold: .14 });
sections.forEach(section => reveal.observe(section));

function updatePage() {
  const top = window.scrollY;
  header.classList.toggle('is-scrolled', top > 24);
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${total ? top / total : 0})`;
  let current = 'home';
  sections.forEach(section => { if (top >= section.offsetTop - 160) current = section.id; });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', updatePage, { passive: true });
updatePage();
