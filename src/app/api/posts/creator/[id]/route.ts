import { NextRequest, NextResponse } from 'next/server';
import Blog from "@/models/blog";
import { connectToDB } from "@/utils/connectToDB";

interface Params {
    id: string
}

export async function GET(req: NextRequest, {params}: {params: Params}) {

    const id = params.id;

    try {      

        await connectToDB();
        const blog = await Blog.find({creator: id}).populate('creator');
        return NextResponse.json({message: "Blog fetched successfully", blog}, {status: 200});

    } catch (error) {

        console.log(error);
        return NextResponse.json({message: "Error Fetching Blog.", error}, {status: 500});
    }
}