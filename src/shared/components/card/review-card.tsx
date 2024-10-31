"user client"

import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ReviewHistory } from "@/modules/history/_types/review-history.type";

type ReviewsProps = {
    review: ReviewHistory
    deleteFunc: (markerId: number, id: number) => void;
}

export const ReviewCard = (props: ReviewsProps) => {

    return (
        <div className="relative max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md h-48 w-5/6 mb-8">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{props.review.locationName}</h2>
                <IconButton 
                    className="absolute top-2 right-2" 
                    aria-label="delete" 
                    onClick={() => {props.deleteFunc(props.review.markerId, props.review.id)}}
                    size="small"
                >
                    <DeleteForeverIcon className="text-[#d32f2f]"/>
                </IconButton>
            </div>

        {/* Star Rating */}
            <div className="flex items-center mt-2 mb-4">
            {[...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`w-5 h-5 ${i < props.review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M12 .587l3.668 7.568L24 9.751l-6 5.849 1.417 8.485L12 18.902l-7.417 4.183L6 15.6l-6-5.849 8.332-1.596L12 .587z" />
            </svg>
            ))}
            </div>

        {/* Review Text */}
            <p className="text-sm text-gray-600 line-clamp-3 overflow-hidden">
                {props.review.review}
            </p>

        {/* Creation Date */}
            <p className="absolute bottom-2 right-2 text-xs text-gray-500">
                {props.review.createdAt}
            </p>
        </div>
    )
}