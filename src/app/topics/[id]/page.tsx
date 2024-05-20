"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ContentTabs } from '@/components/ui/tabs';
import axios from 'axios';

function Topics({ params }: { params: { id:string } }) {

    const topicName = params.id;
    const [component, setComponent] = useState(<ContentTabs/>); 
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
    const fetchData = async () => {

        try {
        const url = '/api/get-topic-data'; 
        const response = await axios.post(url, {topicName: topicName});
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
    <div>
        {loading ? (<div>Loading... </div>) : component }
    </div>
  )
}

export default Topics; 
