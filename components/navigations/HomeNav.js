import React, { useEffect, useState } from "react";
import Link from "next/link";
const HomeNav = ({ children }) => {
  return (
    <>
      <nav className="absolute flex flex-col py-2 sm:flex-row sm:justify-between sm:items-center px-12">
        <div>
          <Link href="/">
            <a href="#" className="text-2xl font-semibold text-white">
              MovieHaus
            </a>
          </Link>
        </div>
      </nav>

      {children}
    </>
  );
};

export default HomeNav;
