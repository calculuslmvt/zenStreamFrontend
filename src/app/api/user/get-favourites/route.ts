import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import { Video } from "@/models/videoModel";

export async function POST(request: NextRequest) {
    try {
        const { username } = await request.json();
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, {status:400});
        }
        const videoIds = user.playlist;

        const videos = await Promise.all(
            videoIds.map(async (id : any) => {
                const video = await Video.findOne({_id : id});
                return video; 
            })
        ) 

        console.log(videos);
        
        return NextResponse.json({
            message: "Videos fetch successfull",
            data: videos, 
            success: true
        })

    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}