import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import Admin from "../../components/Admin";

interface Props {}

const Home: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <Admin>
        <div className="mt-32 text-center transition duration-500 transform hover:-translate-y-1">
          <span className="font-mono w-0 cursor-default text-3xl text-green-500">
            Welcome . . .
          </span>
        </div>
      </Admin>
    </div>
  );
};

export default Home;
