"use client"
import { zodResolver } from "@hookform/resolvers/zod"; 
import { register } from "module";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useUserStore } from "@/store/store";
import { useState } from "react";

const topicSchema = z.object({
    topicName: z.string().min(2),
    thumbnail: z.string().min(2),
    description: z.string().min(2),
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


export default function TopicForm(){

    type topicFormFields = z.infer<typeof topicSchema>;
    const { register, setError, handleSubmit, formState: { errors } } = useForm<topicFormFields>({
        resolver: zodResolver(topicSchema), 
    });
    const [loading, setLoading] = useState(false);
    const [component, setComponent] = useState(Loading); 

    const onTopicSubmit: SubmitHandler<topicFormFields> = async (data) => {
        console.log(data);
        try {
            setLoading(true); 
            setComponent(Loading); 
            const response = await axios.post("/api/add-topic", data);
            console.log(response); 
            setComponent(
                <div className="text-green-400 text-sm">
                    Topic uploaded successfully!
                </div>
            )

        } catch (error : any) {
            setError("root", {
                message: error?.response?.data.error
            })
            console.log(error?.response?.data.error); 
        }

    }

    return (

    <div className="flex justify-end w-1/2 p-2">
        <div className=" bg-slate-600/50 p-2 flex justify-center items-center h-1/2">
            <form onSubmit={handleSubmit(onTopicSubmit)} className="flex flex-col bg-black/60 p-4 rounded-lg justify-center gap-2 items-center">
                <div className=" text-xl">
                    Add Topic
                </div>
                <div className="flex w-full">
                   <label className="flex p-2 w-2/3 justify-start">
                        Topic Name 
                    </label>
                    <input {...register("topicName", {
                        required: true,
                    })} type="text" 
                        placeholder="Title"
                        className=" text-slate-300 bg-black px-2 rounded-lg"/>
                </div>
            
            {errors.topicName && (
                <div className="text-red-400 text-xs">
                    {errors.topicName.message}
                </div>
            )}
            <div className="flex w-full">
                <label className="p-2 w-1/3">
                Thumbnail
                </label>
                <input {...register("thumbnail", {
                    required: true,
                })} type="text"
                    placeholder="URL"
                    className="text-slate-300 bg-black p-1 px-2 rounded-lg"/>
            </div>
            {errors.thumbnail && (
                <div className="text-red-400 text-xs">
                    {errors.thumbnail.message}
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
                <div className="text-red-400 text-xs" >
                    {errors.description.message}
                </div>
            )}

            <button type="submit" className="rounded-lg bg-black p-2 w-1/2 flex justify-center" > Submit </button>
            {errors.root && (
                <div className="text-red-400 text-xs">
                    {errors.root.message}
                </div>
            )}
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

