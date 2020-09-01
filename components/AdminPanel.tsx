import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTools,
  faMinus,
  faEdit,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  children: React.ReactNode;
}

const AdminPanel: React.FunctionComponent<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <div className="flex flex-col md:flex-row h-full mt-8">
        <nav className="bg-gray-900 md:w-20 flex-row justify-start md:justify-between flex md:flex-col md:h-screen">
          <div className="md:mt-10 md:mb-10 mt-5 mb-3">
            <a href="#">
              <img
                src="https://randomuser.me/api/portraits/women/76.jpg"
                className="rounded-full w-10 h-10 mb-3 mx-auto inline-block md:block ml-6 md:ml-3"
              />
            </a>
            {/* Small Screen Layout */}
            <div className="mt-10 md:hidden inline">
              <div className="inline-block mb-6 ml-6 md:ml-0">
                <a href="#">
                  <span>
                    <div className="h-5 w-5 text-gray-300 mx-auto hover:text-green-500 ">
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                  </span>
                </a>
              </div>
              <div className="inline-block mb-6 ml-6 md:ml-0">
                <a href="#">
                  <span>
                    <div className="h-5 w-5 text-gray-300 mx-auto hover:text-green-500">
                      <FontAwesomeIcon icon={faEdit} />
                    </div>
                  </span>
                </a>
              </div>
              <div className="inline-block mb-6 ml-6 md:ml-0">
                <a href="#">
                  <span>
                    <div className="h-5 w-5 mx-auto text-gray-300 hover:text-green-500">
                      <FontAwesomeIcon icon={faMinus} />
                    </div>
                  </span>
                </a>
              </div>
              <div className="inline-block  ml-6 md:ml-0">
                <a href="#">
                  <span>
                    <div className="h-5 w-5 text-gray-300 mx-auto hover:text-green-500">
                      <FontAwesomeIcon icon={faTools} />
                    </div>
                  </span>
                </a>
              </div>
            </div>
            {/* Large ScreenLayout */}
            <div className="md:inline mt-10 hidden">
              <ul>
                <li className="mb-6">
                  <a href="#">
                    <span>
                      <div className="h-5 w-5 text-gray-300 mx-auto hover:text-green-500 ">
                        <FontAwesomeIcon icon={faPlus} />
                      </div>
                    </span>
                  </a>
                </li>
                <li className="mb-6">
                  <a href="#">
                    <span>
                      <div className="h-5 w-5 text-gray-300 mx-auto hover:text-green-500">
                        <FontAwesomeIcon icon={faEdit} />
                      </div>
                    </span>
                  </a>
                </li>
                <li className="mb-6">
                  <a href="#">
                    <span>
                      <div className="h-5 w-5 mx-auto text-gray-300 hover:text-green-500">
                        <FontAwesomeIcon icon={faMinus} />
                      </div>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>
                      <div className="h-5 w-5 text-gray-300 mx-auto hover:text-green-500">
                        <FontAwesomeIcon icon={faTools} />
                      </div>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="mb-4">
              <a href="#">
                <span>
                  <svg
                    className="h-5 w-5 text-gray-300 mx-auto hover:text-red-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 4.00894C13.0002 3.45665 12.5527 3.00876 12.0004 3.00854C11.4481 3.00833 11.0002 3.45587 11 4.00815L10.9968 12.0116C10.9966 12.5639 11.4442 13.0118 11.9965 13.012C12.5487 13.0122 12.9966 12.5647 12.9968 12.0124L13 4.00894Z"
                      fill="currentColor"
                    />
                    <path
                      d="M4 12.9917C4 10.7826 4.89541 8.7826 6.34308 7.33488L7.7573 8.7491C6.67155 9.83488 6 11.3349 6 12.9917C6 16.3054 8.68629 18.9917 12 18.9917C15.3137 18.9917 18 16.3054 18 12.9917C18 11.3348 17.3284 9.83482 16.2426 8.74903L17.6568 7.33481C19.1046 8.78253 20 10.7825 20 12.9917C20 17.41 16.4183 20.9917 12 20.9917C7.58172 20.9917 4 17.41 4 12.9917Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </a>
            </div> */}
        </nav>
        <div className="px-6 md:px-12 py-5 md:py-8 bg-gray-800 h-screen md:w-screen mb-10 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
