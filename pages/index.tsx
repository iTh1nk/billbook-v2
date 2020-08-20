import React from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import { getNews } from "./api/news/index";

interface Data {
  id: number;
  title: string;
}

interface NewsData {
  data: Array<Data>;
}

const Index: React.FunctionComponent<NewsData> = ({ data }) => {
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
        <div className="z-0 bg-purple-800 p-4 rounded-lg flex flex-wrap justify-start items-end transition duration-300 ease-in-out transform hover:scale-98">
          <div className="py-5">Balance as of cycle: </div>
          <div className="text-6xl ml-5 animate-bounce-slow">$100</div>
        </div>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await getNews();
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default Index;
