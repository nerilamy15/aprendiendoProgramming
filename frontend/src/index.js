import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import allReducers from "./reducers";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const saveLocalStorage = state => {
  try {
    const serializeState = JSON.stringify(state);
    console.log("jaja");
    localStorage.setItem("state", serializeState);
  } catch (e) {
    console.log(e);
  }
};

const loadLocalStorage = () => {
  try {
    const serializeState = localStorage.getItem("state");
    if (serializeState === null) return undefined;
    return JSON.parse(serializeState);
  } catch (e) {
    return undefined;
  }
};

const persistedState = loadLocalStorage();
//STORE  GLOBAL STATE
const store = createStore(
  allReducers,
  persistedState,
  composeEnhancer(applyMiddleware(...middleware))
);

store.subscribe(() => {
  saveLocalStorage(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
