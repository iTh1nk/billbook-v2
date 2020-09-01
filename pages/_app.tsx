// import '../styles/globals.css'
import "../styles/index.css";
import { useState, useEffect, createContext } from "react";
import Axios from "axios";
import { AssignContext } from "../components/AssignContext";
import { IsLoadingSkeleton } from "../components/IsLoadingSkeleton";
import IsLoading from "../components/IsLoading";
import jwtDecode from "jwt-decode";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userLoggedIn, setUserLoggedIn] = useState<object>({});

  useEffect(() => {
    Axios.post(
      process.env.NEXT_PUBLIC_API + "auth/check/",
      {},
      {
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      }
    )
      .then((resp) => {
        if (resp.data.message === "pass") setIsAuthenticated(true);
        setIsLoading(false);
        setUserLoggedIn({
          username: jwtDecode(
            localStorage.getItem("auth").split("Bearer ").join("")
          ).email.split("@")[0],
          id: jwtDecode(localStorage.getItem("auth").split("Bearer ").join(""))
            .user_id,
        });
        console.log(
          jwtDecode(localStorage.getItem("auth").split("Bearer ").join(""))
        );
      })
      .catch((err) => {
        setIsAuthenticated(false);
        setIsLoading(false);
        console.log(err, err.response);
      });
  }, [isAuthenticated]);

  if (isLoading) return <IsLoading />;

  return (
    <AssignContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userLoggedIn }}
    >
      <Component {...pageProps} />
    </AssignContext.Provider>
  );
}

export default MyApp;
