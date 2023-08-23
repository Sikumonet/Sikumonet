import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputFieldComponent from "../../components/input-field.component";
import ButtonComponent from "../../components/button.component";
import { getAllDegreeProgramsRelatedToInstitution } from "../../API/DegreePrograms/degree-programs-api.service";
import { getAllInstitutions } from "../../API/Institutions/institutions-api.service";
import { getAllAcademicYearsRelatedToDegreeProgram } from "../../API/AcademicYears/academic-years-api.service";
import {
  createSubject,
  getAllSubjects,
} from "../../API/Subjects/subject-api.service";
import SubjectsCardComponent from "../../components/subject-card.component";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";

export default function AdminSubjectAdd() {
  useScrollToTop();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [name, setName] = useState("");
  const [bearToken, setBearToken] = useState("");
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
  const [imageFile, setImageFile] = useState<string | ArrayBuffer | null>(null);
  const [subjectsData, setSubjectsData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setBearToken(token || "");
    handleGetAllSubjects();
    handleGetAllInstitutions();
  }, []);

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

  const handleCreateSubject = async () => {
    try {
      setLoadingSpinner(true);
      const response = await createSubject(
        bearToken,
        name,
        institutionId,
        degreeProgramId,
        academicYearId,
        imageFile
      );
      if (response.success) {
        console.log("createAcademicYear", response.data);
        setName("");
        setSelectedInstitutionValue("");
        setSelectedDegreeProgramValue("");
        setSelectedAcademicYearValue("");
        handleGetAllSubjects();
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

  const handleGetAllSubjects = async () => {
    setLoadingSpinner(true);
    const response = await getAllSubjects();
    if (response.success) {
      console.log("handleGetAllSubjects", response.data);
      setSubjectsData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  return (
    <React.Fragment>
      <h1 className="text-3xl text-slate-700 font-bold">Subjects</h1>
      <div className="rounded-xl bg-slate-100 px-10 py-14 mt-16">
        <h1 className="text-xl text-slate-700 font-bold mb-10">
          Create New Subject
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Select an institution
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
            Select degree programme
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
            Select academic year
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
        <InputFieldComponent
          label="Subject Name"
          type="text"
          placeholder="Enter name here"
          value={name}
          onChange={setName}
        />
        <div className="mt-10">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Upload Subject Image
          </label>
          <input
            onChange={handleImage}
            type="file"
            id="formUpload"
            name="image"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-full flex flex-row justify-start items-center mt-10">
          <div className="w-1/5">
            <ButtonComponent
              name={"Create Subject"}
              handleAction={handleCreateSubject}
            />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <h1 className="text-2xl text-slate-500 font-semibold mb-10">
          All Subjects
        </h1>
        {subjectsData.length === 0 ? (
          <p className="text-slate-400 text-md font-semibold">
            There are no subjects. Please add the first one from above.
          </p>
        ) : null}
        <div className="grid grid-cols-3 gap-4">
          {subjectsData
            .map((item: any, index: any) => (
              <SubjectsCardComponent
                name={item.name}
                imgUrl={item.image.url}
                key={index.toString()}
              />
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
