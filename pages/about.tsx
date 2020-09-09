import React from "react";
import Link from "next/link";

const About: React.FunctionComponent = () => {
  return (
    <div className="flex-col flex justify-between h-screen">
      <div>
        <div className="md:p-10 p-5">
          <div className="md:flex md:justify-center text-center">
            <div className="inline-block m-3 md:m-5 bg-gray-200 rounded-full shadow-2xl md:w-32 md:h-32 w-12 h-12">
              <img
                src="/reactjs.svg"
                alt="REACT.js Logo"
                className="md:w-32 md:h-32 w-12 h-12 md:md:p-5 p-1"
              />
            </div>
            <div className="inline-block m-3 md:m-5 bg-gray-200 rounded-full shadow-2xl md:w-32 md:h-32 w-12 h-12">
              <img
                src="/nextjs.svg"
                alt="NEXT.js Logo"
                className="md:w-32 md:h-32 w-12 h-12 md:p-5 p-1"
              />
            </div>
            <div className="inline-block m-3 md:m-5 bg-gray-200 rounded-full shadow-2xl md:w-32 md:h-32 w-12 h-12">
              <img
                src="/swr.png"
                alt="useSWR Logo"
                className="md:w-30 md:h-18 md:p-5 p-1 m-auto md:mt-6 mt-3"
              />
            </div>
            <div className="inline-block m-3 md:m-5 bg-gray-200 rounded-full shadow-2xl md:w-32 md:h-32 w-12 h-12">
              <img
                src="/tailwindcss.png"
                alt="TailwindCSS Logo"
                className="md:w-32 md:h-24 md:mt-4 w-12 h-10 mt-1 md:p-5 p-2"
              />
            </div>
            <div className="inline-block m-3 md:m-5 bg-gray-200 rounded-full shadow-2xl md:w-32 md:h-32 w-12 h-12">
              <img
                src="/drf.png"
                alt="DRF Logo"
                className="md:w-40 md:h-24 md:mt-4 mt-3 md:p-2"
              />
            </div>
          </div>
          <div className="font-mono text-left mt-5 md:mt-10 px-2 md:px-32 light:font-semibold">
            <div className="mb-5 text-center">[...]</div>
            <li className="py-2">
              By the power of React library, NEXT.js partner with SWR handles
              very well on tasks like pre-render, pre-fetch, server side
              rendering, etc.
            </li>
            <li className="py-2">
              <span className="italic">`getStaticProps`</span>,{" "}
              <span className="italic">`getStaticPath`</span>,{" "}
              <span className="italic">`getServerSideProps`</span>,
              <span className="italic">`useSWR(key, fetcher)`</span>,{" "}
              <span className="italic">`etc`.</span>
            </li>
            <li className="py-2">
              Typescript -{" "}
              <span className="italic">
                `const App: React.FunctionComponent`{"<Props>"} = ({"{}"}
              </span>
              ) {" => {}"}.
            </li>
            <li className="py-2">
              DRF servers backend, handles JWT authentication, implements group
              based authorization and customized User model.
            </li>
            <li className="py-2">
              Tailwind CSS - Utility-first CSS framework for rapidly building
              custom designs.
            </li>
          </div>
        </div>
        <footer className="flex justify-center items-center text-white light:text-black h-16">
          <img alt="logo" src="/favicon.ico" className="h-4 w-4 mr-2" />
          <Link href="/">
            <a className="text-xs transition duration-500 ease-in-out hover:text-orange-500 underline">
              Go Back
            </a>
          </Link>
        </footer>
      </div>
      <div>
        <footer className="flex justify-center items-center text-white light:text-black h-16">
          <Link href="https://home.we0mmm.site">
            <a className="text-xs transition duration-500 ease-in-out hover:text-orange-500">
              ©️ 2020 | We0mmm
            </a>
          </Link>
        </footer>
      </div>
    </div>
  );
};
export default About;
