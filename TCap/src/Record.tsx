import {invoke} from "@tauri-apps/api/tauri";
import {useState} from "react";

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

    function record_to_desktop(time: number, videoInput: string, audioInput: string, outputFile: string) {
        invoke('record_camera_screen', {
            time: time,
            videoInput: videoInput,
            audioInput: audioInput,
            outputFile: outputFile
        });
    }
    return(
        <div id='record'>
            <h1>Hello TCap</h1>
            <button type='button' onClick={()=> startRecordHandler()}>RECORD</button> 
            <button type='button' onClick={()=> stopRecordHandler()}>STOP</button>
            <button type='button' onClick={()=> record_to_desktop(10, 'FaceTime HD Camera (Built-in)', 'Internal Digital Microphone (Apple Audio Device)', 'C:\\Users\\rethe\\OneDrive\\fromTauri.mp4')}>RECORD TO DESKTOP</button>

            <h2>REC: {isRecording.toString().toUpperCase()} </h2>
        </div>
    )
}
