import React, { useState } from "react";
import Admin from "../../components/Admin";

interface Props {}

const User: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <Admin>
        <div>User</div>
      </Admin>
    </div>
  );
};

export default User;
