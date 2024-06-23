"use client"
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Loading from '../ui/loading';
import { useUserStore } from '@/store/store';

function VideoPlayer() {

  const Loading = (
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status">
      <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span>
    </div>
  )
  const [display, setDisplay] = useState("invisible"); 
  const handleReadyState = () => {
    setDisplay("visible");
    setLoadingDisplay("invisible"); 
    console.log("state ready");
  }
  const [loadingDisplay, setLoadingDisplay] = useState("visible"); 
  const videoId = useUserStore((state) => state.videoUrl);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(()=>{
    setVideoUrl('https://www.youtube.com/embed/' +  videoId);
  },[videoId]);


  console.log(videoUrl); 
  return (
    <div className='w-full h-full  flex justify-center items-center'>
      <iframe 
        className='rounded-lg h-full w-full'
        src={videoUrl}
        allowFullScreen
        allowTransparency>
      </iframe>
    </div>
  )
}

export default VideoPlayer
