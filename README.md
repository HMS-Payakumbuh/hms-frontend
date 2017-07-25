# hms_frontend

Update dependency with:
1. npm i -g npm-check-updates
2. npm-check-updates -u
3. npm install

Datepicker module:
- https://github.com/vlio20/angular-datepicker
1. Install with npm
2. Change systemjs.config
3. Add to map: 	
    'ng2-date-picker': 'npm:ng2-date-picker',
    'moment': 'npm:moment',
4. Add to packages:
      'ng2-date-picker' : {
        main: './index.js',
        defaultExtension: 'js'
      },
      'moment' : {
        main: './moment.js',
        defaultExtension: 'js'
      }

Dependencies:
- npm install angular2-datatable --save
- npm install ng2-input-autocomplete --save
- npm install socket.io-client --save
