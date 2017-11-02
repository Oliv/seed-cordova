import * as page from 'js/page.js';
import * as pages from 'js/page.definitions.js';
import * as state from 'js/state.js';

import navTemplate from 'templates/nav.jade';


function display() {
  console.log('[app]', 'Display templates');

  var appElement = document.getElementById('app');

  appElement.innerHTML = `
    ${navTemplate()}
  `;

  pages.initialize();

  state.initialize();
}

function nav() {
  document.querySelectorAll('nav div').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();

      var target = el.dataset.nav;
      page.go(target);
    });
  });
}

export function initialize() {
  console.log('[app]', 'Initializing');

  display();
  nav();

  // Other modules init
}
