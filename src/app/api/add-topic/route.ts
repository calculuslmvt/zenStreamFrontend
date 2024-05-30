import { type NextRequest, NextResponse } from "next/server";
import  { connect } from "@/dbConfig/dbConfig"
import { Topic } from "@/models/topicModel"; 

const topicData = [
    {
        topicName: "Home",
        contentData: [
            {
            videoKey: "1",
            videoTitle: "Meditation101",
            videoThumbnail: "https://i3.ytimg.com/vi/G3XUee3-meA/maxresdefault.jpg",
            videoUrl: "https://youtu.be/G3XUee3-meA",
            videoTextContent: "Here will text content about video"
            },
            {
            videoKey: "2",
            videoTitle: "Alan watts",
            videoThumbnail: "https://i3.ytimg.com/vi/NpHqYnFELLE/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=NpHqYnFELLE&t=9s&pp=ygUKYWxhbiB3YXR0cw%3D%3D",
            videoTextContent: "Here will text content about video"
            }
        ]
    },
    {
        topicName: "Buddhism",
        contentData: [
            {
            videoKey: "1",
            videoTitle: "React update",
            videoThumbnail: "https://i3.ytimg.com/vi/T8TZQ6k4SLE/maxresdefault.jpg",
            videoUrl: "https://youtu.be/R6G1D2UQ3gg",
            videoTextContent: "Here will text content about video"
            },
            {
            videoKey: "2",
            videoTitle: "Alan watts",
            videoThumbnail: "https://i3.ytimg.com/vi/NpHqYnFELLE/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=NpHqYnFELLE&t=9s&pp=ygUKYWxhbiB3YXR0cw%3D%3D",
            videoTextContent: "Here will text content about video"
            }
        ]
    },
    {
        topicName: "Zen",
        contentData: [
            {
            videoKey: "1",
            videoTitle: "Meditation101",
            videoThumbnail: "https://i3.ytimg.com/vi/G3XUee3-meA/maxresdefault.jpg",
            videoUrl: "https://youtu.be/G3XUee3-meA",
            videoTextContent: "Here will text content about video"
            },
            {
            videoKey: "2",
            videoTitle: "Alan watts",
            videoThumbnail: "https://i3.ytimg.com/vi/NpHqYnFELLE/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=NpHqYnFELLE&t=9s&pp=ygUKYWxhbiB3YXR0cw%3D%3D",
            videoTextContent: "Here will text content about video"
            }
        ]
    }
]


export async function POST(request : NextRequest) {
    try {
        connect(); 
        const reqBody = await request.json();
        const { topicName, thumbnail, description } = reqBody;

        console.log(reqBody);

        const topic = await Topic.findOne({topicName});
        
        if(topic) {
            return NextResponse.json({error: "Topic already exists"}, {status: 400}); 
        }

        console.log(topic);

        const newTopic = new Topic({
            topicName,
            thumbnail,
            description
        });

        const createdTopic = await newTopic.save(); 
        console.log(createdTopic); 

        return NextResponse.json(
            {   
                message: "Topic created Successfully",
                success: true,
                createdTopic
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