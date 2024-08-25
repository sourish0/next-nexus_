"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import axios from 'axios';
import BlogCard from '@/components/BlogCard';
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import SearchBar from "@/components/SearchBar";
import Image from 'next/image';
import bge from '../../../public/assets/images/beautiful-shot-deer-standing-grassy-field-with-blurred-natural (1).jpg';

const backgroundImages = [
  '/assets/images/beautiful-shot-deer-standing-grassy-field-with-blurred-natural (1).jpg',
  '/assets/images/pexels-anntarazevich-6796883.jpg',
  '/assets/images/pexels-frans-van-heerden-201846-12278086.jpg',
  '/assets/images/pexels-leonardo-jarro-204864-633437.jpg',
  '/assets/images/pexels-markb-106690.jpg',
  '/assets/images/pexels-mikebirdy-97825.jpg',
  '/assets/images/pexels-minan1398-1406861.jpg',
  '/assets/images/tiger.jpg',
  '/assets/images/turtle.jpg',
];

interface Post {
  _id: string;
  creator: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  title: string;
  content: string;
}

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure you want to DELETE this post?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, DELETE it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete('/api/posts', { data: { id } });
        setPosts(posts.filter(post => post._id !== id));
        Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
      } catch (error) {
        console.error('Failed to delete post', error);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/blogs/edit/${id}`);
  };

  const handleShow = (id: string) => {
    router.push(`/blogs/show/${id}`);
  };

  return (
    <div>
      <section className="relative h-screen text-white flex flex-col justify-center items-center">
        {/* Background Image with Gradient Mask */}
        <div className="absolute inset-0 z-[-1]">
          <div className="relative w-full h-full">
            <Image src={bge} alt="Background" layout="fill" objectFit="cover" className="absolute inset-0" />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
          </div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            From Threatened to Thriving: Your Journey to Save Endangered Wildlife Begins Here
          </h1>
          <div className="w-full max-w-lg">
            <SearchBar />
          </div>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        {!posts.length ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">No Posts Found!</h2>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold mb-8 text-gray-800">Other Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                // Randomly select an image for each post
                const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
                return (
                  <div key={post._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <BlogCard
                      username={post.creator.name}
                      userId={post.creator._id}
                      image={randomImage}
                      title={post.title}
                      content={post.content}
                      onEdit={() => handleEdit(post._id)}
                      onShow={() => handleShow(post._id)}
                      onDelete={() => handleDelete(post._id)}
                      isAuthenticated={session?.user?.id === post.creator._id}
                      postId={post._id}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
