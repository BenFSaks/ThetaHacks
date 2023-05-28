import { invoke } from '@tauri-apps/api/tauri'
import React from 'react';
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
        
const Config = (props: { audioValues: Array<string>, videoValues: Array<string>}) => {
    
    const [isRecording, setIsRecording] = useState(false);
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
        setIsRecording(true)
        setTimeout(setIsRecording, time*1000, false);
    }

    //DEBUG
    // function print(){
    //     console.log(duration); 
    // }
    // useEffect(() => {
    //     print();
    //   }, [])


    return(
    <div className='parent'>
        <div className='config'>
            {/* VIDEO CONFIG SETTINGS */}
            <div id='config-record' className='config-option'>
                <h1>Video</h1>
                <Dropdown 
                    options={props.videoValues} onChange={e => setVideoInput(e.value)} placeholder="Select Input"/>
            </div>
                     

            {/* AUDIO CONFIG SETTINGS */}
            <div id='config-audio' className='config-option'>
                <h1>Audio</h1>
                <Dropdown options={props.audioValues} onChange={e => setAudioInput(e.value)} placeholder="Select Input"/>
            </div>

            
            {/* PATH CONFIG SETTINGS */}
            <div id='config-path' className='config-path'>
                <h1>Path</h1>
                <label htmlFor='path'></label>
                <input type="text" onChange={e => setPath(e.target.value)} placeholder="/" name="path"/>
            </div>


            {/* DURATION CONFIG SETTINGS */}
            <div id='config-duration' className='config-duration'>
                <h1>Duration</h1>
                <label htmlFor='path'></label>
                <input type="number" onChange={e => setDuration(e.target.valueAsNumber)} placeholder="00:00" name="duration" min="1" max="15"/>
            </div>


            {/* RECORD BUTTON */}
            <div id='config-action-button' className='config-record'>
                <button type='button' onClick={()=> recordToDesktop(
                    duration,
                    videoInput,
                    audioInput,
                    path

                )}> RECORD </button>

                <h3>REC: {isRecording.toString().toUpperCase()}</h3>
            </div>
        </div>
    </div>
    )
}
export default Config; 
