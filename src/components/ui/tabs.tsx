"use client";

import { useEffect, useRef, useState } from "react";
import { ContentDrawer } from "./content-drawer";
import { SearchBar } from "./command";
import { useStore } from "zustand";
import { useUserStore } from "@/store/store";
import VideoPlayer from "../video-player/video-player";

type ContentDataType = {
    title: string,
    thumbnail: string,
    description: string,
    videoFile: string
};

type PropType = {
    topicName?: string,
    contentData?: ContentDataType[]
}

export function ContentSection(props : PropType ) {
  const topicName = props.topicName;
  const topicContent = props.contentData;
  const contentRef = useRef<HTMLDivElement>(null);
  const setContentDivRef = useUserStore((state) => state.setContentDivRef);
  useEffect(() => {
    setContentDivRef(contentRef);
  }, [contentRef]);

  const contentComponent = (
    <div className="flex w-full flex-wrap gap-2 bg-black/30 p-2 rounded-lg scroll-m-1 overflow-auto scrollbar-hide scroll-smooth">
      {topicContent?.map((contentData) => (<ContentDrawer {...contentData}/>))}
    </div>
  )

  const VideoPlayerRef = useRef<HTMLDivElement>(null);
  const playerSectionRef = useRef<HTMLDivElement>(null);

  // handling maximise 
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    console.log("toggling view");
    if(contentRef.current && VideoPlayerRef.current && playerSectionRef.current) {
        contentRef?.current.classList.toggle("w-2/3");
        contentRef?.current.classList.toggle("w-1/3");
        VideoPlayerRef?.current.classList.toggle("h-screen");
        playerSectionRef?.current.classList.toggle("w-1/3");
        playerSectionRef?.current.classList.toggle("w-full");
    }

    if(!expanded) {
      setExpanded(true);
    }
    else {
      setExpanded(false);
    }
  }

  const [videoTitle, setVideoTitle] = useState("");
  const currentVideo = useUserStore((state)=> state.currentVideo);

  useEffect(()=> {
      setVideoTitle(currentVideo); 
  },[currentVideo])


  return (
    <div className="flex flex-col p-4 px-12 w-full bg-black/40 h-screen backdrop-blur-sm z-{-1} fixed">
      <div className="flex text-3xl text-slate-100 items-center w-full px-2">
        {topicName}
      </div>
      <br />
      <div className="flex">
        <div
          ref = {contentRef}
          className="flex p-4 w-2/3">
          <SearchBar content = {topicContent}/>
        </div>
        <div 
          ref = {playerSectionRef}
          className="flex flex-col w-1/3 overflow-y-auto h-full">
          <div
            ref={VideoPlayerRef}
            className="flex w-full h-2/5 flex-wrap my-4 bg-black/30 p-2 rounded-lg">
            <VideoPlayer/>
          </div>
          <div className="flex w-full flex-wrap bg-black/30 p-2 rounded-lg gap-2">
            <button
              onClick={handleClick}
              className="bg-black p-1 text-slate-300 rounded-md text-xs">
              {expanded ? "Minimise" : "Maximise"}
            </button>
            <div className="w-2/5 text-slate-300">
              {videoTitle}
            </div>
            <div className="w-2/5 flex justify-end">
              <button className="justify-end bg-black p-1 rounded-md text-xs text-slate-300">
                Add to Favourites
              </button>
            </div>

          </div>
          <div className="flex flex-col w-full flex-wrap bg-black/30 h-2/5 my-2 p-2 rounded-lg">
            Comments
           
            <div className="text-xs text-slate-300">
              coming soon...
            </div>
          </div>
        </div>
      </div>

    </div>
  )
};
