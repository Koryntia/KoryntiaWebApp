import { NextResponse, NextRequest } from "next/server";
import connectDatabase from "@/lib/database";
import UserSignee from "@/models/user-model";

export async function POST(request: NextRequest) {

    const { signeeWalletAddress } = await request.json();

    await connectDatabase();

    try {
        const existingUser = await UserSignee.findOne({ signeeWalletAddress });
        if (existingUser) {
            return new Response(null, {
                status: 204,
            })
        }
        const newUser = new UserSignee({
            signeeWalletAddress
        });

        await newUser.save();
        return NextResponse.json({ message: "User created successfully" }, { status: 201 }); // Use 201 Created

    } catch (error) {
        console.error("api/user server Error: ", error);
        return NextResponse.json({ error }, { status: 500 });
    }
}

