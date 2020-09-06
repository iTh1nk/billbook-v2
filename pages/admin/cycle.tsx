import React, { useState, useReducer, useContext } from "react";
import Admin from "../../components/admin/Admin";
import AdminPanel from "../../components/admin/AdminPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUndo,
  faCircleNotch,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import toasterNotes from "../../components/ToasterNotes";
import DatePicker from "react-datepicker";
import moment from "moment";
import useLoggedIn from "../../components/hooks/useLoggedIn";
import useSWR from "swr";

interface Props {}

type Values = {
  date: string;
};

type AdminCyclesState = {
  tab: string;
  isLoading: boolean;
  error: string;
  success: string;
  date: string;
  amount: string;
  totalBalance: string;
  selectedDate: Date;
};

const initialState: AdminCyclesState = {
  tab: "home",
  isLoading: false,
  error: "",
  success: "",
  date: "",
  amount: "",
  totalBalance: "",
  selectedDate: new Date(),
};

type AdminCyclesAction =
  | { type: "submitting" | "success" | "reset" }
  | { type: "error"; payload: string }
  | { type: "tab"; tabName: string }
  | { type: "field"; fieldName: string; payload: string }
  | { type: "selectDate"; payload: Date };

function adminCyclesReducer(
  state: AdminCyclesState,
  action: AdminCyclesAction
) {
  switch (action.type) {
    case "tab":
      return {
        ...state,
        tab: action.tabName,
      };
    case "selectDate":
      return {
        ...state,
        selectedDate: action.payload,
      };
    case "success":
      return {
        ...state,
        selectedDate: new Date(),
        errors: "",
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    case "reset":
      return {
        ...state,
        error: "",
        selectedDate: new Date(),
      };
  }
}

const Cycle: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [state, dispatch] = useReducer(adminCyclesReducer, initialState);
  const handleChangeDatePicker = (date) => {
    dispatch({ type: "selectDate", payload: date });
  };

  const handleDelete = (id) => {
    Axios.delete(process.env.NEXT_PUBLIC_API + "cycle/delete/" + id + "/", {
      headers: { authorization: localStorage.getItem("auth") },
    })
      .then((resp) => {
        toasterNotes("success", 5000);
      })
      .catch((err) => {
        console.log(err, err.response);
        toasterNotes("error", 5000);
      });
  };

  const fetcher = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "cycles/get/", {
      headers: { authorization: localStorage.getItem("auth") },
    });
    const data = await res.json();
    return data;
  };
  const { data, error } = useSWR("/Cycles/get/", fetcher, {
    refreshInterval: 1000,
  });
  if (error) return <IsError />;
  if (!data) return <IsLoading />;

  return (
    <div>
      <Admin>
        <AdminPanel
          cbTab={(tabName) => dispatch({ type: "tab", tabName: tabName })}
        >
          {/* START - HOME */}
          <div className={state.tab === "home" ? "inline" : "hidden"}>
            {data.length !== 0 ? (
              data.map((item, idx) => (
                <div key={item.id}>
                  <div className=" mt-5">
                    {idx + 1}.{" "}
                    <span className="underline font-bold">{item.date}</span>
                    <FontAwesomeIcon
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="ml-2 text-red-500 cursor-pointer"
                      icon={faTrashAlt}
                    />
                  </div>
                  <ul className="list-disc ml-6">
                    <li>
                      <span className="text-gray-500">is_read:</span>{" "}
                      {item.is_read}
                    </li>
                    <li>
                      <span className="text-gray-500">Created:</span>{" "}
                      {item.createdAt}
                    </li>
                    <li>
                      <span className="text-gray-500">Updated:</span>{" "}
                      {item.updatedAt}
                    </li>
                  </ul>
                </div>
              ))
            ) : (
              <div className="font-mono text-lg animate-pulse">
                No data has been recorded yet...
              </div>
            )}
          </div>
          {/* END - HOME */}

          {/* START - POST */}
          <div className={state.tab === "post" ? "inline" : "hidden"}>
            <div className="mb-5 font-mono font-bold uppercase text-lg italic">
              Make a post:
            </div>
            <Formik
              initialValues={{
                date: "",
              }}
              onSubmit={(
                values: Values,
                { setSubmitting, resetForm }: FormikHelpers<Values>
              ) => {
                let dataToSubmit = {
                  date: moment(state.selectedDate).format("YYYY-MM-DD"),
                };
                console.log(dataToSubmit);
                Axios.post(
                  process.env.NEXT_PUBLIC_API + "cycles/post/",
                  dataToSubmit,
                  { headers: { authorization: localStorage.getItem("auth") } }
                )
                  .then((resp) => {
                    setSubmitting(false);
                    console.log("Posted!");
                    dispatch({ type: "success" });
                    resetForm();
                    toasterNotes("success", 5000);
                  })
                  .catch((err) => {
                    setSubmitting(false);
                    toasterNotes("error", 5000);
                    dispatch({
                      type: "error",
                      payload: err.response.data.date[0],
                    });
                    console.log(err, err.response);
                  });
              }}
            >
              {({
                isSubmitting,
                values,
                touched,
                errors,
                resetForm,
                handleReset,
              }) => (
                <Form className="rounded pb-8 w-full mb-4">
                  <div className="mb-4 w-full">
                    <label
                      className="block uppercase text-gray-300 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Pick Date
                    </label>
                    <DatePicker
                      className="text-gray-800 rounded-sm py-2 px-3 leading-tight"
                      selected={state.selectedDate}
                      onChange={handleChangeDatePicker}
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>

                  <div className="py-3 md:flex md:flex-row-reverse">
                    <span className="mt-3 flex w-full rounded-md shadow-sm md:mt-0 md:w-auto md:ml-3 mb-5 md:mb-0">
                      <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-700 px-4 py-2 bg-gray-600 text-base leading-6 font-medium text-gray-900 shadow-sm hover:text-white focus:outline-none focus:border-gray-400 focus:shadow-outline-blue transition ease-in-out duration-300 md:text-sm md:leading-5"
                        onClick={() => {
                          // handleReset;
                          dispatch({ type: "reset" });
                        }}
                      >
                        Reset
                        <FontAwesomeIcon
                          className="ml-1 mt-1 h-3"
                          icon={faUndo}
                        />
                      </button>
                    </span>
                    <span className="flex w-full rounded-md shadow-sm md:w-auto">
                      <button
                        type="submit"
                        className={
                          (isSubmitting ? " opacity-50 " : "") +
                          "inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-400 focus:outline-none focus:border-gray-400 focus:shadow-outline-orange transition ease-in-out duration-300 md:text-sm md:leading-5"
                        }
                        disabled={isSubmitting}
                      >
                        Submit
                        <div
                          className={
                            isSubmitting ? " animate-spin ml-1" : " hidden "
                          }
                        >
                          <FontAwesomeIcon icon={faCircleNotch} />
                        </div>
                      </button>
                    </span>
                    <br />
                    <span className="text-red-500 ml-5 md:mt-2 md: mr-5">
                      {state.error}
                    </span>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          {/* END - POST */}

          {/* START - UPDATE */}
          <div className={state.tab === "update" ? "inline" : "hidden"}>
            UPDATE
          </div>
          {/* END - UPDATE */}
        </AdminPanel>
      </Admin>
    </div>
  );
};

export default Cycle;
