import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import videoInfoSlice from "./slices/videoInfoSlice";

const rootReducer = combineReducers({
	theme: themeReducer,
	videoInfo: videoInfoSlice,
});

export default rootReducer;
