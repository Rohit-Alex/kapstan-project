import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AllProvider from "Provider/AllProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AllProvider>
      <App />
    </AllProvider>
  </React.StrictMode>
);

reportWebVitals();
