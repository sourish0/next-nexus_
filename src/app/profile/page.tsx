"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import Swal from 'sweetalert2';
import { Card } from '@/components/ui/card';

export default function ProfilePage() {

    const { data: session, status } = useSession();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      
      const getBlogs = async () => {
        try {
          console.log(session?.user.id);
          const blogsResponse = await axios.get(`/api/posts/creator/${session?.user.id}`);
          setBlogs(blogsResponse.data.blog);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }

      if (status === "authenticated") {
        getBlogs();
      }
    }, [status, session?.user]);

    const handleDelete = async (id: string) => {
      const result = await Swal.fire({
          title: 'Are you sure you want to DELETE this post?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'red',
          cancelButtonColor: 'blue',
          confirmButtonText: 'Yes, DELETE it!'
        });
    
        if (result.isConfirmed) {
          try {
                await axios.delete(`/api/posts`, { data: { id: id } });
                setBlogs(blogs.filter(post => post._id !== id));
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
      <div className='my-20 mx-20' style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ 
            padding: '20px', 
            backgroundColor: '#f9f9f9', 
            borderRadius: '10px', 
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' 
          }}
          className='flex justify-around'>
          <img 
            src={session?.user.image} 
            alt="Profile Image" 
            height={100} 
            width={100}
            className='rounded-full'
          />
          <div>
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>
            Welcome {session?.user.name}
          </h1>
          <p style={{ fontSize: '18px', color: '#555' }}>
            Email: {session?.user.email}
          </p>
          </div>
        </div>
      <div className='flex justify-end'>
      <button 
        onClick={() => router.push('/my-Appointments')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: 'blue',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          marginRight: '10px',
        }}
      >
        My Appointments
      </button>
      </div>

        <div style={{ 
            marginTop: '20px', 
            padding: '20px', 
            backgroundColor: '#f9f9f9', 
            borderRadius: '10px', 
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' 
          }}>
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>My Blogs</h2>   
          <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 m-6'>
            
        {blogs.length ? blogs.map((post) => (
          <BlogCard 
                key={post._id}
                username={post.creator.name || "Anonymous"}
                userId={post.creator.email || "unknown@domain.com"}
                image={post.creator.image || "https://via.placeholder.com/100"}
                title={post.title}
                content={post.content}
                onEdit={() => handleEdit(post._id)}
                onDelete={() => handleDelete(post._id)}
                isAuthenticated={session ? session?.user.id === post.creator._id : false} postId={''} onShow={function (): void {
                    throw new Error('Function not implemented.');
                } }          
        />

        )) : <h2>No Blogs Created!</h2>}
      </div>
        </div>
          
        </div>
      )
 }
