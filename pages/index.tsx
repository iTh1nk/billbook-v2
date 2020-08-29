import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import Details from "../components/Details";
import { IsLoadingSkeleton } from "../components/IsLoadingSkeleton";
import moment from "moment";

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
  data0: Array<DetailsData>;
  year: Array<string>;
}

const Index: React.FunctionComponent<Props> = ({ data0, year }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Layout title="Bill Book">
      <Container>
        {/* Start - Main section: balance */}
        <div className="flex justify-center">
          <div className="z-0 w-full  bg-gradient-to-r from-teal-600 to-blue-500 p-4 rounded-lg flex flex-wrap justify-start items-end transition duration-300 ease-in-out transform hover:scale-98">
            <div className="py-5">Balance as of cycle: </div>
            <div className="text-6xl mt-5 ml-5 animate-bounce-slow">$100</div>
          </div>
        </div>
        {/* End - Main section: balance */}

        {/* Start - Monthly Details Btn */}
        {!!year ? (
          year.map((item, idx) => (
            <Details key={idx} year={item} data0={data0} />
          ))
        ) : (
          <div className="mt-5">
            <IsLoadingSkeleton />
          </div>
        )}
        {/* End - Monthly Details Btn */}
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:3000/api/cycles/get/");
    const data = await res.json();
    const data0 = data.data;
    const year = data.year;
    return {
      props: {
        data0,
        year,
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
