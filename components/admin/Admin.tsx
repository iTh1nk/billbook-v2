import React, { useState, useEffect, useContext } from "react";
import { Layout } from "../Layout";
import { Container } from "../Container";
import Link from "next/link";
import Axios from "axios";
import { AssignContext } from "../AssignContext";
import useLoggedIn from "../hooks/useLoggedIn";
import IsLoading from "../IsLoading";

interface Props {
  children: React.ReactNode;
}

const Admin: React.FunctionComponent<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>("");
  const { isAuthenticated } = useLoggedIn(null, false);

  useEffect(() => {
    setCurrentTab(window.location.href.match(/\/(?:.(?!\/))+$/)[0]);
    Axios.post(
      process.env.NEXT_PUBLIC_API + "auth/admincheck/",
      {},
      {
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      }
    )
      .then((resp) => {
        if (resp.data.message === "pass") {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        window.location.replace("/");
        console.log(err, err.response);
      });
  });

  if (isLoading) return <IsLoading />;

  return (
    <div>
      <Layout title="Admin">
        <Container>
          <div className="text-center mb-5 text-green-500 light:font-semibold">
            <Link href="/admin">
              <span
                className={
                  currentTab === "/admin"
                    ? "underline"
                    : " we-admin-title-light "
                }
              >
                Home
              </span>
            </Link>
            <span className="m-2 cursor-default"> | </span>
            <Link href="/admin/cycle">
              <span
                className={
                  currentTab === "/cycle"
                    ? "underline"
                    : " we-admin-title-light "
                }
              >
                Cycle
              </span>
            </Link>
            <span className="m-2 cursor-default"> | </span>
            <Link href="/admin/statement">
              <span
                className={
                  currentTab === "/statement"
                    ? "underline"
                    : " we-admin-title-light "
                }
              >
                Statement
              </span>
            </Link>
            <span className="m-2 cursor-default"> | </span>
            <Link href="/admin/activity">
              <span
                className={
                  currentTab === "/activity"
                    ? "underline"
                    : " we-admin-title-light "
                }
              >
                Activity
              </span>
            </Link>
            <span className="m-2 cursor-default"> | </span>
            <Link href="/admin/user">
              <span
                className={
                  currentTab === "/user"
                    ? "underline"
                    : " we-admin-title-light "
                }
              >
                User
              </span>
            </Link>
          </div>
          {children}
        </Container>
      </Layout>
    </div>
  );
};

export default Admin;
