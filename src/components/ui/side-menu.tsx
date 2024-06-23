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
import { Key, useEffect, useRef, useState } from "react"
import { useUserStore } from "@/store/store"

// type PropsType = {
//   cardTitle: string,
//   cardContent: string,
//   cardImage: string
// };

// export function SideMenu() {

// const [sideMenuCardList, setSideMenuCardList] = useState(); 
// const [component, setComponent] = useState(<div> Loading... </div>); 
// useEffect(()=> {

//   const fetchData = async () => {
//       const url = "/api/get-topics"; 
//       const response = await axios.post(url, {topicName: "all-topics"});
//       console.log(response.data?.data);

//       setComponent(response.data?.data.map((value: { topicName: any; description: any; thumbnail: any }, index: Key | null | undefined) => {
//         const cardData : PropsType = {
//           cardTitle: value.topicName,
//           cardContent: value.description,
//           cardImage: value.thumbnail
//         }
//         return (<div key={index} className="p-2">
//             <SideMenuCard {...cardData}/>
//         </div>); 
//     }))
//       setSideMenuCardList(response.data?.data);  

//   }
//   fetchData(); 
// },[]);

// const sideMenuCloseDiv = useRef(null);
// const setSideMenuDivRef = useUserStore((state) => state.setSideMenuDivRef);
// useEffect(() => {
//   setSideMenuDivRef(sideMenuCloseDiv); 
// },[sideMenuCloseDiv])


//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="outline"> = </Button>
//       </SheetTrigger>
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle>
//             <div className="flex gap-2">
//                 <div className="flex justify-center items-center">

//                     <SheetClose>
//                       <div ref={sideMenuCloseDiv}>
//                         <Button variant="outline"> = </Button>
//                       </div>

//                     </SheetClose>
//                 </div>                                                

//                 <div                                                                                                            
//                     style={{ position: 'relative', height: '50px' ,width: '150px'}}>
//                     <Link href="/">
//                     <Image
//                         className="px-2 rounded-xl"
//                         alt="Logo here"
//                         src={logo}
//                         fill
//                         style={{
//                         objectFit: 'cover', // cover, contain, none
//                         }}
//                     />
//                     </Link>
//                 </div>
//                 <div className="flex justify-center items-center text-slate-300/50 w-1/3">
//                     <Link href="/">
//                         Donate 
//                     </Link>
//                 </div>

//             </div>
//           </SheetTitle>
//           <Separator className="my-4 bg-slate-300/30" />
//         </SheetHeader>
//         <div className="px-2">
//           <DropMenu/>
//         </div>    

//         <Separator className="my-4 bg-slate-300/30" />
//         <div className="flex justify-center text-sm text-slate-400">
//           Topics
//         </div>

//         {component}

//         <SheetFooter>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   )
// }



const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  type Topic = {
    topicName: string,
    description: string,
    thumbnail: string,
  }
  const [topics, setTopics] = useState<Topic[]>([]);
  useEffect(() => {
    const fetchApi = async () => {
      const url = "/api/get-topics";
      const response = await axios.post(url, { topicName: "all-topics" });
      const data = await response.data?.data;
      setTopics(data);
    }
    fetchApi();
  }, []);

  const sideMenuCloseDiv = useRef(null);
  const setSideMenuDivRef = useUserStore((state) => state.setSideMenuDivRef);
  useEffect(() => {
    setSideMenuDivRef(sideMenuCloseDiv); 
  },[sideMenuCloseDiv])


  return (
    <div className={`z-[100] bg-gray-900 absolute text-white h-screen transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4">
        <h1 className={` transition-all font-bold ${isCollapsed ? 'hidden' : 'block'}`}>Explore</h1>
        <button ref={sideMenuCloseDiv} onClick={toggleSidebar} className="text-gray-400 hover:text-white">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      <div className="flex flex-col items-center space-y-4 mt-4 p-2">
        {topics.map((topic, index) => {
            const topicPath = "/topics/" + topic.topicName.trim(); 
          return (
          <div
            key={index}
            className={`${isCollapsed ? 'w-16 h-12 rounded-md' : 'w-64 h-24 rounded-sm'} transition-all gap-2 duration-300  text-xs bg-indigo-800/70  flex items-center justify-center cursor-pointer hover:bg-indigo-500`}
          >
            {isCollapsed ? <Link className = "w-full h-full flex items-center justify-center" href={topicPath}>{topic.topicName.substring(0, 3)}</Link>: <SideMenuCard {...topic} />}

          </div>
          ) } ) 
        }
      </div>
      {!isCollapsed && (
        <div className="mt-8 px-4">

        </div>
      )}
    </div>
  )
}

export default Sidebar;