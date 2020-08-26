// import '../styles/globals.css'
import "../styles/index.css";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <Component {...pageProps} />;
}

export default MyApp;
