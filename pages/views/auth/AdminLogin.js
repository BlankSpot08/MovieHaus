import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";

import HomeNav from "../../../components/navigations/HomeNav";
toast.configure();
const AdminLogin = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit(values) {
      axios
        .post("/api/auth/admin_login", values)
        .then((res) => {
          if (res.data.success) {
            router.push("/views/admin/Home");
          } else {
            const error = res.data.message;
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
      <Head>
        <title>Admin Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-opacity-50 bg-black h-full">
        <div className="container mx-auto h-full">

          <HomeNav />
          <div className="flex justify-center items-center h-full">
            <div className="lg:w-2/5 md:w-1/2 w-2/3">
              <form className="bg-black p-10 rounded-lg shadow-lg min-w-full bg-opacity-20" onSubmit={formik.handleSubmit}>
                <h1 className="text-center text-2xl mb-6 text-white font-bold font-sans">Login</h1>
                <div>
                  <label className="text-white font-semibold block my-3 text-md" for="username">Username</label>
                  <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    sx={{ my: 2 }}
                    id="username"
                    name="username"
                    type="text"
                    label="Username"
                    placeholder="username" />
                </div>

                <div>
                  <label className="text-white font-semibold block my-3 text-md" for="password">Password</label>
                  <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    sx={{ my: 2 }}
                    placeholder="password" />
                </div>

                <button type="submit" className="w-full mt-6 bg-pink-400 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans" type="submit">Login</button>
              </form>
            </div>
          </div>

          {/* <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
              <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                  <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
                        Admin Login
                      </h1>
                      <form onSubmit={formik.handleSubmit}>
                        <TextField
                          fullWidth
                          id="username"
                          name="username"
                          label="Username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          sx={{ my: 2 }}
                        />
                        <TextField
                          fullWidth
                          id="password"
                          name="password"
                          label="Password"
                          type="password"
                          autoComplete="current-password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          sx={{ my: 2 }}
                        />
                        <Button
                          color="primary"
                          variant="contained"
                          fullWidth
                          type="submit"
                        >
                          Submit
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div >
  );
};

export default AdminLogin;
