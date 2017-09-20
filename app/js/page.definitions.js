import * as page from 'js/page.js';

import menuItemTemplate from 'templates/menuItem.jade';

export function initialize() {
  console.log('[page.definitions]', 'Registering pages');

  page.register('menu', {
    on: {
      initialize: function() {
        var container = this.options.container;
        var list = container.querySelector('ul.list');

        list.innerHTML += menuItemTemplate({
          name: 'Item name',
        });
      }
    }
  });

  page.register('home');
}