import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { Container } from "../../components/Container";

type CycleStatements = {
  id: number;
  balance: string;
  notes: string;
  createdAt: string;
  updateAt: string;
  user: string;
  cycle: number;
};
type Data = {
  id: number;
  cycle_statements: Array<CycleStatements>;
};
interface Props {
  detail: Data;
}

const Details: React.FunctionComponent<Props> = ({ detail }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  return (
    <Layout title="Monthly Details">
      <Container>
        {detail.cycle_statements?.map((item, idx) => (
          <div key={item.id}>{item.balance}</div>
        ))}
      </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/cycles/get");
  const details = await res.json();
  const paths = details.data.map((item) => `/details/${item.id}`);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/cycles/${params.cycleId}`);
  const detail = await res.json();
  return { props: { detail } };
}

export default Details;
