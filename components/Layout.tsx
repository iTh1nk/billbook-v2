import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

type LayoutProps = {
  title?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({ children, title }) => {
  const [isExpand, setIsExpand] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isModalLogin, setIsModalLogin] = useState(false);

  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header className="fixed top-0 w-full text-gray-500 bg-gray-900 light:bg-gray-300 p-3 md:flex md:justify-start">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <img
                className="w-12 h-10 inline-block cursor-pointer"
                src="/favicon.ico"
                alt="App Logo"
              />
            </Link>
          </div>
          <div>
            <Link href="/profile">
              <a className="text-green-400 light:text-green-600 transition duration-500 ease-in-out hover:text-green-200 md:ml-4">
                Hi, Mac
              </a>
            </Link>
          </div>
          <div className="flex items-center md:absolute md:right-0">
            <Link href="/about">
              <a className="mr-4">
                <img
                  className="lg:w-6 h-6 animate-spin-slow shadow rounded-full transition duration-500 ease-in-out"
                  src="/we0mmm-r.png"
                  alt="Avatar"
                />
              </a>
            </Link>
            <div onClick={(e) => setIsExpand(!isExpand)} className="md:hidden">
              {isExpand ? (
                <FontAwesomeIcon
                  className="text-gray-500 hover:text-white cursor-pointer mr-1"
                  icon={faTimes}
                />
              ) : (
                <FontAwesomeIcon
                  className="text-gray-500 hover:text-white cursor-pointer"
                  icon={faBars}
                />
              )}
            </div>
          </div>
        </div>

        <nav className={(isExpand ? "" : " hidden ") + "md:flex"}>
          <Link href="/profile">
            <a className="block mt-2 ml-4 transition duration-500 ease-in-out hover:text-white lg:light:text-black">
              Profile
            </a>
          </Link>
          <div onClick={(e) => setIsModalLogin(!isModalLogin)}>
            <a className="block mt-2 ml-4 transition duration-500 ease-in-out hover:text-white lg:light:text-black cursor-pointer">
              Login
            </a>
          </div>
          <div
            onClick={(e) => setIsModal(!isModal)}
            className="block mt-2 ml-4 transition duration-500 ease-in-out hover:text-white lg:light:text-black cursor-pointer"
          >
            Notes
          </div>
        </nav>
      </header>
      <Modal
        title="Release Notes"
        content=""
        isModal={isModal}
        cbIsModal={(e) => setIsModal(!isModal)}
      />
      <Modal
        title="Login"
        content=""
        isModal={isModalLogin}
        isNotConfirm={true}
        cbIsModal={(e) => setIsModalLogin(!isModalLogin)}
      />

      {/* Web Body */}
      {children}
      {/* Web Body */}

      <footer className="flex justify-center items-center text-white light:text-black h-16">
        <Link href="https://home.we0mmm.site">
          <a className="text-xs transition duration-500 ease-in-out hover:text-orange-500">
            ©️ 2020 | We0mmm
          </a>
        </Link>
      </footer>
    </div>
  );
};
export default Layout;
