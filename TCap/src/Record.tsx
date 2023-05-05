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

    function recordToDesktop(time: number, video: string, audio: string, output: string) {
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
            <h1>Hello TCap</h1>
            <button type='button' onClick={()=> startRecordHandler()}>RECORD</button> 
            <button type='button' onClick={()=> stopRecordHandler()}>STOP</button>
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
