// Import required modules
const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const https = require("https")
const dotenv = require("dotenv")
const logger = require('./logger/logger');

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

// Define the port number for the server to listen on
const SERVER_PORT = 8080;

app.post('/download', async (req, res) => {

    const url = req.body.videoUrl;

    try {
        // Retrieve information about the video from the provided URL
        const videoInfo = await ytdl.getInfo(url);

        return res.status(200).send(videoInfo)

    } catch (error) {
        // Handle any errors that occur during the download process
        console.error('Error downloading video:', error);
        res.status(500).send({ "Message": 'Error downloading video', error });
    }
});

// Start the server and listen for incoming requests on the specified port
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});
