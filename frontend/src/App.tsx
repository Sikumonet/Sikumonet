import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { VIEWS } from "./utils/routes";
import SignIn from "./pages/Auth/sign-in";
import SignUp from "./pages/Auth/sign-up";
import AdminProtectedRoutes from "./middleware/admin-protected-routes.middleware";
import UserProtectedRoutes from "./middleware/user-protected-routes.middleware";
import UserDashboard from "./pages/User/user-dashboard";
import UserDashboardLayout from "./pages/User/user-dashboard-layout";
import AdminDashboardLayout from "./pages/Admin/admin-dashboard-layout";
import AdminDashboard from "./pages/Admin/admin-dashboard";
import Home from "./pages/home";
import AdminInstitutionAdd from "./pages/Admin/admin-institution";
import AdminDegreeAdd from "./pages/Admin/admin-degree";
import AdminAcademicYearAdd from "./pages/Admin/admin-academic-year";
import AdminSubjectAdd from "./pages/Admin/admin-subject";
import AdminInstitutionSingle from "./pages/Admin/admin-institution-single";
import AdminDegreeSingle from "./pages/Admin/admin-degree-single";
import AdminAcademicYearSingle from "./pages/Admin/admin-academic-year-single";
import UserDownloads from "./pages/User/user-downloads";
import UserUploads from "./pages/User/user-uploads";
import UserProfile from "./pages/User/user-profile";
import UserSummariesFeed from "./pages/User/user-summaries-feed";
import UserLibrary from "./pages/User/user-library";
import UserSettings from "./pages/User/user-settings";
import UserInstitutions from "./pages/User/user-institutions";
import UserDegreeProgramView from "./pages/User/user-degree-program-view";
import UserAcademicYearView from "./pages/User/user-academic-year-view";
import UserSubjectView from "./pages/User/user-subject-view";
import UserInstitutionsView from "./pages/User/user-institutions-view";
import UserSummaryEdit from "./pages/User/user-summary-edit";
import UserSummaryView from "./pages/User/user-summary-view";
import UserRewards from "./pages/User/user-reawards";
import UserSummaryAdd from "./pages/User/user-summary-add";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={VIEWS.HOME} index element={<Home />} />
        <Route path={VIEWS.SIGN_UP} index element={<SignUp />} />
        <Route path={VIEWS.SIGN_IN} element={<SignIn />} />
        <Route path="/user" element={<UserProtectedRoutes />}>
          <Route
            path={VIEWS.USER_DASHBOARD_LAYOUT}
            element={<UserDashboardLayout />}
          >
            <Route index element={<Navigate to={VIEWS.USER_DASHBOARD} />} />
            <Route path={VIEWS.USER_DASHBOARD} element={<UserDashboard />} />
            <Route
              path={VIEWS.USER_ALL_INSTITUTIONS}
              element={<UserInstitutions />}
            />
            <Route
              path={VIEWS.USER_INSTITUTIONS_VIEW}
              element={<UserInstitutionsView />}
            />
            <Route
              path={VIEWS.USER_DEGREE_PROGRAM_VIEW}
              element={<UserDegreeProgramView />}
            />
            <Route
              path={VIEWS.USER_ACADEMIC_YEAR_VIEW}
              element={<UserAcademicYearView />}
            />
            <Route
              path={VIEWS.USER_SUBJECT_VIEW}
              element={<UserSubjectView />}
            />
            <Route path={VIEWS.USER_LIBRARY} element={<UserLibrary />} />
            <Route
              path={VIEWS.USER_SUMMARIES_FEED}
              element={<UserSummariesFeed />}
            />
            <Route
              path={VIEWS.USER_SUMMARY_SINGLE_ADD}
              element={<UserSummaryAdd />}
            />
            <Route
              path={VIEWS.USER_SUMMARY_SINGLE_VIEW}
              element={<UserSummaryView />}
            />
            <Route
              path={VIEWS.USER_SUMMARY_SINGLE_EDIT}
              element={<UserSummaryEdit />}
            />
            <Route path={VIEWS.USER_PROFILE} element={<UserProfile />} />
            <Route path={VIEWS.USER_UPLOADS} element={<UserUploads />} />
            <Route path={VIEWS.USER_DOWNLOADS} element={<UserDownloads />} />
            <Route path={VIEWS.USER_REARWARDS} element={<UserRewards />} />
            <Route
              path={VIEWS.USER_PROFILE_SETTINGS}
              element={<UserSettings />}
            />
          </Route>
        </Route>
        <Route path="/admin" element={<AdminProtectedRoutes />}>
          <Route
            path={VIEWS.ADMIN_DASHBOARD_LAYOUT}
            element={<AdminDashboardLayout />}
          >
            <Route index element={<Navigate to={VIEWS.ADMIN_DASHBOARD} />} />
            <Route path={VIEWS.ADMIN_DASHBOARD} element={<AdminDashboard />} />

            <Route
              path={VIEWS.ADMIN_INSTITUTIONS}
              element={<AdminInstitutionAdd />}
            />
            <Route
              path={VIEWS.ADMIN_INSTITUTIONS_SINGLE}
              element={<AdminInstitutionSingle />}
            />
            <Route path={VIEWS.ADMIN_DEGREES} element={<AdminDegreeAdd />} />
            <Route
              path={VIEWS.ADMIN_DEGREES_SINGLE}
              element={<AdminDegreeSingle />}
            />
            <Route
              path={VIEWS.ADMIN_ACADEMIC_YEARS}
              element={<AdminAcademicYearAdd />}
            />
            <Route
              path={VIEWS.ADMIN_ACADEMIC_YEARS_SINGLE}
              element={<AdminAcademicYearSingle />}
            />
            <Route path={VIEWS.ADMIN_SUBJECTS} element={<AdminSubjectAdd />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
