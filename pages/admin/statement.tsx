import React, { useState } from "react";
import Admin from "../../components/Admin";
import AdminPanel from "../../components/AdminPanel";

interface Props {}

const Statement: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <Admin>
        <AdminPanel>
          <div>Statement</div>
        </AdminPanel>
      </Admin>
    </div>
  );
};

export default Statement;
