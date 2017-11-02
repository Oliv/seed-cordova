import * as state from 'js/state.js';

var pages = new Map();
var currentPage = null;

export class Page {
  constructor(name, options = {}) {
    console.log('[page]', 'Instanciating page', name);

    this.options = {
      template: null,
      container: document.getElementById('pages'),
      on: {
        load: (params) => Promise.resolve(params),
        url: (params) => this.name,
        state: (params) => params,
        initialize: () => {},
        destroy: () => { document.querySelector(`[data-page="${this.name}"]`).remove(); }
      }
    };

    let on = Object.assign({}, options.on);
    delete options.on;
    Object.assign(this.options, options);

    this.events = {};

    for (let i in this.options.on) {
      this.on(i, on[i] ? on[i] : this.options.on[i]);
    }

    if (!name) throw new Exception('Page name required');
    this.name = name;

    if (!this.options.template)
      this.options.template = this.name;
  }

  display(params = {}, options = { history: true, forceReload: false }) {
    console.log('[page]', 'Displaying page', this.name, params);

    document.querySelectorAll('nav div').forEach((el) => { el.classList.remove('active') });
    let nav = document.querySelector(`nav div[data-nav="${this.name}"]`);
    if (nav) nav.classList.add('active');

    currentPage = this.name;
    this.trigger('load', params).then((params) => {
      if (!params.name) params.name = this.name;

      if (options.history !== false)
        state.push(this.trigger('url', params), null, this.trigger('state', params));

      let existingPage = document.querySelector(`[data-page="${this.name}"]`);
      if (existingPage) {
        console.log('[page]', 'Existing page found');

        existingPage.classList.remove('hidden');
      } else {
        console.log('[page]', 'Loading page template');

        var pageTemplate = require(`templates/${this.options.template}.jade`);
        this.options.container.insertAdjacentHTML('beforeend', pageTemplate(params));
      }

      this.trigger('initialize', params);
    });


    return this;
  }

  refresh(params = {}, options = { history: true }) {
    return this.display(params, Object.assign(options, { history: false }));
  }

  destroy() {
    console.log('[page]', 'Destroying page', this.name);

    this.trigger('destroy');

    return this;
  }

  on(name, fn) {
    this.events[name] = fn;

    return this;
  }

  off(name, fn) {
    if (!(name in this.events)) return this;

    delete this.events[name];

    return this;
  }

  trigger(name, args = {}) {
    if (!(name in this.events)) return null;

    return this.events[name].apply(this, Array.isArray(args) ? args : [args]);
  }
}

export function register(name, options) {
  console.log('[page]', 'Registering page', name);

  var page = new Page(name, options);

  pages.set(name, page);

  return page;
}

export function exists(name) {
  return pages.get(name);
}

export function get(name) {
  return pages.get(name) || null;
}

export function current() {
  return get(currentPage) || null;
}

export function go(name, params, options) {
  let page = current();

  if (page) page.destroy();

  return get(name).display(params, options);
}

export function navigate(name, params) {
  let page = current();

  if (page) page.destroy();

  return get(name).display(params, { history: false });
}
