import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import ToggleDarkMode from "./components/ToggleDarkMode.jsx";
import YtDownloader from "./components/YtDownloader.jsx";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<div>
					<ToggleDarkMode />
				</div>
			),
		},
		{
			path: "/hello",
			element: <div>Hello</div>,
		},
	]);

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
