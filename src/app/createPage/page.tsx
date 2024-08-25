"use client"
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FileUpload } from '@/components/ui/file-upload';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { useMediaQuery } from 'usehooks-ts';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Form from '@/components/Form';

export default function CreatePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState({ title: '', content: '' });
  const [posting, setPosting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const isDesktop = useMediaQuery("(min-width:800px)", {
    initializeWithValue: false,
  });

  const words = [
    { text: "Create" },
    { text: "Your" },
    { text: "Amazing" },
    { text: "Blog", className: "text-green-900 dark:text-blue-500" },
  ];

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPosting(true);
    try {
      const response = await axios.post('api/posts', { post: post, userID: session?.user?.id });
      if (response.status === 200) {
        router.push('/blogs');
      }
    } catch (error) {
      console.error(error);
    }
    setPosting(false);
  };

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className='py-20 mt-10'>
      <div className="flex flex-col items-center justify-center mt-10">

        <h1 className='text-3xl font-bold text-green-900 mb-4'>
          Create Your Amazing Blog
        </h1>

        <Separator className="bg-green-900 w-1/12 md:w-1/8 h-1 mb-10" decorative />
      </div>
      <div className="w-full flex justify-center mt-20 px-4 relative">
        <div className="w-[1000px]"> {/* Adjust max-width as needed */}
          <Form
            type="Create"
            post={post}
            setPost={setPost}
            posting={posting}
            handlePost={createPost}
            className="w-full" 
          />
        </div>
      </div>
    </div>
  );
}
