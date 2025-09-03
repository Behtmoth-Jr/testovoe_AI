const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const header = document.getElementById('header');
const button = document.querySelector('.header-nav__button'); 

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