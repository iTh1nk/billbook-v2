import React, {
  useState,
  useReducer,
  useContext,
  useEffect,
  ReactComponentElement,
} from "react";
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
import { AssignContext } from "../../components/AssignContext";
import useLoggedIn from "../../components/hooks/useLoggedIn";
import useSWR from "swr";
import Select from "react-select";

interface Props {}

type Values = {
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
  selectedDate: Date;
  selectedUser: SelectedUser;
  userOptions: Array<SelectedUser>;
  switchTab: JSX.Element;
  selectedDateUpdate: Date;
};

const initialState: AdminActivitiesState = {
  tab: "home",
  isLoading: false,
  error: "",
  success: "",
  date: "",
  amount: "",
  totalBalance: "",
  selectedDate: new Date(),
  selectedDateUpdate: new Date(),
  selectedUser: null,
  userOptions: [],
  switchTab: null,
};

type AdminActivitiesAction =
  | { type: "submitting" | "success" }
  | { type: "error"; payload: string }
  | { type: "tab"; tabName: string }
  | { type: "field"; fieldName: string; payload: string }
  | { type: "chooseDate"; payload: string }
  | { type: "chooseDateUpdate"; payload: string }
  | { type: "selectUser"; payload: SelectedUser }
  | { type: "userOptions"; payload: Array<SelectedUser> }
  | { type: "switchTab"; payload: string };

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
    case "success":
      return {
        ...state,
        selectedDate: new Date(),
        selectedUser: null,
      };
    case "chooseDate":
      return {
        ...state,
        selectedDate: action.payload,
      };
    case "selectUser":
      return {
        ...state,
        selectedUser: action.payload,
      };
    case "userOptions":
      return {
        ...state,
        userOptions: action.payload,
      };
    case "switchTab":
      return {
        ...state,
        switchTab: action.payload === "loading" ? <IsLoading /> : <IsError />,
      };
    case "chooseDateUpdate":
      return {
        ...state,
        selectedDateUpdate: action.payload,
      };
  }
}
type SelectedUser = {
  value: string;
  label: string;
};

const Activity: React.FunctionComponent<Props> = ({}) => {
  const { userLoggedIn } = useLoggedIn(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [state, dispatch] = useReducer(adminActivitiesReducer, initialState);
  const handleChangeDatePicker = (date) => {
    dispatch({ type: "chooseDate", payload: date });
  };
  const handleChangeDatePickerUpdate = (date) => {
    dispatch({ type: "chooseDateUpdate", payload: date });
  };
  const handleSelectOnChange = (user) => {
    dispatch({ type: "selectUser", payload: user });
  };

  const handleDelete = (id) => {
    Axios.delete(
      process.env.NEXT_PUBLIC_API + "activities/delete/" + id + "/",
      { headers: { authorization: localStorage.getItem("auth") } }
    )
      .then((resp) => {
        toasterNotes("success", 5000);
      })
      .catch((err) => {
        console.log(err, err.response);
        toasterNotes("error", 5000);
      });
  };

  useEffect(() => {
    Axios.get(process.env.NEXT_PUBLIC_API + "auth/get/", {
      headers: { authorization: localStorage.getItem("auth") },
    })
      .then((resp) => {
        dispatch({
          type: "userOptions",
          payload: resp.data.map((item) => ({
            label: item.email,
            value: item.id,
          })),
        });
      })
      .catch((err) => {
        console.log(err, err.response);
      });
  }, []);

  const fetcherActivities = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "activities/get/", {
      headers: { authorization: localStorage.getItem("auth") },
    });
    const data = await res.json();
    return data;
  };
  const {
    data: dataActivities,
    error: errorActivities,
  } = useSWR("/activities/get/", fetcherActivities, { refreshInterval: 1000 });
  if (errorActivities) return <IsError />;
  if (!dataActivities) return <IsLoading />;

  return (
    <div>
      <Admin>
        <AdminPanel
          cbTab={(tabName) => {
            dispatch({ type: "tab", tabName: tabName });
          }}
        >
          {state.switchTab}
          {/* START - HOME */}
          <div className={state.tab === "home" ? "inline" : "hidden"}>
            {dataActivities === [] ? (
              dataActivities.map((item, idx) => (
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
                      <span className="text-gray-500">Amount:</span> $
                      {item.amount}
                    </li>
                    <li>
                      <span className="text-gray-500">Total Balance:</span> $
                      {item.totalBalance}
                    </li>
                    <li>
                      <span className="text-gray-500">is_read:</span>{" "}
                      {item.is_read}
                    </li>
                    <li>
                      <span className="text-gray-500">User:</span> {item.user}
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
                amount: "",
                totalBalance: "",
              }}
              validationSchema={Yup.object().shape({
                amount: Yup.number()
                  .typeError("Amount has to be integer")
                  .max(1000, "Amount is too big")
                  .required("Amount is required"),
                totalBalance: Yup.number()
                  .typeError("Total balance has to be integer")
                  .max(1000, "Total balance is too long")
                  .required("Total balance is required"),
              })}
              onSubmit={(
                values: Values,
                { setSubmitting, resetForm }: FormikHelpers<Values>
              ) => {
                setSubmitting(false);
                let dataToSubmit = {
                  date: moment(state.selectedDate).format("YYYY-MM-DD"),
                  amount: values.amount.toString(),
                  totalBalance: values.totalBalance.toString(),
                  user: state.selectedUser.value,
                };
                Axios.post(
                  process.env.NEXT_PUBLIC_API + "activities/post/",
                  dataToSubmit,
                  { headers: { authorization: localStorage.getItem("auth") } }
                )
                  .then((resp) => {
                    setSubmitting(false);
                    dispatch({ type: "success" });
                    console.log("Posted!");
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
                  <div className="mb-4 w-full">
                    <label className="block uppercase text-gray-300 text-sm font-bold mb-2">
                      Pick Date
                    </label>
                    <DatePicker
                      className="text-gray-800 rounded-sm py-2 px-3 leading-tight"
                      selected={state.selectedDate}
                      onChange={handleChangeDatePicker}
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                  <div className="text-gray-600 mb-4">
                    <label className="block uppercase text-gray-300 text-sm font-bold mb-2">
                      Select User
                    </label>
                    <Select
                      placeholder="Select User..."
                      value={state.selectedUser}
                      options={state.userOptions}
                      onChange={handleSelectOnChange}
                    />
                  </div>
                  <div className="mb-2">
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
                        (errors.totalBalance
                          ? " border-red-500 rounded "
                          : "") +
                        "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      }
                      name="totalBalance"
                      type="text"
                      placeholder="Total balance..."
                    />
                    <p className="text-red-500 text-xs italic">
                      {errors.totalBalance && touched.totalBalance ? (
                        <span>{errors.totalBalance}</span>
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
            <div className="mb-5 font-mono font-bold uppercase text-lg italic">
              Make an update:
            </div>
            <DatePicker
              className="text-gray-800 rounded-sm py-2 px-3 leading-tight"
              selected={state.selectedDateUpdate}
              onChange={handleChangeDatePickerUpdate}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          {/* END - UPDATE */}
        </AdminPanel>
      </Admin>
    </div>
  );
};

export default Activity;
