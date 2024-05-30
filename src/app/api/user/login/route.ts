import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { User } from "@/models/userModel";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, {status:400});
        }
        const isValid = await bcryptjs.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid password" }, {status:400});
        }
        
        return NextResponse.json({
            message: "Login successfull",
            data: {username:user.username}, 
            success: true
        })

    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}