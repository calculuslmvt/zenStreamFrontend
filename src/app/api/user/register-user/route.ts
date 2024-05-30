import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"; 

export async function POST(request: NextRequest) {
    try {
        connect(); 
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        if (!username || !email || !password) {
            return NextResponse.json({ message: "Please fill all fields" }, {status:400});
        };
        const user = await User.findOne({email}); 
        if(user) {
            return NextResponse.json({ message: "User already exists" }, {status:400});
        }

        // hash Password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser); 

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser 
        }); 

    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status:500}); 
    }
}

