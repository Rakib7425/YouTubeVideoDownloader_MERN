import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import ToggleDarkMode from "./components/ToggleDarkMode.jsx";
import YtDownloader from "./components/YtDownloader.jsx";
import { useEffect } from "react";
import { base_url } from "./api_urls.js";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<div className='mb-2'>
				<ToggleDarkMode />
			</div>
		),
	},
	{
		path: "/hello",
		element: <div>Hello</div>,
	},
]);

const App = () => {
	const reRunServer = () => {
		let options = { method: "GET" };

		fetch(base_url, options)
			.then((res) => res.json())
			.then((json) => console.log(json))
			.catch((err) => console.error("error:" + err));
		return;
	};

	useEffect(() => {
		// reRunServer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='dark:bg-indigo-950 min-h-screen duration-700'>
			<section className='max-w-[1280px] mx-auto h-full pb-4'>
				<h1 className='text-2xl font-bold py-8 md:text-yellow-500'>
					YouTube video Downloader
				</h1>
				{/* WARN: Don't Change or edit this */}
				<RouterProvider router={router} />
				<YtDownloader />
			</section>
		</div>
	);
};

export default App;
