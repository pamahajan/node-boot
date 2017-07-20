'use strict';

let path = require('path');

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/base-project-dev'
  },
  
  // Log Configuration
  log: {
  	level: 'debug', 
  },

  seedDB: true
};
