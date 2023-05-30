import React, {useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import firebase from 'firebase/compat/app'
import {useAuthState} from 'react-firebase-hooks/auth'
import 'firebase/compat/auth'
import { Auth } from '@firebase/auth'
import { VideoJS } from './VideoJS'
import './ViewTok.css'

interface Props {
  auth: Auth;
}

export const ViewTok: React.FC<Props> = ({auth}) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        const hlsScript = document.createElement("script");
        hlsScript.src = "https://cdn.jsdelivr.net/npm/hls.js@0.12.4";
        document.body.appendChild(hlsScript);

        const thetaScript = document.createElement("script");
        thetaScript.src =
            "https://d1ktbyo67sh8fw.cloudfront.net/js/theta.umd.min.js";
        document.body.appendChild(thetaScript);

        const thetaHlsPluginScript = document.createElement("script");
        thetaHlsPluginScript.src =
            "https://d1ktbyo67sh8fw.cloudfront.net/js/theta-hls-plugin.umd.min.js";
        document.body.appendChild(thetaHlsPluginScript);

        const videoJsThetaPluginScript = document.createElement("script");
        videoJsThetaPluginScript.src =
            "https://d1ktbyo67sh8fw.cloudfront.net/js/videojs-theta-plugin.min.js";
        document.body.appendChild(videoJsThetaPluginScript);

        // Clean up the dynamically added scripts when the component is unmounted
        return () => {
            document.body.removeChild(hlsScript);
            document.body.removeChild(thetaScript);
            document.body.removeChild(thetaHlsPluginScript);
            document.body.removeChild(videoJsThetaPluginScript);
        };
      }, []);

    const SignIn = () => {
        const signInWithGoogle = async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            const logIn = await firebase.auth().signInWithPopup(provider);
            const db = firebase.firestore();
            const userId = logIn.user?.uid
            const usersCollection = db.collection('users');
            const userDoc = usersCollection.doc(userId);
            const userData = await userDoc.get();
            if (!userData.exists){
                if (userId != undefined){
                    userDoc.set({"uploads" : []});
                } else {
                    console.error("User id is undefined")
                }
            }
        };
        return (
            <div>
                <h2>Sign In Page</h2>
                <button onClick={signInWithGoogle}>Sign In</button>
            </div>
        );
    };


    return (
        <div className="App">
            <h1>Theta Tok</h1>
            {user ?  
                    <div>
                        <button onClick={() => navigate("/upload", {state: {userId: user.uid}})}>Upload</button>
                        <button onClick={() => firebase.auth().signOut()}>Signout</button>
                    </div>
                : 
                    <SignIn></SignIn>}
            <div className="tiktok">
                {user ? <VideoJS ></VideoJS> : <></>}
            </div>
        </div>
    )
}

