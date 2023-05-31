import React, { useEffect, useState } from 'react'
import firebase from "firebase/compat";
import './Video.css'
import { User } from '@firebase/auth';

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
            setVideos(shuffleList(userVideos));
        } catch (error) {
            console.log(error);
        }
    }
    const shuffleList = (list: any[]) => {
        const shuffledList = [...list];
        for (let i = shuffledList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledList[i], shuffledList[j]] = [
                shuffledList[j],
                shuffledList[i],
            ];
        }
        return shuffledList;
    };
    const outOfBoundsUp = () =>{
        if(currVid <= 0){
            return true;
        } 
        return false;
    }
    const outOfBoundsDown = () =>{
        if(currVid >= videos.length-1){
            return true;
        } 
        return false;
    }


  return (
    <div className='video'>
        {videos[currVid] ? <iframe src={videos[currVid].video_src} frameborder="0" unMute allowFullScreen width="500" height="760"></iframe> : <></>}
        <div>
            <button disabled={outOfBoundsUp()} onClick={()=> setCurrVid(currVid-1)}>↑</button>
            <button disabled={outOfBoundsDown()} onClick={()=> setCurrVid(currVid+1)}>↓</button>

        </div>
    </div>
  )
}
