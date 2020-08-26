import React, { useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faUndo } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "./Modal";
import Axios from "axios";

interface Values {
  username: string;
  password: string;
}
interface LoginFormProps {
  isModal: boolean;
  cb: (e: any) => void;
}

export const LoginForm: React.FunctionComponent<LoginFormProps> = (props) => {
  return (
    <Modal
      title="Login"
      isModal={props.isModal}
      isNotConfirmBtn={true}
      isNotClose={true}
      cbIsModal={props.cb}
    >
      <div className="w-full max-w-xs ml-2">
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string()
              .min(3, "Username is too short")
              .max(10, "Username is too long")
              .required("Username is required"),
            password: Yup.string()
              .min(5, "Password is too short")
              .max(50, "Password is too long")
              .required("Password is required"),
          })}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            // Axios.post(
            //   "https://api.we0mmm.site/api/login/",
            //   {
            //     username: values.username,
            //     password: values.password,
            //   },
            //   {
            //     withCredentials: true,
            //   }
            // )
            //   .then((resp) => {
            //     setSubmitting(false);
            //     console.log(resp.data);
            //   })
            //   .catch((err) => {
            //     setSubmitting(false);
            //     console.log(err.response);
            //   });
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   setSubmitting(false);
            // }, 2000);
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
            <Form className="shadow-md rounded pb-8 w-full mb-4">
              <div className="mb-4 w-full">
                <label
                  className="block text-gray-300 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
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
                  className="block text-gray-300 text-sm font-bold mb-2"
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
    </Modal>
  );
};
