import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import Link from 'next/link';
import React from 'react'
import { Separator } from './separator';
import Image from 'next/image';
import logo from '../../../public/zenStream.svg'

type PropsType = {
    cardTitle: string,
    cardContent: string,
    cardImage: string
};

function SideMenuCard(props:PropsType) {

    const cardTitle = props.cardTitle;
    const cardContent = props.cardContent;
    const cardImage = props.cardImage;

  return (
    <Link href="/">
        <div className='w-full bg-slate-200/30 rounded-md p-2 flex'>
            <div className='w-3/5 flex-col px-4 gap-2'>
                <div className='flex gap-2 items-center'>
                   {cardTitle}
                </div>
              
                <div className='text-xs text-slate-200/80'>
                    {cardContent} 
                </div>
            </div>
            <div className='flex items-center'>
                <Separator className=" bg-slate-200/50 my-4" orientation="vertical" />
            </div>
            <div className='flex justify-center items-center px-2 w-2/5'>
                <div 
                className='flex justify-center items-center'>
                    <Link href="/">
                    <img 
                        className='rounded-sm'
                        style={{ width: "10rem", height: "5rem" }}
                        src={cardImage} 
                        alt="Description of the image" />
                    </Link>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default SideMenuCard;

