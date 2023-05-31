import { getFirestore, collection } from 'firebase/firestore';
import { useCollection  } from 'react-firebase-hooks/firestore';
import { useIdToken  } from 'react-firebase-hooks/auth';
import React, {useState, useEffect} from 'react'
import firebase from 'firebase/compat/app'
import { getAuth } from '@firebase/auth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './Upload.css'
import { UploadVideo } from './UploadVideo';

interface Props {
  firebaseApp: firebase.app.App;
}
interface User{
  id: string;
  uploads: Array<Upload>;
}
interface Upload{
  created_at: Date;
  likes: number;
  title: string;
  user_id: string;
  video_src: string;
}
export const Upload: React.FC<Props> = ({firebaseApp}) => {
  const location = useLocation();
  const nav = useNavigate();

  const [token] = useIdToken(getAuth(firebaseApp));
  const [data, setData] = useState<Upload[]>([]);
  const [userId, setUserId] = useState<firebase.User | null>(null);
  const [isUpload, setIsUpload] = useState(false);

  const getUserCollection = async () => {
    const db = firebaseApp.firestore();
    const usersCollection = db.collection('users').doc(firebase.auth().currentUser?.uid);
    const usersSnapshot = await usersCollection.get();
    const uploads = usersSnapshot.data()?.uploads
    return uploads
  
  }

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUserCollection()
      setData(users)
    }

    fetchData();
  }, [token]);
  const YourVideos = () => {
    return (
      <div >
        <div className='yourVideos'>
          {data.map((upload) =>{
            return (
              <div key={upload.title}>
                <h2>{upload.title}</h2>
                <iframe src={upload.video_src}  allowFullScreen width="450" height="720" />
              </div>
            )
          })}
        </div>
    </div>
    )
  }
  return (
    <div className='App'>
      <h1>Upload</h1>
      <header>
        <button onClick={()=> nav("/")}> Home </button>
        <button onClick={() => {
          setIsUpload(false);
          window.location.reload();
        }} style={
          {backgroundColor: isUpload ? 'black' : 'lightblue',}
        }>Your Videos</button> 
        
        <button onClick={() => setIsUpload(true)} style={
        {backgroundColor: isUpload ? 'lightblue' : 'black'}
        }>Upload a Video</button> 
      </header>
      {isUpload ? 
        <div className='uploader'>
          <UploadVideo firebaseApp={firebaseApp}/>
        </div>
      :
        (data ? (<YourVideos/>) : <h1>Loading...</h1>)
      }

    </div>
  )
}
