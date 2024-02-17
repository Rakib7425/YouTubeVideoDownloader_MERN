/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";
import { IoVolumeMute } from "react-icons/io5";
import { download_url } from "../api_urls";
import Loader from "./Loader";
import { LuSearch } from "react-icons/lu";

const VideoCard = ({ videoUrl, video, thumbnail }) => {
	const [downloading, setDownloading] = useState(false);
	const { url, quality, qualityLabel, container, itag } = video;

	// console.log(video);

	const downloadVideo = async (event) => {
		event.preventDefault();
		setDownloading(true);
		try {
			const response = await axios.post(download_url, { videoUrl, formatId: itag });
			const dUrl = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = dUrl;
			link.setAttribute("download", `${qualityLabel}.${container}`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			setDownloading(false);
		} catch (error) {
			// setError("Error downloading video");
			console.error("Error downloading video:", error);
			setDownloading(false);
		}
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

			<a
				target='_blank'
				type='button'
				onClick={(e) => downloadVideo(e)}
				disabled={downloading}
				className='py-2 px-2 my-2 w-32 cursor-pointer bg-blue-700 hover:bg-blue-800 hover:text-gray-300 text-white duration-200 rounded-md'
			>
				<span className='flex items-center justify-center gap-2'>
					{`Download ${video.qualityLabel}`}
					{!downloading ? <Loader /> : ""}
				</span>
			</a>
		</div>
	);
};

export default VideoCard;
