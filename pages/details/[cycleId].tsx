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
        <div className="flex justify-center">
          <table className="table-auto text-center">
            <thead>
              <tr>
                <th className="py-10 px-5 md:py-10 md:px-10 border-b-2 text-gray-500 text-xl font-mono">
                  User
                </th>
                <th className="py-10 px-5 md:py-10 md:px-10 border-b-2 text-gray-500 text-xl font-mono">
                  Balance
                </th>
                <th className="py-10 px-5 md:py-10 md:px-10 border-b-2 text-gray-500 text-xl font-mono">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {detail.cycle_statements?.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-900">
                  <td className="py-5">8731</td>
                  <td className="py-5">${item.balance}</td>
                  <td className="py-5">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
