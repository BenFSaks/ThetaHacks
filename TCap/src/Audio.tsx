import { useEffect, useState } from "react";
import Select from 'react-select'; 
import Dropdown from 'react-dropdown';
import { invoke } from "@tauri-apps/api/tauri";
import 'react-dropdown/style.css';

const Audio = (props: { inputValues: Array<string>}) => {

    return(
        <div>
            <h1>Audio</h1>
                <Dropdown options={props.inputValues} value={props.inputValues[0]} />
        </div>
    );
} 
export default Audio; 