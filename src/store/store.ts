import { MutableRefObject } from "react";
import { create } from "zustand";
type State = {
    username: string,
    contentDivRef : React.MutableRefObject<HTMLDivElement|null>, 
    searchDivRef : React.MutableRefObject<HTMLDivElement|null>, 
    currentVideo : string, 
    videoUrl : string,
}
type Action = {
    updateUsername: (username: State['username']) => void,
    setContentDivRef: (ref: State['contentDivRef']) => void,
    setCurrentVideo: (currentVideo: State['currentVideo']) => void
    setVideoUrl: (videoUrl: State['videoUrl']) => void
    setSearchDivRef: (ref: State['searchDivRef']) => void
}

export const useUserStore = create<State & Action> ((set)=>({
    username: "",
    currentVideo: "The Void", 
    videoUrl: "jCcnPa-dzcU",
    searchDivRef: { current: null } as MutableRefObject<HTMLDivElement | null>,
    contentDivRef : { current: null } as MutableRefObject<HTMLDivElement | null>,
    updateUsername: (username) => set(() => ({username: username})), 
    setCurrentVideo: (currentVideo) => set(() => ({currentVideo: currentVideo})),
    setVideoUrl: (videoUrl) => set(() => ({videoUrl: videoUrl})),
    setContentDivRef : (ref : any) => set({contentDivRef:ref}),
    setSearchDivRef : (ref : any) => set({searchDivRef:ref})
}));
