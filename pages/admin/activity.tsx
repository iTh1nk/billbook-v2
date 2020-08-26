import React, { useState } from "react";
import Admin from "../../components/Admin";

interface Props {}

const Activity: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <Admin>
        <div>Activity</div>
      </Admin>
    </div>
  );
};

export default Activity;
