const app = require('express')();
const fs = require("fs");


export default function handler(req, res, next) {
    // if (!req.body.length > 0) {
    //     return next()
    // }

    let logMessage = `URL: ${req.hostname}${req.url} | Body: ${JSON.stringify(req.body)} | Time: ${new Date().toLocaleString()}\n`;

    fs.appendFile('log.txt', logMessage, (err) => {
        if (err) {
            console.error('Error appending to log file:', err);
        }
        // next();
        return res.send(null)
    });
    return res.send(null)
}

app.use((req, res, next) => {
    let logMessage = `URL: ${req.hostname}${req.url} | Body: ${JSON.stringify(req.body)} | Time: ${new Date().toLocaleString()}\n`;

    fs.appendFile('log.txt', logMessage, (err) => {
        if (err) {
            console.error('Error appending to log file:', err);
        }
        // next();
        return res.send(null)
    });
    return res.send(null)
    handler(req, res, next)
})
