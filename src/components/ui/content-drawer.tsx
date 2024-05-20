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

type PropsType = {
  videoKey: string ,
  videoTitle: string,
  videoThumbnail: string,
  videoUrl: string,
  videoTextContent: string
};

export function ContentDrawer(props: PropsType) {
  const [goal, setGoal] = React.useState(350)
  const videoKey = props.videoKey;
  const videoTitle =  props.videoTitle;
  const videoThumbnail =  props.videoThumbnail;
  const videoUrl = props.videoUrl;
  const videoTextContent =  props.videoTextContent; 
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
            <div className="text-xl text-slate-300">
              {videoTitle} 
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
