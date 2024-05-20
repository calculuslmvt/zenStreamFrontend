"use client"
import React from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer(props:any) {
  return (
    <div>
        <div className="player-wrapper">
            <ReactPlayer
                className="react-player rounded-sm  bg-slate-50/60"
                url={props.url}
                width="70vh"
                height="50vh"
                controls
            />
        </div>
    </div>
  )
}

export default VideoPlayer
