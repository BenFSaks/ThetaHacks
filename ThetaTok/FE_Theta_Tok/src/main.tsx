import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { Upload } from './Upload'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ViewTok } from './ViewTok'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/firestore';
import { getAuth } from '@firebase/auth'

const env = import.meta.env;
const app = firebase.initializeApp({
  apiKey: env.VITE_apiKey,
  authDomain: env.VITE_authDomain,
  projectId: env.VITE_projectId,
  storageBucket: env.VITE_storageBucket,
  messagingSenderId: env.VITE_messagingSenderId,
  appId: env.VITE_appId
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "",
        element: <ViewTok auth={getAuth(app)}></ViewTok>
      },
      {
        path: "upload",
        element: <Upload firebaseApp={app}></Upload>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
