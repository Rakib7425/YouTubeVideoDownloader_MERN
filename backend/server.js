// Import required modules
const dotenv = require("dotenv")
const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const https = require("https")
// const fetch = require("node-fetch")
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

// Code for run server anyTime
const reRunServer = () => {
    let url = "https://youtube-downloader-uhd7.onrender.com";
    let options = { method: "GET" };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log("All functions are working fine!"))
        .catch((err) => console.error("error:" + err));

    return;
};

setInterval(() => {
    reRunServer();
}, 480000); // call after every 8min. for server up & run anytime in render

// Define the port number for the server to listen on
const SERVER_PORT = 8080;

app.get('/', async (_, res) => {
    res.status(200).json({ Message: "Everything is working fine!!" })
})

app.post('/download', async (req, res) => {
    const url = req.body.videoUrl;

    try {
        // Retrieve information about the video from the provided URL
        const videoInfo = await ytdl.getInfo(url);

        return res.status(200).send(videoInfo);
    } catch (error) {
        // Check if the error message indicates that the video is unavailable
        if (error.message.includes("Video unavailable")) {
            return res.status(404).json({ message: "Video unavailable or restricted" });
        } else {
            // Handle other errors
            console.error('Error downloading video:', error);
            return res.status(500).json({ message: 'Error downloading video', error });
        }
    }
});


// Start the server and listen for incoming requests on the specified port
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});
