import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VIEWS } from "../utils/routes";
import { getLoggedInUser } from "../API/Auth/auth-api.service";

export default function TopNavbarComponent(props: {
  btnName?: string;
  btnAction?: any;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
    }
  }, []);

  return (
    <div>
      <nav className="fixed top-0 left-0 z-50 w-full bg-blue-700">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <Link to={VIEWS.HOME} className="flex items-center">
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
              Sikumonet
            </span>
          </Link>
          <div className="flex md:order-2">
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0 md:mr-8">
                <li>
                  <Link
                    to={VIEWS.HOME}
                    className="block py-2 pl-2 pr-4 text-gray-50 hover:text-gray-100"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={VIEWS.USER_UPLOADS}
                    className="block py-2 pl-2 pr-4 text-gray-50 hover:text-gray-100"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    to={VIEWS.USER_PROFILE}
                    className="block py-2 pl-2 pr-4 text-gray-50 hover:text-gray-100"
                  >
                    Rating
                  </Link>
                </li>
              </ul>
            </div>
            <button
              onClick={props.btnAction}
              type="button"
              className="flex flex-row justify-start items-center bg-slate-50 hover:bg-slate-100 text-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 font-bold"
            >
              {props.btnName}
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          ></div>
        </div>
      </nav>
    </div>
  );
}
