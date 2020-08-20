import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import { getNews } from "./api/news/index";
import { Details } from "../components/Details";

interface Data {
  id: number;
  title: string;
}
interface Props {
  data: Array<Data>;
}

const tempYear = ["2019", "2020", "2021"];

const Index: React.FunctionComponent<Props> = ({ data }) => {
  const [isExpand, setIsExpand] = useState<boolean>(true);

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
        {tempYear.reverse().map((item, idx) => (
          <Details
            key={idx}
            year={item}
            data={[{ date: "01.25" }, { date: "02.25" }, { date: "02.25" }]}
          />
        ))}
        {/* End - Monthly Details Btn */}
      </Container>
    </Layout>
  );
};

// export async function getStaticProps() {
//   const res = await getNews();
//   const data = await res.json();
//   return {
//     props: {
//       data,
//     },
//   };
// }

export default Index;
