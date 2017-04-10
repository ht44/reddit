const env = process.env.PORT_ENV || 'development';
const config = require('../knexfile')[env];
const knex = require('knex');

module.exports = knex(config);
