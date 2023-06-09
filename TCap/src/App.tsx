import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { WebviewWindow } from '@tauri-apps/api/window'
import "./styles/App.css";

import Config from "./Config";

function App() {

    //States 
    const [audioInput, setAudioInput] = useState<string[]>([]); 
    const [videoInput, setVideoInput] = useState<string[]>([]); 

    //Open a new window called settings 
    async function open_settings_window(){

        const webview = new WebviewWindow('Settings', {
url: '../settings.html',
title: "Settings"
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

//Open transparent cropable window 
function open_crop_window(){

    const webview = new WebviewWindow('Crop', {
url: '../crop.html',
decorations: true, 
transparent: true, 
})
}

//Method to get input options (audio, video, cam)
const fetchInputData = async() => { 
    const audio: Array<string> = await invoke('get_dshow_devices');
    const video: Array<string> = await invoke('get_dshow_devices');

    setAudioInput(audio);
    setVideoInput(video);  
}
useEffect(() => {
        fetchInputData();
        }, [])

return (
        <>
            <h1 className="title">
                TCap Screen Recorder
            </h1>
         <Config 
         videoValues = {videoInput}
         audioValues = {audioInput}
         />
        </>
       );
}

export default App;
