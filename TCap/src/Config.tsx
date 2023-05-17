import { invoke } from '@tauri-apps/api/tauri'
import React from 'react';
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Config = (props: { audioValues: Array<string>, videoValues: Array<string>}) => {
    
    const [isRecording, setRecording] = useState(false);
    const [audioInput, setAudioInput] = useState(''); 
    const [videoInput, setVideoInput] = useState('');
    const [path, setPath] = useState('');  
    const [duration, setDuration] = useState(5);  
   
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

    //DEBUG
    // function print(){
    //     console.log(duration); 
    // }
    // useEffect(() => {
    //     print();
    //   }, [])


    return(
        <div id='config'>
            
            {/* VIDEO CONFIG SETTINGS */}
            <div id='config-record'>
                <h1>Record</h1>
                <Dropdown 
                    options={props.videoValues} onChange={e => setVideoInput(e.value)} value={props.videoValues[0]} />
            </div>
            

            {/* AUDIO CONFIG SETTINGS */}
            <div id='config-audio'>
                <h1>Audio</h1>
                <Dropdown options={props.audioValues} onChange={e => setAudioInput(e.value)} value={props.audioValues[0]} />
            </div>


            {/* //PATH CONFIG SETTINGS */}
            <div id='config-path'>
                <h1>Path</h1>
                <label htmlFor='path'>Record Path</label>
                <input type="text" onChange={e => setPath(e.target.value)} placeholder="/" name="path"/>
            </div>

            <div id='config-duration'>
                <h1>Duration</h1>
                <label htmlFor='path'>Duration</label>
                <input type="number" onChange={e => setDuration(e.target.valueAsNumber)} placeholder="00:00" name="duration" min="1" max="15"/>
            </div>


            {/* RECORD BUTTON */}
            <div id='config-action-button'>
                <button type='button' onClick={()=> recordToDesktop(
                    duration,
                    videoInput,
                    audioInput,
                    path

                )}> RECORD </button>

                <h3>REC: {isRecording.toString().toUpperCase()}</h3>
            </div>
        </div>
    )
}
export default Config; 