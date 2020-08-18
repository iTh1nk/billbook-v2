import React from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import { getNews } from "./api/news/index";
import post from "./post";
import Axios from "axios";

function Index({ news }) {
  return (
    <Layout title="Bill Book">
      <Container>
        <h1 className="text-white light:text-black mt-8">Hello Next.js 👋</h1>
        {news.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <div>{item.content}</div>
          </div>
        ))}
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await getNews();
  const news = await res.json();
  return {
    props: {
      news,
    },
  };
}

export default Index;
