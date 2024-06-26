"use client"
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import Link from 'next/link';
import React, { useState } from 'react'
import { Separator } from './separator';
import Image from 'next/image';
import logo from '../../../public/zenStream.svg'
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/store';

type Topic = {
    topicName: string,
    description: string,
    thumbnail: string, 
  }

function SideMenuCard(props:Topic) {

    const cardTitle = props.topicName;
    const cardContent = props.description;
    const cardImage = props.thumbnail;
    const topicPath = "/topics/" + cardTitle.trim(); 
    const sideMenuDivRef = useUserStore((state) => state.sideMenuDivRef); 

    const handleClick = () => {
        console.log("clicked"); 
        sideMenuDivRef?.current?.click();
        //location.replace(topicPath);
    }
const [component, setComponent] = useState(<div></div>)
setTimeout(() => {
    setComponent(
        <Link href={topicPath} onClick={handleClick}>
        <div className='w-full bg-blue-900/90 rounded-md p-2 flex'>
            <div className='w-3/5 flex-col px-4 gap-2'>
                <div className='flex gap-2 items-center'>
                   {cardTitle}
                </div>
              
                <div className='text-xs text-slate-200/80'>
                    {cardContent.substring(0, 40) + "...."}
                </div>
            </div>
            <div className='flex items-center'>
                <Separator className=" bg-slate-200/50 my-4" orientation="vertical" />
            </div>
            <div className='flex justify-center items-center px-2 w-2/5'>
                <div 
                className='flex justify-center items-center'>
                    <a href={topicPath}>
                    <img 
                        className='rounded-sm'
                        style={{ width: "10rem", height: "5rem" }}
                        src={cardImage} 
                        alt="Description of the image" />
                    </a>
                </div>
            </div>
        </div>
    </Link>
    ); 
}, 200); 

  return (
    <div>
       {component} 
    </div>
  )
}

export default SideMenuCard;

