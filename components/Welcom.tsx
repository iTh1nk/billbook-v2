import React, { useState } from "react";
import { Modal } from "./Modal";

interface WelcomeProps {
  isModal: boolean;
  cb: (e: any) => void;
};

export const Welcome: React.FunctionComponent<WelcomeProps> = (props) => {
  return (
    <Modal
      title=""
      isModal={props.isModal}
      isNotConfirmBtn={true}
      isNotCancelBtn={true}
      cbIsModal={props.cb}
    >
      <div className="md:flex-row md:items-center md:justify-between md:p-12 flex flex-col items-center py-6 h-auto bg-purple-700 shadow-2xl rounded-md">
        <div className="">
          <img
            className="w-32 h-32 mb-12 md:mb-0"
            src="/welcome.png"
            alt="Welcome Image"
          />
        </div>
        <div className="mb-12 md:mb-0 text-green-300 text-xl">
          Logged in successfully
        </div>
        <div>
          <button
            className="bg-purple-800 py-2 px-10 rounded-md transition duration-500 ease-in-out hover:bg-purple-500 hover:text-black outline-none"
            onClick={props.cb}
          >
            Got it!
          </button>
        </div>
      </div>
    </Modal>
  );
};