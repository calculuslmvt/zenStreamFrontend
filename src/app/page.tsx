"use client"
import { ContentDrawer } from "@/components/ui/content-drawer";
import { ContentTabs } from "@/components/ui/tabs";
import ThumbnailCard from "@/components/ui/thumbnail-card";
import axios from 'axios'; 
import { useEffect, useState } from "react";

type ContentDataType = {
  videoKey: string ,
  videoTitle: string,
  videoThumbnail: string,
  videoUrl: string,
  videoTextContent: string
};

type PropType = {
  topicName: string,
  contentData: ContentDataType[]
};


export default function Home() {

  console.log("starting app");  
  const [component, setComponent] = useState(<ContentTabs/>); 
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const fetchData = async () => {

      try {
        const url = '/api/get-topic-data'; 
        const response = await axios.post(url, {topicName: "Home"});
        console.log(response?.data?.data); 
        setLoading(false);
        setComponent(<ContentTabs {...response?.data?.data}/>)
      } catch (error) {
        console.log(error); 
      }
  
    }
    fetchData();
  },[]);

  return (
    <>
      {loading ? (<div>Loading... </div>) : component }
    </>

  );
}
