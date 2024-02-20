import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
	name: "theme",
	initialState: { currentTheme: "dark" },

	reducers: {
		setDark: (state) => {
			state.currentTheme = "dark";
		},

		setLight: (state) => {
			state.currentTheme = "light";
		},
	},
});

export const { setDark, setLight } = themeSlice.actions;
export default themeSlice.reducer;
