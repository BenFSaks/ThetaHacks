//REACT
import { useState } from "react";
import reactLogo from "./assets/react.svg";
//TAURI
import { invoke } from "@tauri-apps/api/tauri";
//STYLES
import "./styles/App.css";


function App() {

  return (
    <div id='menu-container'>
            <div id='menu-header'>
            <h1>TCap</h1>
            </div>

            <div id='menu-buttons'>
                <button type='button'>RECORD</button>
                <button type='button' onClick={() => invoke('open_settings_window')}>SETTINGS</button>
            </div>
        </div>
  );
}

export default App;
