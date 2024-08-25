"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BlogCard from '@/components/BlogCard'; // Adjust the path if necessary
import axios from 'axios';
import Swal from 'sweetalert2';

interface Post {
    _id: string;
    creator: string;
    // creator: {
    //   name: string;
    //   email: string;
    //   image: string;
    // };
    title: string;
    content: string;
}

export default function PostPage() {
    const router = useRouter();
    const searchParams = useSearchParams(); // To get query parameters
    const [matchedPosts, setMatchedPosts] = useState<any | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const title = searchParams.get('title');
        if (title) {
            // Fetch or derive the post based on the title
            const allPosts = JSON.parse(localStorage.getItem('posts') || '[]');
            const selectedPosts = allPosts.filter((post: any) => post.title.includes(title));
            setMatchedPosts(selectedPosts);
        }
    }, [searchParams]);

    if (!matchedPosts) {
        return <div>Loading...</div>;
    }

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure to DELETE this post?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: 'blue',
            confirmButtonText: 'Yes, DELETE it!'
        });
    
        if (result.isConfirmed) {
            try {
                await axios.delete(`api/posts`, {data: {id: id}});
                setPosts(posts.filter(post => post._id !== id));
                Swal.fire(
                    'Deleted!',
                    'Your post has been deleted.',
                    'success'
                );
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    const handleEdit = (id: string) => {
        router.push(`/blogs/edit/${id}`);
    }

    return (
        <div>
            {matchedPosts.map((post: any) => (
                <BlogCard 
                    key={post._id}
                    username={post.creator.name || "Adolf Chad Hitler Bro"}
                    userId={post.creator.email || "noJewsAlive@nazi.com"} 
                    image={post.creator.image || "https://images01.military.com/sites/default/files/styles/full/public/media/offduty/books/2017/03/hitler420.jpeg.jpg"}
                    title={post.title}
                    content={post.content}
                    onEdit={() => handleEdit(post._id)}
                    onDelete={() => handleDelete(post._id)}
            />
            ))}
        </div>
    );
}
