import * as page from 'js/page.js';
import * as pages from 'js/page.definitions.js';

import navTemplate from 'templates/nav.jade';


function display() {
  console.log('[app]', 'Display templates');

  var appElement = document.getElementById('app');

  appElement.innerHTML = `
    ${navTemplate()}
  `;

  pages.initialize();

  page.get('home').display();
}

function nav() {
  document.querySelectorAll('nav div').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();

      page.current().destroy();

      document.querySelectorAll('nav div').forEach((el) => { el.classList.remove('active') });
      el.classList.add('active');

      var target = el.dataset.nav;
      page.get(target).display();
    });
  });
}

export function initialize() {
  console.log('[app]', 'Initializing');

  display();
  nav();

  // Other modules init
}
