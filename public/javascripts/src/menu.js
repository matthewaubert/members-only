const SCREEN_SM = 768;
const nav = document.querySelector('nav');
const menuBtn = document.querySelector('.menu-btn');

// if screen < small size: turn nav into menu and hide it, show menuBtn
// else: keep nav as visible links in header, hide menuBtn
function setMenu() {
  if (window.innerWidth < SCREEN_SM) {
    nav.classList.add('menu', 'hidden');
    menuBtn.classList.remove('hidden');
  } else {
    nav.classList.remove('menu', 'hidden');
    menuBtn.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', setMenu);
window.addEventListener('resize', setMenu);

// toggle nav visibility when user clicks on menuBtn
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('hidden');
});

// hide nav when user clicks on anything except menuBtn or nav
document.addEventListener('click', (e) => {
  if (
    e.target !== menuBtn &&
    e.target !== nav &&
    window.innerWidth < SCREEN_SM
  ) {
    nav.classList.add('hidden');
  }
});
