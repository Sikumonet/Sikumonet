// Base URL
const BASE_URL = process.env.REACT_APP_BACKEND_API;

// API Endpoints
export const ENDPOINT = {
  AUTH: {
    SIGN_UP: `${BASE_URL}auth/sign-up`,
    SIGN_IN: `${BASE_URL}auth/sign-in`,
    LOGGED_IN_USER: `${BASE_URL}auth/logged-in-user`,
  },
  USER: {
    GET_ALL: `${BASE_URL}user`,
    GET_WITH_ID: (id: string) => `${BASE_URL}user/${id}`,
  },
  INSTITUTION: {
    GET_ALL: `${BASE_URL}institution`,
    GET_WITH_ID: (id: string) => `${BASE_URL}institution/${id}`,
    FILTER_WITH_NAME: (institutionName: string) =>
      `${BASE_URL}institution?name=${institutionName}`,
    SORT_WITH_NAME: (sortingType: string) =>
      `${BASE_URL}institution?sort=${sortingType}`,
  },
  DEGREE: {
    GET_ALL: `${BASE_URL}degree-program`,
    GET_WITH_ID: (id: string) => `${BASE_URL}degree-program/${id}`,
    GET_WITH_UNIVERSITY: (id: string) =>
      `${BASE_URL}degree-program/university/${id}`,
  },
  ACADEMIC_YEAR: {
    GET_ALL: `${BASE_URL}academic-year`,
    GET_WITH_ID: (id: string) => `${BASE_URL}academic-year/${id}`,
    GET_WITH_DEGREE_PROGRAM: (id: string) =>
      `${BASE_URL}academic-year/degree/${id}`,
  },
  SUBJECT: {
    GET_ALL: `${BASE_URL}subject`,
    GET_WITH_ID: (id: string) => `${BASE_URL}subject/${id}`,
    GET_WITH_ACADEMIC_YEAR: (id: string) =>
      `${BASE_URL}subject/academic-year/${id}`,
  },
  SUMMARY: {
    GET_ALL: `${BASE_URL}summary`,
    GET_WITH_ID: (id: string) => `${BASE_URL}summary/${id}`,
    GET_WITH_USER: (id: string) => `${BASE_URL}summary/user/${id}`,
    GET_WITH_SUBJECT: (id: string) => `${BASE_URL}summary/subject/${id}`,
  },
  RATING: {
    GET_ALL: `${BASE_URL}rating`,
    GET_WITH_ID: (id: string) => `${BASE_URL}rating/${id}`,
    GET_WITH_SUMMARY: (id: string) => `${BASE_URL}rating/summary/${id}`,
  },
  FEEDBACK: {
    GET_ALL: `${BASE_URL}feedback`,
    GET_WITH_ID: (id: string) => `${BASE_URL}feedback/${id}`,
    GET_WITH_SUMMARY: (id: string) => `${BASE_URL}feedback/summary/${id}`,
  },
  STATISTICS: {
    GET_ADMIN: `${BASE_URL}statistics/admin`,
    GET_USER: `${BASE_URL}statistics/user`,
  },
  LIBRARY: {
    GET_ALL: `${BASE_URL}library`,
    GET_WITH_ID: (id: string) => `${BASE_URL}library/${id}`,
    GET_WITH_USER: (userId: string) => `${BASE_URL}library/user/${userId}`,
  },
  DOWNLOAD: {
    GET_ALL: `${BASE_URL}download`,
    GET_WITH_ID: (id: string) => `${BASE_URL}download/${id}`,
    GET_WITH_USER: (userId: string) => `${BASE_URL}download/user/${userId}`,
    GET_WITH_SUMMARY: (summaryId: string) =>
      `${BASE_URL}download/summary/${summaryId}`,
  },
  REARWARD: {
    GET_WITH_ID: (id: string) => `${BASE_URL}rearward/${id}`,
    GET_WITH_USER: (userId: string) => `${BASE_URL}rearward/user/${userId}`,
  },
};
