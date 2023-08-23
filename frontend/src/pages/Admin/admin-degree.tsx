import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputFieldComponent from "../../components/input-field.component";
import ButtonComponent from "../../components/button.component";
import { getAllInstitutions } from "../../API/Institutions/institutions-api.service";
import {
  createDegreeProgram,
  getAllDegreePrograms,
} from "../../API/DegreePrograms/degree-programs-api.service";
import DegreeProgrammeCardComponent from "../../components/degree-programme-card.component";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";

export default function AdminDegreeAdd() {
  useScrollToTop();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<string | ArrayBuffer | null>(null);
  const [bearToken, setBearToken] = useState("");
  const [institutionData, setInstitutionData] = useState([]);
  const [institutionId, setInstitutionId] = useState("");
  const [degreeProgramsData, setDegreeProgramsData] = useState([]);
  const [selectedInstitutionValue, setSelectedInstitutionValue] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setBearToken(token || "");
    handleGetAllInstitutions();
    handleGetDegreePrograms();
  }, []);

  const handleSelectChangeInstitutions = (event: any) => {
    const selectedInstitutionId = event.target.value;
    setInstitutionId(selectedInstitutionId);
    setSelectedInstitutionValue(selectedInstitutionId);
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

  const handleCreateDegreeProgram = async () => {
    if (name === "") {
      toast.error("Please enter name..!!");
    } else if (institutionId === "") {
      toast.error("Please enter location..!!");
    } else if (imageFile === "") {
      toast.error("Please select image file..!!");
    } else {
      try {
        setLoadingSpinner(true);
        const response = await createDegreeProgram(
          bearToken,
          name,
          institutionId,
          imageFile
        );
        if (response.success) {
          console.log("createInstitution", response.data);
          setName("");
          setSelectedInstitutionValue("");
          handleGetDegreePrograms();
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

  const handleGetDegreePrograms = async () => {
    setLoadingSpinner(true);
    const response = await getAllDegreePrograms();
    if (response.success) {
      console.log(response.data);
      setDegreeProgramsData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  return (
    <React.Fragment>
      <h1 className="text-3xl text-slate-700 font-bold">Degree Programs</h1>
      <div className="rounded-xl bg-slate-100 px-10 py-14 mt-16">
        <h1 className="text-xl text-slate-700 font-bold mb-10">
          Create New Degree Program
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Select an Institution
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
            {institutionData.map((institution: any) => (
              <option key={institution._id} value={institution._id}>
                {institution.name}
              </option>
            ))}
          </select>
        </div>
        <InputFieldComponent
          label="Degree Program Name"
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
            Upload Degree Program Image
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
              name={"Create Degree Program"}
              handleAction={handleCreateDegreeProgram}
            />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <h1 className="text-2xl text-slate-500 font-semibold mb-10">
          All Degree Programs
        </h1>
        {degreeProgramsData.length === 0 ? (
          <p className="text-slate-400 text-md font-semibold">
            There are no degree programs. Please add the first one from above.
          </p>
        ) : null}
        <div className="grid grid-cols-3 gap-4">
          {degreeProgramsData
            .map((item: any, index: any) => (
              <DegreeProgrammeCardComponent
                name={item.name}
                institution={item.institution.name}
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
