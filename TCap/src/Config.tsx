import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Config = (props: { audioValues: Array<string>, videoValues: Array<string>}) => {
    
    const [isRecording, setRecording] = useState(false);
    const [audioInput, setAudioInput] = useState(''); 
    const [videoInput, setVideoInput] = useState('');  
   
    //Call Backend Screen Recorder
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

    // DEBUG
    function printProps(){
        console.log(props); 
    }
    useEffect(() => {
        printProps();
      }, [])


    return(
        <div id='config'>
            
            {/* VIDEO CONFIG SETTINGS */}
            <div id='config-record'>
                <h1>Record</h1>
                <Dropdown 
                    options={props.videoValues} onChange={e => setVideoInput(e.value)} value={props.videoValues[0]} />
                
                <input type="text" placeholder="Record Path" id="path"/>
                <input type="text" placeholder="Duration: 00:00:00" id="duration"/>
            </div>
            

            {/* AUDIO CONFIG SETTINGS */}
            <div id='config-audio'>
                <h1>Audio</h1>
                <Dropdown options={props.audioValues} onChange={e => setAudioInput(e.value)} value={props.audioValues[0]} />
            </div>


            {/* RECORD BUTTON */}
            <div id='config-action-button'>
                <button type='button' onClick={()=> recordToDesktop(
                    5,
                    videoInput,
                    audioInput,
                    'C:\\Users\\rethe\\OneDrive\\Desktop\\fromTauri.mp4')}>
                    RECORD
                </button>
                <h3>REC: {isRecording.toString().toUpperCase()}</h3>
            </div>
        </div>
    )
}
export default Config; 