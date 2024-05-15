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

export function SideMenu() {

const sideMenuCardList = [
    {
        cardTitle: " Buddhism",
        cardContent: "Test content one one Test content one one Test content one one   ",
        cardImage: " https://bigthink.com/wp-content/uploads/2023/02/AdobeStock_557083387_3200x1800.jpeg",
        index: 1
    },
    {
        cardTitle: " Zen",
        cardContent: "Test content one one  ",
        cardImage: "https://production.listennotes.com/podcasts/feed-your-brain/life-as-it-is-ambient-bUJATzWxOVF-pxX1zJZnsEr.1400x1400.jpg",
        index: 2
    },

]

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
                    <SheetClose asChild>
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


        {sideMenuCardList.map((value) => (
            <div key={value.index} className="p-2">
                <SideMenuCard {...value}/>
            </div>
        ))}
        
        
        <SheetFooter>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
