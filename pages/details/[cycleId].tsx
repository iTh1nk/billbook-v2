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
  username: string;
};
type Data = {
  id: number;
  date: string;
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
        <div className="font-mono text-center mt-2 text-gray-600 light:text-gray-800">
          Billing Cycle: {detail?.date}
        </div>
        <div className="flex justify-center">
          <table className="table-auto text-center">
            <thead>
              <tr>
                <th className="py-6 md:py-10 px-5 md:px-10 border-b-2 text-gray-500 light:text-gray-600 text-xl font-mono">
                  User
                </th>
                <th className="py-6 md:py-10 px-5 md:px-10 border-b-2 text-gray-500 light:text-gray-600 text-xl font-mono">
                  Balance
                </th>
                <th className="py-6 md:py-10 px-5 md:px-10 border-b-2 text-gray-500 light:text-gray-600 text-xl font-mono">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {detail?.cycle_statements?.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-900 light:hover:text-gray-300">
                  <td className="py-5">{item.username.match(/[^@]*/)}</td>
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
  const res = await fetch(process.env.NEXT_PUBLIC_API + "cycles/get");
  const details = await res.json();
  const paths = details.map((item) => `/details/${item.id}`);
  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}cycles/get/${context.params.cycleId}`
    );
    const detail = await res.json();
    return { props: { detail }, revalidate: 2 };
  } catch {
    return;
  }
}

export default Details;
