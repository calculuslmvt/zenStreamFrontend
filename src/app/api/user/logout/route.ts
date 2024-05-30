import { NextResponse, NextRequest } from "next/server";

export async function POST( request: NextRequest) {

    return NextResponse.json({
        message: "Logout successfull",
        status: 200,
        success: true 
    })
}