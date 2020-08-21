import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";

interface Props {}

const Profile: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <Layout title="Profile">
        <Container>
          <div className="underline text-green-500 cursor-default">
            Activity
          </div>
          <div className="ml-5 mt-5 text-gray-600 cursor-default transition duration-500 hover:text-gray-200">
            Date: Activity
          </div>
        </Container>
      </Layout>
    </div>
  );
};

export default Profile;
