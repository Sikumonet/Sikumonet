import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSingleSubject } from "../../API/Subjects/subject-api.service";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
import ButtonComponent from "../../components/button.component";
import InputFieldComponent from "../../components/input-field.component";
import {
  createSummary,
  getAllSummariesRelatedToSubject,
} from "../../API/Summaries/summary-api.service";
import { createLibrary } from "../../API/Library/library-api.service";
import axios from "axios";
import SummaryCardComponent from "../../components/Dashboard/summary-card.component";
import { VIEWS } from "../../utils/routes";

export default function UserSubjectView() {
  useScrollToTop();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [bearToken, setBearToken] = useState("");
  const [subjectData, setSubjectData] = useState({
    name: "",
    image: "",
  });
  const [subject, setSubject] = useState("");
  const [summariesData, setSummariesData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setBearToken(token || "");
    setSubject(String(id));
    handleSingleSubjectDetails(String(id));
    handleGetAllSummariesRelatedToUser(String(id));
  }, []);

  const handleSingleSubjectDetails = async (subjectId: string) => {
    setLoadingSpinner(true);
    const response = await getSingleSubject(subjectId);
    if (response.success) {
      console.log("getSingleSubject", response.data);
      setSubjectData({
        name: response.data.name,
        image: response.data.image.url,
      });
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      setLoadingSpinner(true);
      const response = await createLibrary(bearToken, String(id));
      if (response.success) {
        console.log("createLibrary", response.data);
        setLoadingSpinner(false);
        toast.success("Added library successfully");
      } else {
        setLoadingSpinner(false);
        toast.error(response.error);
      }
    } catch (error: any) {
      setLoadingSpinner(false);
    }
  };

  const handleGetAllSummariesRelatedToUser = async (subjectId: string) => {
    setLoadingSpinner(true);
    const response = await getAllSummariesRelatedToSubject(subjectId);
    if (response.success) {
      console.log("getAllSummariesRelatedToSubject : ", response.data);
      setSummariesData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between h-64 items-center">
          <div className="flex flex-row items-center">
            <button
              className="rounded-full border-2 p-3 h-fit w-fit m-2"
              onClick={() => navigate(-1)}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div className="flex flex-row items-center ml-4">
              <h1 className="text-3xl text-slate-700 font-bold">
                {subjectData.name}
              </h1>
              <button
                onClick={() => handleAddToFavorites()}
                className="ml-5 bg-slate-300 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
              >
                <i className="fa-regular fa-heart"></i>
              </button>
            </div>
          </div>
          <div
            className="h-48 w-48 rounded-full shadow-lg"
            style={{
              backgroundImage: `url(${subjectData.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        <div className="w-full flex flex-row justify-end mt-10">
          <div className="w-1/5">
            <ButtonComponent
              name={"Add New Summary"}
              handleAction={() =>
                navigate(`${VIEWS.USER_SUMMARY_SINGLE_ADD}?id=${String(id)}`)
              }
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-10 mx-48">
        {summariesData.length === 0 ? (
          <h1 className="text-center text-xl text-slate-400 font-bold mt-10">
            There are no summaries posted yet.
          </h1>
        ) : null}
        <h1 className="text-slate-700 font-bold text-2xl mt-20">
          All Summaries Posted Under the {subjectData.name} Subject
        </h1>
        {summariesData
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
              downloadCount={item.downloadCount}
              averageRating={item.averageRating}
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
