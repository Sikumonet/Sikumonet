export enum VIEWS {
  // PUBLIC ROUTES
  HOME = "/",
  SIGN_UP = "/sign-up",
  SIGN_IN = "/sign-in",
  UPLOAD = "/upload",
  RATING = "/rating",

  // USER ROUTES
  USER_DASHBOARD_LAYOUT = "/user",
  USER_DASHBOARD = "/user/dashboard",
  USER_ALL_INSTITUTIONS = "/user/institutions",
  USER_INSTITUTIONS_VIEW = "/user/institutions-view",
  USER_DEGREE_PROGRAM_VIEW = "/user/degree-program-view",
  USER_ACADEMIC_YEAR_VIEW = "/user/academic-year-view",
  USER_SUBJECT_VIEW = "/user/subject-view",
  USER_LIBRARY = "/user/library",
  USER_SUMMARIES_FEED = "/user/summaries-feed",
  USER_PROFILE = "/user/profile",
  USER_UPLOADS = "/user/uploads",
  USER_DOWNLOADS = "/user/downloads",
  USER_PROFILE_SETTINGS = "/user/profile-settings",
  USER_SUMMARY_SINGLE_ADD = "/user/summary/add",
  USER_SUMMARY_SINGLE_VIEW = "/user/summary/view",
  USER_SUMMARY_SINGLE_EDIT = "/user/summary/edit",
  USER_REWARDS = "/user/rewards",

  // ADMIN ROUTES
  ADMIN_DASHBOARD_LAYOUT = "/admin",
  ADMIN_DASHBOARD = "/admin/dashboard",
  ADMIN_INSTITUTIONS = "/admin/institution",
  ADMIN_INSTITUTIONS_SINGLE = "/admin/institution/view",
  ADMIN_DEGREES = "/admin/degree-program",
  ADMIN_DEGREES_SINGLE = "/admin/degree-program/view",
  ADMIN_ACADEMIC_YEARS = "/admin/academic-year",
  ADMIN_ACADEMIC_YEARS_SINGLE = "/admin/academic-year/view",
  ADMIN_SUBJECTS = "/admin/subject",
}
