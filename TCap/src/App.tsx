//REACT
import { useState } from "react";
import reactLogo from "./assets/react.svg";
//TAURI
import { invoke } from "@tauri-apps/api/tauri";
import { LogicalPosition, WebviewWindow } from '@tauri-apps/api/window'
import { appWindow } from "@tauri-apps/api/window";
//STYLES
import "./styles/App.css";
import { error } from "console";


function App() {

  async function open_settings_window(){

    //PROBLEM: can only view source 
    const webview = new WebviewWindow('Settings', {
      url: 'src/Settings.tsx',
    })

    // wait for the webview window to be created
    await new Promise<void>((resolve, reject) => {
      webview.once('tauri://created', () => resolve())
      webview.once('tauri://error', () => reject())
    })

    // get the physical size of the webview window
    const physicalSize = await webview.innerSize()
    console.log(`Settings Window Opened Successfully, Physical Size: ${physicalSize.width}x${physicalSize.height}`)
  }

    return (
      <div id='menu-container'>
              <div id='menu-header'>
              <h1>TCap</h1>
              </div>

              <div id='menu-buttons'>
                  <button type='button'>RECORD</button>
                  <button type='button' onClick={() => open_settings_window()}>SETTINGS</button>
              </div>
          </div>
    );
  }

export default App;
