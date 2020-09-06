import React, { useState, useReducer, useContext, useEffect } from "react";
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
import Select from "react-select";
import useSWR from "swr";
import { AssignContext } from "../../components/AssignContext";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import toasterNotes from "../../components/ToasterNotes";
import useLoggedIn from "../../components/hooks/useLoggedIn";

interface Props {}

type SelectedUser = {
  value: string;
  label: string;
  profile: {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: number;
    age: number;
    gender: string;
  };
};

type Values = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  age: number;
  gender: string;
};

type AdminUserState = {
  tab: string;
  isLoading: boolean;
  error: string;
  success: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  age: number;
  gender: string;
};

const initialState: AdminUserState = {
  tab: "home",
  isLoading: false,
  error: "",
  success: "",
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  phone_number: 1000000000,
  age: 0,
  gender: "",
};

type AdminUserAction =
  | { type: "submitting" | "success" }
  | { type: "error"; payload: string }
  | { type: "tab"; tabName: string }
  | { type: "field"; fieldName: string; payload: string };

function adminUserReducer(state: AdminUserState, action: AdminUserAction) {
  switch (action.type) {
    case "tab":
      return {
        ...state,
        tab: action.tabName,
      };
    case "submitting":
      return {
        ...state,
        error: "",
        success: "Successfully Completed!",
        isLoading: true,
      };
    case "success":
      return {
        ...state,
        success: "Successfully Completed!",
        isLoading: false,
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        age: 0,
        phone_number: null,
        gender: "",
      };
    case "error":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case "field":
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
  }
}

