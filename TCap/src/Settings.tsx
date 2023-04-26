function Settings() {

    return (
        <div id='settings-container'>
            <h1>Settings asdf sadf</h1>
        </div>
    );
  }
  export default Settings;
import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App";
import "./styles/styles.css";

ReactDOM.createRoot(document.getElementById("root2") as HTMLElement).render(
  <React.StrictMode>
    <Settings />
  </React.StrictMode>
);