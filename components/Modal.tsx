/*
 * Created(Updated) on Wed Aug 19 2020
 *
 * Copyright (c) 2020 We0mmm
 */

import React, { useState } from "react";

interface ModalProps {
  isModal: boolean;
  cbIsModal: (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  title: string;
  children: React.ReactNode;
  isNotConfirmBtn?: boolean;
  isNotCancelBtn?: boolean;
  isNotClose?: boolean;
};

export const Modal: React.FunctionComponent<ModalProps> = (props) => {
  return (
    <div
      className={
        (props.isModal
          ? " duration-500 opacity-100 "
          : " duration-300 opacity-0 invisible ") + "flex justify-center z-10"
      }
    >
      <div
        onClick={props.isNotClose ? null : props.cbIsModal}
        className="bg-gray-900 w-full h-full fixed bg-opacity-95"
      ></div>

      <div className="absolute w-10/12 md:w-2/4 mt-16 rounded-lg p-2">
        <div className=" font-bold mb-6 text-xl">{props.title}</div>
        <div className="overflow-scroll h-full mb-6 text-gray-400">
          {/* {props.title === "Login" ? (
            <Login />
          ) : (
            props.content || "Place Modal Body Here."
          )} */}
          {props.children}
        </div>
        <div>
          <div className="py-3 sm:flex sm:flex-row-reverse">
            {props.isNotCancelBtn ? null : (
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto sm:ml-3 mb-5 md:mb-0">
                <button
                  onClick={props.cbIsModal}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-700 px-4 py-2 bg-gray-600 text-base leading-6 font-medium text-gray-900 shadow-sm transition duration-500 ease-in-out hover:text-white focus:outline-none focus:border-orange-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Cancel
                </button>
              </span>
            )}
            {props.isNotConfirmBtn ? null : (
              <span className="flex w-full rounded-md shadow-sm sm:w-auto">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm transition duration-500 ease-in-out  hover:bg-orange-500 focus:outline-none focus:border-orange-300 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Confirm
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};