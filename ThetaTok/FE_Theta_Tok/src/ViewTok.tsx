import React, {useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import firebase from 'firebase/compat/app'
import {useAuthState} from 'react-firebase-hooks/auth'
import 'firebase/compat/auth'
import { Auth } from '@firebase/auth'
import './ViewTok.css'
import tcapLogo from './tcap_logo.png'

interface Props {
  auth: Auth;
}

export const ViewTok: React.FC<Props> = ({auth}) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

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
                <button onClick={signInWithGoogle}>Sign In</button>
            </div>
        );
    };


    return (
        <div className="App">
            <div className='tcap'>
                <button onClick={() => {
                    const win = window.open("https://drive.google.com/file/d/1XlHO-xWiKP-1ieArGH7bsX3XhTfxeLfy/view", "_blank");
                    win?.focus();
                }}>
                    Download TCAP for short form video recording
                    <img id="tcapLogo" src={tcapLogo} />
                </button>
            </div>
            <div className='title'>
                <h1>ThetaTok</h1>
            </div>
            {user 
                ?  
                    <div className="signed-in-buttons">
                        <div className='upload-button'>
                            <button onClick={() => navigate("/upload", {state: {userId: user.uid}})}>Upload</button>
                        </div>
                        <div className='sign-out-button'>
                            <button onClick={() => firebase.auth().signOut()}>Signout</button>
                        </div> 
                    </div>
                : 
                    <SignIn></SignIn>
            }
        </div>
    );
}

