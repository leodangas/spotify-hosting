import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HistoryProvider } from "./components/HistoryProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <HistoryProvider>
      <App />
    </HistoryProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
