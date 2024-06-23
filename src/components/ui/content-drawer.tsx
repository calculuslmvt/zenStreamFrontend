"use client"
import * as React from "react"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import VideoPlayer from "../video-player/video-player"
import { Separator } from "./separator"
import axios from "axios"
import { useState } from "react"
import Link from "next/link"
import { useUserStore } from "@/store/store"
import VideoCard from "./thumbnail-card"

type PropsType = {
  title: string,
  thumbnail: string,
  description: string,
  videoFile: string
};
const Loading = (
  <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status">
      <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span>
  </div>
);
export function ContentDrawer(props: PropsType) {
  const videoTitle =  props.title;
  const videoThumbnail =  props.thumbnail;
  const videoUrl = props.videoFile;
  const videoTextContent =  props.description;

  const handleAddToFavourite = async () => {
    try {
      setComponent(Loading);
      const username = window.sessionStorage.getItem("username");
      const payload = {
        videoTitle : videoTitle,
        username : username,
      }
      const response = await axios.post("/api/add-to-favourite", payload);
      console.log(response);
      setComponent(
        <div>
          <p className="text-xs">Added to favourites!</p>
        </div>
      );
    } catch(error: any) {
      console.log(error);
      setComponent(
        <div>
          <p className="text-xs">{error.response?.data?.error}</p>
        </div>
      )
    }
  }
  const username = window.sessionStorage.getItem("username");
  const [component, setComponent] = useState(
    username ? (
          <button
            onClick={handleAddToFavourite}
            className="text-sm p-3 bg-black/40 rounded-lg">
            Add to favourites
          </button>
    ) : (
          <Link
          href="/login"
          className="text-sm p-3 bg-black/40 rounded-lg">
          Login to add to favourites
          </Link>
    )

  );
  const contentDiv = useUserStore((state) => state.contentDivRef);
  const playerSection = (
    <div>
      section here
    </div>
  )
  const setCurrentVideo = useUserStore((state) => state.setCurrentVideo); 
  const setVideoUrl = useUserStore((state) => state.setVideoUrl); 
  // handling view toggle
  const handleClick = () =>{
    setCurrentVideo(videoTitle); 
    setVideoUrl(videoUrl);
  }


  return (
    <div>
        <button onClick={handleClick}>
          <VideoCard videoThumbnail = {videoThumbnail} videoTitle = {videoTitle} videoDescription = {videoTextContent} />
        </button>
    </div>
    // <Drawer>
    //   <DrawerTrigger asChild>

    //   </DrawerTrigger>
    //   <DrawerContent>
    //     <div className=" flex mx-auto w-full h-[60vh] p-4 gap-2">
    //       <div className="w-full sm:w-1/2 flex items-center justify-center">
    //         <VideoPlayer url= {videoUrl}/>
    //       </div>

    //       <div>
    //           <Separator className="hidden sm:bg-slate-100/50 sm:flex sm:items-center" orientation="vertical" />
    //       </div>
    //       <div className="w-0 sm:w-1/2 flex sm:flex-col gap-2 backdrop-blur-lg bg-slate-300/30 p-2 rounded-sm">
    //         <div className="lg:visible text-xl text-slate-300 flex gap-2 justify-center items-center">
    //           {videoTitle}
    //           {component}
    //         </div>

    //         <div className=" text-sm">
    //           {videoTextContent}
    //         </div>
    //       </div>
    //     </div >
    //   </DrawerContent>
    // </Drawer>
  )
}
