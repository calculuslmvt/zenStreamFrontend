"use client"
import React from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer(props:any) {
  return (
    <div>
        <div className="player-wrapper">
            <ReactPlayer
                className="react-player"
                url={props.url}
                width="200px"
                height="150px"
                controls
            />
        </div>
    </div>
  )
}

export default VideoPlayer
