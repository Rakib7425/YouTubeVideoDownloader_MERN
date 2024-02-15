import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDark, setLight } from "../store/slices/themeSlice";
import { LuMoonStar, LuSunMoon } from "react-icons/lu";

const ToggleDarkMode = () => {
	const { currentTheme } = useSelector((store) => store.theme);
	const dispatch = useDispatch();

	const handleClick = () => {
		// Toggle theme value
		if (currentTheme === "dark") {
			dispatch(setLight());
		} else {
			dispatch(setDark());
		}
	};

	useEffect(() => {
		// Update document element based on the initial theme value
		if (currentTheme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [currentTheme]); // Add currentTheme to the dependency array

	return (
		<button
			onClick={handleClick}
			className={
				"dark:bg-black dark:text-white bg-pink-700 rounded-full py-3 px-3 duration-500"
			}
			title='toggleTheme'
		>
			{currentTheme !== "dark" ? (
				<LuSunMoon size={21} color='white' />
			) : (
				<LuMoonStar size={20} />
			)}
		</button>
	);
};

export default ToggleDarkMode;
