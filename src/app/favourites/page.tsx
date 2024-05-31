"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ContentTabs } from '@/components/ui/tabs';
import axios from 'axios';
import Loading from '@/components/ui/loading';

function Favourites() {

    const [component, setComponent] = useState(<ContentTabs/>); 
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
    const fetchData = async () => {

        try {
            const username = window.sessionStorage.getItem("username"); 
            if(!username) {
                location.replace("/login");
            }

            const url = '/api/user/get-favourites'; 
            axios.post(url, {username: username})
            .then((response) => {
            const topicData = {
                topicName: "My videos",
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

export default Favourites; 
