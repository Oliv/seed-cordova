var pages = new Map();
var currentPage = null;

export class Page {
  constructor(name, options) {
    console.log('[page]', 'Instanciating page', name);

    this.options = {
      template: null,
      container: document.getElementById('pages'),
      on: {
        locals: () => {
          {
            name: this.name
          }
        },
        initialize: () => {}
      }
    };

    Object.assign(this.options, options);

    this.events = {};

    for (let i in this.options.on) {
      this.on(i, this.options.on[i]);
    }

    if (!name) throw new Exception('Page name required');
    this.name = name;

    if (!this.options.template)
      this.options.template = this.name;
  }

  display(params = {}) {
    console.log('[page]', 'Displaying page', this.name, params);

    document.querySelectorAll('nav div').forEach((el) => { el.classList.remove('active') });
    let nav = document.querySelector(`nav div[data-nav="${this.name}"]`);
    if (nav) nav.classList.add('active');


    var pageTemplate = require(`templates/${this.options.template}.jade`);

    this.options.container.innerHTML = pageTemplate(Object.assign(params, this.trigger('locals')));
    currentPage = this.name;

    this.trigger('initialize', params);

    return this;
  }

  destroy() {
    console.log('[page]', 'Destroying page', this.name);

    this.options.container.innerHTML = '';

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

export function get(name) {
  return pages.get(name) || null;
}

export function current() {
  return pages.get(currentPage) || null;
}
