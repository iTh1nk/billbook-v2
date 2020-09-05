import React, { useState, useReducer, useContext, useEffect } from "react";
import Admin from "../../components/admin/Admin";
import AdminPanel from "../../components/admin/AdminPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
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
import Select from "react-select";

interface Props {}

type Values = {
  balance: string;
  notes: string;
};

type SelectedItem = {
  value: string;
  label: string;
};

type AdminStatementsState = {
  tab: string;
  isLoading: boolean;
  error: string;
  success: string;
  date: string;
  amount: string;
  totalBalance: string;
  selectedUser: SelectedItem;
  selectedCycle: SelectedItem;
  // selectedDate: Date;
  userOptions: Array<SelectedItem>;
  cycleOptions: Array<SelectedItem>;
};

const initialState: AdminStatementsState = {
  tab: "home",
  isLoading: false,
  error: "",
  success: "",
  date: "",
  amount: "",
  totalBalance: "",
  selectedUser: null,
  selectedCycle: null,
  // selectedDate: new Date(),
  userOptions: [],
  cycleOptions: [],
};

type AdminStatementsAction =
  | { type: "submitting" | "success" | "reset" }
  | { type: "error"; payload: string }
  | { type: "tab"; tabName: string }
  | { type: "field"; fieldName: string; payload: string }
  | { type: "selectUser"; payload: SelectedItem }
  | { type: "selectCycle"; payload: SelectedItem }
  | { type: "selectDate"; payload: Date }
  | { type: "userOptions"; payload: Array<SelectedItem> }
  | { type: "cycleOptions"; payload: Array<SelectedItem> };

function adminStatementsReducer(
  state: AdminStatementsState,
  action: AdminStatementsAction
) {
  switch (action.type) {
    case "tab":
      return {
        ...state,
        tab: action.tabName,
      };
    case "success":
      return {
        ...state,
        selectedUser: null,
        selectedCycle: null,
        // selectedDate: new Date(),
      };
    // case "selectDate":
    //   return {
    //     ...state,
    //     selectedDate: action.payload,
    //   };
    case "selectUser":
      return {
        ...state,
        selectedUser: action.payload,
      };
    case "selectCycle":
      return {
        ...state,
        selectedCycle: action.payload,
      };
    case "userOptions":
      return {
        ...state,
        userOptions: action.payload,
      };
    case "cycleOptions":
      return {
        ...state,
        cycleOptions: action.payload,
      };
    case "reset":
      return {
        ...state,
        selectedUser: null,
        selectedCycle: null,
      };
  }
}

