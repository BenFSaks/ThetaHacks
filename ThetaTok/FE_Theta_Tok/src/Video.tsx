import React, { useEffect, useState } from 'react'
import firebase from "firebase/compat";
import './Video.css'

interface Props {
  firebaseApp: firebase.app.App;
}

interface UserData{
    id: string;
    video_src: string;
    title: string;
}
export const Video: React.FC<Props> = ({firebaseApp}) => {
    const [videos, setVideos] = useState<UserData[]>([]);
    const [currVid, setCurrVid] = useState(0);
    useEffect(() => {
        getVideos();
    },[])
    const getVideos = async ()=>{
        try {
            const db = firebaseApp.firestore();
            const allUsers = await db.collection("users").get()
            const userVideos: UserData[] = [];
            allUsers.forEach((user)=>{
                const userUploads = user.data().uploads;
                if(userUploads){
                    userUploads.forEach((upload: {video_src: string, title: string}) =>{
                        const userData = {id: user.id, video_src: upload.video_src, title: upload.title};
                        userVideos.push(userData);

                    })
                }
            })
            setVideos(userVideos);
            console.log(allUsers)
        } catch (error) {
            console.log(error);
        }
    }
    const generateRandomNumber = () => {
        const newRandomNumber = Math.floor(Math.random() * videos.length);
        setCurrVid(newRandomNumber);
    };


  return (
    <div className='video'>
        {videos[currVid] ? <iframe src={videos[currVid].video_src} frameborder="0" unMute allowFullScreen width="500" height="760"></iframe> : <></>}
        <div>
            <button onClick={()=> console.log(currVid)}>↑</button>
            <button onClick={()=> generateRandomNumber()}>↓</button>

        </div>
    </div>
  )
}
