import { getMarkerDetail } from './../../home/_services/home.service';
import { endpoints } from "@/shared/configs/endpoints.config";
import Axios from "@/shared/utils/axios";

export const getMarkerHistory = async () => {
    const { data } = await Axios.get(endpoints.history.markers);
    return data;
}

export const getReviewHistory = async () => {
    const { data } = await Axios.get(endpoints.history.reviews);
    return data;
}

export const deleteMarker = async (id: number) => {
    const { data } = await Axios.delete(endpoints.marker.delete(id));
    return data;
}

export const deleteReview = async (markerId: number, id: number) => {
    const { data } = await Axios.delete(endpoints.reviews.delete(markerId, id));
    return data;
}