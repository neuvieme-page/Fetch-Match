var config = {
  styles: {
    path: {
      input: [
        './src/styles/**/*.scss',
        './src/styles/**/*.css'
      ],
      output: './dist/styles'
    },
    autoprefixer: [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ]
  },
  scripts: {
    path: {
      linter: ['./src/scripts/**/*.js'],
      input: [
        './bower_components/es6-promise/promise.min.js',
        './bower_components/fetch/fetch.js',
        './src/scripts/_fetcher.js',
        './src/scripts/main.js'
      ],
      ouput: './dist/scripts'
    }
  },
  images: {
    path: {
      input: [
        './src/images/**/*'
      ],
      ouput: './dist/images'
    }
  },
  src: './src',
  dist: './dist',
  copy: [
    'src/*',
    '!src/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ],
  delete: ['dist/*', '!dist/.git'],
  browsersync: {
    notify: false,
    logPrefix: 'BWS',
    server: ['dist'],
    port: 3000
  }
};

module.exports = config;
