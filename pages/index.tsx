import React, { useState, useEffect, useContext } from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import Details from "../components/Details";
import { IsLoadingSkeleton } from "../components/IsLoadingSkeleton";
import moment from "moment";
import { AssignContext } from "../components/AssignContext";
import { LoginForm } from "../components/LoginForm";
import Axios from "axios";
import useLoggedIn from "../components/hooks/useLoggedIn";
import useSWR from "swr";
import IsLoading from "../components/IsLoading";

type CycleStatements = {
  id: number;
  balance: string;
  notes: string;
  createdAt: string;
  updateAt: string;
  user: string;
  cycle: number;
};
type DetailsData = {
  date: string;
  createdAt: string;
  updatedAt: string;
  cycle_statements: Array<CycleStatements>;
  id: number;
};
interface Props {
  dataProps: Array<DetailsData>;
  yearArr: Array<string>;
  balanceProps: string;
}

const Index: React.FunctionComponent<Props> = ({
  dataProps,
  yearArr,
  balanceProps,
}) => {
  const [isModalLogin, setIsModalLogin] = useState<boolean>(false);
  const [isModalGotIt, setIsModalGotIt] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("");
  const { isAuthenticated, userLoggedIn, isLoading } = useLoggedIn(null);

  const fetcher = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API +
        "activities/get/user/" +
        userLoggedIn.id +
        "/",
      { headers: { authorization: localStorage.getItem("auth") } }
    );
    const data = await res.json();
    return data;
  };
  const { data, error } = useSWR(
    "/activities/get/user/" + userLoggedIn.id + "/",
    fetcher,
    { initialData: balanceProps }
  );

  if (isLoading) return <IsLoading />;

  return (
    <>
      <Layout title="Bill Book" showLogin={isModalLogin}>
        <Container>
          {/* Start - Main section: balance */}
          {isAuthenticated ? (
            <div className="flex justify-center">
              <div className="z-0 w-full bg-gradient-to-r from-teal-600 light:from-teal-300 to-blue-500 light:to-blue-300 p-4 rounded-lg flex flex-wrap justify-start items-end transition duration-300 ease-in-out transform hover:scale-98">
                <div className="py-5 md:inline font-semibold">
                  Balance as of cycle:
                </div>
                <div className="text-6xl mt-5 ml-5 animate-bounce-slow md:inline font-mono font-semibold">
                  <span
                    className={
                      (parseInt(data?.totalBalance) < 0
                        ? " text-red-500 light:text-red-600"
                        : " text-white ") + " "
                    }
                  >
                    ${data?.totalBalance}
                  </span>
                </div>
                <div className="md:py-5 md:ml-2">
                  {parseInt(data?.totalBalance) < 0
                    ? ""
                    : "(No action required)"}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="z-0 w-full  bg-gradient-to-r from-teal-600 light:from-teal-300 to-blue-500 light:to-blue-300 p-4 rounded-lg flex flex-wrap justify-start items-end transition duration-300 ease-in-out transform hover:scale-98">
                <div className="text-xl p-5 font-semibold">
                  Please{" "}
                  <span
                    onClick={(e) => setIsModalLogin(!isModalLogin)}
                    className="cursor-pointer underline"
                  >
                    Login
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* End - Main section: balance */}

          {/* Start - Monthly Details Btn */}
          {!!yearArr ? (
            yearArr.map((item, idx) => (
              <Details
                key={idx}
                year={item}
                data0={dataProps}
                cbLogin={() => setIsModalLogin(!isModalLogin)}
              />
            ))
          ) : (
            <div className="mt-5">
              <IsLoadingSkeleton />
            </div>
          )}
          {/* End - Monthly Details Btn */}
        </Container>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "cycles/get/index/");
    const dataProps = await res.json();
    let yearArr = [];
    dataProps.map((item) => yearArr.push(item.date.substring(0, 4)));
    yearArr = Array.from(new Set(yearArr));
    return {
      props: {
        dataProps,
        yearArr,
        balance: { totalBalance: "0" },
        revalidate: 2,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        data: null,
      },
    };
  }
}

export default Index;
