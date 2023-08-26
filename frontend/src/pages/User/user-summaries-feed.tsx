import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
import { getAllSummaries } from "../../API/Summaries/summary-api.service";
import SummaryCardComponent from "../../components/Dashboard/summary-card.component";
import { getSingleUser } from "../../API/User/user-api.service";

export default function UserSummariesFeed() {
  useScrollToTop();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [summariesData, setSummariesData] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("accessToken");
    if (user && token) {
      handleGetSingleUser(JSON.parse(user).id);
    }
  }, []);

  const handleGetSingleUser = async (userId: string) => {
    setLoadingSpinner(true);
    const response = await getSingleUser(userId);
    if (response.success) {
      await handleGetAllSummaries(
        response.data?.institution?.name || "",
        response.data?.academicYear?.yearValue || ""
      );
      console.log(response.data?.institution?.name || "");
      console.log(response.data?.academicYear?.yearValue || "");
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleGetAllSummaries = async (
    userInstitution: string,
    userAcademicYear: string
  ) => {
    setLoadingSpinner(true);
    const response = await getAllSummaries();
    if (response.success) {
      const filteredData = response.data.filter((item: any) => {
        return (
          item.subject?.institution?.name === userInstitution &&
          item.subject?.academicYear?.yearValue === userAcademicYear
        );
      });
      setSummariesData(filteredData || []);
      console.log("filteredData : ", filteredData);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  return (
    <React.Fragment>
      <h1 className="text-3xl text-slate-700 font-bold">Summaries Feed</h1>
      <div className="grid grid-cols-1 gap-5 mt-20 mx-0 sm:mx-10 xl:mx-48">
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
