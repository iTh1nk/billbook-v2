import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { LoginForm } from "./LoginForm";
import { Rnotes } from "./Rnotes";
import { Welcome } from "./Welcome";
import { AssignContext } from "./AssignContext";
import Axios from "axios";
import IsLoading from "./IsLoading";
import useLoggedIn from "./hooks/useLoggedIn";
import moment from "moment";

interface LayoutProps {
  title?: string;
  showLogin?: boolean;
}
let welcomeDismiss: string = "";

export const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  title,
  showLogin,
}) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [isModalNotes, setIsModalNotes] = useState<boolean>(false);
  const [isModalLogin, setIsModalLogin] = useState<boolean>(false);
  const [isModalWelcome, setIsModalWelcome] = useState<boolean>(true);
  const { isAuthenticated, userLoggedIn, isLoading } = useLoggedIn(null);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  const chkFirstTime = useRef(true);
  useEffect(() => {
    welcomeDismiss = localStorage.getItem("welcomeDismiss");
    setIsModalWelcome(welcomeDismiss !== "yes");
    if (!chkFirstTime.current) setIsModalLogin(!isModalLogin);
    if (chkFirstTime.current) chkFirstTime.current = false;
  }, [showLogin]);

  if (isLoading || logoutLoading) return <IsLoading />;

  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>{title || "Billbook"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="This is an app for bill management."
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <header className="z-10 fixed top-0 w-full text-gray-500 light:text-gray-900 light:font-semibold bg-gray-900 light:bg-gray-200 p-3 md:flex md:justify-start">
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
              <a
                className={
                  (isAuthenticated ? "" : " hidden ") +
                  " text-green-400 light:text-green-800 transition duration-500 ease-in-out hover:text-green-200 light:hover:text-gray-500 md:ml-4"
                }
              >
                Hi, {userLoggedIn.username}
              </a>
            </Link>
          </div>
          <div className="flex items-center md:absolute md:right-0">
            <Link href="/about">
              <a className="mr-4 opacity-25 light:opacity-50 transition duration-300 hover:opacity-100">
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
          <div
            onClick={() => {
              // setIsAuthenticated(false);
              setLogoutLoading(true);
              localStorage.removeItem("auth");
              window.location.replace("/");
            }}
          >
            <a
              className={
                (isAuthenticated ? "" : " hidden ") +
                " text-red-500 block mt-5 md:mt-2 ml-4 transition duration-500 ease-in-out hover:text-red-300 lg:light:text-black cursor-pointer"
              }
            >
              Logout
            </a>
          </div>
          {userLoggedIn.username === "mac" ? (
            <Link href="/admin">
              <a
                className={
                  (isAuthenticated ? "" : " hidden ") +
                  " block mt-5 md:mt-2 ml-4 transition duration-500 ease-in-out hover:text-white lg:light:text-black"
                }
              >
                Admin
              </a>
            </Link>
          ) : null}
          <div onClick={(e) => setIsModalLogin(!isModalLogin)}>
            <a
              className={
                (isAuthenticated ? " hidden " : "") +
                " block mt-5 md:mt-2 ml-4 transition duration-500 ease-in-out hover:text-white light:hover:text-gray-600 lg:light:text-black cursor-pointer"
              }
            >
              Login
            </a>
          </div>
          {/* <div
            onClick={(e) => setIsModalNotes(!isModalNotes)}
            className="block mt-5 md:mt-2 mb-3 md:mb-0 ml-4 md:ml-10 transition duration-500 ease-in-out hover:text-white lg:light:text-black cursor-pointer"
          >
            _NEXT
          </div> */}
        </nav>
      </header>

      {/* <Welcome
        isModal={isModalWelcome}
        cb={(e) => {
          setIsModalWelcome(!isModalWelcome);
          localStorage.setItem("welcomeDismiss", "yes");
        }}
      /> */}
      <Rnotes
        isModal={isModalNotes}
        cb={(e) => setIsModalNotes(!isModalNotes)}
      />
      <LoginForm
        isModal={isModalLogin}
        cb={(e) => setIsModalLogin(!isModalLogin)}
      />

      {/* Web Body */}
      {children}
      {/* Web Body */}

      <footer className="flex justify-center items-center text-white light:text-black h-16">
        <Link href="https://home.we0mmm.site">
          <a className="text-xs transition duration-500 ease-in-out hover:text-orange-500">
            ©️ {moment().year()} | We0mmm
          </a>
        </Link>
      </footer>
    </div>
  );
};
