"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
// Use default storage (localStorage)

import { cartReducer } from "./slice";
import { notificationsReducer } from "./notifiySlice";
import storage from "./storage";

const PersistConfig = {
  key: "cart",
  storage,

  version: 1,
};
const PersistConfigForNotify = {
  key: "notification",
  storage,

  version: 1,
};
const persistedReducerS = persistReducer(PersistConfig, cartReducer);
const persistedReducerN = persistReducer(
  PersistConfigForNotify,
  notificationsReducer
);

const rootReducer = combineReducers({
  cart: persistedReducerS, //  cart reducer
  notifications: persistedReducerN, // Add notifications reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Call persistStore after creating the store
persistStore(store);
