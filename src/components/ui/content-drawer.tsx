"use client"
import * as React from "react"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import ThumbnailCard from "./thumbnail-card"
import VideoPlayer from "../video-player/video-player"
import { Separator } from "./separator"
import axios, { AxiosError } from "axios"
import { useState } from "react"

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

  const [component, setComponent] = useState(
    <button
      onClick={handleAddToFavourite}
      className="text-sm p-3 bg-black/40 rounded-lg">
      Add to favourites
    </button>
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button>
          <ThumbnailCard videoThumbnail = {videoThumbnail} videoTitle = {videoTitle} />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className=" flex mx-auto w-full h-[60vh] p-4 gap-2"> 
          <div className="w-1/2 flex items-center justify-center">
            <VideoPlayer url= {videoUrl}/>  
          </div>

          <div> 
              <Separator className=" bg-slate-100/50 flex items-center" orientation="vertical" />
          </div>
          <div className="w-1/2 flex flex-col gap-2 bg-slate-300/30 p-2 rounded-sm">
            <div className="text-xl text-slate-300 flex gap-2 justify-center items-center">
              {videoTitle} 
              {component}
            </div> 
            
            <div className=" text-sm">
              {videoTextContent}  
            </div>
          </div>
        </div >
      </DrawerContent>
    </Drawer>
  )
}
