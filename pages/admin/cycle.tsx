import React, { useState } from "react";
import Admin from "../../components/Admin";

interface Props {}

const Cycle: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <Admin>
        <div>Cycle</div>
      </Admin>
    </div>
  );
};

export default Cycle;
