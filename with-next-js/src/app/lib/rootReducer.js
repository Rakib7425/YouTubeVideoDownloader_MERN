import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./store/features/themeSlice"
import videoInfoSlice from "./store/features/videoInfoSlice"

const rootReducer = combineReducers({
	theme: themeReducer,
	videoInfo: videoInfoSlice,
});

export default rootReducer;
