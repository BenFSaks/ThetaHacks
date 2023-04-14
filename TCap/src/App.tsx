import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {

  return (
    <div id='menu-container'>
            <div id='menu-header'>
            <h1>TCap</h1>
            </div>

            <div id='menu-buttons'>
                <button type='button'>RECORD</button>
            </div>
        </div>
  );
}

export default App;
