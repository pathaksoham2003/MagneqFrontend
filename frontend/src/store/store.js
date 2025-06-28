// https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/#persisting-state-redux-persist
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// import thunk from "redux-thunk";

// your slices
import salesReducer from "../features/salesSlice";

const rootReducer = combineReducers({
  sales: salesReducer,
  // Add more slices here
});

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["sales"], // only sales will be persisted
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false, // necessary for redux-persist
  }),
});

export const persistor = persistStore(store);
export default store;
