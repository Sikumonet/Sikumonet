import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
import ButtonComponent from "../../components/button.component";
import InputFieldComponent from "../../components/input-field.component";
import {
  getSingleUser,
  updateSingleUser,
} from "../../API/User/user-api.service";
import { IUserData } from "../../common/types/user-data.interface";
import { getAllDegreeProgramsRelatedToInstitution } from "../../API/DegreePrograms/degree-programs-api.service";
import { getAllAcademicYearsRelatedToDegreeProgram } from "../../API/AcademicYears/academic-years-api.service";
import { getAllInstitutions } from "../../API/Institutions/institutions-api.service";
import DashboardCardComponent from "../../components/Dashboard/shared/dashboard-card.component";
import { getRewardRelatedToUser } from "../../API/Reward/rewards-api.service";
import RewardCardComponent from "../../components/Dashboard/User/reward-caard.component";

export default function UserRewards() {
  useScrollToTop();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [rewardStatistics, setRewardStatistics] = useState({
    totalScore: 0,
    ratingScore: 0,
    downloadScore: 0,
    feedbackScore: 0,
  });
  const [bearToken, setBearToken] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("accessToken");
    if (user && token) {
      handleGetUserStatistics(token);
    }
  }, []);

  const handleGetUserStatistics = async (token: string) => {
    setLoadingSpinner(true);
    const response = await getRewardRelatedToUser(token);
    if (response.success) {
      console.log(response.data);
      setRewardStatistics({
        totalScore: response.data.totalScore,
        ratingScore: response.data.ratingScore,
        downloadScore: response.data.downloadScore,
        feedbackScore: response.data.feedbackScore,
      });
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  return (
    <React.Fragment>
      <h1 className="text-3xl text-slate-700 font-bold">Rewards</h1>
      <div className="container mx-auto mt-12 mb-32">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCardComponent
            title={"Total Score"}
            value={rewardStatistics.totalScore}
            icon={"fa-solid fa-gift"}
          />
          <DashboardCardComponent
            title={"Rating Score"}
            value={rewardStatistics.ratingScore}
            icon={"fa-solid fa-star"}
          />
          <DashboardCardComponent
            title={"Download Score"}
            value={rewardStatistics.downloadScore}
            icon={"fa-solid fa-download"}
          />
          <DashboardCardComponent
            title={"Feedback Score"}
            value={rewardStatistics.feedbackScore}
            icon={"fa-solid fa-comments"}
          />
        </div>
        <div className="flex justify-center items-center mt-32">
          <div className="grid grid-cols-3 gap-4">
            <RewardCardComponent
              name={"10% Off"}
              image={
                "https://insanelygoodrecipes.com/wp-content/uploads/2020/07/Cup-Of-Creamy-Coffee-500x375.png"
              }
              description={"On Your Next Coffee"}
            />
            <RewardCardComponent
              name={"1 Coffee Free"}
              image={
                "https://www.manilaonsale.com/wp-content/uploads/2021/08/Seattles-Best-Promo-2021-Poster-800x800.jpg"
              }
              description={"Enjoy a Complimentary Coffee of Your Choice"}
            />
            <RewardCardComponent
              name={"1 Croissant Free"}
              image={
                "https://cdn.shopify.com/s/files/1/0555/6702/4300/files/pastries-and-coffee-for-breakfast_480x480.jpg"
              }
              description={"Savor a Delicious Croissant on the House"}
            />
          </div>
        </div>
      </div>
      <div className="h-32"></div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
