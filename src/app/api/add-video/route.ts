import { type NextRequest, NextResponse } from "next/server";
import  { connect } from "@/dbConfig/dbConfig"
import { Video } from "@/models/videoModel"; 
import { Topic } from "@/models/topicModel";

export async function POST(request : NextRequest) {
    try {
        connect(); 
        const reqBody = await request.json();
        const { topicName, videoId, title, description } = reqBody;

        console.log(reqBody);

        const video = await Video.findOne({title});
        
        if(video) {
            return NextResponse.json({error: "Video already exists"}, {status: 400}); 
        }
        console.log(video);

        const videoFile = "https://youtu.be/" + videoId; 
        const thumbnail = "https://img.youtube.com/vi/" + videoId + "/0.jpg"; 

        const newVideo = new Video({
            videoFile,
            thumbnail,
            title,
            description
        });

        const createdVideo = await newVideo.save(); 
        console.log(createdVideo); 

        const topic = await Topic.findOne({topicName: topicName});
        if(!topic){
            return NextResponse.json(
                {error: "Enter Topic for the video"},
                {status: 400}
            )
        };

        console.log("id of object ", createdVideo._id); 
        // Pushing video to topic 
        topic.playlist.push(createdVideo._id);
        await topic.save(); 
        
        return NextResponse.json(
            {   
                message: "Video created Successfully",
                success: true,
                createdVideo
            },
            { status: 200}
        )
    } catch (error: any) {

        return NextResponse.json(
            {error: error.message},
            {status: 400}
        )
    }
}