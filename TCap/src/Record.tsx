import { invoke } from '@tauri-apps/api/tauri'
import { useState } from 'react';

export default function Record(){
    const [isRecording, setRecording] = useState(false);

    function startRecordHandler(){
        invoke('start_recording');
        setRecording(true);
    }

    function stopRecordHandler(){
        invoke('stop_recording');
        setRecording(false);
    }

    return(
        <div id='record'>
            <h1>Hello TCap</h1>
            <button type='button' onClick={()=> startRecordHandler()}>RECORD</button> 
            <button type='button' onClick={()=> stopRecordHandler()}>STOP</button> 
            
            <h2>REC: {isRecording.toString().toUpperCase()} </h2>
        </div>
    )
}