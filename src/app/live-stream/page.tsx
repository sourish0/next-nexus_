import React from 'react';

const Page: React.FC = () => {
  const featuredVideo = {
    id: 'BJ3Yv572V1A',
    title: 'Enter the Savage Kingdom: Ultimate Predators',
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center py-20 ">
      <div className="max-w-5xl w-full px-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-8">
          {featuredVideo.title}
        </h1>
        <div className="flex flex-col justify-center aspect-h-9 mb-8 rounded-lg shadow-lg">
          <iframe
          width="946"
            height="532"
            
            src={`https://www.youtube.com/embed/${featuredVideo.id}?autoplay=1`}
            title={featuredVideo.title}
          
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <p className="text-lg text-gray-300 mt-4">
          Watch the ultimate predators in action. Streaming live now on Nat Geo WILD.
        </p>
      </div>
    </div>
  );
};

export default Page;
