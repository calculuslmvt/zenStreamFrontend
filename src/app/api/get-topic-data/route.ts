import { type NextRequest, NextResponse } from "next/server";
import  { connect }from "@/dbConfig/dbConfig"
import { Video } from "@/models/videoModel";
import { Topic } from "@/models/topicModel";
import { ConnectionPoolClosedEvent } from "mongodb";

export async function POST(request : NextRequest) {
    try {
        connect(); 
        const reqBody = await request.json();
        const { topicName } = reqBody;

        if(!topicName) {
            return NextResponse.json(
                {error: "Topic not provided "},
                {status: 400}
            )
        }; 
        console.log(topicName);
        
        let contentData; 
        if(topicName === "Home") {
            contentData = await Video.find({}); 
        } else {
            const topic = await Topic.findOne({topicName})
                                    .populate('playlist');
            
            console.log(topic); 
            contentData = topic.playlist; 
        }

        if(!contentData) {
            return NextResponse.json(
                {error: `No content found for topic ${topicName}`},
                {status: 400}
            )
        }

        return NextResponse.json(
            {   data: contentData,
                success: true,
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