const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const header = document.getElementById('header');
const button = document.querySelector('.header-nav__button');
const openpopuap= document.getElementById ('popup');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');

burger.addEventListener('click', () => {
  nav.classList.toggle('active');
  header.classList.toggle('active');
  burger.classList.toggle('active');

  if (nav.classList.contains('active')) {
    button.className = 'button';
  } else {
    button.className = 'header-nav__button';
  }
})

openpopuap.addEventListener('click', () => {
  overlay.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.style.display = 'none';
  }
});