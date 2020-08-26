import React, { useState } from "react";
import Admin from "../../components/Admin";

interface Props {}

const Statement: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <Admin>
        <div>Statement</div>
      </Admin>
    </div>
  );
};

export default Statement;
