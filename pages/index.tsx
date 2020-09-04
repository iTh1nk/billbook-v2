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
  data: Array<DetailsData>;
  yearArr: Array<string>;
}

const Index: React.FunctionComponent<Props> = ({ data, yearArr }) => {
  const [isModalLogin, setIsModalLogin] = useState<boolean>(false);
  const [isModalGotIt, setIsModalGotIt] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("");
  const { isAuthenticated } = useLoggedIn(null);

  return (
    <>
      <Layout title="Bill Book" showLogin={isModalLogin}>
        <Container>
          {/* Start - Main section: balance */}
          {isAuthenticated ? (
            <div className="flex justify-center">
              <div className="z-0 w-full bg-gradient-to-r from-teal-600 to-blue-500 p-4 rounded-lg flex flex-wrap justify-start items-end transition duration-300 ease-in-out transform hover:scale-98">
                <div className="py-5 md:inline font-semibold">
                  Balance as of cycle:
                </div>
                <div className="text-6xl mt-5 ml-5 animate-bounce-slow md:inline font-mono font-semibold">
                  ${balance}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="z-0 w-full  bg-gradient-to-r from-teal-600 to-blue-500 p-4 rounded-lg flex flex-wrap justify-start items-end transition duration-300 ease-in-out transform hover:scale-98">
                <div className="text-xl p-5">
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
                data0={data}
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
    const res = await fetch(process.env.NEXT_PUBLIC_API + "cycles/get/");
    const data = await res.json();
    let yearArr = [];
    data.map((item) => yearArr.push(item.date.substring(0, 4)));
    yearArr = Array.from(new Set(yearArr));
    console.log(yearArr);
    return {
      props: {
        data,
        yearArr,
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
