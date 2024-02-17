import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LuSearch } from "react-icons/lu";
import Loader from "./Loader";
import VideoInfo from "./VideoInfo";
import { setVideoInfo } from "../store/slices/videoInfoSlice";
import { search_url } from "../api_urls";

const YtDownloader = () => {
	const [url, setUrl] = useState("https://www.youtube.com/watch?v=bwpuspBUUzA");
	const [isLoading, setIsLoading] = useState(false);
	const [video_info, set_video_info] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setVideoInfo(video_info));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [video_info]);

	const downloadFromYoutube = async () => {
		if (url.length < 1) {
			console.log("Please Enter a valid URL !!");
			return;
		}

		setIsLoading(true);

		try {
			const bodyContent = JSON.stringify({
				videoUrl: url,
			});

			const headersList = {
				"Content-Type": "application/json",
			};

			const response = await fetch(`${search_url}`, {
				method: "POST",
				body: bodyContent,
				headers: headersList,
			});

			const data = await response.json();

			if (!response.status === 200) {
				console.log(data);
				throw new Error("Failed to download video");
			}

			set_video_info(data);
		} catch (error) {
			console.error("Error downloading video:", error);
		}
		setIsLoading(false);
	};

	return (
		<>
			<div className='flex flex-col md:flex-row items-center justify-center gap-1'>
				<input
					type='url'
					id='yt-url'
					placeholder='Youtube video url'
					className='py-2 px-5 my-4 w-[96%] md:w-[50%] text-xl outline-none border-2 md:focus:outline-orange-500 duration-150 rounded-l-sm'
					onChange={(e) => setUrl(e.target.value)}
				/>

				<button
					disabled={isLoading}
					className='py-2 px-5 h-12 disabled:cursor-not-allowed bg-green-600 text-xl hover:bg-green-700 duration-200 rounded-r-sm'
					onClick={downloadFromYoutube}
				>
					<span className='flex items-center justify-center gap-2'>
						{isLoading ? <Loader /> : <LuSearch />}
						Search
					</span>
				</button>
			</div>
			{video_info && (
				<div className='videoInfo h-full'>
					<VideoInfo />
				</div>
			)}
		</>
	);
};

export default YtDownloader;
