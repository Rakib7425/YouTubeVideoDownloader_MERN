
const ytdl = require('ytdl-core');

const searchVideo = async (req, res) => {
    const url = req.body.videoUrl;

    try {
        if (!url === "string") {
            return res.status(400).json({ Message: "Invalid video url" })
        }

        // Retrieve information about the video from the provided URL
        const videoInfo = await ytdl.getInfo(url);

        return res.status(200).send(videoInfo);
    } catch (error) {
        // Check if the error message indicates that the video is unavailable
        if (error.message.includes("Video unavailable")) {
            return res.status(404).json({ message: "Video unavailable or restricted" });
        } else {
            // Handle other errors
            console.error('Error Searching video:', error);
            return res.status(500).json({ message: 'Error Searching video', error });
        }
    }
}
module.exports = { searchVideo }