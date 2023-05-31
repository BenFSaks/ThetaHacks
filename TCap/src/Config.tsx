import { invoke } from '@tauri-apps/api/tauri'
import { log } from 'console';
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
    const [fileExists, setFileExists] = useState(false);
    const [fileTagged, setNoFileTagged] = useState(false);
    //Call Backend Screen Recorder
    function doesFileExist(path: string) {
        invoke('file_exists', { path }).then((r) => {
                setFileExists(r as boolean)
                console.log("from file exists fun")
                console.log(r)
        })
        console.log(path)
    }
    function isFileTagged(path: string) {
        invoke('no_file_tagged', { path }).then((r) => { 
            setNoFileTagged(r as boolean)
            console.log("from file tagged fun")
            console.log(r)
            })
        console.log(path)
    }

    function recordToDesktop(time: number, video: string, audio: string, output: string){
        if (!fileTagged) {
                return;
        }
        else {
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
    }

    //DEBUG
    // function print(){
    //     console.log(duration); 
    // }
    // useEffect(() => {
    //     print();
    //   }, [])

    function ErrorMesssage() {
        return (
                <div>
                there is an error
                </div>
               )
    }
    return(
            <div className='parent'>

            <div className='config'>
            <div className='config-record'>
            {(!fileTagged) ? (  
                    <div>
                    <h2><strong>You Have No Output Path!</strong></h2> 
                    <br/>
                </div>
                ): <></>}
        </div>
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
                <input type="text" onChange={e =>  {
                    setPath(e.target.value)
                    doesFileExist(e.target.value)
                    isFileTagged(e.target.value)
                    }
                }
                placeholder="/" name="path"/>
            </div>


            {/* DURATION CONFIG SETTINGS */}
            <div id='config-duration' className='config-duration'>
                <h1>Duration</h1>
                <label htmlFor='path'></label>
                <input type="number" onChange={e => setDuration(e.target.valueAsNumber)} placeholder="00:00" name="duration" min="1" max="60"/>
            </div>


            {/* RECORD BUTTON */}
            <div id='config-action-button' className='config-record'>
                <button type='button' onClick={()=> recordToDesktop(
                    duration+3,
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
