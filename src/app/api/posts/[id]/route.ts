import Blog from "@/models/blog";
import { NextRequest, NextResponse} from 'next/server';
import { connectToDB } from "@/utils/connectToDB";

interface Params {
    id: string
}

export async function GET(req: NextRequest, {params}: {params: Params}) {
    const id = params.id;
    try {        
        await connectToDB();
        const blog = await Blog.findById(id);
        return NextResponse.json({message: "Blog fetched successfully", blog}, {status: 200});
    } catch (error) {
        console.log("hLO bRO")
        return NextResponse.json({message: "Error Fetching Blog."}, {status: 500});
    }
}

export async function PATCH(req: NextRequest, {params}: {params: Params}) {
    const id = params.id;
    const { title, content } = await req.json();
    try {
        await connectToDB();
        const blog = await Blog.findByIdAndUpdate(id, {title: title, content: content});
        return NextResponse.json({message: "Blog updated successfully"}, {status: 200});
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "Error updating blog"}, {status: 500});
    }
}