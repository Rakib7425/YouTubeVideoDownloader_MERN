"use client";

/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";

const VideoInfo = () => {
	const videoInfo = useSelector((store) => store.videoInfo.videoInfo);

	// console.log(videoInfo);

	return (
		<div>
			{videoInfo.formats && (
				<>
					<h1 className='dark:text-orange-600 text-3xl py-3 font-semibold'>
						:: Video Info ::
					</h1>

					<div className='flex flex-col justify-center gap-3'>
						<h1 className='text-3xl text-black duration-100 dark:text-white'>
							Title: {videoInfo.videoDetails.title}
						</h1>
						{videoInfo.formats.map((video, index) => (
							<div key={index} className='flex items-center justify-center'>
								<VideoCard
									videoUrl={videoInfo.videoDetails.video_url}
									thumbnail={videoInfo.videoDetails.thumbnails[2]}
									title={videoInfo.videoDetails.title}
									video={video}
								/>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default VideoInfo;
