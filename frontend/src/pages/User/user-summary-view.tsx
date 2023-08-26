import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
import { useLocation, useNavigate } from "react-router-dom";
import { getSingleSummary } from "../../API/Summaries/summary-api.service";
import SummaryCardComponent from "../../components/Dashboard/summary-card.component";
import { getAllFeedbacksRelatedToSummary } from "../../API/Feedbacks/feedback-api.service";
import { getAllRatingsRelatedToSummary } from "../../API/Ratings/rating-api.service";

export default function UserSummaryView() {
  useScrollToTop();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [bearToken, setBearToken] = useState("");
  const [summaryData, setSummaryData] = useState({
    _id: "",
    title: "",
    lectureName: "",
    semester: "",
    year: "",
    institution: "",
    degreeProgram: "",
    academicYear: "",
    subject: "",
    userId: "",
    userName: "",
    userAvatar: "",
    postedDate: "",
    fileUrl: "",
  });
  const [loggedInUserId, setLoggedInUser] = useState("");
  const [feedbacksData, setFeedbacksData] = useState([]);
  const [ratingsData, setRatingsData] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("accessToken");
    if (user && token) {
      setLoggedInUser(JSON.parse(user).id);
      setBearToken(token || "");
    }
    handleSingleSummaryDetails(String(id));
    handleGetAllFeedbacksRelatedToSummary(String(id));
    handleGetAllRatingsRelatedToSummary(String(id));
  }, []);

  const handleSingleSummaryDetails = async (summaryId: string) => {
    setLoadingSpinner(true);
    const response = await getSingleSummary(summaryId);
    if (response.success) {
      console.log("getSingleSummary : ", response.data);
      setSummaryData({
        _id: response.data._id,
        title: response.data.title,
        lectureName: response.data.lectureName,
        semester: response.data.semester,
        year: response.data.year,
        institution: response.data.subject.institution.name,
        degreeProgram: response.data.subject.degreeProgram.name,
        academicYear: response.data.subject.academicYear.name,
        subject: response.data.subject.name,
        userId: response.data.user._id,
        userName: response.data.user.name,
        userAvatar: response.data.user.userAvatar.url,
        postedDate: response.data.createdAt,
        fileUrl: response.data.file.url,
      });
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleGetAllFeedbacksRelatedToSummary = async (summaryId: string) => {
    setLoadingSpinner(true);
    const response = await getAllFeedbacksRelatedToSummary(summaryId);
    if (response.success) {
      console.log("getAllFeedbacksRelatedToSummary : ", response.data);
      setFeedbacksData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleGetAllRatingsRelatedToSummary = async (summaryId: string) => {
    setLoadingSpinner(true);
    const response = await getAllRatingsRelatedToSummary(summaryId);
    if (response.success) {
      console.log("getAllRatingsRelatedToSummary : ", response.data);
      setRatingsData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-row justify-start items-center">
        <button
          className="rounded-full border-2 p-3 h-fit w-fit m-2"
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1 className="text-3xl text-slate-700 font-bold ml-4">
          {summaryData.title}
        </h1>
      </div>
      <SummaryCardComponent
        userName={summaryData.userName}
        summaryId={summaryData._id}
        userAvatar={summaryData.userAvatar}
        postTitle={summaryData.title}
        lectureName={summaryData.lectureName}
        semester={summaryData.semester}
        year={summaryData.year}
        institution={summaryData.institution}
        degreeProgram={summaryData.degreeProgram}
        academicYear={summaryData.academicYear}
        subject={summaryData.subject}
        postedDate={summaryData.postedDate}
        isActionsDisplay={summaryData.userId === loggedInUserId ? false : true}
        fileUrl={summaryData.fileUrl}
      />
      <div className="w-full grid grid-cols-2 gap-4 mt-20">
        <div className="rounded-xl bg-slate-100 h-fit p-5">
          <h1 className="text-xl text-slate-700 font-bold mb-10">Ratings</h1>
          {ratingsData
            .map((item: any, index: any) => (
              <div className="my-3 py-4 px-5 flex flex-row justify-start items-center w-full bg-slate-200 rounded-xl hover:bg-slate-300">
                <div
                  className="h-12 w-12 rounded-full shadow-md"
                  style={{
                    backgroundImage: `url(${item.user.userAvatar.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="flex flex-col item-start justify-center ml-5">
                  <p className="text-slate-800 font-bold text-sm">
                    {item.user.name}
                  </p>
                  <p className="text-slate-500 font-normal text-md">
                    <div className="flex items-center">
                      {Array.from({ length: item.rating }, (_, index) => (
                        <span key={index} className="text-yellow-500 text-lg">
                          ★
                        </span>
                      ))}
                    </div>
                  </p>
                </div>
              </div>
            ))
            .reverse()}
        </div>
        <div className="rounded-xl bg-slate-100 h-fit p-5">
          <h1 className="text-xl text-slate-700 font-bold mb-10">Feedbacks</h1>
          {feedbacksData
            .map((item: any, index: any) => (
              <div className="my-3 py-4 px-5 flex flex-row justify-start items-center w-full bg-slate-200 rounded-xl hover:bg-slate-300">
                <div
                  className="h-12 w-12 rounded-full shadow-md"
                  style={{
                    backgroundImage: `url(${item.user.userAvatar.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="flex flex-col item-start justify-center ml-5">
                  <p className="text-slate-800 font-bold text-sm">
                    {item.user.name}
                  </p>
                  <p className="text-slate-500 font-normal text-md">
                    {item.content}
                  </p>
                </div>
              </div>
            ))
            .reverse()}
        </div>
      </div>
      <div className="h-32"></div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
