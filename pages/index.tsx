import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import Details from "../components/Details";
import { IsLoadingSkeleton } from "../components/IsLoadingSkeleton";

interface NewData {
  id: number;
  category: string;
  psItems: [];
  created_at: string;
}
interface Props {
  data: Array<NewData>;
}

const Index: React.FunctionComponent<Props> = ({ data }) => {
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
        {!!data ? (
          data.map((item, idx) => (
            <Details
              key={item.id}
              year={item.created_at.substring(11, 18)}
              id={item.id}
              data={item.psItems}
            />
          ))
        ) : (
          <IsLoadingSkeleton />
        )}
        {/* End - Monthly Details Btn */}
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_API);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default Index;
