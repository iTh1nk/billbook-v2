// import '../styles/globals.css'
import "../styles/index.css";
import { useState, useEffect, createContext } from "react";
import Axios from "axios";
import { AssignContext } from "../components/AssignContext";
import { IsLoadingSkeleton } from "../components/IsLoadingSkeleton";
import IsLoading from "../components/IsLoading";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

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
      })
      .catch((err) => {
        setIsAuthenticated(false);
        setIsLoading(false);
        console.log(err, err.response);
      });
  });

  if (isLoading) return <IsLoading />;

  return (
    <AssignContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Component {...pageProps} />
    </AssignContext.Provider>
  );
}

export default MyApp;
