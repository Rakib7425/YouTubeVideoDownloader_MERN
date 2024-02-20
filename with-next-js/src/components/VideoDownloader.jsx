"use client";

import { useState } from "react";
import axios from "axios";
import { download_url, search_url } from "../api_urls";

function VideoDownloader() {
	const [videoUrl, setVideoUrl] = useState("");
	const [formats, setFormats] = useState([]);
	const [selectedFormat, setSelectedFormat] = useState("");
	const [error, setError] = useState("");

	const handleUrlChange = (event) => {
		setVideoUrl(event.target.value);
	};

	const handleSearch = async () => {
		try {
			if (!videoUrl) {
				return console.log("Enter a valid url");
			}
			const response = await axios.post(search_url, { videoUrl });
			setFormats(response.data.formats);
			setError("");
		} catch (error) {
			setError("Error searching video formats");
			console.error("Error searching video formats:", error);
		}
	};

	const handleDownload = async () => {
		try {
			const response = await axios.post(download_url, { videoUrl, formatId: selectedFormat });
			console.log(response);
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "video.mp4");
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			setError("Error downloading video");
			console.error("Error downloading video:", error);
		}
	};

	return (
		<div>
			<h2>Video Downloader</h2>
			<div>
				<input
					type='text'
					value={videoUrl}
					onChange={handleUrlChange}
					placeholder='Enter video URL'
				/>
				<button onClick={handleSearch}>Search</button>
			</div>
			{formats.length > 0 && (
				<div>
					<h3>Select Format:</h3>
					<select
						value={selectedFormat}
						onChange={(e) => setSelectedFormat(e.target.value)}
					>
						<option value=''>Select</option>
						{formats.map((format) => (
							<option key={format.itag} value={format.itag}>
								{format.qualityLabel}
							</option>
						))}
					</select>
					<button onClick={handleDownload} disabled={!selectedFormat}>
						Download
					</button>
				</div>
			)}
			{error && <div>{error}</div>}
		</div>
	);
}

export default VideoDownloader;
