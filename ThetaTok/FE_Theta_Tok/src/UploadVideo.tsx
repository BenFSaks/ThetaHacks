import { get } from "http";
import { useEffect, useState } from "react";
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
export const UploadVideo = () => {
    const [loading, setLoading] = useState(false);

    const [getFile, setFile] = useState<File>();

    const handleChange = (event: Event) => {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files != null) {
            // console.log(fileInput.files[0]);
            setFile(fileInput.files[0]);
        } else {
            setFile(undefined);
        }
        // console.log("File Not Setting", getFile);
        const formData = new FormData();
        if (getFile !== undefined) {
            formData.append("video", getFile);
            console.log(formData.entries().next().value);
        }
    };

    const uploadToPresign = async (presigned_url: string) => {
        const formData = new FormData();
        if (getFile !== undefined) {
            formData.append("video", getFile);
            console.log(formData);
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
            console.log("res", response)
        } catch (error) {
            console.error("Error", error);
        }
    };
    const debugVideoStatus = async () => {
        const videoID: string = "video_pqnzzkhunr81kfzr3vh45z1tz3";
        const options = {
            method: "GET",
            headers: {
                "x-tva-sa-id": env.VITE_thetaApiKey,
                "x-tva-sa-secret": env.VITE_thetaApiSecret,
            },
        };
        try {
            const res = await fetch(`https://api.thetavideoapi.com/video/${videoID}`, options);
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error(error)
        }
    };
    const uploadTest = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-tva-sa-id": env.VITE_thetaApiKey,
                "x-tva-sa-secret": env.VITE_thetaApiSecret,
            },
            body: JSON.stringify({
                source_uri:
                    "https://tva-demo.s3.amazonaws.com/world.mp4",
                playback_policy: "public",
                nft_collection: "0x5d0004fe2e0ec6d002678c7fa01026cabde9e793",
            }),
        };
        try {
            const res = await fetch("https://api.thetavideoapi.com/video", options);
            const data = await res.json();
            console.log("TEST DATA", data)
        } catch (error) {
            console.error(error)
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
    const handleClick = async () => {
        setLoading(true);

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
            console.log("UPLOAD", await uploadToTheta?.json());
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    return (
        <div>
            <button onClick={uploadTest} disabled={loading}>Upload</button>
            {loading ? (
                <h1>Uploading...</h1>
            ) : (
                <form>
                    <h1>Test</h1>
                    <input type="file" onChange={handleChange} />
                    { getFile ? (<button type="submit" onClick={handleClick}>
                        Upload
                    </button>) : ( <h2>Select A File</h2>)}
                </form>
            )}
        </div>
    );
};
