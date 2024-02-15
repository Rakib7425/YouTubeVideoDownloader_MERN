/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";

const VideoCard = ({ video, thumbnail }) => {
	const [downloading, setDownloading] = useState(false);
	const { url, quality, qualityLabel, container } = video;

	// console.log(video);

	const downloadVideo = (event) => {
		event.preventDefault(); // Prevent default anchor behavior
		setDownloading(true);
		const link = document.createElement("a");
		link.href = url;
		link.download = `video_${qualityLabel}.mp4`;
		document.body.appendChild(link);
		link.click();
		// Wait for the download to start
		setTimeout(() => {
			document.body.removeChild(link);
			setDownloading(false);
		}, 100);
	};

	return (
		<div className='flex items-center justify-between w-3/4'>
			<div>
				<img src={`${thumbnail.url}`} alt='Hello' className='h-20 w-32' />
			</div>
			<p className='text-xl dark:text-orange-400 text-gray-700'>
				Quality:{" "}
				{`${quality.charAt(0).toUpperCase()}${quality.slice(1)} ${video.qualityLabel}`}
			</p>

			<button
				type='button'
				onClick={downloadVideo}
				disabled={downloading}
				className='py-2 px-2 my-2 w-32 dark:bg-neutral-700 hover:bg-neutral-800 hover:text-gray-400 duration-200 rounded-md'
			>
				{downloading ? "Downloading..." : `Download ${video.qualityLabel}`}
			</button>
		</div>
	);
};

export default VideoCard;
