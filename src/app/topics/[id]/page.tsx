"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ContentTabs } from '@/components/ui/tabs';
import axios from 'axios';
import Loading from '@/components/ui/loading';

function Topics({ params }: { params: { id:string } }) {

    const topicName = params.id;
    const [component, setComponent] = useState(<ContentTabs/>); 
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
    const fetchData = async () => {

        try {
        const url = '/api/get-topic-data'; 
        axios.post(url, {topicName: topicName})
        .then((response) => {
          const topicData = {
            topicName: topicName,
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
    <div>
        {loading ? (<Loading/>) : component }
    </div>
  )
}

export default Topics; 
