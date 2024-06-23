"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNavigationMenu } from "@/components/ui/main-navigation-menu";
import Image from 'next/image';
import logo from '../../public/zenStream.svg';
import mountains from '../../public/pexels-stywo-1261728.jpg'
import Link from "next/link";
import Sidebar from "@/components/ui/side-menu";
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
  useEffect(() => {
    if (typeof window !== undefined) {
      setUsername(window?.sessionStorage.getItem("username")!);
      updateUsername(username);
    }
  }, []);

  return (
    <html lang="en" className="dark scroll-smooth scrollbar-hide">
      <head>
        <title>Zenstream</title>
        <meta name='description' content='Description' />
      </head>
      
      <body className={`${inter.className} bg-gradient-to-r`}>

        <div className="flex absolute z-[100]">
          <div className="">
            <Sidebar/>
          </div>

          <div className="flex flex-col bg-gradient-to-r from-indigo-700 from-10% via-sky-700 via-30% to-gray-900 to-90% h-screen w-screen absolute z-[-999]">
            {/* Nav bar  */}
            <div className="flex flex-row py-2 bg-slate-900/40 backdrop-blur-sm h-16 items-center w-full fixed p-8 mx-8">
              <div className="flex">
                <div className="flex justify-center items-center px-2">
                </div>
                <div
                  style={{ position: 'relative', height: '50px', width: '150px' }}>
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
                <MainNavigationMenu />
              </div>
              <div className=" hidden sm:flex px-10 gap-4 justify-center items-center">
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
            <div className="px-6">
              {children}
            </div>
          </div>


        </div>
      </body>
    </html>
  );
}
