import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Message from "@/models/Message";

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await dbConnect();

        const newMessage = new Message({
            name,
            email,
            subject,
            message,
        });

        await newMessage.save();

        return NextResponse.json({ success: true, message: "Your inquiry has been received. We will contact you soon." }, { status: 201 });
    } catch (error: any) {
        console.error("Contact form error:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
