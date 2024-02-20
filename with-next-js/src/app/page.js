import { Provider } from "react-redux";
// Assuming this path is correct
import YtDownloader from "@/components/YtDownloader"; // Assuming this path is correct
import { store } from "./lib/store";

export default function Home() {
  return (
    <div className='dark:bg-indigo-950 min-h-screen duration-700'>
      <section className='max-w-[1280px] mx-auto h-full pb-4'>
        <h1 className='text-2xl font-bold py-8 md:text-yellow-500'>
          YouTube video Downloader
        </h1>
        {/* Wrap your component with Provider and PersistGate */}
        <Provider store={store}>
          <YtDownloader />
        </Provider>
      </section>
    </div>
  );
}
