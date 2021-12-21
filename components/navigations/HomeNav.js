import React, { useEffect, useState } from "react";
import Link from "next/link";
const HomeNav = ({ children }) => {
  return (
    <>
      <nav className="flex flex-col py-2 sm:flex-row sm:justify-between sm:items-center bg-gray-900">
        <div>
          <Link href="/">
            <a
              href="#"
              className="text-2xl font-semibold text-white hover:text-gray-300"
            >
              Brand
            </a>
          </Link>
        </div>

        <div className="flex items-center mt-2 -mx-2 sm:mt-0">
          <Link href="/views/auth/Login">
            <a className="px-3 py-1 text-sm font-semibold text-white transition-colors duration-200 transform border-2 rounded-md hover:bg-gray-700">
              User
            </a>
          </Link>
          <Link href="/views/auth/AdminLogin">
            <a className="px-3 py-2 mx-2 text-sm font-semibold text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-gray-800">
              Admin
            </a>
          </Link>
        </div>
      </nav>

      {children}
    </>
  );
};

export default HomeNav;
