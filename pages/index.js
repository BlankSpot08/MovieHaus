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
export default function HomeApp() {
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
    <div className="bg-center bg-no-repeat bg-cover h-screen relative pattern">
      <div className=" bg-opacity-50 bg-black h-full">
        <div className="container mx-auto">
          <HomeNav />

          <div className="h-screen flex items-center justify-center">
            <div className="mx-2 text-center">
              <h1 className="text-gray-100 font-extrabold text-4xl xs:text-5xl md:text-6xl">
                <span className="text-white">Unlimited</span> Movies for
                entertainment,
              </h1>
              <h2 className="text-gray-200 font-extrabold text-3xl xs:text-4xl md:text-6xl leading-tight">
                education, and more.
              </h2>

              <div className="inline-flex  items-center mt-2 -mx-2 pt-8 my-2 sm:mt-0 w-full text-center">
                {/* <Link href="/views/auth/AdminLogin">
                  <a className="px-3 py-2 mx-2 text-lg bg-pink-400 font-semibold text-white transition-colors duration-200 transform border-2  hover:bg-white hover:text-pink-400">
                    Admin
                  </a>
                </Link>

                <Link href="/views/auth/Login">
                  <a className="px-3 w-100 py-2 text-lg font-semibold bg-pink-400 text-white transition-colors duration-200 transform border-2  hover:bg-white hover:text-pink-400">
                    User
                  </a>
                </Link> */}

                <Link href="/views/auth/AdminLogin">
                  <a className="ml-auto">
                    <button
                      type="button"
                      className="w-full px-7 py-3 bg-pink-100 rounded-lg text-lg text-pink-400 tracking-wide font-semibold font-sans"
                    >
                      Admin
                    </button>
                  </a>
                </Link>
                <div className="mx-2" />
                <Link href="/views/auth/Login">
                  <a className="mr-auto">
                    <button
                      type="button"
                      className="w-full px-10 bg-pink-100 rounded-lg  py-3 text-lg text-pink-400 tracking-wide font-semibold font-sans"
                    >
                      User
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
