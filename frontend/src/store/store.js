import { configureStore } from "@reduxjs/toolkit";
// import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./rootReducer";

// import rootSaga from "./rootSaga";
// const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
	key: import.meta.env.VITE_APP_PROJECT_NAME_FOR_REDUX_PERSIST || "rakib-react-app",
	storage,
	// blacklist: ['videoInfo']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

const persistor = persistStore(store);

// sagaMiddleware.run(rootSaga);

export { store, persistor };
