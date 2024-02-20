"use client";

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";
import { IoVolumeHigh } from "react-icons/io5";
import { download_url } from "../api_urls";
import Loader from "./Loader";

const VideoCard = ({ videoUrl, video, thumbnail, title }) => {
	const [downloading, setDownloading] = useState(false);
	const { url, quality, qualityLabel, container, itag } = video;

	// console.log(video);

	const downloadVideo = async (event) => {
		event.preventDefault();

		try {
			setDownloading(true);
			const response = await axios.post(
				download_url,
				{ videoUrl, formatId: itag },
				{ responseType: "blob" }
			);
			const blob = new Blob([response.data], { type: "video/mp4" });
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${title}.mkv`);
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
		<div className='flex items-center justify-between w-full px-2 md:px-0.5 md:w-3/4'>
			<div>
				<img src={`${thumbnail.url}`} alt='Thumbnail' className='h-20 w-32' />
			</div>
			<p className='text-xl dark:text-green-400 text-gray-800 flex items-center md:justify-center justify-between gap-x-0.5 md:gap-2'>
				Quality:{" "}
				{`${quality.charAt(0).toUpperCase()}${quality.slice(1)} ${video.qualityLabel}, `}
				Audio:{" "}
				{video.audioBitrate === null || video.audioBitrate === undefined ? (
					<span className='mt-1 text-green-500'>
						<IoVolumeHigh />
					</span>
				) : (
					// `${video.audioBitrate} bit`
					<span className='text-red-600'>{"Not available"}</span>
				)}
			</p>

			<button
				target='_blank'
				type='button'
				onClick={(e) => downloadVideo(e)}
				disabled={downloading}
				className='py-2 px-2 my-2 w-32 text-sm md:text-base cursor-pointer bg-blue-700 hover:bg-blue-800 hover:text-gray-300 text-white duration-200 rounded-md'
			>
				<span className='flex items-center justify-center gap-2'>
					{`Download ${video.qualityLabel === null ? "mp3" : `${video.qualityLabel}`}`}
					{downloading ? <Loader /> : ""}
				</span>
			</button>
		</div>
	);
};

export default VideoCard;
