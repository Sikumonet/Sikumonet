import React, { useEffect, useState } from "react";
import summaryPlaceholder from "../../assets/images/summary-placeholder.jpg";
import { arrangeDateTime } from "../../utils/arrange-date";
import { useNavigate } from "react-router-dom";
import { VIEWS } from "../../utils/routes";
import { createFeedback } from "../../API/Feedbacks/feedback-api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonComponent from "../button.component";
import { createRating } from "../../API/Ratings/rating-api.service";
import { createDownload } from "../../API/Downloads/download-api.service";

const SummaryCardComponent = (props: {
  summaryId?: string;
  userName: string;
  userAvatar: string;
  postTitle: string;
  lectureName: string;
  semester: string;
  year: string;
  institution: string;
  degreeProgram: string;
  academicYear: string;
  subject: string;
  postedDate: string;
  fileUrl: string;
  downloadCount: any;
  averageRating: any;
  isSubActionsDisplay?: boolean;
  isActionsDisplay?: boolean;
}) => {
  const navigate = useNavigate();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [bearToken, setBearToken] = useState("");
  const [isFeedbackButtonDisabled, setIsFeedbackButtonDisabled] =
    useState(false);
  const [isRatingButtonDisabled, setIsRatingButtonDisabled] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("accessToken");
    if (user && token) {
      setBearToken(token || "");
    }
  }, []);

  const handleRatingChange = (newRating: any) => {
    setRating(newRating);
  };

  const handleAddRating = async () => {
    if (rating > 0 || rating < 6) {
      try {
        setIsRatingButtonDisabled(true);
        setLoadingSpinner(true);
        const response = await createRating(bearToken, rating, props.summaryId);
        if (response.success) {
          console.log("createRating : ", response.data);
          setFeedback("");
          setLoadingSpinner(false);
          window.location.reload();
        } else {
          setLoadingSpinner(false);
          toast.error(response.error);
        }
      } catch (error: any) {
        setLoadingSpinner(false);
      }
    }
  };

  const handleFeedbackChange = (e: any) => {
    setFeedback(e.target.value);
  };

  const handleAddFeedback = async () => {
    if (feedback === "") {
      toast.error("Please enter your feedback..!!");
    } else {
      try {
        setIsFeedbackButtonDisabled(true);
        setLoadingSpinner(true);
        const response = await createFeedback(
          bearToken,
          feedback,
          props.summaryId
        );
        if (response.success) {
          console.log("createFeedback", response.data);
          setFeedback("");
          setLoadingSpinner(false);
          window.location.reload();
        } else {
          setLoadingSpinner(false);
          toast.error(response.error);
        }
      } catch (error: any) {
        setLoadingSpinner(false);
      }
    }
  };

  const handleDownloadCount = async () => {
    try {
      setLoadingSpinner(true);
      const response = await createDownload(bearToken, props.summaryId || "");
      if (response.success) {
        console.log("createDownload", response.data);
        setLoadingSpinner(false);
      } else {
        setLoadingSpinner(false);
        toast.error(response.error);
      }
    } catch (error: any) {
      setLoadingSpinner(false);
    }
  };

  return (
    <React.Fragment>
      <div className="bg-slate-100 hover:bg-slate-200 rounded-xl p-8 my-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div
              className="w-12 h-12 rounded-full mr-4"
              style={{
                backgroundImage: `url(${props.userAvatar})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">{props.userName}</h3>
              <p className="text-gray-400 text-sm">
                {arrangeDateTime(props.postedDate)}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 text-slate-600 grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-md font-bold">
              Title:{" "}
              <span className="text-slate-500 font-semibold">
                {props.postTitle}
              </span>
            </h2>
            <h2 className="text-md font-bold">
              Lecture Name :{" "}
              <span className="text-slate-500 font-semibold">
                {props.lectureName}
              </span>
            </h2>
            <h2 className="text-md font-bold">
              Semester :{" "}
              <span className="text-slate-500 font-semibold">
                {props.semester}
              </span>
            </h2>
            <h2 className="text-md font-bold">
              Year :{" "}
              <span className="text-slate-500 font-semibold">{props.year}</span>
            </h2>
          </div>
          <div>
            <h2 className="text-md font-bold">
              Institution:{" "}
              <span className="text-slate-500 font-semibold">
                {props.institution}
              </span>
            </h2>
            <h2 className="text-md font-bold">
              Degree :{" "}
              <span className="text-slate-500 font-semibold">
                {props.degreeProgram}
              </span>
            </h2>
            <h2 className="text-md font-bold">
              Academic Year :{" "}
              <span className="text-slate-500 font-semibold">
                {props.academicYear}
              </span>
            </h2>
            <h2 className="text-md font-bold">
              Subject :{" "}
              <span className="text-slate-500 font-semibold">
                {props.subject}
              </span>
            </h2>
          </div>
        </div>
        {/* <div
          className="mt-4 rounded-lg h-64 w-full bg-cover bg-center mb-8"
          style={{
            backgroundImage: `url(${summaryPlaceholder})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        /> */}
        <div className="w-full flex flex-col text-slate-500 mt-14">
          <h2 className="text-md font-semibold">
            <i className="fa-solid fa-arrow-down mr-2"></i> Downloads :
            <span className="text-slate-700 font-bold ml-4">
              {props.downloadCount || 0}
            </span>
          </h2>
          <h2 className="text-md font-semibold">
            <i className="fa-solid fa-star mr-2"></i> Average Rating :
            <span className="text-slate-700 font-bold ml-4">
              {props.averageRating || 0}
            </span>
          </h2>
        </div>
        {props.isSubActionsDisplay ? (
          <div className="flex flex-row justify-start items-start mt-8">
            <button
              title="View Summary"
              className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl mx-2"
              onClick={() =>
                navigate(
                  `${VIEWS.USER_SUMMARY_SINGLE_VIEW}?id=${props.summaryId}`
                )
              }
            >
              <i className="fa-solid fa-eye"></i>
            </button>
            <a
              title="View File"
              className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl mx-2"
              href={props.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        ) : null}
        {props.isActionsDisplay ? (
          <div>
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className={`cursor-pointer ${
                      star <= rating ? "text-orange-400" : "text-gray-400"
                    } text-3xl mr-1`}
                  >
                    ★
                  </span>
                ))}
                <button
                  className="ml-4 flex flex-row justify-center items-center w-full h-14 bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-2xl hover:bg-blue-600 transition duration-300"
                  onClick={handleAddRating}
                  disabled={isRatingButtonDisabled}
                >
                  Send Rating <i className="fa-solid fa-chevron-right ml-3"></i>
                </button>
              </div>
              <button
                onClick={handleDownloadCount}
                className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-full"
              >
                <a href={props.fileUrl} target="_blank" download>
                  Download
                </a>
              </button>
            </div>
            <div className="mt-4">
              <textarea
                className="w-full p-2 border rounded-md"
                placeholder="Add your feedback..."
                value={feedback}
                onChange={handleFeedbackChange}
              />
              <div className=" mt-2 flex flex-row justify-end items-center">
                <div className="w-1/5">
                  <ButtonComponent
                    name={"Add Feedback"}
                    handleAction={handleAddFeedback}
                    isButtonDisabled={isFeedbackButtonDisabled}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default SummaryCardComponent;
