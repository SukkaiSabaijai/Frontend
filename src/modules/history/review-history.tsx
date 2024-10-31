"use client";

import { ReviewCard } from "@/shared/components/card/review-card";
import { useEffect, useState } from "react";
import { ReviewHistory } from "./_types/review-history.type";
import { deleteReview, getReviewHistory } from "./_services/history.service";
import Header from "@/shared/components/header/header";
import ButtonIcon from "../../shared/components/button/button-icon";
import { useRouter } from "next/navigation";

const ReviewHistoryPage = () => {
    const [reviewHistories, setReviewHistories] = useState<ReviewHistory[]>();
    const router = useRouter();
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
        <div className="absolute bottom-16 left-0 mb-4 ml-4">
          <ButtonIcon
            onClick={() => router.push("/")}
            width={30}
            height={41}
            alt="back-icon"
            src="/assets/icon/back.svg"
            className="bg-custom-light-yellow"
          />
        </div>
      </div>
    );
}

export default ReviewHistoryPage