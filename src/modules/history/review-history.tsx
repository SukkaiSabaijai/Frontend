"use client";

import { ReviewCard } from "@/shared/components/card/review-card";
import { useEffect, useState } from "react";
import { ReviewHistory } from "./_types/review-history.type";
import { deleteReview, getReviewHistory } from "./_services/history.service";
import Header from "@/shared/components/header/header";

const ReviewHistoryPage = () => {
    const [reviewHistories, setReviewHistories] = useState<ReviewHistory[]>();
    const fetchReivewHistories = async () => {
        const data = await getReviewHistory();
        setReviewHistories(data);
    }
    const deleteReviewHistories = async (markerId: number, id: number) => {
        const data = await deleteReview(markerId, id);
        console.log(data);
        fetchReivewHistories();
    }

    useEffect(() => {fetchReivewHistories();}, [])

    return(
      <div className="bg-custom-light-blue min-h-screen">
        <Header title="Review History" />
        <div className="flex justify-center items-center mt-10 flex-col">
          {
            reviewHistories&&reviewHistories.map(
              (reviewHistories, index) => (
                <ReviewCard review={reviewHistories} deleteFunc={deleteReviewHistories} />
              )
            )
          }
        </div>
      </div>
    );
}

export default ReviewHistoryPage