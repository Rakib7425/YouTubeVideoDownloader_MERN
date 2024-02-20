import { createSlice } from "@reduxjs/toolkit";

const videoInfoSlice = createSlice({
    name: "videoInfo",
    initialState: { videoInfo: [] },
    reducers: {
        setVideoInfo: (state, action) => {
            state.videoInfo = action.payload;
        },
    },
});

export const { setVideoInfo } = videoInfoSlice.actions;
export default videoInfoSlice.reducer;
