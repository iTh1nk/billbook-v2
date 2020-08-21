import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import Details from "../components/Details";

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
  return (
    <Layout title="Bill Book">
      <Container>
        {/* <h1 className="text-white light:text-black mt-8 mb-5">
          Hello Next.js <a href="#">👋</a>
        </h1>
        {data.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
          </div>
        ))} */}

        {/* Start - Main section: balance */}
        <div className="z-0 bg-purple-800 p-4 rounded-lg flex flex-wrap justify-start items-end transition duration-300 ease-in-out transform hover:scale-98">
          <div className="py-5">Balance as of cycle: </div>
          <div className="text-6xl mt-5 ml-5 animate-bounce-slow">$100</div>
        </div>
        {/* End - Main section: balance */}

        {/* Start - Monthly Details Btn */}
        {data.map((item, idx) => (
          <Details
            key={item.id}
            year={item.created_at.substring(11,18)}
            id={item.id}
            data={item.psItems}
          />
        ))}
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
