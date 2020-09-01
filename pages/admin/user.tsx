import React, { useState, useReducer } from "react";
import Admin from "../../components/Admin";
import AdminPanel from "../../components/AdminPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import Axios from "axios";

interface Props {}

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
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: number;
  gender: string;
};

const initialState: AdminUserState = {
  tab: "post",
  isLoading: false,
  error: "",
  success: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  age: 0,
  phoneNumber: null,
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
      };
    case "error":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        age: 0,
        phoneNumber: null,
        gender: "",
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
  const [state, dispatch] = useReducer(adminUserReducer, initialState);

  return (
    <div>
      <Admin>
        <AdminPanel
          cbTab={(tabName) => dispatch({ type: "tab", tabName: tabName })}
        >
          {/* START - POST */}
          <div className={state.tab === "post" ? "inline" : "hidden"}>
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
                  .min(5, "Password is too short")
                  .max(50, "Password is too long")
                  .required("Password is required"),
                firstName: Yup.string()
                  .min(3, "First name is too short")
                  .max(10, "First name is too long")
                  .required("First name is required"),
                lastName: Yup.string()
                  .min(3, "Last name is too short")
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
                { setSubmitting }: FormikHelpers<Values>
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
                console.log(dataToSubmit);
                Axios.post(
                  process.env.NEXT_PUBLIC_API + "auth/signup/",
                  dataToSubmit,
                  { headers: { authorization: localStorage.getItem("auth") } }
                )
                  .then((resp) => {
                    setSubmitting(false);
                    console.log("Posted!");
                  })
                  .catch((err) => {
                    setSubmitting(false);
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
                      <div className="py-3 sm:flex sm:flex-row-reverse">
                        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto sm:ml-3 mb-5 md:mb-0">
                          <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-gray-700 px-4 py-2 bg-gray-600 text-base leading-6 font-medium text-gray-900 shadow-sm transition duration-500 ease-in-out hover:text-white focus:outline-none focus:border-gray-400 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            onClick={handleReset}
                          >
                            Reset
                            <FontAwesomeIcon
                              className="ml-1 mt-1 h-3"
                              icon={faUndo}
                            />
                          </button>
                        </span>
                        <span className="flex w-full rounded-md shadow-sm sm:w-auto">
                          <button
                            type="submit"
                            className={
                              (isSubmitting ? " opacity-50 " : "") +
                              "inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm transition duration-500 ease-in-out hover:bg-green-400 focus:outline-none focus:border-gray-400 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5"
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

          {/* START - DELETE */}
          <div className={state.tab === "delete" ? "inline" : "hidden"}>
            
          </div>
          {/* END - DELETE */}

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

export default User;
