"use client";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { persistor, store } from "./store";
import { useEffect, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
