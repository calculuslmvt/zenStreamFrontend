"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNavigationMenu } from "@/components/ui/main-navigation-menu";
import Image from 'next/image';
import logo from '../../public/zenStream.svg';
import mountains from '../../public/pexels-stywo-1261728.jpg'
import Link from "next/link";
import { SideMenu } from "@/components/ui/side-menu";
import { useUserStore } from "@/store/store";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [username, setUsername] = useState("");  
  const updateUsername = useUserStore((state) => state.updateUsername);
  useEffect(()=>{
      if(typeof window !== undefined){
        setUsername(window?.sessionStorage.getItem("username")!); 
        updateUsername(username); 
  }
  },[]);

  return (
    <html lang="en" className="dark scroll-smooth scrollbar-hide">
      <head>
        <title>Zenstream</title>
        <meta name='description' content='Description' />
      </head>
      <body className={`${inter.className}`}>
        <div>
          <div style={{position: "absolute", zIndex: -3}} className=" w-full min-h-screen">
            <Image
              alt="Zenstream"
              src={mountains} 
              placeholder="blur"
              quality={100}
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
          

          {/* Nav bar  */}
          <div className="flex flex-row py-2 bg-slate-900/40 backdrop-blur-sm">
            <div className="w-1/3 flex">
                <div className="flex justify-center items-center px-2">
                    <SideMenu/>
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
          </div>
          <div className="flex w-full justify-start z-[9999]">
            <MainNavigationMenu/>
          </div>
          <div className=" hidden sm:flex w-1/3 gap-4 justify-center items-center">
            <div>
              <Link href="/login">             
                <button className="text-slate-200">
                  {username ? username : <div>Login</div>}
                  </button>
              </Link>
            </div> 
            <div>
              {username ? (
                  <Link href="/logout">
                  <button className="text-slate-200">Logout</button>
                  </Link>
              ) : (
                <Link href="/register">
                  <button className="text-slate-200">Register</button>
                </Link>
              )}

            </div>
          </div>
          
        </div>
        
        {children}
        </div>
      </body>
    </html>
  );
}
