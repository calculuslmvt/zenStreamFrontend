import React from 'react'
import VideoPlayer from '../video-player/video-player';

function ThumbnailCard({...props}) {
  return (
    <div className='px-14 sm:p-2 '>
      <div className="flex flex-col gap-2 p-2 rounded-sm backdrop-blur-lg bg-violet-300/20 w-52 h-48 justify-center items-center">
        <img src= {props.videoThumbnail} alt='Thnumbailhere'/>
        <div>
          <div className='flex text-slate-200 w-full justify-start '>

            <div className="flex">
              {props.videoTitle}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ThumbnailCard;

