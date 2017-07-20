'use strict'

let Path = require('path'),
  l = require('./components/logger').root.child({'module': __filename.substring(__dirname.length + 1, __filename.length - 3)});

module.exports.default = (appRouter) => {
  
  l.info('Defining application routes');
}