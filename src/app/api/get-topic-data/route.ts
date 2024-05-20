import { type NextRequest, NextResponse } from "next/server";

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
        const reqBody = await request.json();
        const { topicName } = reqBody;

        console.log(topicName);
        const contentData = topicData.find((value) => (value.topicName === topicName));

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