"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ContentSection } from '@/components/ui/tabs';
import axios from 'axios';
import Loading from '@/components/ui/loading';

function Topics({ params }: { params: { id:string } }) {

    const topicName = params.id;
    const [component, setComponent] = useState(<div>Content Section</div>); 
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
          setComponent(<ContentSection {...topicData}/>);
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
