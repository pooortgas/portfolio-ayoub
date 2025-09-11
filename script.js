const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// Scroll-triggered animations for Education & Skills (both directions)
function animateOnScroll() {
  // Fade-slide
  document.querySelectorAll('.fade-slide').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80 && rect.bottom > 80) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
  // Fade-zoom (skills bars)
  document.querySelectorAll('.fade-zoom').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80 && rect.bottom > 80) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);

// Typewriter animation for Home section
const typewriterWords = [
  { word: "Architecte", article: "an" },
  { word: "3D Modeler", article: "a" },
  { word: "Designer", article: "a" },
  { word: "Urban Explorer", article: "an" },
  { word: "Visual Creator", article: "a" }
];
let twIndex = 0;
let twTimer;

function typeWriterEffect() {
  const typingText = document.querySelector('.typing-text');
  if (!typingText) return;
  let { word, article } = typewriterWords[twIndex];
  let i = 0;
  function type() {
    typingText.innerHTML = `I'm ${article} <span id="typewriter">${word.slice(0, i)}</span>`;
    if (i < word.length) {
      i++;
      twTimer = setTimeout(type, 90);
    } else {
      setTimeout(erase, 1700);
    }
  }
  function erase() {
    typingText.innerHTML = `I'm ${article} <span id="typewriter">${word.slice(0, i)}</span>`;
    if (i > 0) {
      i--;
      twTimer = setTimeout(erase, 40);
    } else {
      twIndex = (twIndex + 1) % typewriterWords.length;
      setTimeout(typeWriterEffect, 500);
    }
  }
  type();
}
window.addEventListener('DOMContentLoaded', typeWriterEffect);

// Effet d’échelle sur la photo Home
const homeImg = document.querySelector('.home-img img');
window.addEventListener('scroll', () => {
  if (!homeImg) return;
  const homeSection = document.getElementById('home');
  const rect = homeSection.getBoundingClientRect();
  // Interpolation de l'échelle selon le scroll
  let scale = 1;
  if (rect.top < 0) {
    scale = Math.max(0.65, 1 + rect.top / 400);
  }
  homeImg.style.transform = `scale(${scale})`;
});

// Scrollspy nav + scroll-indicator
const sectionIds = ['home','services','portfolio','education','skills','contact'];
const navLinks = document.querySelectorAll('nav a');
const dots = document.querySelectorAll('.scroll-dot');

// --- Nav indicator pill animation ---
function moveNavIndicator() {
  const nav = document.querySelector('nav');
  const indicator = document.querySelector('.nav-indicator');
  const active = document.querySelector('nav a.active');
  if (!nav || !indicator || !active) return;
  const navRect = nav.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();
  indicator.style.width = `${activeRect.width}px`;
  indicator.style.left = `${activeRect.left - navRect.left}px`;
}
window.addEventListener('DOMContentLoaded', moveNavIndicator);
window.addEventListener('resize', moveNavIndicator);

// Update indicator on scrollspy
function updateScrollSpy() {
  let current = sectionIds[0];
  for (const id of sectionIds) {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= 120) {
      current = id;
    }
  }
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
  moveNavIndicator();
  dots.forEach(dot => {
    dot.classList.toggle('active', dot.dataset.section === current);
  });
}
window.addEventListener('scroll', updateScrollSpy);
window.addEventListener('DOMContentLoaded', updateScrollSpy);