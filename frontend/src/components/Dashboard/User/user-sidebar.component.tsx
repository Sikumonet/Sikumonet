import React, { useState } from "react";
import { Link } from "react-router-dom";
import { VIEWS } from "../../../utils/routes";
import logo from "../../../assets/images/logo.svg";

const UserSidebarComponent = () => {
  const [isOpenDashboard, setIsOpenDashboard] = useState(true);
  const [isOpenAllSummaries, setIsOpenAllSummaries] = useState(false);
  const [isOpenMyLibrary, setIsOpenMyLibrary] = useState(false);
  const [isOpenSummariesFeed, setIsOpenSummariesFeed] = useState(false);
  const [isOpenMyProfile, setIsOpenMyProfile] = useState(false);
  const [isOpenMyUploads, setIsOpenMyUploads] = useState(false);
  const [isOpenMyDownloads, setIsOpenMyDownloads] = useState(false);
  const [isOpenRewards, setIsOpenRewards] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const handleChangeTab = (tabName: string) => {
    switch (tabName) {
      case "DASHBOARD":
        setIsOpenDashboard(true);
        setIsOpenAllSummaries(false);
        setIsOpenMyLibrary(false);
        setIsOpenSummariesFeed(false);
        setIsOpenMyProfile(false);
        setIsOpenMyUploads(false);
        setIsOpenMyDownloads(false);
        setIsOpenRewards(false);
        setIsOpenSettings(false);
        break;
      case "ALL_SUMMARIES":
        setIsOpenDashboard(false);
        setIsOpenAllSummaries(true);
        setIsOpenMyLibrary(false);
        setIsOpenSummariesFeed(false);
        setIsOpenMyProfile(false);
        setIsOpenMyUploads(false);
        setIsOpenMyDownloads(false);
        setIsOpenRewards(false);
        setIsOpenSettings(false);
        break;
      case "MY_LIBRARY":
        setIsOpenDashboard(false);
        setIsOpenAllSummaries(false);
        setIsOpenMyLibrary(true);
        setIsOpenSummariesFeed(false);
        setIsOpenMyProfile(false);
        setIsOpenMyUploads(false);
        setIsOpenMyDownloads(false);
        setIsOpenRewards(false);
        setIsOpenSettings(false);
        break;
      case "SUMMARIES_FEED":
        setIsOpenDashboard(false);
        setIsOpenAllSummaries(false);
        setIsOpenMyLibrary(false);
        setIsOpenSummariesFeed(true);
        setIsOpenMyProfile(false);
        setIsOpenMyUploads(false);
        setIsOpenMyDownloads(false);
        setIsOpenRewards(false);
        setIsOpenSettings(false);
        break;
      case "MY_PROFILE":
        setIsOpenDashboard(false);
        setIsOpenAllSummaries(false);
        setIsOpenMyLibrary(false);
        setIsOpenSummariesFeed(false);
        setIsOpenMyProfile(true);
        setIsOpenMyUploads(false);
        setIsOpenMyDownloads(false);
        setIsOpenRewards(false);
        setIsOpenSettings(false);
        break;
      case "MY_UPLOADS":
        setIsOpenDashboard(false);
        setIsOpenAllSummaries(false);
        setIsOpenMyLibrary(false);
        setIsOpenSummariesFeed(false);
        setIsOpenMyProfile(false);
        setIsOpenMyUploads(true);
        setIsOpenMyDownloads(false);
        setIsOpenRewards(false);
        setIsOpenSettings(false);
        break;
      case "MY_DOWNLOADS":
        setIsOpenDashboard(false);
        setIsOpenAllSummaries(false);
        setIsOpenMyLibrary(false);
        setIsOpenSummariesFeed(false);
        setIsOpenMyProfile(false);
        setIsOpenMyUploads(false);
        setIsOpenMyDownloads(true);
        setIsOpenRewards(false);
        setIsOpenSettings(false);
        break;
      case "REWARDS":
        setIsOpenDashboard(false);
        setIsOpenAllSummaries(false);
        setIsOpenMyLibrary(false);
        setIsOpenSummariesFeed(false);
        setIsOpenMyProfile(false);
        setIsOpenMyUploads(false);
        setIsOpenMyDownloads(false);
        setIsOpenRewards(true);
        setIsOpenSettings(false);
        break;
      case "SETTINGS":
        setIsOpenDashboard(false);
        setIsOpenAllSummaries(false);
        setIsOpenMyLibrary(false);
        setIsOpenSummariesFeed(false);
        setIsOpenMyProfile(false);
        setIsOpenMyUploads(false);
        setIsOpenMyDownloads(false);
        setIsOpenRewards(false);
        setIsOpenSettings(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-blue-600 text-white h-screen w-64 py-4 fixed top-0 left-0 z-40">
      <div className="flex flex-col justify-center items-center my-5">
        <img src={logo} alt="" className="w-20 h-auto" />
        <h1 className="text-2xl font-semibold text-center">Sikumonet</h1>
      </div>
      <ul>
        <Link
          to={VIEWS.USER_DASHBOARD}
          onClick={() => handleChangeTab("DASHBOARD")}
        >
          <li
            className={`${
              isOpenDashboard
                ? "bg-slate-700 text-slate-100"
                : "bg-blue-600 hover:blue-800 text-slate-100 hover:text-slate-200"
            } p-4 cursor-pointer`}
          >
            <i className="fa-solid fa-table-columns mr-2"></i> Dashboard
          </li>
        </Link>
        <Link
          to={VIEWS.USER_ALL_INSTITUTIONS}
          onClick={() => handleChangeTab("ALL_SUMMARIES")}
        >
          <li
            className={`${
              isOpenAllSummaries
                ? "bg-slate-700 text-slate-100"
                : "bg-blue-600 hover:blue-800 text-slate-100 hover:text-slate-200"
            } p-4 cursor-pointer`}
          >
            <i className="fa-solid fa-school mr-2"></i> All Summaries
          </li>
        </Link>
        <Link
          to={VIEWS.USER_LIBRARY}
          onClick={() => handleChangeTab("MY_LIBRARY")}
        >
          <li
            className={`${
              isOpenMyLibrary
                ? "bg-slate-700 text-slate-100"
                : "bg-blue-600 hover:blue-800 text-slate-100 hover:text-slate-200"
            } p-4 cursor-pointer`}
          >
            <i className="fa-solid fa-bookmark mr-2"></i> My Library
          </li>
        </Link>
        <Link
          to={VIEWS.USER_SUMMARIES_FEED}
          onClick={() => handleChangeTab("SUMMARIES_FEED")}
        >
          <li
            className={`${
              isOpenSummariesFeed
                ? "bg-slate-700 text-slate-100"
                : "bg-blue-600 hover:blue-800 text-slate-100 hover:text-slate-200"
            } p-4 cursor-pointer`}
          >
            <i className="fa-solid fa-book-open mr-2"></i> Summaries Feed
          </li>
        </Link>
        <Link
          to={VIEWS.USER_PROFILE}
          onClick={() => handleChangeTab("MY_PROFILE")}
        >
          <li
            className={`${
              isOpenMyProfile
                ? "bg-slate-700 text-slate-100"
                : "bg-blue-600 hover:blue-800 text-slate-100 hover:text-slate-200"
            } p-4 cursor-pointer`}
          >
            <i className="fa-solid fa-user mr-2"></i> My Profile
          </li>
        </Link>
        <Link
          to={VIEWS.USER_UPLOADS}
          onClick={() => handleChangeTab("MY_UPLOADS")}
        >
          <li
            className={`${
              isOpenMyUploads
                ? "bg-slate-700 text-slate-100"
                : "bg-blue-600 hover:blue-800 text-slate-100 hover:text-slate-200"
            } p-4 cursor-pointer`}
          >
            <i className="fa-solid fa-upload mr-2"></i> My Uploads
          </li>
        </Link>
        <Link
          to={VIEWS.USER_DOWNLOADS}
          onClick={() => handleChangeTab("MY_DOWNLOADS")}
        >
          <li
            className={`${
              isOpenMyDownloads
                ? "bg-slate-700 text-slate-100"
                : "bg-blue-600 hover:blue-800 text-slate-100 hover:text-slate-200"
            } p-4 cursor-pointer`}
          >
            <i className="fa-solid fa-download mr-2"></i> My Downloads
          </li>
        </Link>
        <Link
          to={VIEWS.USER_REWARDS}
          onClick={() => handleChangeTab("REWARDS")}
        >
          <li
            className={`${
              isOpenRewards
                ? "bg-slate-700 text-slate-100"
                : "bg-blue-600 hover:blue-800 text-slate-100 hover:text-slate-200"
            } p-4 cursor-pointer`}
          >
            <i className="fa-solid fa-gift mr-2"></i> Rewards
          </li>
        </Link>
        <Link
          to={VIEWS.USER_PROFILE_SETTINGS}
          onClick={() => handleChangeTab("SETTINGS")}
        >
          <li
            className={`${
              isOpenSettings
                ? "bg-slate-700 text-slate-100"
                : "bg-blue-600 hover:blue-800 text-slate-100 hover:text-slate-200"
            } p-4 cursor-pointer`}
          >
            <i className="fa-solid fa-gear mr-2"></i> Settings
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default UserSidebarComponent;
