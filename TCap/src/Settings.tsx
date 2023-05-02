function Settings() {

    return (
        <div id='settings-container'>
            <h1>Settings</h1>
        </div>
    );
  }
  export default Settings;


//PAGE RENDER
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/styles.css";

ReactDOM.createRoot(document.getElementById("settings-route") as HTMLElement).render(
  <React.StrictMode>
    <Settings />
  </React.StrictMode>
);