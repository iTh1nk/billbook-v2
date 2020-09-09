import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import { AssignContext } from "../AssignContext";
import useSWR from "swr";
import IsLoading from "../IsLoading";

type LoggedInUser = {
  id: string;
  username: string;
};

const useLoggedIn = (trigger?, loading?) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    loading || false
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [userLoggedIn, setUserLoggedIn] = useState<LoggedInUser>({
    id: "",
    username: "",
  });
  useEffect(() => {
    Axios.post(
      process.env.NEXT_PUBLIC_API + "auth/check/",
      {},
      {
        headers: {
          Authorization: window.localStorage.getItem("auth"),
        },
      }
    )
      .then((resp) => {
        if (resp.data.message === "pass") setIsAuthenticated(true);
        setIsLoading(false);
        setIsAuthenticated(true);
        setUserLoggedIn({
          username: jwtDecode(
            window.localStorage.getItem("auth").split("Bearer ").join("")
          ).email.split("@")[0],
          id: jwtDecode(
            window.localStorage.getItem("auth").split("Bearer ").join("")
          ).user_id,
        });
      })
      .catch((err) => {
        setIsAuthenticated(false);
        setIsLoading(false);
        setError(err.response);
      });
  }, [trigger]);

  return { isAuthenticated, isLoading, error, userLoggedIn };
};

export default useLoggedIn;
