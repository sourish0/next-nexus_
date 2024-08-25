"use client";

import Tiger from '../../../../../public/assets/images/tiger.jpg';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import Form from '@/components/Form';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/card';
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from 'react-icons/fa';

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
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    
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
    const handleLikeClick = () => {
      setLiked(!liked);
      setLikes(liked ? likes - 1 : likes + 1); // Increment or decrement likes based on current state
    };
  
    return (
            <Card className="container rounded-none lg:mx-20 shadow-md overflow-hidden p-2 sm:p-4 md:p-6 w-fit my-20">
        <div className="md:p-6 px-4">
          <h1 className="text-3xl font-bold mb-4 text-center">{post.title}</h1>
          <div className='text-right '>
            <p className="text-gray-600 mb-8">~{post.creator.name}| December 29th, 2022</p>
          </div>
          <Image src={Tiger} alt="Tiger in the wild" className="object-cover rounded-lg h-fit w-full lg:p-4 pb-12" />
            
          <p className="text-gray-800 md:mb-6 px-4 md:px-16 box-content">
            {post.content}
          </p>
          
          <div className="flex items-center justify-between mt-6 mx-6 ">
            <button 
              onClick={handleLikeClick} 
              className={`flex items-center space-x-2 ${liked ? 'text-red-600' : 'text-gray-600'} hover:text-red-600 transition-transform duration-150`}>
              <span className={`text-2xl ${liked ? 'animate-heart' : ''}`}>
                {liked ? <FaHeart className='h-20'/> : <FaRegHeart className='h-20'/>}
              </span>
              <span>{likes}</span>
            </button>
            <button 
              onClick={() => setBookmarked(!bookmarked)} 
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
              <span>{bookmarked ? <FaBookmark className='h-20'/> : <FaRegBookmark className='h-20'/>}</span>
            </button>
          </div>
        </div>
      </Card>
           

        
        
    )
}