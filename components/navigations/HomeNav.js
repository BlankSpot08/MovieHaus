import React, { useEffect, useState } from "react";
import Link from "next/link";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
const HomeNav = (props) => {
  const { children, loading } = props;
  return (
    <>
      <nav className="absolute flex flex-col py-2 sm:flex-row sm:justify-between sm:items-center px-12">
        <div>
          <Link href="/">
            <a className="text-2xl font-semibold text-white">MovieHaus</a>
          </Link>
        </div>
      </nav>

      {children}

      {loading && (
        <div className="fixed top-0 left-0 w-full">
          <LinearProgress color="secondary" />
        </div>
      )}
    </>
  );
};

export default HomeNav;
