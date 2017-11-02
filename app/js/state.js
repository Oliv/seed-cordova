import * as page from 'js/page.js';

function parse(url) {
  let hash = url.indexOf('#') === 0 ? url.substr(1) : url;
  let a = hash.split('/');
  let name = a.shift();
  let param = a.shift();

  return { name, param };
}

export function initialize() {
  window.addEventListener('popstate', (e) => {
    e.preventDefault();

    console.log('[state]', 'Popstate', e.state);

    let url = parse(e.state.name);
    page.navigate(url.name, e.state.params);
  });

  var url = parse(window.location.hash);

  console.log('[state]', 'Processing page', url.name, url.param);

  if (page.exists(url.name))
    page.go(url.name, url.param);
  else
    page.go('home');
}

export function push(name, param, params) {
  console.log('[state]', 'Push state', name, param, params);

  history.pushState({ name, params }, name, '#' + name + (param ? '/' + param : ''));
}
