import React, { useState, useEffect } from 'react';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import logoText from '../../public/assets/images/logo-text.png';
import logo from '../../public/assets/images/logo.jpeg';
import Link from 'next/link';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const NavbarMobile = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 mt-0 h-auto ${isScrolled ? 'bg-[#035845]' : 'bg-transparent'} transition-colors duration-300`}>
      <div className="flex items-center">
        <Image src={logo} alt="Logo" height={60} />
        <Image src={logoText} alt="Logo Text" height={100} />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size='icon'
            variant='ghost'
            className="mr-5"
            style={{ color: isScrolled ? "white" : 'black' }}
          >
            <Menu size={30} />
          </Button>
        </SheetTrigger>
        <SheetContent hideClose className='mx-auto w-11/12' side="left">
          <ScrollArea className='h-[600px] p-4'>
            <SheetHeader className='flex flex-row justify-between items-center'>
              <Image src={logo} alt="Logo" height={60} />
              <SheetClose className='right-0 top-0' asChild>
                <Button className="h-10 w-10 p-0" variant="ghost">
                  <X size={30} />
                </Button>
              </SheetClose>
            </SheetHeader>
            <div className='flex items-center flex-col'>
              <Accordion type="multiple" className='w-full'>
                {/* Accordion Items */}
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <p>ABOUT</p>
                  </AccordionTrigger>
                  <AccordionContent className='flex flex-col flex-initial'>
                    <Button variant="link" className='mb-2 text-sm justify-start'>
                      <Link href="/horr">Our Staff</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Fear Free</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Cat Friendly</Link>
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <p>SERVICES</p>
                  </AccordionTrigger>
                  <AccordionContent className='flex flex-col flex-initial'>
                    <Button variant="link" className='mb-2 text-sm justify-start'>
                      <Link href="/horr">Vaccinations</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Dental Care</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Surgery</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Spray & Neuter</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Laser Therapy</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Pet Acupuncture</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Chiropractics</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Boarding</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Grooming</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">House Calls</Link>
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <p>RESOURCES</p>
                  </AccordionTrigger>
                  <AccordionContent className='flex flex-col flex-initial w-full justify-start'>
                    <Button variant="link" className='mb-2 text-sm mt-2 w-full justify-start'>
                      <Link href="/horr">Appointment Request</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">New-Current Client</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Send Us Your Records</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Hospital Admin</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Shop Online</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Pet Records</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Employment</Link>
                    </Button>
                    <Button variant="link" className='mb-2 justify-start'>
                      <Link href="/horr">Disaster Preparation</Link>
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                <Button variant="link" className='mt-2 w-full flex justify-start'>
                  <Link href="/" className='items-start text-lg'>
                    Contact Us
                  </Link>
                </Button>
              </Accordion>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarMobile;
