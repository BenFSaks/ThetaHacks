import React from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'


interface Props {
  auth: firebase.auth.Auth;
}



export const SignIn: React.FC<Props> = ({ auth }) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div>
      <h2>Sign In Page</h2>
      <button onClick={signInWithGoogle}>Sign In</button>
    </div>
  );
};
