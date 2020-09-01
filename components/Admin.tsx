import React, { useState } from "react";
import { Layout } from "./Layout";
import { Container } from "./Container";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const Admin: React.FunctionComponent<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentTab = window.location.href
    .split("http://localhost:3000/admin/")
    .join("");

  return (
    <div>
      <Layout title="Admin">
        <Container>
          <div className="text-center mb-5">
            <Link href="/admin">
              <span
                className={
                  currentTab === "http://localhost:3000/admin"
                    ? "underline text-green-500"
                    : "we-admin-title text-gray-300"
                }
              >
                Home
              </span>
            </Link>
            <span className="m-2 cursor-default"> | </span>
            <Link href="/admin/cycle">
              <span
                className={
                  currentTab === "cycle"
                    ? "underline text-green-500"
                    : "we-admin-title text-gray-300"
                }
              >
                Cycle
              </span>
            </Link>
            <span className="m-2 cursor-default"> | </span>
            <Link href="/admin/statement">
              <span
                className={
                  currentTab === "statement"
                    ? "underline text-green-500"
                    : "we-admin-title text-gray-300"
                }
              >
                Statement
              </span>
            </Link>
            <span className="m-2 cursor-default"> | </span>
            <Link href="/admin/activity">
              <span
                className={
                  currentTab === "activity"
                    ? "underline text-green-500"
                    : "we-admin-title text-gray-300"
                }
              >
                Activity
              </span>
            </Link>
            <span className="m-2 cursor-default"> | </span>
            <Link href="/admin/user">
              <span
                className={
                  currentTab === "user"
                    ? "underline text-green-500"
                    : "we-admin-title text-gray-300"
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
