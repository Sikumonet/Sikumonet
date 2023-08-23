import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputFieldComponent from "../../components/input-field.component";
import ButtonComponent from "../../components/button.component";
import {
  createInstitution,
  getAllInstitutions,
} from "../../API/Institutions/institutions-api.service";
import InstitutionCardComponent from "../../components/institution-card.component";
import { Link } from "react-router-dom";
import { VIEWS } from "../../utils/routes";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";

export default function AdminInstitutionAdd() {
  useScrollToTop();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState<string | ArrayBuffer | null>(null);
  const [bearToken, setBearToken] = useState("");
  const [institutionData, setInstitutionData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setBearToken(token || "");
    handleGetAllInstitutions();
  }, []);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFile(reader.result);
    };
  };

  const handleCreateInstitution = async () => {
    if (name === "") {
      toast.error("Please enter name..!!");
    } else if (location === "") {
      toast.error("Please enter location..!!");
    } else if (imageFile === null) {
      toast.error("Please select image file..!!");
    } else {
      try {
        setLoadingSpinner(true);
        const response = await createInstitution(
          bearToken,
          name,
          location,
          imageFile
        );
        if (response.success) {
          console.log("createInstitution", response.data);
          setName("");
          setLocation("");
          handleGetAllInstitutions();
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

  return (
    <React.Fragment>
      <h1 className="text-3xl text-slate-700 font-bold">Institutions</h1>
      <div className="rounded-xl bg-slate-100 px-10 py-14 mt-16">
        <h1 className="text-xl text-slate-700 font-bold mb-10">
          Create New Institution
        </h1>
        <InputFieldComponent
          label="Institution Name"
          type="text"
          placeholder="Enter name here"
          value={name}
          onChange={setName}
        />
        <InputFieldComponent
          label="Institution Location"
          type="text"
          placeholder="Enter location here"
          value={location}
          onChange={setLocation}
        />
        <div className="mt-10">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Upload Institution Image
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
              name={"Create Institution"}
              handleAction={handleCreateInstitution}
            />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <h1 className="text-2xl text-slate-500 font-semibold mb-10">
          All Institutions
        </h1>
        {institutionData.length === 0 ? (
          <p className="text-slate-400 text-md font-semibold">
            There are no institutions. Please add the first one from above.
          </p>
        ) : null}
        <div className="grid grid-cols-3 gap-4">
          {institutionData
            .map((item: any, index: any) => (
              <Link
                key={index.toString()}
                to={`${VIEWS.ADMIN_INSTITUTIONS_SINGLE}?id=${item._id}`}
                className="cursor-pointer"
              >
                <InstitutionCardComponent
                  name={item.name}
                  location={item.location}
                  imgUrl={item.image.url}
                />
              </Link>
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
