module.exports = {
  files: {
    javascripts: {
      joinTo: 'app.js'
    },
    stylesheets: {
      joinTo: 'app.css',
      order: {
        before: [
          "**/reset.css",
          "**/font-awesome.css"
        ]
      }
    },
    templates: {
      joinTo: {
        'app.js': /.+\.jade$/
      }
    }
  },
  plugins: {
    jaded: {
      staticPatterns: /^app(\/|\\)templates(\/|\\)(.+)\.jade$/
    }
  },
  paths: {
    watched: [
      'js',
      'styles',
      'assets',
      'templates'
    ],
    public: '../cordova/www'
  }
};