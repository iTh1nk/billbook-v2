import React from "react";
import Layout from "../components/Layout";
const Index: React.FunctionComponent = () => {
  return (
    <Layout title="Home">
      <h1 className="text-white">Hello Next.js 👋</h1>
      <div className="p-4 shadow rounded bg-white">
        <h1 className="text-black leading-normal">Next.js</h1>
        <p className="text-green-500 light-mode:text-orange-400">with Tailwind CSS</p>
      </div>
    </Layout>
  );
};
export default Index;
