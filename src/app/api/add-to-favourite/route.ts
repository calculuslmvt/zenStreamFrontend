import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { Video } from "@/models/videoModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
    try {
        console.log("server  ... "); 
        connect(); 
        const reqBody = await request.json(); 
        const { videoTitle, username } = reqBody;
        console.log(reqBody); 
        const video = await Video.findOne({title: videoTitle});
        const user = await User.findOne({username});
        if(!video && !user ) {
        NextResponse.json(
            {error: "Video Cant be added"},
            {status: 400}
            )
        }
        console.log(user, video); 
        const userVideos = user.playlist;
        console.log(userVideos, video._id);
        console.log(userVideos[0]?.equals(video._id));
        if(userVideos.length > 0 && userVideos.find((value : any ) => value.equals(video._id))) {
           return NextResponse.json(
                {error: "Video already added"},
                {status: 400}
            )
        }
    
        user.playlist.push(video._id);
        await user.save(); 
    
        return NextResponse.json({
            message: "Video added successfully",
            status: 200
        });

    } catch(error : any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}