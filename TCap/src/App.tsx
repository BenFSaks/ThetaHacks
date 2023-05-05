//REACT
import { useState } from "react";
import React from "react";

//TAURI
import { invoke } from "@tauri-apps/api/tauri";
import { LogicalPosition, WebviewWindow } from '@tauri-apps/api/window'
import { appWindow } from "@tauri-apps/api/window";
//STYLES
import "./styles/App.css";



function App() {

  async function open_settings_window(){

<<<<<<< Updated upstream
    //PROBLEM: can only view source 
=======
>>>>>>> Stashed changes
    const webview = new WebviewWindow('Settings', {
      url: '../settings.html',
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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes

    return (
      <div id='menu-container'>
              <div id='menu-header'>
              <h1>TCap</h1>
              </div>

              <div id='preview-panel'>
                <h3>PREVIEW</h3>
              </div>

              <div id='panel-container'>
                <div id='record-panel'>
                    <h3>RECORD</h3>
<<<<<<< Updated upstream
=======
                    <button type='button'>CROP</button>
>>>>>>> Stashed changes
                    <button type='button'>START</button>
                    <button type='button'>PAUSE</button>
                    <button type='button'>STOP</button>
                    
                </div>
                <div id='config-panel'>
                    <h3>CONFIG</h3>
                    <button type='button' onClick={() => open_settings_window()}>SETTINGS</button>
                    <button type='button'>EDIT</button>
                    <button type='button'>SHARE</button>
                </div>
              </div>

              
          </div>
    );
  }

export default App;
