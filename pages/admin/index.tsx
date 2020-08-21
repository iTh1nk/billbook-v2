import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { Container } from "../../components/Container";

interface Props {}

const Admin: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <Layout title="Admin">
        <Container>
          <div className="text-center">
            <span className="we-admin-title">Home</span>
            <span className="m-2 cursor-default"> | </span>
            <span className="we-admin-title">Cycle</span>
            <span className="m-2 cursor-default"> | </span>
            <span className="we-admin-title">Statement</span>
            <span className="m-2 cursor-default"> | </span>
            <span className="we-admin-title">Activity</span>
            <span className="m-2 cursor-default"> | </span>
            <span className="we-admin-title">User</span>
          </div>
        </Container>
      </Layout>
    </div>
  );
};

export default Admin;
