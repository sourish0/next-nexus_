import { connectToDB } from '@/utils/connectToDB';
import { NextRequest, NextResponse } from 'next/server';
import Blog from '@/models/blog';

export async function GET() {
    try {
        await connectToDB();

        const posts = await Blog.find({}).populate("creator");

        // console.log(posts);

        return NextResponse.json({ message: "Posts Fetched Successfully!", posts }, { status: 200 });

    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ message: "Unable To Fetch Posts!", error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { post, userID } = body;
    const { title, content } = post;
    
    try {
        
        await connectToDB();

        const newPost = new Blog({
            creator: userID || "66a70ffc81ad370c4d23c9dc",
            title,
            content
        });

        await newPost.save();

        return NextResponse.json({ message: "Post Created Successfully!", post: newPost }, {status: 200});

    } catch (error) {
        return NextResponse.json({ message: "Unable To Create Post!", error }, {status: 500});
    }
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();
    try {
        await connectToDB();

        await Blog.findByIdAndDelete(id);

        return NextResponse.json({ message: "Post Deleted Successfully!" }, {status: 200});

    } catch (error) {
        return NextResponse.json({ message: "Unable To Delete Post!", error }, {status: 500});
    }
}