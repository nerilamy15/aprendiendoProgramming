import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore, applyMiddleware, compose } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { PersistGate } from "redux-persist/integration/react";

import thunk from "redux-thunk";
import { Provider } from "react-redux";
import allReducers from "./reducers";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

/*const saveLocalStorage = state => {
  try {
    const serializeState = JSON.stringify(state);
    console.log("jaja");
    localStorage.setItem("state", serializeState);
  } catch (e) {
    console.log(e);
  }
};*/

/*const loadLocalStorage = () => {
  try {
    const serializeState = localStorage.getItem("state");
    if (serializeState === null) return undefined;
    return JSON.parse(serializeState);
  } catch (e) {
    return undefined;
  }
};*/

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["error", "userInfoReducer"]
};

const persistedReducer = persistReducer(persistConfig, allReducers);

//STORE  GLOBAL STATE
const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...middleware))
);
let persistor = persistStore(store);

/*store.subscribe(() => {
  //saveLocalStorage(store.getState());
});*/

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
