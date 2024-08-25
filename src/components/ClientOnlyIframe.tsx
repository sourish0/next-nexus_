import React from 'react';

interface ClientOnlyIframeProps {
  src: string;
  title: string;
  width: string;
  height: string;
}

const ClientOnlyIframe: React.FC<ClientOnlyIframeProps> = ({ src, title, width, height }) => {
  return (
    <iframe
      width={width}
      height={height}
      src={src}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="rounded-lg shadow-lg"
    ></iframe>
  );
};

export default ClientOnlyIframe;
