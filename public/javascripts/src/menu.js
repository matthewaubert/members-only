const SCREEN_SM = 768;
const nav = document.querySelector('nav');
const menuBtn = document.querySelector('.menu-btn');

// set nav menu style and add all relevant event listeners
export default function initNavMenu() {
  // set nav menu style on page load and on window resize
  setNavMenuStyle();
  window.addEventListener('resize', setNavMenuStyle);

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
}

// if screen < small size: turn nav into mobile menu and hide it, show menuBtn
// else: keep nav as visible links in header, hide menuBtn
function setNavMenuStyle() {
  if (window.innerWidth < SCREEN_SM) {
    nav.classList.add('menu', 'hidden');
    menuBtn.classList.remove('hidden');
  } else {
    nav.classList.remove('menu', 'hidden');
    menuBtn.classList.add('hidden');
  }
}
