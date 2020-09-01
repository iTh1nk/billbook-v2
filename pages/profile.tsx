import React, { useState, useContext, useEffect } from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import { AssignContext } from "../components/AssignContext";
import useSWR from "swr";
import IsLoading from "../components/IsLoading";
import IsError from "../components/IsError";

interface Props {}
type UserActivities = {
  id: number;
  date: string;
  amount: string;
  totalBalance: string;
  createdAt: string;
  updatedAt: string;
};

const Profile: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userLoggedIn } = useContext(AssignContext);
  const [userActivities, setUserActivities] = useState<Array<UserActivities>>(
    []
  );
  const [pulseDelay, setPulseDelay] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setPulseDelay(true);
    }, 1000);
  }, []);

  const fetcher = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API + "auth/get/" + userLoggedIn.id + "/",
      {
        headers: { Authorization: localStorage.getItem("auth") },
      }
    );
    return await res.json();
  };
  const { data, error } = useSWR(
    "/auth/get/" + userLoggedIn.id + "/",
    fetcher,
    { refreshInterval: 10000 }
  );

  if (error) return <IsError />;
  if (!data) return <IsLoading />;

  return (
    <div>
      <Layout title="Profile">
        <Container>
          <div className="md:flex md:justify-center">
            <div>
              <div className=" text-green-500 cursor-default mt-5">
                Your Activities
                <span className=" animate-pulse"> : </span>{" "}
                <span className={pulseDelay ? " animate-pulse" : ""}>:</span>
              </div>
              <table className="md:ml-5">
                <thead>
                  <tr>
                    <th className="py-10">Date</th>
                    <th className="py-10">Deposit</th>
                    <th className="py-10">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.user_activities?.map((item, idx) => (
                    <tr
                      key={item.id}
                      className="text-gray-500 cursor-default transition duration-500 hover:text-gray-200"
                    >
                      <th className="px-8 py-2">
                        {item.date.substring(5, item.date.length)}
                      </th>
                      <th className="px-8 py-2">${item.amount}</th>
                      <th className="px-8 py-2">${item.totalBalance}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Layout>
    </div>
  );
};

export default Profile;
