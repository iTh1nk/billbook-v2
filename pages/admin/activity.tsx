import React, { useState, useReducer } from "react";
import Admin from "../../components/Admin";
import AdminPanel from "../../components/AdminPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import toasterNotes from "../../components/ToasterNotes";
import DatePicker from "react-datepicker";

interface Props {}

type Values = {
  date: string;
  amount: string;
  totalBalance: string;
};

type AdminActivitiesState = {
  tab: string;
  isLoading: boolean;
  error: string;
  success: string;
  date: string;
  amount: string;
  totalBalance: string;
};

const initialState: AdminActivitiesState = {
  tab: "post",
  isLoading: false,
  error: "",
  success: "",
  date: "",
  amount: "",
  totalBalance: "",
};

type AdminActivitiesAction =
  | { type: "submitting" | "success" }
  | { type: "error"; payload: string }
  | { type: "tab"; tabName: string }
  | { type: "field"; fieldName: string; payload: string };

function adminActivitiesReducer(
  state: AdminActivitiesState,
  action: AdminActivitiesAction
) {
  switch (action.type) {
    case "tab":
      return {
        ...state,
        tab: action.tabName,
      };
  }
}

const Activity: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [state, dispatch] = useReducer(adminActivitiesReducer, initialState);

  return (
    <div>
      <Admin>
        <AdminPanel
          cbTab={(tabName) => dispatch({ type: "tab", tabName: tabName })}
        >
          {/* START - POST */}
          <div className={state.tab === "post" ? "inline" : "hidden"}>
            <div className="mb-5 font-mono font-bold uppercase text-lg italic">
              Make a post:
            </div>
            <Formik
              initialValues={{
                date: "",
                amount: "",
                totalBalance: "",
              }}
              validationSchema={Yup.object().shape({
                date: Yup.string()
                  .min(3, "Username is too short")
                  .required("Username is required"),
                amount: Yup.string()
                  .min(5, "Password is too short")
                  .max(50, "Password is too long")
                  .required("Password is required"),
                totalBalance: Yup.string()
                  .min(3, "First name is too short")
                  .max(10, "First name is too long")
                  .required("First name is required"),
              })}
              onSubmit={(
                values: Values,
                { setSubmitting, resetForm }: FormikHelpers<Values>
              ) => {
                let dataToSubmit = {
                  date: values.date,
                  amount: values.amount,
                  totalBalance: values.totalBalance,
                };
                console.log(dataToSubmit);
                Axios.post(
                  process.env.NEXT_PUBLIC_API + "activities/post/",
                  dataToSubmit,
                  { headers: { authorization: localStorage.getItem("auth") } }
                )
                  .then((resp) => {
                    setSubmitting(false);
                    console.log("Posted!");
                    resetForm();
                    toasterNotes(true, 5000);
                  })
                  .catch((err) => {
                    setSubmitting(false);
                    toasterNotes(false, 5000);
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
                      Date
                    </label>
                    <Field
                      className={
                        (errors.date ? " border-red-500 rounded " : "") +
                        "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      }
                      name="date"
                      type="text"
                      placeholder="Date..."
                    />
                    <p className="text-red-500 text-xs italic">
                      {errors.date && touched.date ? (
                        <span>{errors.date}</span>
                      ) : null}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label
                      className="block uppercase text-gray-300 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Amount
                    </label>
                    <Field
                      className={
                        (errors.amount ? " border-red-500 rounded " : "") +
                        "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      }
                      name="amount"
                      type="text"
                      placeholder="Amount..."
                    />
                    <p className="text-red-500 text-xs italic">
                      {errors.amount && touched.amount ? (
                        <span>{errors.amount}</span>
                      ) : null}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label
                      className="block uppercase text-gray-300 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Total Balance:
                    </label>
                    <Field
                      className={
                        (errors.amount ? " border-red-500 rounded " : "") +
                        "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      }
                      name="totalBalance"
                      type="text"
                      placeholder="Total balance..."
                    />
                    <p className="text-red-500 text-xs italic">
                      {errors.amount && touched.amount ? (
                        <span>{errors.amount}</span>
                      ) : null}
                    </p>
                  </div>

                  <div>
                    <div>
                      <div className="py-3 md:flex md:flex-row-reverse">
                        <span className="mt-3 flex w-full rounded-md shadow-sm md:mt-0 md:w-auto md:ml-3 mb-5 md:mb-0">
                          <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-gray-700 px-4 py-2 bg-gray-600 text-base leading-6 font-medium text-gray-900 shadow-sm hover:text-white focus:outline-none focus:border-gray-400 focus:shadow-outline-blue transition ease-in-out duration-300 md:text-sm md:leading-5"
                            onClick={handleReset}
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
                      </div>
                    </div>
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

export default Activity;
