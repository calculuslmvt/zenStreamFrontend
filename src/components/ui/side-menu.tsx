"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image"
import logo from "../../../public/zenStream.svg";
import { Separator } from "@/components/ui/separator"
import SideMenuCard from "./side-menu-card"
import { DropMenu } from "./accordion"
import axios from "axios"
import { Key, useEffect, useState } from "react"

type PropsType = {
  cardTitle: string,
  cardContent: string,
  cardImage: string
};

export function SideMenu() {

const [sideMenuCardList, setSideMenuCardList] = useState(); 
const [component, setComponent] = useState(<div> Loading... </div>); 
useEffect(()=> {

  const fetchData = async () => {
      const url = "/api/get-topics"; 
      const response = await axios.post(url, {topicName: "all-topics"});
      console.log(response.data?.data);
  
      setComponent(response.data?.data.map((value: { topicName: any; description: any; thumbnail: any }, index: Key | null | undefined) => {
        const cardData : PropsType = {
          cardTitle: value.topicName,
          cardContent: value.description,
          cardImage: value.thumbnail
        }
        return (<div key={index} className="p-2">
            <SideMenuCard {...cardData}/>
        </div>); 
    }))
      setSideMenuCardList(response.data?.data);  
      
  }
  fetchData(); 
},[])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline"> = </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex gap-2">
                <div className="flex justify-center items-center">
                    
                    <SheetClose>
                        <Button variant="outline"> = </Button>
                    </SheetClose>
                </div>                                                
                
                <div                                                                                                            
                    style={{ position: 'relative', height: '50px' ,width: '150px'}}>
                    <Link href="/">
                    <Image
                        className="px-2 rounded-xl"
                        alt="Logo here"
                        src={logo}
                        fill
                        style={{
                        objectFit: 'cover', // cover, contain, none
                        }}
                    />
                    </Link>
                </div>
                <div className="flex justify-center items-center text-slate-300/50 w-1/3">
                    <Link href="/">
                        Donate 
                    </Link>
                </div>
                
            </div>
          </SheetTitle>
          <Separator className="my-4 bg-slate-300/30" />
        </SheetHeader>
        <div className="px-2">
          <DropMenu/>
        </div>    
        
        <Separator className="my-4 bg-slate-300/30" />
        <div className="flex justify-center text-sm text-slate-400">
          Topics
        </div>

        {component}
        
        <SheetFooter>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
