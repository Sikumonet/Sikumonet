import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getSingleSubject } from "../../API/Subjects/subject-api.service";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
import ButtonComponent from "../../components/button.component";
import InputFieldComponent from "../../components/input-field.component";
import { createSummary } from "../../API/Summaries/summary-api.service";
import { createLibrary } from "../../API/Library/library-api.service";
import axios from "axios";

export default function UserSummaryAdd() {
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
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setBearToken(token || "");
    setSubject(String(id));
    handleSingleSubjectDetails(String(id));
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

  //Handling the file uploading and creating the summary goes here
  const handleSelectFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleCreateSummary = async () => {
    if (title === "") {
      toast.error("Please enter title..!!");
    } else if (lectureName === "") {
      toast.error("Please enter lectureName..!!");
    } else if (semester === "") {
      toast.error("Please enter semester..!!");
    } else if (year === "") {
      toast.error("Please enter year..!!");
    } else if (file === null) {
      toast.error("Please select PDF file..!!");
    } else {
      try {
        setLoadingSpinner(true);
        const data = new FormData();
        if (file) {
          data.append("file", file);
        }
        if (title) {
          data.append("title", title);
        }
        if (subject) {
          data.append("subject", subject);
        }
        if (lectureName) {
          data.append("lectureName", lectureName);
        }
        if (semester) {
          data.append("semester", semester);
        }
        if (year) {
          data.append("year", year);
        }

        const response = await createSummary(bearToken, data);
        if (response.success) {
          console.log("createSummary", response.data);
          setTitle("");
          setLectureName("");
          setSemester("");
          setYear("");
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

  return (
    <React.Fragment>
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
              Add New Summary For {subjectData.name}
            </h1>
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
      <form>
        <div className="rounded-xl bg-slate-100 px-10 py-14 mt-16">
          <h1 className="text-xl text-slate-700 font-bold mb-10">
            Upload a New Summary
          </h1>
          <InputFieldComponent
            label="Summary Title"
            type="text"
            placeholder="Enter title here"
            value={title}
            onChange={setTitle}
          />
          <InputFieldComponent
            label="Lecture Name"
            type="text"
            placeholder="Enter lecture name here"
            value={lectureName}
            onChange={setLectureName}
          />
          <InputFieldComponent
            label="Semester"
            type="text"
            placeholder="Enter semester here"
            value={semester}
            onChange={setSemester}
          />
          <InputFieldComponent
            label="Year"
            type="text"
            placeholder="Enter year here"
            value={year}
            onChange={setYear}
          />
          <div className="mt-10">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="inputField"
            >
              Upload Summary File
            </label>
            <input
              onChange={handleSelectFile}
              type="file"
              id="formUpload"
              name="image"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="w-full flex flex-row justify-start items-center mt-10">
            <div className="w-1/5">
              <ButtonComponent
                name={"Upload Summary"}
                handleAction={handleCreateSummary}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="h-32"></div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
