import React, { useState, useContext, useEffect } from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import { AssignContext } from "../components/AssignContext";
import useSWR from "swr";
import IsLoading from "../components/IsLoading";
import IsError from "../components/IsError";
import useLoggedIn from "../components/hooks/useLoggedIn";

interface Props {}
type UserActivities = {
  id: number;
  date: string;
  amount: string;
  totalBalance: string;
  createdAt: string;
  updatedAt: string;
};

const Profile = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userLoggedIn, isAuthenticated } = useLoggedIn(null);
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
  const { data: dataUser, error } = useSWR(
    "/auth/get/" + userLoggedIn.id + "/",
    fetcher,
    { refreshInterval: 1000 }
  );

  if (error) {
    console.log(error);
    return <IsError />;
  }
  if (!dataUser) return <IsLoading />;

  return (
    <div>
      <Layout title="Profile">
        <Container>
          <div className="md:flex md:justify-center">
            <div>
              <div className=" text-green-500 light:text-green-800 light:font-semibold cursor-default mt-5">
                Your Transfer Activities
                <span className=" animate-pulse"> : </span>{" "}
                <span className={pulseDelay ? " animate-pulse" : ""}>:</span>
              </div>
              <table className="md:ml-5">
                <thead>
                  <tr>
                    <th className="py-10 px-5 md:px-10  text-gray-500 light:text-gray-600 text-xl font-mono">
                      Date
                    </th>
                    <th className="py-10 px-5 md:px-10  text-gray-500 light:text-gray-600 text-xl font-mono">
                      Deposit
                    </th>
                    <th className="py-10 px-5 md:px-10  text-gray-500 light:text-gray-600 text-xl font-mono">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataUser?.user_activities
                    ?.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
                    .map((item, idx) => (
                      <tr
                        key={item.id}
                        className="text-gray-300 light:text-gray-700 cursor-default transition duration-500 hover:text-gray-200"
                      >
                        <th className="px-8 py-2">{item.date}</th>
                        <th className="px-8 py-2">${item.amount}</th>
                        <th className="px-8 py-2">
                          <span
                            className={
                              (parseInt(item.totalBalance) < 0
                                ? " text-red-500 "
                                : " text-white ") + " py-5 "
                            }
                          >
                            ${item.totalBalance}
                          </span>
                        </th>
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
