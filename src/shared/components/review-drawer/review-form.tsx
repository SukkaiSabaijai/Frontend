import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
}

const initialReviews: Review[] = [
    {
      id: 1,
      user: 'Tup na',
      avatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment: 'ห้องน้ำนี้สะอาดมาก! ชักโครกและพื้นไม่มีคราบเลย ที่สำคัญคือไม่มีกลิ่นไม่พึงประสงค์ ทำให้รู้สึกสบายใจเมื่อใช้บริการจริง ๆ!',
    },
    {
      id: 2,
      user: 'Kanokwan',
      avatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment: 'สะดวกและสะอาด แถมมีที่ล้างมืออย่างดี ชอบมากค่ะ!',
    },
    {
      id: 3,
      user: 'Somchai',
      avatar: 'https://via.placeholder.com/40',
      rating: 3,
      comment: 'ห้องน้ำโอเค แต่บางทีคนเยอะและต้องรอคิว',
    },
    {
      id: 4,
      user: 'Arthit',
      avatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment: 'สถานที่สะอาด แต่คิดว่าสามารถปรับปรุงระบบระบายอากาศได้',
    },
    {
      id: 5,
      user: 'Wipawee',
      avatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment: 'ห้องน้ำดีมากๆ รู้สึกปลอดภัยและสะดวกสบาย',
    },
    {
      id: 6,
      user: 'Nirut',
      avatar: 'https://via.placeholder.com/40',
      rating: 2,
      comment: 'บางครั้งมีกลิ่นไม่พึงประสงค์ แต่โดยรวมถือว่าโอเค',
    },
    {
      id: 7,
      user: 'Chalisa',
      avatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment: 'ห้องน้ำสะอาดและทันสมัย',
    },
    {
      id: 8,
      user: 'Theeraphong',
      avatar: 'https://via.placeholder.com/40',
      rating: 3,
      comment: 'ที่ตั้งสะดวก แต่ห้องน้ำค่อนข้างเล็ก',
    },
    {
      id: 9,
      user: 'Pichai',
      avatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment: 'สะอาดและมีอุปกรณ์ครบ แต่ห้องเล็กไปหน่อย',
    },
    {
      id: 10,
      user: 'Waraporn',
      avatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment: 'ประทับใจมาก สะอาดและสะดวกสบายมาก',
    },
  ];
  

  const ReviewForm: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(4);
    const [isFloating, setIsFloating] = useState(false); 
  
    const handleAddReview = () => {
      if (!newComment.trim() || newRating === 0) return;
      const newReview: Review = {
        id: reviews.length + 1,
        user: 'New User',
        avatar: 'https://via.placeholder.com/40',
        rating: newRating,
        comment: newComment,
      };
      setReviews([...reviews, newReview]);
      setNewComment('');
      setNewRating(4);
      setIsFloating(false);
    };
  
    const handleRating = (value: number) => {
      setNewRating(value);
    };
  
    const averageRating = (reviews: Review[]) => {
      return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    };
  
    return (
      <div className="p-4 w-full bg-blue-100 rounded-lg shadow-md relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">ECC Toilet 1st floor</h2>
          <div className="flex items-center space-x-1 text-yellow-500 text-xl font-bold">
            <span>{averageRating(reviews).toFixed(1)}/5</span>
            <span className="text-gray-600 text-xl font-bold">({reviews.length} reviews)</span>
          </div>
        </div>
        
        <button
          onClick={() => setIsFloating(true)}
          className="p-2 bg-custom-blue text-white rounded-full mt-4 hover:bg-blue-700 mb-5 relative left"
        >
          Add Review
        </button>
  
        <div>
          {reviews.map((review) => (
            <div key={review.id} className="mb-4 p-3 border rounded-lg bg-white w-full">
              <div className="flex items-center mb-2">
                <img src={review.avatar} alt={`${review.user}'s avatar`} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h4 className="font-semibold">{review.user}</h4>
                  <div className="flex text-yellow-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        key={index}
                        className={`${index < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        size={21}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
  
        
  
        {isFloating && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsFloating(false)}></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="p-3 border rounded-lg bg-white flex items-center space-x-2 w-3/4">
                <img src="https://via.placeholder.com/40" alt="User avatar" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex text-yellow-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        key={index}
                        className={`${index < newRating ? 'text-yellow-500' : 'text-gray-300'}`}
                        onClick={() => handleRating(index + 1)}
                        size={21}
                      />
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full mt-2 p-2 border rounded-lg"
                  />
                </div>
                <button
                  onClick={handleAddReview}
                  className="p-2 bg-custom-blue text-white rounded-full hover:bg-blue-600"
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="28" rx="5" fill="#87B7FF" />
                    <g clipPath="url(#clip0_471_288)">
                      <path d="M21.5 6.5L13.25 14.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M21.5 6.5L16.25 21.5L13.25 14.75L6.5 11.75L21.5 6.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_471_288">
                        <rect width="18" height="18" fill="white" transform="translate(5 5)" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default ReviewForm;