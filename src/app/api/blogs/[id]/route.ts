import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import Blog from "@/models/blog";

export async function GET(req, {params}) {

    const id = params.id
    
    try {
        await connectToDB();
        const blogs = await Blog.find({id}).populate
        return NextResponse.json({ message: "Blog Fetched Successfully!", blogs }, { status: 200 });

    } catch (error) {
        console.error("Error fetching Blog:", error);
        return NextResponse.json({ message: "Unable To Fetch Blog!", error }, { status: 500 });
    }

}