"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ContentSection } from '@/components/ui/tabs';
import axios from 'axios';
import Loading from '@/components/ui/loading';

function Favourites() {

    const [component, setComponent] = useState(<div>Favourite Section</div>); 
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
            setComponent(<ContentSection {...topicData}/>);
            setLoading(false);
            })
        } catch (error) {
                console.log(error);  
                location.replace("/login"); 
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
