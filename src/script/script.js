const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const header = document.getElementById('header');
const button = document.querySelector('.header-nav__button');
const openpopuap= document.getElementById ('popup');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');
const header_button = document.getElementById('header_button');
const emailInput = document.querySelector('.email');
const submitButton = document.querySelector('.email-button');

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

header_button.addEventListener('click', () => {
  overlay.style.display = 'flex';
});

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

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

emailInput.addEventListener('input', function() {
    const value = this.value.trim();
    
    if (value === '') {
        this.classList.remove('error');
        return;
    }
    
    if (validateEmail(value)) {
        this.classList.remove('error');
    } else {
        this.classList.add('error');
    }
});

emailInput.addEventListener('blur', function() {
    const value = this.value.trim();
    
    if (value !== '' && !validateEmail(value)) {
        this.classList.add('error');
    }
});

submitButton.addEventListener('click', function(e) {
    const value = emailInput.value.trim();
    
    if (value === '') {
        e.preventDefault();
        emailInput.classList.add('error');
        emailInput.focus();
        return;
    }
    
    if (!validateEmail(value)) {
        e.preventDefault();
        emailInput.classList.add('error');
        emailInput.focus();
    }
});