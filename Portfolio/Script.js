// Smooth scroll to section
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Animate sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(sec => observer.observe(sec));

// Typing effect for hero
const heroText = document.querySelector(".hero p");
const phrases = ["Frontend Developer", "UX Designer", "JavaScript Enthusiast"];
let phraseIndex = 0, charIndex = 0;

function typeEffect() {
  if (charIndex <= phrases[phraseIndex].length) {
    heroText.textContent = phrases[phraseIndex].substring(0, charIndex++);
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(() => {
      charIndex = 0;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeEffect();
    }, 2000);
  }
}

typeEffect();