const Statement: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [state, dispatch] = useReducer(adminStatementsReducer, initialState);
  // const handleChangeDatePicker = (date) => {
  //   dispatch({ type: "selectDate", payload: date });
  // };
  const handleSelectOnChangeUser = (user) => {
    dispatch({ type: "selectUser", payload: user });
  };
  const handleSelectOnChangeCycle = (cycle) => {
    dispatch({ type: "selectCycle", payload: cycle });
  };

  useEffect(() => {
    Axios.get(process.env.NEXT_PUBLIC_API + "auth/get/", {
      headers: { authorization: localStorage.getItem("auth") },
    })
      .then((resp) => {
        dispatch({
          type: "userOptions",
          payload: resp.data.map((item) => ({
            value: item.id,
            label: item.email,
          })),
        });
      })
      .catch((err) => {
        console.log(err, err.response);
      });
    Axios.get(process.env.NEXT_PUBLIC_API + "cycles/get/", {
      headers: { authorization: localStorage.getItem("auth") },
    })
      .then((resp) => {
        dispatch({
          type: "cycleOptions",
          payload: resp.data.map((item) => ({
            value: item.id,
            label: item.date,
          })),
        });
      })
      .catch((err) => {
        console.log(err, err.response);
      });
  }, []);

  const fetcher = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "statements/get/", {
      headers: { authorization: localStorage.getItem("auth") },
    });
    const data = await res.json();
    return data;
  };
  const { data, error } = useSWR("/statements/get/", fetcher, {
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
            {data.map((item, idx) => (
              <div key={item.id}>
                <div className=" mt-5">
                  {idx + 1}.{" "}
                  <span className="underline font-bold">${item.balance}</span>
                </div>
                <ul className="list-disc ml-6">
                  <li>
                    <span className="text-gray-500">Notes:</span> {item.notes}
                  </li>
                  <li>
                    <span className="text-gray-500">User:</span> {item.user}
                  </li>
                  <li>
                    <span className="text-gray-500">Cycle:</span> {item.cycle}
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
            ))}
          </div>
          {/* END - HOME */}

          {/* START - POST */}
          <div className={state.tab === "post" ? "inline" : "hidden"}>
            <div className="mb-5 font-mono font-bold uppercase text-lg italic">
              Make a post:
            </div>
            <Formik
              initialValues={{
                balance: "",
                notes: "",
              }}
              validationSchema={Yup.object().shape({
                balance: Yup.number()
                  .typeError("Balance has to be integer")
                  .max(1000, "Balance is too big")
                  .required("Balance is required"),
                notes: Yup.string().max(1000, "Notes is too long"),
              })}
              onSubmit={(
                values: Values,
                { setSubmitting, resetForm }: FormikHelpers<Values>
              ) => {
                let dataToSubmit = {
                  // date: moment(state.selectedDate).format("YYYY-MM-DD"),
                  balance: values.balance,
                  notes: values.notes,
                  user: state.selectedUser.value,
                  cycle: state.selectedCycle.value,
                  username: state.selectedUser.label,
                };
                console.log(dataToSubmit);
                Axios.post(
                  process.env.NEXT_PUBLIC_API + "statements/post/",
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
                  {/* <div className="mb-4 w-full">
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
                  </div> */}
                  <div className="text-gray-600 mb-4">
                    <label className="block uppercase text-gray-300 text-sm font-bold mb-2">
                      Select User
                    </label>
                    <Select
                      placeholder="Select User..."
                      value={state.selectedUser}
                      options={state.userOptions}
                      onChange={handleSelectOnChangeUser}
                    />
                  </div>
                  <div className="text-gray-600 mb-4">
                    <label className="block uppercase text-gray-300 text-sm font-bold mb-2">
                      Select Cycle
                    </label>
                    <Select
                      placeholder="Select Cycle..."
                      value={state.selectedCycle}
                      options={state.cycleOptions}
                      onChange={handleSelectOnChangeCycle}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block uppercase text-gray-300 text-sm font-bold mb-2">
                      Balance
                    </label>
                    <Field
                      className={
                        (errors.balance ? " border-red-500 rounded " : "") +
                        "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      }
                      name="balance"
                      type="text"
                      placeholder="Balance..."
                    />
                    <p className="text-red-500 text-xs italic">
                      {errors.balance && touched.balance ? (
                        <span>{errors.balance}</span>
                      ) : null}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label className="block uppercase text-gray-300 text-sm font-bold mb-2">
                      Notes
                    </label>
                    <Field
                      className={
                        (errors.notes ? " border-red-500 rounded " : "") +
                        "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      }
                      name="notes"
                      component="textarea"
                      type="text"
                      placeholder="Notes..."
                    />
                    <p className="text-red-500 text-xs italic">
                      {errors.notes && touched.notes ? (
                        <span>{errors.notes}</span>
                      ) : null}
                    </p>
                  </div>

                  <div>
                    <div>
                      <div className="py-3 md:flex md:flex-row-reverse">
                        <span
                          onClick={() => dispatch({ type: "reset" })}
                          className="mt-3 flex w-full rounded-md shadow-sm md:mt-0 md:w-auto md:ml-3 mb-5 md:mb-0"
                        >
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
export default Statement;
