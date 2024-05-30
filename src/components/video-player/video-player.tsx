"use client"
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Loading from '../ui/loading';

function VideoPlayer(props:any) {

  const [display, setDisplay] = useState("invisible"); 
  const handleReadyState = () => {
    setDisplay("visible");
    setLoadingDisplay("invisible"); 
    console.log("state ready");
  }
  const [loadingDisplay, setLoadingDisplay] = useState("visible"); 

  return (
    <div>
      <div className={` z-10 w-2/5 flex justify-center items-center absolute ${loadingDisplay}`}>
        <Loading/>
      </div>
      
        <div className={`player-wrapper ${display}`}>
            <ReactPlayer
                className={`react-player`}
                url={props.url}
                width="70vh"
                height="50vh"
                controls
                onReady={handleReadyState}
            />
        </div>
    </div>
  )
}

export default VideoPlayer
