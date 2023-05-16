import { invoke } from '@tauri-apps/api/tauri'
import React, { useEffect } from 'react';
import { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Record = (props: { inputValues: Array<string>}) => {
    
    const [isRecording, setRecording] = useState(false); 
   
    function recordToDesktop(time: number, video: string, audio: string, output: string){
        invoke('record', {
            time: time,
            video: video,
            audio: audio,
            output: output
        }).then((r) => {
            console.log(r);
        });
    }

    return(
        <div id='record'>
            <h1>Record</h1>
            
            <Dropdown options={props.inputValues} value={props.inputValues[0]} />
            
            <input type="text" placeholder="Record Path" id="path"/>
            <input type="text" placeholder="Duration: 00:00:00" id="duration"/>

            <button type='button' onClick={()=> recordToDesktop(5,
                'FaceTime HD Camera (Built-in)',
                'Internal Digital Microphone (Apple Audio Device)',
                'C:\\Users\\rethe\\OneDrive\\Desktop\\fromTauri.mp4')}>
                RECORD TO DESKTOP
            </button>

            <h2>REC: {isRecording.toString().toUpperCase()} </h2>
        </div>
    )
}
export default Record; 
