"use client";

import hero from '../../public/assets/images/beautiful-pet-portrait-dog.jpg';
import React from 'react';
import Image from 'next/image';

import { Button } from './ui/button';

const Slider = () => {
    return (
        <div className=' flex flex-col md:flex-row items-center justify-between container gap-10 px-20'>
            <div className='flex order-1 gap-4 md:order-2 items-center w-full md:w-1/2'> {/* Logo */}
                <div className="mb-5 flex flex-col text-center md:text-left md:mr-4 gap-4 ">
                    <div className='flex flex-col gap-6 mb-8'>
                        <h1 className="font-bold text-3xl m-2 md:text-6xl">
                            Join us in protecting wildlife and preserving our planet's future.
                        </h1>
                    </div>
                    <div>

                        Welcome to our wildlife conservation platform, where nature's wonders come to life. Our mission is to protect endangered species, preserve natural habitats, and educate the world about the importance of wildlife. Through cutting-edge technology, expert resources, and a passionate community, we aim to bridge the gap between people and the natural world. Whether you're here to learn, contribute, or explore, join us in making a difference for the creatures that share our planet.

                    </div>
                </div>
            </div>

            <div className=' order-2 md:order-2 items-center w-full md:w-1/2 bg-green h-fit '> {/* Image */}
                <Image src={hero} alt='yo mama' className='h-auto w-full rounded-lg shadow-[rgba(77,124,15,1.000)_10px_10px_10px_0px]' />
            </div>


        </div>

    );
};

export default Slider;