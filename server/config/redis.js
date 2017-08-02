/**
 * Connect To Redis
 */

'use strict'

let redisClient = require('redis').createClient();
let wrapper = require('co-redis');
let redisCo = wrapper(redisClient);

module.exports = redisCo;
