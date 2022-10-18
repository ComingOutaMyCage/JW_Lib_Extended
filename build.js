const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

fse.copySync('node_modules/jszip/dist/jszip.min.js', 'js/jszip.min.js', { overwrite: true|false });
fse.copySync('node_modules/jszip/dist/jszip.js', 'js/jszip.js', { overwrite: true|false });
fse.copySync('node_modules/jszip-utils/dist/jszip-utils.js', 'js/jszip-utils.js', { overwrite: true|false });
fse.copySync('node_modules/jszip-utils/dist/jszip-utils.min.js', 'js/jszip-utils.min.js', { overwrite: true|false });

fse.copySync('node_modules/jquery-throttle-debounce/jquery.ba-throttle-debounce.min.js', 'js/jquery.ba-throttle-debounce.min.js', { overwrite: true|false });
fse.copySync('node_modules/striptags/src/striptags.js', 'js/striptags.js', { overwrite: true|false });

fse.copySync('node_modules/flexsearch/dist', 'js/flexsearch', { overwrite: true|false });

