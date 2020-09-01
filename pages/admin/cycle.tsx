import React, { useState } from "react";
import Admin from "../../components/Admin";
import AdminPanel from "../../components/AdminPanel";

interface Props {}

const Cycle: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <Admin>
        <AdminPanel>
          <div>Cycle</div>
        </AdminPanel>
      </Admin>
    </div>
  );
};

export default Cycle;
