"use client";

import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import Image from "next/image";

export default function OurMap() {
  const position = { lat: 18.546989, lng: 73.903442 };
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || !process.env.NEXT_PUBLIC_MAP_ID) {
        throw new Error("Google Maps API Key or Map ID is missing");
      }
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div className="h-[60vh] w-[100%]">
        <Map defaultZoom={15} center={position} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin />
          </AdvancedMarker>
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <div className="relative z-10 xl:w-[150px] xl:h-[150px] w-[100px] h-[100px] md:w-[50px] md:h-[50px] ">
                <Image src={"/images/place.jpeg"} alt="hi" className="object-fit:cover" fill />
              </div>
              <p className="text-2xl font-bold">Kalyani Pet Center</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}