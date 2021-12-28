import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import theme from "../src/theme";
import "../styles/globals.css";
import LinearProgress from "@mui/material/LinearProgress";

import { useRouter } from "next/router";
import Router from "next/router";
// import NProgress from "nprogress"; //nprogress module
// import "nprogress/nprogress.css"; //styles of nprogress

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    const handleStart = () => {
      console.log("START");
      setLoading(true);
    };
    const handleComplete = () => {
      console.log("END");
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <React.Fragment>
      <Head>
        <title>Chapters</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>

      {loading && (
        <div className="fixed top-0 left-0 w-full">
          <LinearProgress />
        </div>
      )}
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
