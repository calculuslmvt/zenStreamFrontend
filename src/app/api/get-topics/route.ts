import { connect } from "@/dbConfig/dbConfig";
import { Topic } from "@/models/topicModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
    try {
        connect(); 
        const reqBody = await request.json();
        const topics = await Topic.find({}); 
        return NextResponse.json(
            {   data: topics,
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