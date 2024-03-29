// Import required modules
const dotenv = require("dotenv")
const express = require('express');
const cors = require('cors');
const https = require("https");
const logger = require('./logger/logger');
const { downloadVideo } = require("./controllers/downloadVideo");
const { searchVideo } = require("./controllers/searchVideo");

dotenv.config({});

https.Agent.defaultMaxSockets = 25; // Set the maximum number of sockets
https.Agent.setMaxListeners(25); // Set the maximum number of listeners

// Create an Express application
const app = express();

// Enable middleware
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static("public"));



// Middleware to log requests
app.use(logger);

// Code for run server anyTime
const reRunServer = () => {
    let options = { method: "GET" };

    fetch(process.env.BASE_URL || process.env.LIVE_BASE_URL, options)
        .then((res) => res.json())
        .then((json) => console.log("All functions are working fine!"))
        .catch((err) => console.error("error:" + err));

    return;
};

setInterval(() => {
    reRunServer();
}, 480000); // call after every 8min. for server up & run anytime in render

// Define the port number for the server to listen on
const SERVER_PORT = process.env.PORT || 8080;

app.get('/', async (_, res) => {
    res.status(200).json({ Message: "Everything is working fine!!" })
})

app.post('/search', searchVideo);

// Route for downloading the selected format
app.post('/download', async (req, res) => {
    await downloadVideo(req, res);
});

// Start the server and listen for incoming requests on the specified port
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});
