import React from 'react'
import './App.css'
import { SignIn } from './SignIn'
import TikTok from './TikTok'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData } from 'react-firebase-hooks/firestore'
import Upload from './Upload'
import { useNavigate} from 'react-router-dom'




const env = import.meta.env;
console.log(env.VITE_appId)
const app = firebase.initializeApp({
  apiKey: env.VITE_apiKey,
  authDomain: env.VITE_authDomain,
  projectId: env.VITE_projectId,
  storageBucket: env.VITE_storageBucket,
  messagingSenderId: env.VITE_messagingSenderId,
  appId: env.VITE_appId
})

const auth:any = firebase.auth();
const firestore = firebase.firestore();


export default function ViewTok() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    return (
        <div className="App">
        <h1>Theta Tok</h1>
        {user ?  
                <div>
                    <button onClick={() => navigate("/upload")}>Upload</button>
                    <button onClick={() => firebase.auth().signOut()}>Signout</button>
                </div>
            : 
                <SignIn auth={auth}></SignIn>}
        {/* To be replaced with a Tik Tok Component  */}
        <div className="tiktok">
            <p>
            This is where the tiktok video will be played ... do we overlay a ui?
            </p>
        </div>
        </div>
    )
}

