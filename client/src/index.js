import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import authReducer from "./state";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// persist help us to store all the state at local state
// means any time user close the tab or close the browser that information will still be stored in there the user information will still be there
// the only way to get rid of that is to cleat he cache
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";


const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);

// configure store use to create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // this is to ignore some warning if they have if we are using persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

