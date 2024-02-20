'use client'

import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./rootReducer";

let store;

// Check if we are on the client-side before creating the Redux store
if (typeof window !== "undefined") {
    store = configureStore({
        reducer: rootReducer,
    });
}

export { store };
