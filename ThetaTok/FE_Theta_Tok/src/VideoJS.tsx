// import { useEffect, useState } from "react"
import {useRef, useEffect} from 'react'
import firebase from 'firebase/compat/app'
import videojs from "video.js"
import 'video.js/dist/video-js.css';
import { VideoJsPlayer } from 'video.js';
// import { VideoJsPlayerOptions, VideoJsPlayer } from "video.js";

interface Props {
  onReady: VideoJsPlayer;
}
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

export const VideoJS:React.FC<Props> = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const onReady = props.onReady;

  useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export default VideoJS;