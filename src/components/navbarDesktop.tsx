import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../../public/assets/images/logo.jpeg';
import logoText from '../../public/assets/images/logo-text.png';

import Link from 'next/link';
import { Button } from './ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from 'next/navigation';

const NavbarDesktop = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvider();
  }, []);

  return (
    <div className={`h-[70px] z-50 flex items-center justify-center lg:justify-evenly px-2 lg:pl-20 fixed top-0 lg:pr-24 left-0 right-0 transition-colors duration-300 ${isScrolled ? 'bg-[#035845]' : 'bg-transparent'}`}>
      <div className='ml-6'>
      <Link href="/">
      <div className="flex items-center lg:ml-8"> {/* Logo */}
          <Image src={logo} alt="Next.js Logo" height={60} className='visible'/>
          <Image src={logoText} alt="Next.js Logo" height={100} className='invisible lg:visible' />
        </div>
      </Link>
          
        
      </div>

      <div className='w-full flex justify-center gap-5 text-black '> {/* Links */}
      <HoverCard>
          <HoverCardTrigger><Button variant="link" className={isScrolled ? 'text-white' : 'text-black'}>About</Button></HoverCardTrigger>
          <HoverCardContent className='flex flex-col flex-initial w-fit'>
            <Button variant="link" className='mb-2 text-sm'>
              <Link href="/doctors">Our Doctors</Link>
            </Button>
            <Button variant="link" className='mb-2 text-sm'>
              <Link href="/doctor-login">For Doctors Login</Link>
            </Button>
          </HoverCardContent>
        </HoverCard>
        

        <HoverCard>
          <HoverCardTrigger><Button variant="link" className={isScrolled ? 'text-white' : 'text-black'}>Services</Button></HoverCardTrigger>
          <HoverCardContent className='flex flex-col flex-initial w-fit'>
            <Button variant="link" className='mb-2 text-sm'>
              <Link href="/createPage">create Blog</Link>
            </Button>
            <Button variant="link" className='mb-2 text-sm'>
              <Link href="/blogs">Blogs</Link>
            </Button>
            
            <Button variant="link" className='mb-2 text-sm'>
              <Link href="/animal-locator">Find Animal Habitat</Link>
            </Button>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger><Button variant="link" className={isScrolled ? 'text-white' : 'text-black'}>Resources</Button></HoverCardTrigger>
          <HoverCardContent className='flex flex-col flex-initial w-fit'>
            <Button variant="link" className='mb-2 text-sm'>
              <Link href="/doctors">Appointment Request</Link>
            </Button>
            <Button variant="link" className='mb-2 text-sm'>
              <Link href="/live-stream">Live-stream</Link>
            </Button>
          </HoverCardContent>
        </HoverCard>

        <Button variant="link">
          <Link href="/profile" className={isScrolled ? 'text-white' : 'text-black'}>
            profile
          </Link>
        </Button>
      </div>

      {!session && providers && (
        <Button variant="login" className='m-2 mr-6 bg-green-700'>
          {Object.values(providers).map((provider) => (
            <Button 
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className={isScrolled ? 'text-white' : 'text-black'}
            >
              Sign In
            </Button>
          ))}
        </Button>
      )}

      {session && (
        <Button variant="logout" className='m-2 mr-6 bg-green-700'>
          <Button 
            onClick={() => signOut()}
            className={isScrolled ? 'text-white' : 'text-black'}
          >
            Log Out
          </Button>
        </Button>
      )}
    </div>
  );
};

export default NavbarDesktop;
