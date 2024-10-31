import { createReview } from "@/modules/home/_services/home.service";
import {
  AllReviewResp,
  CreateReviewParams,
  MarkerType,
} from "@/modules/home/_types/home.type";
import { UseBooleanReturn } from "@/shared/hooks/use-boolean";
import Image from "next/image";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
}

// const initialReviews: Review[] = [
//     {
//   id: 1,
//   user: 'Tup na',
//   avatar: 'https://via.placeholder.com/40',
//   rating: 4,
//   comment: 'ห้องน้ำนี้สะอาดมาก! ชักโครกและพื้นไม่มีคราบเลย ที่สำคัญคือไม่มีกลิ่นไม่พึงประสงค์ ทำให้รู้สึกสบายใจเมื่อใช้บริการจริง ๆ!',
// },
// {
//   id: 2,
//   user: 'Kanokwan',
//   avatar: 'https://via.placeholder.com/40',
//   rating: 5,
//   comment: 'สะดวกและสะอาด แถมมีที่ล้างมืออย่างดี ชอบมากค่ะ!',
// },
// {
//   id: 3,
//   user: 'Somchai',
//   avatar: 'https://via.placeholder.com/40',
//   rating: 3,
//   comment: 'ห้องน้ำโอเค แต่บางทีคนเยอะและต้องรอคิว',
// },
// {
//   id: 4,
//   user: 'Arthit',
//   avatar: 'https://via.placeholder.com/40',
//   rating: 4,
//   comment: 'สถานที่สะอาด แต่คิดว่าสามารถปรับปรุงระบบระบายอากาศได้',
// },
// {
//   id: 5,
//   user: 'Wipawee',
//   avatar: 'https://via.placeholder.com/40',
//   rating: 5,
//   comment: 'ห้องน้ำดีมากๆ รู้สึกปลอดภัยและสะดวกสบาย',
// },
// {
//   id: 6,
//   user: 'Nirut',
//   avatar: 'https://via.placeholder.com/40',
//   rating: 2,
//   comment: 'บางครั้งมีกลิ่นไม่พึงประสงค์ แต่โดยรวมถือว่าโอเค',
// },
// {
//   id: 7,
//   user: 'Chalisa',
//   avatar: 'https://via.placeholder.com/40',
//   rating: 4,
//   comment: 'ห้องน้ำสะอาดและทันสมัย',
// },
// {
//   id: 8,
//   user: 'Theeraphong',
//   avatar: 'https://via.placeholder.com/40',
//   rating: 3,
//   comment: 'ที่ตั้งสะดวก แต่ห้องน้ำค่อนข้างเล็ก',
// },
// {
//   id: 9,
//   user: 'Pichai',
//   avatar: 'https://via.placeholder.com/40',
//   rating: 4,
//   comment: 'สะอาดและมีอุปกรณ์ครบ แต่ห้องเล็กไปหน่อย',
// },
// {
//   id: 10,
//   user: 'Waraporn',
//   avatar: 'https://via.placeholder.com/40',
//   rating: 5,
//   comment: 'ประทับใจมาก สะอาดและสะดวกสบายมาก',
//     },
//   ];

type Props = {
  markerReview: AllReviewResp;
  updateReview: UseBooleanReturn;
  mode: MarkerType;
  locationName: string;
};
const ReviewForm = ({
  markerReview,
  updateReview,
  mode,
  locationName,
}: Props) => {
  // const [reviews, setReviews] = useState<Review[]>();
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [isFloating, setIsFloating] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const addReview = async () => {
    const createReviewParams: CreateReviewParams = {
      markerId: JSON.stringify(markerReview.markerId),
      rating: JSON.stringify(newRating),
      review: newComment,
    };
    const data = await createReview(createReviewParams);
    setNewComment("");
    setNewRating(0);
    setIsFloating(false);
    updateReview.onTrue();
  };

  const handleRating = (value: number) => {
    setNewRating(value);
  };
  const bgDrawer =
    mode == MarkerType.Toilet
      ? "bg-custom-light-blue"
      : "bg-custom-light-yellow";
  const bgButton =
    mode == MarkerType.Toilet ? "bg-custom-blue" : "bg-custom-yellow";

  // const averageRating = (reviews: Review[]) => {
  //   return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  // };

  return (
    <div className={`p-4 w-full ${bgDrawer} rounded-lg shadow-md relative`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{locationName}</h2>
        <div className="flex items-center space-x-1 text-yellow-500 text-xl font-bold">
          <span>{Number(markerReview.avgRating).toFixed(1)}/5</span>
          <span className="text-gray-600 text-xl font-bold">
            ({markerReview.reviewCount} reviews)
          </span>
        </div>
      </div>
      {isButtonVisible && (
        <button
          onClick={() => {
            setIsFloating(true), setIsButtonVisible(false);
          }}
          className={`p-4 ${bgButton} text-white rounded-full fixed bottom-5 right-5 hover:bg-custom-yellow z-50 font-bold text-xl`}
        >
          Add Review
        </button>
      )}

      <div>
        {markerReview.reviews.map((review, index) => (
          <div
            key={index}
            className="mb-4 p-3 border rounded-lg bg-white w-full"
          >
            <div className="flex items-center mb-2">
              <img
                src={
                  review.userPic
                    ? "http://localhost:5000/image/" + review.userPic
                    : "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
                }
                alt={`${review.username}'s avatar`}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h4 className="font-semibold">{review.username}</h4>
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={`${
                        index < review.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      size={21}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700">{review.review}</p>
          </div>
        ))}
      </div>

      {isFloating && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setIsFloating(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="p-3 border rounded-lg bg-white flex items-center space-x-2 w-3/4">
              <img
                src="https://via.placeholder.com/40"
                alt="User avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={`${
                        index < newRating ? "text-yellow-500" : "text-gray-300"
                      }`}
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
                onClick={addReview}
                className={`p-2 ${bgButton} text-white rounded-full hover:bg-blue-600`}
              >
                <Image
                  src="/assets/icon/add-review.svg"
                  alt="add review"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewForm;
