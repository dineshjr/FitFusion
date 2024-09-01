import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/authSlice";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "authReducer",
	storage,
};
const combinedReducer = combineReducers({
	auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		});
	},
});
export const persistor = persistStore(store);
