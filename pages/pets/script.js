// open and close burger menu

const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const logo = document.querySelector('.logo');

function toggleMenu() {
    navList.classList.toggle('open');
    hamburger.classList.toggle('open');
    logo.classList.toggle('open');
}
function closeMenu(event) {
    if (event.target.classList.contains('nav-link')) {
        navList.classList.remove('open');
        hamburger.classList.remove('open');
        logo.classList.remove('open');
      }
}
hamburger.addEventListener('click', toggleMenu);
navList.addEventListener('click', closeMenu);

