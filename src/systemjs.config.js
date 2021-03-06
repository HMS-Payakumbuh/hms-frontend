/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {

      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',

      // ng-bootstrap
      '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',

      // ng2-date-picker
      'ng2-date-picker': 'npm:ng2-date-picker',
      'moment': 'npm:moment',

      // lodash
      'lodash': 'npm:lodash',

      // angular2-datatable
      'angular2-datatable':'npm:angular2-datatable',

      //socket.io
      "socket.io-client": 'npm:socket.io-client',

      //ng2-toasty
      'ng2-toasty': 'node_modules/ng2-toasty/bundles/index.umd.js'

    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'ng2-date-picker' : {
        main: './index.js',
        defaultExtension: 'js'
      },
      'moment' : {
        main: './moment.js',
        defaultExtension: 'js'
      },
      'lodash' : {
        main: './lodash.js',
        defaultExtension: 'js'
      },
      'ng2-date-picker' : {
        main: './index.js',
        defaultExtension: 'js'
      },
      'moment' : {
        main: './moment.js',
        defaultExtension: 'js'
      },
      'angular2-datatable': {
        main: './index.js',
        defaultExtension: 'js'
      },
      "socket.io-client": {
        main: './dist/socket.io.js'
      }
    }
  });
})(this);
