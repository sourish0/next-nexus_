"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import Form from '@/components/Form';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/card';

interface Params {
    id: string
}

interface Post {
    _id?: string;
    creator?: string;
    title: string;
    content: string;
}

export default function EditPost({params}: {params: Params}) {
    const postId = params.id;
    const { data: session } = useSession();
    const router = useRouter();
    const [post, setPost] = useState<Post>({_id: '', creator: '', title: '', content: ''});

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${postId}`);
                setPost(response.data.blog);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPost();
    }, [postId]);

    return (
        <div className="mx-auto my-20 p-6 ">
            
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Edit Blog Post</h1>
            <Form
                type='Edit'
                post={post}
                setPost={setPost}
                posting={false}
                handlePost={async (e) => {
                    e.preventDefault();
                    try {
                        await axios.patch(`/api/posts/${postId}`, post);
                        router.push('/blogs');
                    } catch (error) {
                        console.error(error);
                    }
                }}
            />        
        </div>
    )
}
