import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import HomeNav from "../components/navigations/HomeNav";

toast.configure();
export default function Home() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit(values) {
      axios
        .post("/api/auth/login", values)
        .then((res) => {
          if (res.data.success) {
            router.push("/views/admin/Home");
            toast.success("Log in successfully");
          } else {
            const error = res.data.message;
            console.log(error);
            for (const key in error) toast.error(error[key]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <header className="bg-gray-900 pattern">
      <div className="container px-6 mx-auto">
        <HomeNav />

        <div className="flex flex-col items-center py-6 lg:h-[32rem] lg:flex-row">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-semibold text-gray-100">Brand</h2>

            <h3 className="text-2xl font-semibold text-gray-100">
              Hello <span className="text-blue-400">Guest</span>
            </h3>

            <p className="mt-3 text-gray-100">
              Lorem ipsum dolor sit amet, consectetur adipiscing.
            </p>
          </div>

          <div className="flex mt-8 lg:w-1/2 lg:justify-end lg:mt-0">
            <div className="max-w-sm bg-white rounded-lg dark:bg-gray-800">
              <div className="p-5 text-center">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white fo">
                  Sign In
                </h2>

                <form onSubmit={formik.handleSubmit}>
                  <div className="mt-4">
                    <input
                      className="block w-full px-4 py-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      id="username"
                      name="username"
                      aria-label="Username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                    <input
                      className="block w-full px-4 py-2 mt-4 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      id="password"
                      name="password"
                      type="password"
                      aria-label="Password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Link href="/views/auth/AdminLogin">
                      <a className="text-sm text-gray-600 dark:text-gray-200 hover:underline">
                        Register
                      </a>
                    </Link>
                    <button
                      type="submit"
                      className="px-4 py-2 font-semibold text-white transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-800 dark:focus:bg-gray-700"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
