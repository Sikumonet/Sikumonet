import axios from "axios";
import { ENDPOINT } from "../api-endpoints.routes";
import { IRewardData } from "../../common/types/rewards-data.interface";

// Get all reward related to the specific user API call
export const getRewardRelatedToUser = async (userId: string) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.REWARD.GET_WITH_USER(userId)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};
