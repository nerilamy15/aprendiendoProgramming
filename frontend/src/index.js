import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { createStore2, createPersistor } from "./store";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#65cbb7",
      light: "#8bcbad",
      dark: "#89a5ad"
    },
    secondary: {
      main: "#8b70d2",
      light: "#8b9ad2",
      dark: "#c46d99"
    }
  }
});

console.log(theme);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={createStore2()}>
      <PersistGate loading={null} persistor={createPersistor()}>
        <App />
      </PersistGate>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
