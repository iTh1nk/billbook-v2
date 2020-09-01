import React, { useState, useReducer } from "react";
import Admin from "../../components/Admin";
import AdminPanel from "../../components/AdminPanel";

interface Props {}

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
  tab: "",
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
  | { type: "tab"; tabName: string; payload: string }
  | { type: "field"; fieldName: string; payload: string };

function adminUserReducer(state: AdminUserState, action: AdminUserAction) {
  switch (action.type) {
    case "tab":
      return {
        ...state,
        [action.tabName]: action.payload,
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
        <AdminPanel>User</AdminPanel>
      </Admin>
    </div>
  );
};

export default User;
