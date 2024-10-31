"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ImgProps {
  images: { src: string; text: string }[];
  className?: string;
  addBookmark: () => void;
  isBookmark: boolean;
}

const Img = ({ images, className, addBookmark, isBookmark }: ImgProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarred, setIsStarred] = useState(isBookmark);

  const handleError = () => {
    console.error(`Failed to load image: ${images[currentIndex].src}`);
  };

  const toggleStar = () => {
    setIsStarred((prev) => !prev);
    addBookmark();
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    images[currentIndex] && (
      <div className="relative inline-block">
        <img
          src={images[currentIndex].src}
          className={cn("rounded-lg shadow-lg w-full h-auto", className)}
          onError={handleError}
          alt={images[currentIndex].text}
        />
        <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 bg-white bg-opacity-75 p-2 rounded-2xl flex items-center text-2xl font-superbold">
          <button onClick={toggleStar}>
            {!isStarred ? (
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 1L10.8175 5.695L16 6.4525L12.25 10.105L13.135 15.265L8.5 12.8275L3.865 15.265L4.75 10.105L1 6.4525L6.1825 5.695L8.5 1Z"
                  stroke="#598BD7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 1L10.8175 5.695L16 6.4525L12.25 10.105L13.135 15.265L8.5 12.8275L3.865 15.265L4.75 10.105L1 6.4525L6.1825 5.695L8.5 1Z"
                  fill="#F2A800"
                  stroke="#F2A800"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <span className="mr-2">{images[currentIndex].text}</span>
        </div>
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white px-4 py-2"
          onClick={previousImage}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#598BD7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 8L8 12L12 16"
              stroke="#598BD7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 12H8"
              stroke="#598BD7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 py-2"
          onClick={nextImage}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#598BD7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16L16 12L12 8"
              stroke="#598BD7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 12H16"
              stroke="#598BD7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    )
  );
};

export default Img;
