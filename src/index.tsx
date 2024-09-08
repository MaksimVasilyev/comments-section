import React from "react";
import ReactDOM from "react-dom/client";
import "styles/globals.scss";
import App from "./App";
import  { CommentsProvider } from "context/CommentsContext"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
     <CommentsProvider>
    <App />
    </CommentsProvider>
  </React.StrictMode>
);
