const fs = require("fs");
const path = require('path');

// Middleware to log requests 
const logger = function (req, _, next) {

    if (!req.body.length > 0) {
        return next()
    }
    let logMessage = `URL: ${req.hostname}${req.url} | Body: ${JSON.stringify(req.body)} | Time: ${new Date().toLocaleString()}\n`;

    fs.appendFile('log.txt', logMessage, (err) => {
        if (err) {
            console.error('Error appending to log file:', err);
        }
        next();
    });
}

module.exports = logger; 