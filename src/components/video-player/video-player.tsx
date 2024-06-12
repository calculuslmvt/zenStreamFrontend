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
      
        <div className={`player-wrapper ${display} w-full`}>
            <ReactPlayer
                className={`react-player items-center justify-center w-10 h-10 sm:h-[70vh] sm:w-[50vh]`}
                url={props.url}
                height="25rem"
                width="25rem"
                controls
                onReady={handleReadyState}
            />
        </div>
    </div>
  )
}

export default VideoPlayer
