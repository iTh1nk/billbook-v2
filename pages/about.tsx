import React from "react";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { Container } from "../components/Container";

const About: React.FunctionComponent = () => {
  return (
    <Layout title="About">
      <Container>
        <h1>This is About page ✌</h1>
      </Container>
    </Layout>
  );
};
export default About;
