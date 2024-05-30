"use client"
import { zodResolver } from "@hookform/resolvers/zod"; 
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useUserStore } from "@/store/store";
import { useCallback, useEffect, useState } from "react";

const videoSchema = z.object({
    videoFile: z.string().min(2),
    thumbnail: z.string().min(0),
    title: z.string().min(2),
    description: z.string().min(2)
});

const Loading = (
    <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div>
); 

export default function VideoForm(){
    type videoFormFields = z.infer<typeof videoSchema>;
    const { register, setError, handleSubmit, formState: { errors } } = useForm<videoFormFields>({
        resolver: zodResolver(videoSchema), 
    });
    const [loading, setLoading] = useState(false);
    const [component, setComponent] = useState(Loading); 
    const [topicList, setTopicList] = useState(<div>Loading Topics..</div>); 
    const [topicName, setTopicName] = useState("none"); 

    const setTopicsDiv = (topics : any) => {
        return(
            <div className="flex w-full"> 
                <label className="flex p-2 w-2/3 justify-start">
                    Topic Name
                </label>
                <select 
                className=" text-slate-300 bg-black px-2 rounded-lg"
                onChange={handleChange}>
                    {topics.map((value :any, index: any) => {
                        return (
                            <option key={index}>
                                {value.topicName}
                            </option>
                        )
                    })} 
                </select>
            </div>    
        ); 
    }
    
    useEffect(()=>{
        try {
            const fetchData = async () => {
                await axios.post("/api/get-topics", {data: "data"})
                .then(async (response) => {
                    const topics = response.data.data; 
                    console.log(response.data.data); 
                    if(topics.length>1){
                        setTopicList(setTopicsDiv(topics));
                    }
                });
            }
            fetchData();
        } catch (error : any) {
            console.log(error.message); 
        }
    },[]);

    const onVideoSubmit: SubmitHandler<videoFormFields> = async (data) => {
        console.log("newData");     
        const newData = {
            ...data,
            topicName: topicName
        }
        try {
            setLoading(true);
            const response = await axios.post("/add-video", newData);
            console.log(response); 
            setComponent(
                <div className="text-green-400 text-sm">
                    Video uploaded successfully!
                </div>
            )
            setLoading(false);
        } catch (error : any) {
            setError("root", {
                message: error?.response?.data.error
            })
            console.log(error?.response?.data.error); 
        }
    }

    const handleChange = (event : any) => {
        console.log(event.target.value);
        setTopicName(event.target.value);
    }

    return (

        <div className="flex justify-start w-1/2 p-2">
            <div className=" bg-slate-600/50 p-2 flex justify-end items-center h-1/2">
                <form onSubmit={handleSubmit(onVideoSubmit)} className="flex flex-col bg-black/60 p-4 rounded-lg justify-center gap-2 items-center">
                    <div className=" text-xl">
                        Add Video
                    </div>
                    {/* {topicList} */}
                    <div className="flex w-full">
                    <label className="flex p-2 w-2/3 justify-start">
                            Title
                        </label>
                        <input {...register("title", {
                            required: true,
                        })} type="text" 
                            placeholder="Title"
                            className=" text-slate-300 bg-black px-2 rounded-lg"/>
                    </div>
                
                {errors.title && (
                    <div className="text-red-400 text-xs">
                        {errors.title.message}
                    </div>
                )}
                <div className="flex w-full">
                    <label className="p-2 w-1/3">
                    Video URL
                    </label>
                    <input {...register("videoFile", {
                        required: true,
                    })} type="text"
                        placeholder="URL"
                        className="text-slate-300 bg-black p-1 px-2 rounded-lg"/>
                </div>
                {errors.videoFile && (
                    <div className="text-red-400 text-xs">
                        {errors.videoFile.message}
                    </div>
                )}
                <div className="flex w-full">
                    <label className="p-2 w-1/3">
                    Description
                    </label>
                    <input {...register("description", {
                        required: true,
                    })} type="text"
                        placeholder="Details"
                        className="text-slate-300 bg-black p-1 px-2 rounded-lg"/>
                </div>
                {errors.description && (
                    <div className="text-red-400 text-xs">
                        {errors.description.message}
                    </div>
                )}
                {errors.root && (
                    <div className="text-red-400 text-xs">
                        {errors.root.message}
                    </div>
                )}
                <button type="submit" className="rounded-lg bg-black p-2 w-1/2 flex justify-center" > Submit </button>
                {loading && (
                    <div className=" text-green-500">
                        {component}
                    </div>
                )}
                </form>
            </div>
        </div>
    )
}

