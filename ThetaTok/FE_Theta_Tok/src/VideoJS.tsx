// import { useEffect, useState } from "react"
import {useRef, useEffect} from 'react'
import firebase from 'firebase/compat/app'
import videojs from "video.js"
import 'video.js/dist/video-js.css';
import Player from 'video.js/dist/types/player';
// import { VideoJsPlayerOptions, VideoJsPlayer } from "video.js";

const options = {
    techOrder: ["theta_hlsjs", "html5"],
    sources: [
        {
            src: "https://media.thetavideoapi.com/video_dh3f4def3a12uny7056fz9krex/master.m3u8",
            type: "application/vnd.apple.mpegurl",
            label: "auto",
        },
    ],
    theta_hlsjs: {
        videoId: "video_dh3f4def3a12uny7056fz9krex",
        userId: "YOUR_AUTHED_USER_ID",
        walletUrl: "wss://api-wallet-service.thetatoken.org/theta/ws",
        onWalletAccessToken: null,
        hlsOpts: null,
    },
};

export const VideoJS = () => {
  const videoRef = useRef(null);
  const playerRef = useRef<Player | null>(null);

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
    // return () => {
    //     document.body.removeChild(hlsScript);
    //     document.body.removeChild(thetaScript);
    //     document.body.removeChild(thetaHlsPluginScript);
    //     document.body.removeChild(videoJsThetaPluginScript);
    // };
  }, []);
  useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (playerRef && !playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = videoRef?.current;
      if (!videoElement) return; 

      playerRef.current = videojs(videoElement, options);

    };
    return () =>{
      if(playerRef.current){
        playerRef.current?.dispose();
        playerRef.current = null;
      }
    }
  }, [options, videoRef, playerRef]);

  return (
    <div data-vjs-player>
      <h1>helo</h1>
      <video ref={videoRef} className={`video-js vjs-big-play-centered`}></video>
    </div>
  );
}

export default VideoJS;