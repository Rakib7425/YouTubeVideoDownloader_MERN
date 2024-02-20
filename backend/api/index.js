const BuiltTime = require('./built-time');
module.exports = (request, response) => {
    response.setHeader('content-type', 'text/plain');
    response.send(`
    This Serverless Function was built at ${new Date(BuiltTime)}.
    The current time is ${new Date()}
  `);
};