const User: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userLoggedIn } = useLoggedIn(null);
  const [state, dispatch] = useReducer(adminUserReducer, initialState);
  const [selectedUser, setSelectedUser] = useState<SelectedUser>();
  const [userOptions, setUserOptions] = useState([]);
  const [delConfirm, setDelConfirm] = useState<boolean>(false);

  const [test, setTest] = useState<string>("");

  const handleSelectOnChange = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = (id) => {
    Axios.delete(process.env.NEXT_PUBLIC_API + "auth/delete/" + id + "/", {
      headers: { authorization: localStorage.getItem("auth") },
    })
      .then((resp) => {
        toasterNotes("success", 5000);
        setSelectedUser(undefined);
      })
      .catch((err) => {
        toasterNotes("error", 5000);
        console.log(err, err.response);
      });
  };

  const fetcher = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "auth/get/", {
      headers: { authorization: localStorage.getItem("auth") },
    });
    const result = await res.json();
    await setUserOptions(
      result.map((item) => ({
        label: item.email,
        value: item.id,
        profile: item.profile,
      }))
    );
    return result;
  };
  const { data, error } = useSWR("/auth/get/", fetcher, {
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
                    <span className="underline font-bold">{item.email}</span>
                    <span
                      className={
                        (parseInt(
                          item.user_activities?.sort(
                            (a, b) => Date.parse(b.date) - Date.parse(a.date)
                          )[0]?.totalBalance
                        ) < 0
                          ? " text-red-500 "
                          : " text-green-500 ") + "ml-2"
                      }
                    >
                      $
                      {
                        item.user_activities?.sort(
                          (a, b) => Date.parse(b.date) - Date.parse(a.date)
                        )[0]?.totalBalance
                      }
                    </span>
                  </div>
                  <ul className="list-disc ml-6">
                    <li>
                      <span className="text-gray-500">First Name:</span>
                      {item.profile?.first_name}
                    </li>
                    <li>
                      <span className="text-gray-500">Last name:</span>
                      {item.profile?.last_name}
                    </li>
                    <li>
                      <span className="text-gray-500">Phone Number:</span>{" "}
                      {item.profile?.phone_number}
                    </li>
                    <li>
                      <span className="text-gray-500">Age:</span>{" "}
                      {item.profile?.age}
                    </li>
                    <li>
                      <span className="text-gray-500">Gender:</span>{" "}
                      {item.profile?.gender}
                    </li>
                    <li>
                      <span className="text-gray-500">Last login:</span>{" "}
                      {item.last_login}
                    </li>
                    <li>
                      <span className="text-gray-500">is_active:</span>{" "}
                      {item.is_active.toString()}
                    </li>
                    <li>
                      <span className="text-gray-500">is_staff:</span>{" "}
                      {item.is_staff.toString()}
                    </li>
                    <li>
                      <span className="text-gray-500">is_superuser:</span>{" "}
                      {item.is_superuser.toString()}
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
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: 0,
                age: 0,
                gender: "",
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string()
                  .min(3, "Username is too short")
                  .matches(
                    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                    "Email address is not valid"
                  )
                  .required("Username is required"),
                password: Yup.string()
                  .min(4, "Password is too short")
                  .max(50, "Password is too long")
                  .required("Password is required"),
                firstName: Yup.string()
                  .min(2, "First name is too short")
                  .max(10, "First name is too long")
                  .required("First name is required"),
                lastName: Yup.string()
                  .min(2, "Last name is too short")
                  .max(10, "Last name is too long")
                  .required("Last name is required"),
                phoneNumber: Yup.number()
                  .test(
                    "length",
                    "Phone number has to be 10 digits",
                    (val) => val > 1000000000
                  )
                  .integer("Phone number contains 10 digits")
                  .positive("Phone number has to be positive")
                  .required("Phone number is required"),
                age: Yup.number()
                  .min(18, "Your age has to be over 18")
                  .required("Age is required"),
                gender: Yup.string().required("Please choose an option"),
              })}
              onSubmit={(
                values: Values,
                { setSubmitting, resetForm }: FormikHelpers<Values>
              ) => {
                let dataToSubmit = {
                  email: values.username,
                  password: values.password,
                  profile: {
                    first_name: values.firstName,
                    last_name: values.lastName,
                    phone_number: values.phoneNumber,
                    age: values.age,
                    gender: values.gender,
                  },
                };
                Axios.post(
                  process.env.NEXT_PUBLIC_API + "auth/signup/",
                  dataToSubmit,
                  { headers: { authorization: localStorage.getItem("auth") } }
                )
                  .then((resp) => {
                    setSubmitting(false);
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
                    <label
                      className="block uppercase text-gray-300 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Username (Email)
                    </label>
                    <Field
                      className={
                        (errors.username ? " border-red-500 rounded " : "") +
                        "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      }
                      name="username"
                      type="text"
                      placeholder="Username..."
                    />
                    <p className="text-red-500 text-xs italic">
                      {errors.username && touched.username ? (
                        <span>{errors.username}</span>
                      ) : null}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label
                      className="block uppercase text-gray-300 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <Field
                      className={
                        (errors.password ? " border-red-500 rounded " : "") +
                        "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      }
                      name="password"
                      type="password"
                      placeholder="Password..."
                    />
                    <p className="text-red-500 text-xs italic">
                      {errors.password && touched.password ? (
                        <span>{errors.password}</span>
                      ) : null}
                    </p>
                  </div>

                  <p className="text-gray-500 uppercase font-semibold text-xs mb-3">
                    User Profile
                  </p>
                  <div className="md:flex md:flex-wrap">
                    <div className="mb-3 md:w-1/2 md:px-3">
                      <label
                        className="block uppercase text-gray-300 text-sm font-bold mb-2"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <Field
                        className={
                          (errors.firstName ? " border-red-500 rounded " : "") +
                          "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        }
                        name="firstName"
                        type="text"
                        placeholder="First Name..."
                      />
                      <p className="text-red-500 text-xs italic">
                        {errors.firstName && touched.firstName ? (
                          <span>{errors.firstName}</span>
                        ) : null}
                      </p>
                    </div>
                    <div className="mb-3 md:w-1/2 md:px-3">
                      <label
                        className="block uppercase text-gray-300 text-sm font-bold mb-2"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <Field
                        className={
                          (errors.lastName ? " border-red-500 rounded " : "") +
                          "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        }
                        name="lastName"
                        type="text"
                        placeholder="Last Name..."
                      />
                      <p className="text-red-500 text-xs italic">
                        {errors.lastName && touched.lastName ? (
                          <span>{errors.lastName}</span>
                        ) : null}
                      </p>
                    </div>
                  </div>
                  <div className="md:flex md:flex-wrap">
                    <div className="mb-3 md:w-1/3 md:px-3">
                      <label
                        className="block uppercase text-gray-300 text-sm font-bold mb-2"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <Field
                        className={
                          (errors.phoneNumber
                            ? " border-red-500 rounded "
                            : "") +
                          "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        }
                        name="phoneNumber"
                        type="text"
                        placeholder="Phone Number..."
                      />
                      <p className="text-red-500 text-xs italic">
                        {errors.phoneNumber && touched.phoneNumber ? (
                          <span>{errors.phoneNumber}</span>
                        ) : null}
                      </p>
                    </div>
                    <div className="mb-3 md:w-1/3 md:px-3">
                      <label
                        className="block uppercase text-gray-300 text-sm font-bold mb-2"
                        htmlFor="age"
                      >
                        Age
                      </label>
                      <Field
                        className={
                          (errors.age ? " border-red-500 rounded " : "") +
                          "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        }
                        name="age"
                        type="text"
                        placeholder="Age..."
                      />
                      <p className="text-red-500 text-xs italic">
                        {errors.age && touched.age ? (
                          <span>{errors.age}</span>
                        ) : null}
                      </p>
                    </div>
                    <div className="mb-3 md:w-1/3 md:px-3">
                      <label
                        className="block uppercase text-gray-300 text-sm font-bold mb-2"
                        htmlFor="gender"
                      >
                        Gender
                      </label>
                      <Field
                        className={
                          (errors.gender ? " border-red-500 rounded " : "") +
                          "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        }
                        component="select"
                        name="gender"
                      >
                        <option value="">Please choose</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </Field>
                      <p className="text-red-500 text-xs italic">
                        {errors.gender && touched.gender ? (
                          <span>{errors.gender}</span>
                        ) : null}
                      </p>
                    </div>
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
          <div className={state.tab === "update" ? " inline" : " hidden"}>
            <div className="mb-5 font-mono font-bold uppercase text-lg italic">
              Make an update:{" "}
            </div>
            <div className="text-gray-600 md:flex md:justify-between">
              <Select
                className="inline-block w-full"
                placeholder="Select User..."
                name="userEdit"
                value={selectedUser}
                options={userOptions}
                onChange={handleSelectOnChange}
              />
              <button
                className="inline-block md:ml-5 text-gray-300 ease-in-out duration-300 bg-gray-600 rounded-lg p-2 hover:text-white hover:bg-gray-500 outline-none"
                onClick={() => {
                  setSelectedUser(null);
                }}
              >
                Collapse
              </button>
            </div>
            <div
              className={
                (selectedUser === undefined || selectedUser === null
                  ? " invisible opacity-0 duration-300 ease-in-out "
                  : " visible opacity-100 duration-300 ease-in-out transform translate-y-5 ") +
                " w-full"
              }
            >
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                  firstName: "",
                  lastName: "",
                  phoneNumber: 0,
                  age: 0,
                  gender: "",
                }}
                onSubmit={(
                  values: Values,
                  { setSubmitting, resetForm }: FormikHelpers<Values>
                ) => {
                  setSubmitting(false);
                  let dataToSubmit = {
                    email: state.email || selectedUser.label,
                    password: null,
                    profile: {
                      first_name:
                        state.first_name || selectedUser.profile.first_name,
                      last_name:
                        state.last_name || selectedUser.profile.last_name,
                      phone_number:
                        state.phone_number || selectedUser.profile.phone_number,
                      age: state.age || selectedUser.profile.age,
                      gender: state.gender || selectedUser.profile.gender,
                    },
                  };
                  Axios.put(
                    process.env.NEXT_PUBLIC_API +
                      "auth/put/" +
                      selectedUser.value +
                      "/",
                    dataToSubmit,
                    { headers: { authorization: localStorage.getItem("auth") } }
                  )
                    .then((resp) => {
                      setSubmitting(false);
                      console.log("Posted!");
                      setSelectedUser(null);
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
                      <label
                        className="block uppercase text-gray-300 text-sm font-bold mb-2"
                        htmlFor="username"
                      >
                        Username (Email)
                      </label>
                      <input
                        className={
                          (errors.username ? " border-red-500 rounded " : "") +
                          "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        }
                        name="username"
                        type="text"
                        placeholder="Username..."
                        key={selectedUser?.value}
                        defaultValue={selectedUser?.label}
                        onChange={(e) =>
                          dispatch({
                            type: "field",
                            fieldName: "email",
                            payload: e.target.value,
                          })
                        }
                      />
                      <p className="text-red-500 text-xs italic">
                        {errors.username && touched.username ? (
                          <span>{errors.username}</span>
                        ) : null}
                      </p>
                    </div>
                    <div className="mb-6">
                      <label
                        className="block uppercase text-gray-300 text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className={
                          (errors.password ? " border-red-500 rounded " : "") +
                          "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        }
                        disabled={true}
                        name="password"
                        type="password"
                      />
                      <p className="text-red-500 text-xs italic">
                        {errors.password && touched.password ? (
                          <span>{errors.password}</span>
                        ) : null}
                      </p>
                    </div>

                    <p className="text-gray-500 uppercase font-semibold text-xs mb-3">
                      User Profile
                    </p>
                    <div className="md:flex md:flex-wrap">
                      <div className="mb-3 md:w-1/2 md:px-3">
                        <label
                          className="block uppercase text-gray-300 text-sm font-bold mb-2"
                          htmlFor="firstName"
                        >
                          First Name
                        </label>
                        <input
                          className={
                            (errors.firstName
                              ? " border-red-500 rounded "
                              : "") +
                            "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          }
                          name="firstName"
                          type="text"
                          key={selectedUser?.value}
                          defaultValue={selectedUser?.profile?.first_name}
                          placeholder="First Name..."
                          onChange={(e) =>
                            dispatch({
                              type: "field",
                              fieldName: "first_name",
                              payload: e.target.value,
                            })
                          }
                        />
                        <p className="text-red-500 text-xs italic">
                          {errors.firstName && touched.firstName ? (
                            <span>{errors.firstName}</span>
                          ) : null}
                        </p>
                      </div>
                      <div className="mb-3 md:w-1/2 md:px-3">
                        <label
                          className="block uppercase text-gray-300 text-sm font-bold mb-2"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                        <input
                          className={
                            (errors.lastName
                              ? " border-red-500 rounded "
                              : "") +
                            "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          }
                          name="lastName"
                          type="text"
                          key={selectedUser?.value}
                          defaultValue={selectedUser?.profile?.last_name}
                          placeholder="Last Name..."
                          onChange={(e) =>
                            dispatch({
                              type: "field",
                              fieldName: "last_name",
                              payload: e.target.value,
                            })
                          }
                        />
                        <p className="text-red-500 text-xs italic">
                          {errors.lastName && touched.lastName ? (
                            <span>{errors.lastName}</span>
                          ) : null}
                        </p>
                      </div>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <div className="mb-3 md:w-1/3 md:px-3">
                        <label
                          className="block uppercase text-gray-300 text-sm font-bold mb-2"
                          htmlFor="phoneNumber"
                        >
                          Phone Number
                        </label>
                        <input
                          className={
                            (errors.phoneNumber
                              ? " border-red-500 rounded "
                              : "") +
                            "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          }
                          name="phoneNumber"
                          type="text"
                          placeholder="Phone Number..."
                          key={selectedUser?.value}
                          defaultValue={selectedUser?.profile?.phone_number}
                          onChange={(e) =>
                            dispatch({
                              type: "field",
                              fieldName: "phone_number",
                              payload: e.target.value,
                            })
                          }
                        />
                        <p className="text-red-500 text-xs italic">
                          {errors.phoneNumber && touched.phoneNumber ? (
                            <span>{errors.phoneNumber}</span>
                          ) : null}
                        </p>
                      </div>
                      <div className="mb-3 md:w-1/3 md:px-3">
                        <label
                          className="block uppercase text-gray-300 text-sm font-bold mb-2"
                          htmlFor="age"
                        >
                          Age
                        </label>
                        <input
                          className={
                            (errors.age ? " border-red-500 rounded " : "") +
                            "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          }
                          name="age"
                          type="text"
                          placeholder="Age..."
                          key={selectedUser?.value}
                          defaultValue={selectedUser?.profile?.age}
                          onChange={(e) =>
                            dispatch({
                              type: "field",
                              fieldName: "age",
                              payload: e.target.value,
                            })
                          }
                        />
                        <p className="text-red-500 text-xs italic">
                          {errors.age && touched.age ? (
                            <span>{errors.age}</span>
                          ) : null}
                        </p>
                      </div>
                      <div className="mb-3 md:w-1/3 md:px-3">
                        <label
                          className="block uppercase text-gray-300 text-sm font-bold mb-2"
                          htmlFor="gender"
                        >
                          Gender
                        </label>
                        <select
                          className={
                            (errors.gender ? " border-red-500 rounded " : "") +
                            "shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          }
                          key={selectedUser?.value}
                          defaultValue={selectedUser?.profile?.gender}
                          name="gender"
                          onChange={(e) =>
                            dispatch({
                              type: "field",
                              fieldName: "gender",
                              payload: e.target.value,
                            })
                          }
                        >
                          <option value="">Please choose</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                        </select>
                        <p className="text-red-500 text-xs italic">
                          {errors.gender && touched.gender ? (
                            <span>{errors.gender}</span>
                          ) : null}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div className="py-3 md:flex md:flex-row-reverse">
                          <span className="flex w-full rounded-md shadow-sm md:w-auto">
                            <button
                              type="submit"
                              className={
                                (isSubmitting ? " opacity-50 " : "") +
                                "inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-400 focus:outline-none focus:border-gray-400 focus:shadow-outline-orange transition ease-in-out duration-300 md:text-sm md:leading-5"
                              }
                              disabled={isSubmitting}
                            >
                              Update
                              <div
                                className={
                                  isSubmitting
                                    ? " animate-spin ml-1"
                                    : " hidden "
                                }
                              >
                                <FontAwesomeIcon icon={faCircleNotch} />
                              </div>
                            </button>
                          </span>
                          <span className="mt-3 flex w-full rounded-md shadow-sm md:mt-0 md:w-auto md:mr-3 mb-5 md:mb-0">
                            <button
                              type="button"
                              className={
                                (delConfirm
                                  ? " bg-yellow-600 hover:bg-yellow-600 "
                                  : " bg-red-600 hover:bg-red-400 ") +
                                "inline-flex justify-center w-full rounded-md border border-gray-700 px-4 py-2 text-base leading-6 font-medium text-gray-300 shadow-sm hover:text-white focus:outline-none focus:border-gray-400 focus:shadow-outline-blue transition ease-in-out duration-300 md:text-sm md:leading-5"
                              }
                            >
                              <span
                                onClick={() => {
                                  setDelConfirm(true);
                                  setTimeout(() => {
                                    setDelConfirm(false);
                                  }, 3000);
                                }}
                                className={
                                  delConfirm ? " hidden " : " inline-block "
                                }
                              >
                                Delete
                                <FontAwesomeIcon
                                  className="ml-1 mt-1 h-3"
                                  icon={faTrashAlt}
                                />
                              </span>
                              <span
                                onClick={() => {
                                  handleDelete(selectedUser.value);
                                  setDelConfirm(false);
                                }}
                                className={
                                  delConfirm
                                    ? " inline-block animate-pulse"
                                    : " hidden "
                                }
                              >
                                Confirm ?
                              </span>
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          {/* END - UPDATE */}
        </AdminPanel>
      </Admin>
    </div>
  );
};

export default User;
