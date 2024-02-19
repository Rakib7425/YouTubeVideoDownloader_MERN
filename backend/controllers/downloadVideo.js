const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');
const { spawn } = require('child_process');

const downloadVideo = async (req, res) => {
    const { videoUrl, formatId } = req.body;

    try {
        if (videoUrl !== "String") {
            return new Error("Video url must be a String")
        }
        // Fetch video info
        const info = await ytdl.getInfo(videoUrl);

        // Find the video format with the specified formatId
        const videoFormat = info.formats.find(format => format.itag === formatId);

        if (!videoFormat) {
            return res.status(404).json({ message: 'Video format not found' });
        }

        // Find the best audio-only format
        const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });

        if (!audioFormat) {
            return res.status(404).json({ message: 'Audio format not found' });
        }

        // Create temporary file paths for video and audio
        const videoFilePath = './temp/downloads/temp_video.mp4';
        const audioFilePath = './temp/downloads/temp_audio.mp3';

        // Download video using ytdl-core
        await new Promise((resolve, reject) => {
            ytdl(videoUrl, { format: videoFormat })
                .pipe(fs.createWriteStream(videoFilePath))
                .on('finish', resolve)
                .on('error', reject);
        });

        // Download audio using ytdl-core
        await new Promise((resolve, reject) => {
            ytdl(videoUrl)
                .pipe(fs.createWriteStream(audioFilePath))
                .on('finish', resolve)
                .on('error', reject);
        });

        // Convert video to audio using ffmpeg
        const ffmpegProcess = spawn(ffmpeg, [
            '-i', videoFilePath,
            '-vn', // Disable video
            '-acodec', 'mp3', // Set audio codec
            audioFilePath
        ]);

        ffmpegProcess.on('error', (err) => {
            console.error('Error converting video to audio:', err);
            return res.status(500).json({ message: 'Error converting video to audio', error: err });
        });

        ffmpegProcess.on('close', (code) => {
            if (code === 0) {
                // Send audio file as response
                res.download(audioFilePath, (err) => {
                    if (err) {
                        console.error('Error sending file:', err);
                        return res.status(500).json({ message: 'Error sending file', error: err });
                    }

                    // Cleanup temporary files
                    fs.unlinkSync(videoFilePath);
                    fs.unlinkSync(audioFilePath);
                });
            } else {
                console.error('ffmpeg process exited with non-zero code:', code);
                return res.status(500).json({ message: 'ffmpeg process exited with non-zero code', code });
            }
        });
    } catch (error) {
        console.error('Error downloading and converting video:', error);
        return res.status(500).json({ message: 'Error downloading and converting video', error });
    }
};

module.exports = { downloadVideo };
