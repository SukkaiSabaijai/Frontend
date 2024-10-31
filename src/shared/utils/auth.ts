import { endpoints } from "@/shared/configs/endpoints.config";
import Axios from "@/shared/utils/axios";

export const checkAuthen = async () => {
    try {
        const { status } = await Axios.get(endpoints.user.editProfile); // Assuming endpoints.user is '/user'
        return status === 200; // Return true if status is 200
    } catch (error) {
        return false; // Return false in case of an error
    }
};
