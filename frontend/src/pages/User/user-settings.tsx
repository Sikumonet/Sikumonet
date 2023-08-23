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

export default function UserSettings() {
  useScrollToTop();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [userInstitution, setUserInstitution] = useState("");
  const [userDegreeProgram, setDegreeProgram] = useState("");
  const [userAcademicYear, setAcademicYear] = useState("");

  const [userAvatar, setUserAvatar] = useState("");
  const [imageFile, setImageFile] = useState<string | ArrayBuffer | null>(null);
  const [bearToken, setBearToken] = useState("");
  const [userId, setUserId] = useState("");

  const [institutionData, setInstitutionData] = useState([]);
  const [institutionId, setInstitutionId] = useState("");
  const [selectedInstitutionValue, setSelectedInstitutionValue] = useState("");
  const [degreeProgramsData, setDegreeProgramsData] = useState([]);
  const [selectedDegreeProgramValue, setSelectedDegreeProgramValue] =
    useState("");
  const [degreeProgramId, setDegreeProgramId] = useState("");
  const [academicYearsData, setAcademicYearsData] = useState([]);
  const [selectedAcademicYearValue, setSelectedAcademicYearValue] =
    useState("");
  const [academicYearId, setAcademicYearId] = useState("");
  const [selectedFileValue, setSelectedFileValue] = useState("");
  const [subjectsData, setSubjectsData] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("accessToken");
    if (user && token) {
      setUserId(JSON.parse(user).id);
      handleGetAllInstitutions();
      handleGetSingleUser(JSON.parse(user).id);
    }
  }, []);

  const handleGetSingleUser = async (userId: string) => {
    setLoadingSpinner(true);
    const response = await getSingleUser(userId);
    if (response.success) {
      console.log(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setUserAvatar(response.data.userAvatar?.url || "");
      setUserInstitution(response.data.institution?.name || "");
      setDegreeProgram(response.data.degreeProgramme?.name || "");
      setAcademicYear(response.data.academicYear?.name || "");
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleGetAllInstitutions = async () => {
    setLoadingSpinner(true);
    const response = await getAllInstitutions();
    if (response.success) {
      console.log(response.data);
      setInstitutionData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleGetAllDegreeProgramsRelatedToInstitution = async (
    institutionId: string
  ) => {
    setLoadingSpinner(true);
    const response = await getAllDegreeProgramsRelatedToInstitution(
      institutionId
    );
    if (response.success) {
      console.log("getAllDegreeProgramsRelatedToInstitution", response.data);
      setDegreeProgramsData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleGetAllAcademicYearsRelatedToDegreeProgram = async (
    degreeProgramId: string
  ) => {
    setLoadingSpinner(true);
    const response = await getAllAcademicYearsRelatedToDegreeProgram(
      degreeProgramId
    );
    if (response.success) {
      console.log("getAllAcademicYearsRelatedToDegreeProgram", response.data);
      setAcademicYearsData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleSelectChangeInstitutions = (event: any) => {
    setDegreeProgramsData([]);
    setSelectedDegreeProgramValue("");
    setAcademicYearsData([]);
    setSelectedAcademicYearValue("");
    const selectedInstitutionId = event.target.value;
    setSelectedInstitutionValue(selectedInstitutionId);
    setInstitutionId(selectedInstitutionId);
    handleGetAllDegreeProgramsRelatedToInstitution(selectedInstitutionId);
  };

  const handleSelectChangeDegreePrograms = (event: any) => {
    setAcademicYearsData([]);
    setSelectedAcademicYearValue("");
    const selectedDegreeProgramId = event.target.value;
    setSelectedDegreeProgramValue(selectedDegreeProgramId);
    setDegreeProgramId(selectedDegreeProgramId);
    handleGetAllAcademicYearsRelatedToDegreeProgram(selectedDegreeProgramId);
  };

  const handleSelectChangeAcademicYears = (event: any) => {
    const selectedAcademicYearId = event.target.value;
    console.log(selectedAcademicYearId);
    setSelectedAcademicYearValue(selectedAcademicYearId);
    setAcademicYearId(selectedAcademicYearId);
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFile(reader.result);
    };
  };

  const handleUpdateUserDetails = async () => {
    try {
      setLoadingSpinner(true);
      const dataToUpdate: IUserData = {};
      if (name) {
        dataToUpdate.name = name;
      }
      if (institutionId) {
        dataToUpdate.institution = institutionId;
      }
      if (degreeProgramId) {
        dataToUpdate.degreeProgramme = degreeProgramId;
      }
      if (academicYearId) {
        dataToUpdate.academicYear = academicYearId;
      }
      if (userAvatar) {
        dataToUpdate.userAvatar = imageFile;
      }
      console.log("dataToUpdate : ", dataToUpdate);
      const response = await updateSingleUser(bearToken, userId, dataToUpdate);
      if (response.success) {
        console.log("updateSingleUser", response.data);
        handleGetSingleUser(userId);
        setName("");
        setEmail("");
        setInstitutionId("");
        setDegreeProgramId("");
        setAcademicYearId("");
        setLoadingSpinner(false);
        window.location.reload();
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
      <h1 className="text-3xl text-slate-700 font-bold">Settings</h1>
      <div className="rounded-xl bg-slate-100 px-10 py-14 mt-16">
        <h1 className="text-xl text-slate-700 font-bold mb-10">
          Update My Profile Details
        </h1>
        <div className="w-full flex flex-col justify-center items-center my-5">
          <div
            className="h-64 w-64 rounded-full shadow-md items-center justify-center"
            style={{
              backgroundImage: `url(${userAvatar})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <InputFieldComponent
          label="Display Name"
          type="text"
          placeholder="Enter name here"
          value={name || ""}
          onChange={setName}
        />
        <InputFieldComponent
          label="Email"
          type="email"
          placeholder="Current email"
          value={email}
          onChange={setEmail}
          disabled={true}
        />
        <div className="my-10">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Profile Image
          </label>
          <input
            onChange={handleImage}
            type="file"
            id="formUpload"
            name="image"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Institution - {userInstitution}
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            name="inputField"
            onChange={handleSelectChangeInstitutions}
            value={selectedInstitutionValue}
          >
            <option value="" disabled={true}>
              Select an institution
            </option>
            {institutionData.map((item: any) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Degree Programme - {userDegreeProgram}
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            name="inputField"
            onChange={handleSelectChangeDegreePrograms}
            value={selectedDegreeProgramValue}
          >
            <option value="" disabled={true}>
              Select degree programme
            </option>
            {degreeProgramsData.map((item: any) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Academic Year - {userAcademicYear}
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            name="inputField"
            onChange={handleSelectChangeAcademicYears}
            value={selectedAcademicYearValue}
          >
            <option value="" disabled={true}>
              Select academic year
            </option>
            {academicYearsData.map((item: any) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex flex-row justify-start items-center mt-10">
          <div className="w-1/5">
            <ButtonComponent
              name={"Update Details"}
              handleAction={handleUpdateUserDetails}
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
