/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoVolumeMute } from "react-icons/io5";

const VideoCard = ({ video, thumbnail }) => {
	const [downloading, setDownloading] = useState(false);
	const { url, quality, qualityLabel, container } = video;

	console.log(video);

	const downloadVideo = (event) => {
		event.preventDefault(); // Prevent default anchor behavior
		setDownloading(true);
		const a = document.createElement("a");
		a.setAttribute("href", url);
		a.download = `${qualityLabel}.${container}`;

		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	return (
		<div className='flex items-center justify-between w-3/4'>
			<div>
				<img src={`${thumbnail.url}`} alt='Thumbnail' className='h-20 w-32' />
			</div>
			<p className='text-xl dark:text-orange-400 text-gray-700 flex items-center justify-center gap-2'>
				Quality:{" "}
				{`${quality.charAt(0).toUpperCase()}${quality.slice(1)} ${video.qualityLabel}, `}
				Audio:{" "}
				{video.audioBitrate === null || video.audioBitrate === undefined ? (
					<span className='mt-1 text-red-500'>
						<IoVolumeMute />
					</span>
				) : (
					`${video.audioBitrate} bit`
				)}
			</p>

			<button
				type='button'
				onClick={(e) => downloadVideo(e)}
				disabled={downloading}
				className='py-2 px-2 my-2 w-32 cursor-pointer bg-blue-700 hover:bg-blue-800 hover:text-gray-300 text-white duration-200 rounded-md'
			>
				{`Download ${video.qualityLabel}`}
			</button>
		</div>
	);
};

export default VideoCard;
