import firebase from "firebase/compat";
import { useEffect, useState } from "react";
import './UploadVideo.css'
const env = import.meta.env;
interface ThetaData {
    create_time: string;
    id: string;
    presigned_url: string;
    presigned_url_expiration: string;
    presigned_url_expired: boolean;
    service_account_id: string;
    update_time: string;
}
interface Props {
  firebaseApp: firebase.app.App;
}
export const UploadVideo: React.FC<Props> = ({firebaseApp}) => {
    const [getFile, setFile] = useState<File>();
    const [videoUploaded, setVideoUploaded] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");

    const handleChange = (event: Event) => {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files != null) {
            setFile(fileInput.files[0]);
        } else {
            setFile(undefined);
        }
        const formData = new FormData();
        if (getFile !== undefined) {
            formData.append("video", getFile);
        }
    };

    const uploadToPresign = async (presigned_url: string) => {
        const formData = new FormData();
        if (getFile !== undefined) {
            formData.append("video", getFile);
        } else {
            console.error("File not found");
        }
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/octet-stream",
            },
            body: getFile,
        };
        try {
            const response = await fetch(presigned_url, options);
        } catch (error) {
            console.error("Error", error);
        }
    };
    const uploadToThetaVideoAPI = async (uploadID: string) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-tva-sa-id": env.VITE_thetaApiKey,
                "x-tva-sa-secret": env.VITE_thetaApiSecret,
            },
            body: JSON.stringify({
                source_upload_id: uploadID,
                playback_policy: "public",
                nft_collection: "0x5d0004fe2e0ec6d002678c7fa01026cabde9e793",
            }),
        };
        try {
            return await fetch("https://api.thetavideoapi.com/video", options);
        } catch (error) {
            console.error(error)
        }
    };
    const uploadToTheta = async (event: Event) => {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-tva-sa-id": env.VITE_thetaApiKey,
                "x-tva-sa-secret": env.VITE_thetaApiSecret,
            },
        };

        try {
            const response = await fetch(
                "https://api.thetavideoapi.com/upload",
                options
            );
            const data = await response.json();
            const thetaData: ThetaData = data.body.uploads[0];
            await uploadToPresign(thetaData.presigned_url);
            const uploadToTheta = await uploadToThetaVideoAPI(thetaData.id);
            const thetaRes = await uploadToTheta?.json();
            if(thetaRes.status == "success"){
                try {
                    const db = firebaseApp.firestore();
                    const collectionRef = db.collection('users').doc(firebaseApp.auth().currentUser?.uid)
                    const newVideoData = { title, video_src: `https://player.thetavideoapi.com/video/${thetaRes.body.videos[0].id}`};
                    const documentSnapshot = await collectionRef.get();
                    const currentList = documentSnapshot.data()?.uploads || [];

                    // Add the new item to the list
                    const updatedList = [...currentList, newVideoData];

                    // Update the list document with the updated list
                    await collectionRef.update({ uploads: updatedList });
                    setVideoUploaded(true);
                } catch (error) {
                    console.log(error);
                    
                }
            }
        } catch (error) {
            console.error(error);
        }

    };

    const saveText = (event: Event) =>{
        const titleInput = event.target as HTMLInputElement;
        setTitle(titleInput.value);

    }
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="Title">Title of Video: </label>
                    <input type="text" onChange={saveText}/>
                </div>
                {getFile? <></> : <h2>Select A File</h2>}
                <input type="file" onChange={handleChange} />
                {getFile ? (
                    <button type="submit" onClick={uploadToTheta}>
                        Upload
                    </button>
                ) : <></>}
            </form>
            {videoUploaded ? <h1>Video Uploaded!</h1> : <></>}
        </div>
    );
};
