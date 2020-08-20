import React from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import { getNews } from "./api/news/index";

function Index({ data }) {
  return (
    <Layout title="Bill Book">
      <Container>
        <h1 className="text-white light:text-black mt-8 mb-5">Hello Next.js <a href="#">👋</a></h1>
        {data.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
          </div>
        ))}
      </Container>
    </Layout>
  );
}

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
