module.exports =
  todos_apps:
    output: '../js'
    directories: [
      'app/todos-classic/src',
      'app/todos-extended/src'
    ]

  tests:
    directories: [
      'test/todos-classic'
      'test/todos-extended'
    ]
    _build:
      output: 'build'
    _test:
      command: 'phantomjs'
      runner: 'phantomjs-qunit-runner.js'
      files: '**/*.html'

  _postinstall:
    commands: [
      # vendor
      'cp underscore/underscore-min.js vendor/underscore-latest.min.js'
      'cp backbone/backbone-min.js vendor/backbone-latest.min.js'
      'cp backbone-modelref/backbone-modelref.min.js vendor/backbone-modelref-latest.min.js'
      'cp knockout-client vendor/knockout-latest.min.js'
      'cp knockback/knockback.min.js vendor/knockback-latest.min.js'

      # todos-classic
      'cp vendor/underscore-latest.min.js app/todos-classic/js/lib/underscore-latest.min.js'
      'cp vendor/backbone-latest.min.js app/todos-classic/js/lib/backbone-latest.min.js'
      'cp vendor/backbone.localStorage-min.js app/todos-classic/js/lib/backbone.localStorage-min.js'
      'cp vendor/knockout-latest.min.js app/todos-classic/js/lib/knockout-latest.min.js'
      'cp vendor/knockback-latest.min.js app/todos-classic/js/lib/knockback-latest.min.js'

      # todos-extended
      'cp vendor/underscore-latest.min.js app/todos-extended/js/lib/underscore-latest.min.js'
      'cp vendor/backbone-latest.min.js app/todos-extended/js/lib/backbone-latest.min.js'
      'cp vendor/backbone.localStorage-min.js app/todos-extended/js/lib/backbone.localStorage-min.js'
      'cp vendor/knockout-latest.min.js app/todos-extended/js/lib/knockout-latest.min.js'
      'cp vendor/knockback-latest.min.js app/todos-extended/js/lib/knockback-latest.min.js'
      'cp vendor/backbone-modelref-latest.min.js app/todos-extended/js/lib/backbone-modelref-latest.min.js'
      'cp vendor/mColorPicker.min.js app/todos-extended/js/lib/backbone-modelref-latest.min.js'
      'cp -r vendor/globalize app/todos-extended/js/lib/globalize'
    ]