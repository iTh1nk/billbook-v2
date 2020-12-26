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
import Head from "next/head";

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
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="This is an app for bill management."
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Layout title="Bill Book" showLogin={isModalLogin}>
        <Container>
          {/* Broadcast */}
          <div className="flex justify-center mb-6 mt-2 cursor-default animate-pulse">
            <div className="bg-gradient-to-r from-red-600 light:from-red-600 to-green-500 light:to-green-400 p-4 rounded-lg transition duration-500 ease-in-out transform hover:-translate-y-1">
              <span className="uppercase text-blue-100 font-semibold text-lg">
                Stay Active<span className="px-3"></span>Close Your Rings
              </span>
            </div>
          </div>
          {/* Start - Main section: balance */}
          <div className="flex justify-center">
            <div className="z-0 w-full bg-gradient-to-r from-teal-600 light:from-teal-300 to-blue-500 light:to-blue-300 p-4 rounded-lg flex flex-wrap justify-start items-end transition duration-300 ease-in-out transform hover:scale-98">
              {isAuthenticated ? (
                <div>
                  <div className="py-5 sm:inline font-semibold inline-block">
                    Balance as of cycle:
                  </div>
                  <div className="text-6xl mt-5 ml-5 animate-bounce-slow sm:inline font-mono font-semibold">
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
                  <div className="sm:py-5 sm:ml-2 inline-block">
                    {parseInt(data?.totalBalance) < 0
                      ? ""
                      : "(No action required)"}
                  </div>
                </div>
              ) : (
                <div className="text-xl p-5 font-semibold">
                  Please{" "}
                  <span
                    onClick={(e) => setIsModalLogin(!isModalLogin)}
                    className="cursor-pointer underline"
                  >
                    Login
                  </span>
                </div>
              )}
            </div>
          </div>
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
      },
      revalidate: 2,
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
