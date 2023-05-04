import React from 'react'
import { useNavigate} from 'react-router-dom'
import firebase from 'firebase/compat/app'
import {useAuthState} from 'react-firebase-hooks/auth'
import 'firebase/compat/auth'
import { Auth } from '@firebase/auth'
import { TikTok } from './TikTok'
import './ViewTok.css'

interface Props {
  auth: Auth;
}

export const ViewTok: React.FC<Props> = ({auth}) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    console.log()
    const SignIn = () => {
        const signInWithGoogle = async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            const logIn = await firebase.auth().signInWithPopup(provider);
            const db = firebase.firestore();
            const userId = logIn.user?.uid
            const usersCollection = db.collection('users');
            const userDoc = usersCollection.doc(userId);
            const user = await userDoc.get();
            if (!user.exists){
                console.log("cool");
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
                        <button onClick={() => navigate("/upload")}>Upload</button>
                        <button onClick={() => firebase.auth().signOut()}>Signout</button>
                    </div>
                : 
                    <SignIn></SignIn>}
            <div className="tiktok">
                <TikTok></TikTok>
            </div>
        </div>
    )
}

