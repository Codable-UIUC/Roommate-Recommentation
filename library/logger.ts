// logger.js for server
const pino = require('pino');
const pretty = require('pino-pretty')
const path = require('path')
//const pinoCaller = require('pino-caller')
import pinoCaller from 'pino-caller'

const stream = pretty({
  colorize: true,
  //crlf: true,
  //singleLine : true
  messageFormat: '\nMessage: {msg}'
})

// Create a logging instance
const logger = pinoCaller(pino(stream), {relativeTo: path.basename(__dirname)});


module.exports.logger = logger;

export default logger