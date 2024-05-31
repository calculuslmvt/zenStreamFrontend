"use client"
import { zodResolver } from "@hookform/resolvers/zod"; 
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useUserStore } from "@/store/store";
import { useState } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})
const Loading = (
    <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div>
); 
type formFields = z.infer<typeof schema>;

export default function Login(){
    const { register, setError, handleSubmit, formState: { errors } } = useForm<formFields>({
        resolver: zodResolver(schema), 
    });
    const [loading, setLoading] = useState(false);
    const [component, setComponent] = useState(Loading); 
    const [username, setUsername] = useState(""); 

    const onSubmit: SubmitHandler<formFields> = async (data) => {
        console.log(data);
        try {
            setLoading(true); 
            const response = await axios.post("api/user/login",data); 
            console.log(response);
            const username = response?.data?.data?.username;
            setUsername(username);
            setComponent(<div> welcome {username}</div>);
            window.sessionStorage.setItem("username", username); 

            location.replace("/"); 

        } catch (error : any) {
            setError("root", {
                message: error?.response?.data.error
            })
            console.log(error?.response?.data.error); 
        }

    }
    const updateUsername = useUserStore((state) => state.updateUsername);
    updateUsername(username); 
    return (
        <div className=" bg-slate-600/50 p-2 flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-black/60 p-4 rounded-lg justify-center gap-2 items-center">
                <div className=" text-xl">
                    Login
                </div>
                <div className="flex w-full">
                   <label className="flex p-2 w-2/3 justify-start">
                        Email
                    </label>
                    <input {...register("email", {
                        required: true,
                    })} type="text" 
                        placeholder="Email"
                        className=" text-slate-300 bg-black px-2 rounded-lg"/>
                </div>
            
            {errors.email && (
                <div className="text-red-400 text-xs">
                    {errors.email.message}
                </div>
            )}
            <div className="flex w-full">
                <label className="p-2 w-1/3">
                Password
                </label>
                <input {...register("password", {
                    required: true,
                })} type="text"
                    placeholder="Password"
                    className="text-slate-300 bg-black p-1 px-2 rounded-lg"/>
            </div>
            {errors.password && (
                <div className="text-red-400 text-xs">
                    {errors.password.message}
                </div>
            )}
            <button type="submit" className=" bg-black p-2 w-1/2 flex justify-center" > Submit </button>
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
        
    )
}

