"use client"
import { ContentDrawer } from "@/components/ui/content-drawer";
import Loading from "@/components/ui/loading";
import { ContentTabs } from "@/components/ui/tabs";
import { useUserStore } from "@/store/store";
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
        axios.post(url, {topicName: "Home"})
              .then((response) => {
                const topicData = {
                  topicName: "Home",
                  contentData: response.data?.data
                }
                console.log(response.data); 
                setComponent(<ContentTabs {...topicData}/>);
                setLoading(false);
              })
        
      } catch (error) {
        console.log(error); 
      }
  
    }
    fetchData();
  },[]);

  return (
    <>
      {loading ? (<Loading/>) : component }
    </>

  );
}
