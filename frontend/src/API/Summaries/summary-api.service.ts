import axios from "axios";
import { ENDPOINT } from "../api-endpoints.routes";
import { IUserData } from "../../common/types/user-data.interface";
import { ISummaryData } from "../../common/types/summary.interface";

// Get all summaries API call
export const getAllSummaries = async () => {
  try {
    const response = await axios.get(`${ENDPOINT.SUMMARY.GET_ALL}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get all summaries related to the specific user API call
export const getAllSummariesRelatedToUser = async (userId: string) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.SUMMARY.GET_WITH_USER(userId)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get all summaries related to the specific user API call
export const getAllSummariesRelatedToSubject = async (userId: string) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.SUMMARY.GET_WITH_SUBJECT(userId)}`
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Get single subject details API call
export const getSingleSummary = async (userId: string) => {
  try {
    const response = await axios.get(`${ENDPOINT.SUMMARY.GET_WITH_ID(userId)}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Create new subject API call
export const createSummary = async (token: string, data: FormData) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.post(
      `${ENDPOINT.SUMMARY.GET_ALL}`,
      data,
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Update single summary API call
export const updateSingleSummary = async (
  token: string,
  summaryId: string,
  updatedData: FormData
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    console.log(`${ENDPOINT.SUMMARY.GET_WITH_ID(summaryId)}`);
    const response = await axios.put(
      `${ENDPOINT.SUMMARY.GET_WITH_ID(summaryId)}`,
      updatedData,
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

// Delete single subject API call
export const deleteSingleSummary = async (token: string, userId: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.delete(
      `${ENDPOINT.SUMMARY.GET_WITH_ID(userId)}`,
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};
