import React, { useState } from "react";
import Admin from "../../components/Admin";
import AdminPanel from "../../components/AdminPanel";

interface Props {}

const Activity: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <Admin>
        <AdminPanel>
          <div>Activity</div>
        </AdminPanel>
      </Admin>
    </div>
  );
};

export default Activity;
