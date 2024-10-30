import { cn } from "@/lib/utils";
import { useState } from "react";

interface ImgProps {
  images: { src: string; text: string }[];
  className?: string;
}

const Img = ({ images, className }: ImgProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarred, setIsStarred] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleError = () => {
    console.error(`Failed to load image: ${images[currentIndex].src}`);
  };

  const toggleStar = () => {
    setIsStarred((prev) => !prev);
  };

  const toggleVerified = () => {
    setIsVerified((prev) => !prev);
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
    <div className="relative inline-block">
      <img
        src={images[currentIndex].src}
        className={cn("rounded-lg shadow-lg object-cover", className)}
        onError={handleError}
        alt={images[currentIndex].text}
      />
      <div className="text-l font-bold absolute top-[5%] left-1/2 transform -translate-x-1/2 bg-white bg-opacity-75 p-2 rounded-2xl flex items-center">
        <button
          className={cn("mr-2 hover:text-yellow-500 transition-colors", {
            "text-yellow-500": isStarred,
            "text-gray-400": !isStarred,
          })}
          onClick={toggleStar}
          aria-label="Toggle star"
        >
          {isStarred ? '⚪' : '⭐'}
        </button>
        <span className="mr-2">{images[currentIndex].text}</span>
        <button
          className="flex items-center text-green-500 hover:text-green-400 transition-colors"
          onClick={toggleVerified}
          aria-label="Toggle verified"
        >
          ✔️
        </button>
      </div>
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white px-4 py-2"
        onClick={previousImage}
        aria-label="Previous image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#598BD7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 8L8 12L12 16" stroke="#598BD7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 12H8" stroke="#598BD7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 py-2"
        onClick={nextImage}
        aria-label="Next image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#598BD7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 16L16 12L12 8" stroke="#598BD7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12H16" stroke="#598BD7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

export default Img;




