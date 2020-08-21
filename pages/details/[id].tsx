import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { Container } from "../../components/Container";

type Data = {
  id: number;
  content: string;
};
interface Props {
  detail: Data;
}

const Details: React.FunctionComponent<Props> = ({ detail }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Layout title="Monthly Details">
      <Container>{detail.content}</Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_SUB);
  const details = await res.json();
  const paths = details.map((item) => `/details/${item.id}`);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SUB}/${params.id}`);
  const detail = await res.json();
  return { props: { detail } };
}

export default Details;
