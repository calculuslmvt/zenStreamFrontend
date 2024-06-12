"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import logo from "../../../public/zenStream.svg"
import { ContentDrawer } from "./content-drawer";
import Link from "next/link";

type ContentDataType = {
    title: string,
    thumbnail: string,
    description: string,
    videoFile: string
};

type PropType = {
    topicName?: string,
    contentData?: ContentDataType[]
}

export function ContentTabs(props : PropType ) {

    const topicName = props.topicName;
    const contentData = props.contentData; 

    const tabs = [
      {
        title: "Channel",
        value: "type1",
        content: (
          <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-slate-700 to-slate-900">
            <p className="px-4">{topicName}</p>
            <div className="p-2 text-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 overflow-y-auto overflow-x-hidden scrollbar-hide h-full">
                {contentData?.map((drawerValue, index) => (
                    <div
                        className="flex" 
                        key={index}>
                        <ContentDrawer {...drawerValue}/>
                    </div>
                ))}
            </div>
          </div>
        ),
      },
      {
        title: "Comments",
        value: "type2",
        content: (
          <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-slate-700 to-slate-900">
            <p>Comment</p>
            <br />
            <DummyContent />
          </div>
        ),
      },
      
    ];
   
    return (
      <div className="w-full flex justify-center h-screen fixed z-[-2]">
        <div className="h-[40rem] z-[-2] [perspective:1000px] fixed b flex items-center justify-center flex-col max-w-5xl mx-auto w-full my-2 overflow-y-auto overflow-x-hidden scrollbar-hide">
          <Tabs tabs={tabs} />
        </div>
      </div>

    );
  }
   
  const DummyContent = () => {
    const username = window.sessionStorage.getItem("username");
    const component = "Please Login";
    if(!username) {
      return (
        <Link href="/login">
          <div className=" text-amber-600 text-xl"> {component}</div>
        </Link>
      )
    }

    return (
        <div className="flex gap-2">
            <input className=" bg-slate-500 h-10 text-sm" type="text" /> 
            <button className="p-2 bg-slate-400/60 rounded-lg h-10 text-sm"> Submit</button>
        </div>
    );
  };



type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:100px] relative overflow-auto sm:overflow-visible max-w-full w-full",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2 rounded-full ", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-gray-200 dark:bg-zinc-800/80 rounded-md ",
                  activeTabClassName
                )}
              />
            )}

            <span className="relative block text-black dark:text-white ">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-12", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
