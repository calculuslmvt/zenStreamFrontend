import React from 'react'
import VideoPlayer from '../video-player/video-player';

function ThumbnailCard({...props}) {
  return (
    <div className='p-2'>
      <div className="flex flex-col gap-2 p-2 rounded-sm bg-violet-300/40 w-52 h-48 justify-center items-center">
        <img src= {props.videoThumbnail} alt='Thnumbailhere'/>
        <div>
          <div className='text-slate-200'>
            {props.videoTitle}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThumbnailCard;

