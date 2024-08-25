"use client"

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchObservations } from '@/lib/iNaturalist';

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
  const [searching, setSearching] = useState(false);
  const [species, setSpecies] = useState('');
  const [observations, setObservations] = useState([]);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setSearching(true);
    try {
      const data = await fetchObservations(species);
      setObservations(data);
    } catch (error) {
      console.error("Error fetching observations:", error);
      // Handle error appropriately
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className=" h-screen mt-20">
      <div className=" w-full p-4 z-10 mb-5">
        <div className="container mx-auto">
          <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-600">Animal Locator</h1>
          <form onSubmit={handleSearch} className="flex flex-col items-center">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                className="w-full p-4 pr-12 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white bg-opacity-90"
                placeholder="Enter Animal Name (Use Scientific Name For Best Results)"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-6 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 transition"
              >
                {searching ? `Searching...` : `Search`}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='relative'>
      <div className="absolute inset-0 z-[-1]">
        <Map observations={observations} />
      </div>
      
      </div>
      
    </div>
  );
}
