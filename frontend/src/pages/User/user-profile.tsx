import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
import { useNavigate } from "react-router-dom";
import { getAllSummariesRelatedToUser } from "../../API/Summaries/summary-api.service";
import { getSingleUser } from "../../API/User/user-api.service";
import SummaryCardComponent from "../../components/Dashboard/summary-card.component";
import UserProfileCardComponent from "../../components/Dashboard/User/user-profile-card.component";
import { getUserStatistics } from "../../API/Statistics/statistics-api.service";
import ButtonComponent from "../../components/button.component";
import { VIEWS } from "../../utils/routes";

export default function UserProfile() {
  useScrollToTop();
  const navigate = useNavigate();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userInstitution, setUserInstitution] = useState("");
  const [userDegreeProgram, setDegreeProgram] = useState("");
  const [userAcademicYear, setAcademicYear] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [mySummariesData, setMySummariesData] = useState([]);
  const [userStatistics, setUserStatistics] = useState({
    totalSummaries: 0,
    totalRatings: 0,
    totalFeedbacks: 0,
    totalDownloads: 0,
  });

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("accessToken");
    if (user && token) {
      handleGetSingleUser(JSON.parse(user).id);
      handleGetAllSummariesRelatedToUser(JSON.parse(user).id);
      handleGetUserStatistics(token);
    }
  }, []);

  const handleGetSingleUser = async (userId: string) => {
    setLoadingSpinner(true);
    const response = await getSingleUser(userId);
    if (response.success) {
      console.log(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setUserAvatar(response.data.userAvatar.url || "");
      setUserInstitution(response.data.institution?.name || "");
      setDegreeProgram(response.data.degreeProgramme?.name || "");
      setAcademicYear(response.data.academicYear?.name || "");
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleGetAllSummariesRelatedToUser = async (userId: string) => {
    setLoadingSpinner(true);
    const response = await getAllSummariesRelatedToUser(userId);
    if (response.success) {
      console.log("getAllSummariesRelatedToUser : ", response.data);
      setMySummariesData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleGetUserStatistics = async (token: string) => {
    setLoadingSpinner(true);
    const response = await getUserStatistics(token);
    if (response.success) {
      console.log(response.data);
      setUserStatistics({
        totalSummaries: response.data.totalSummaries,
        totalRatings: response.data.totalRatingsForSpecificUser,
        totalFeedbacks: response.data.totalFeedbacksForSpecificUser,
        totalDownloads: response.data.totalDownloads,
      });
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  return (
    <React.Fragment>
      <div className="flex w-full flex-row justify-start items-center">
        <button
          className="rounded-full border-2 p-3 h-fit w-fit m-2"
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>
      <div className="text-center mt-0 flex flex-col justify-center items-center">
        <div
          className="h-64 w-64 rounded-full shadow-md"
          style={{
            backgroundImage: `url(${userAvatar})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <h3 className="text-4xl font-bold leading-normal mb-2 text-blueGray-700 mt-10">
          {name}
        </h3>
        <div className="text-sm leading-normal mt-0 mb-2 text-slate-400 font-semibold tracking-wider">
          <i className="fa-solid fa-envelope mr-2 text-lg text-blueGray-400"></i>
          {email}
        </div>
        {userInstitution !== "" ? (
          <div className="text-sm leading-normal mt-0 mb-2 text-slate-400 font-semibold tracking-wider">
            <i className="fa-solid fa-school mr-2 text-lg text-blueGray-400"></i>
            {userInstitution}
          </div>
        ) : null}
        {userDegreeProgram !== "" ? (
          <div className="text-sm leading-normal mt-0 mb-2 text-slate-400 font-semibold tracking-wider">
            <i className="fa-solid fa-user-graduate mr-2 text-lg text-blueGray-400"></i>
            {userDegreeProgram}
          </div>
        ) : null}
        {userAcademicYear !== "" ? (
          <div className="text-sm leading-normal mt-0 mb-2 text-slate-400 font-semibold tracking-wider">
            <i className="fa-regular fa-calendar mr-2 text-lg text-blueGray-400"></i>
            {userAcademicYear}
          </div>
        ) : null}
      </div>
      <div className="w-full flex flex-row justify-center items-center mt-5">
        <div className="grid grid-cols-4 gap-4 w-1/2">
          <UserProfileCardComponent
            name={"Ratings"}
            value={userStatistics.totalRatings}
            icon={"fa-solid fa-star"}
          />
          <UserProfileCardComponent
            name={"Feedbacks"}
            value={userStatistics.totalFeedbacks}
            icon={"fa-solid fa-comments"}
          />
          <UserProfileCardComponent
            name={"Summaries"}
            value={userStatistics.totalSummaries}
            icon={"fa-solid fa-book-open"}
          />
          <UserProfileCardComponent
            name={"Downloads"}
            value={userStatistics.totalDownloads}
            icon={"fa-solid fa-download"}
          />
        </div>
      </div>
      <div className="w-full flex flex-row justify-center items-center mt-10">
        <div className="w-1/2 flex flex-row justify-center items-center">
          <ButtonComponent
            name={"Uploads"}
            handleAction={() => navigate(VIEWS.USER_UPLOADS)}
          />
          <div className="w-10"></div>
          <ButtonComponent
            name={"Downloads"}
            handleAction={() => navigate(VIEWS.USER_DOWNLOADS)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-10 mx-48">
        {mySummariesData.length === 0 ? (
          <h1 className="text-center text-xl text-slate-400 font-bold mt-10">
            There are no summaries posted yet.
          </h1>
        ) : null}
        <h1 className="text-slate-700 font-bold text-2xl mt-20">
          All Summaries Posted
        </h1>
        {mySummariesData
          .map((item: any, index: any) => (
            <SummaryCardComponent
              key={index.toString()}
              summaryId={item._id}
              userName={item.user.name}
              userAvatar={item.user.userAvatar.url}
              postTitle={item.title}
              lectureName={item.lectureName}
              semester={item.semester}
              year={item.year}
              institution={item.subject.institution.name}
              degreeProgram={item.subject.degreeProgram.name}
              academicYear={item.subject.academicYear.name}
              subject={item.subject.name}
              postedDate={item.createdAt}
              fileUrl={item.file.url}
              isSubActionsDisplay={true}
              isActionsDisplay={false}
            />
          ))
          .reverse()}
      </div>
      <div className="h-32"></div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
