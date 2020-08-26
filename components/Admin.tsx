import React, { useState } from "react";
import { Layout } from "./Layout";
import { Container } from "./Container";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const Admin: React.FunctionComponent<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <Layout title="Admin">
        <Container>
          <div className="text-center mb-5">
            <Link href="/admin">
              <span className="we-admin-title">Home</span>
            </Link>
            <span className="m-2 cursor-default"> | </span>
            <Link href="/admin/cycle">
              <span className="we-admin-title">Cycle</span>
            </Link>
            <span className="m-2 cursor-default"> | </span>
            <Link href="/admin/statement">
              <span className="we-admin-title">Statement</span>
            </Link>
            <span className="m-2 cursor-default"> | </span>
            <Link href="/admin/activity">
              <span className="we-admin-title">Activity</span>
            </Link>
            <span className="m-2 cursor-default"> | </span>
            <Link href="/admin/user">
              <span className="we-admin-title">User</span>
            </Link>
          </div>
          {children}
        </Container>
      </Layout>
    </div>
  );
};

export default Admin;
