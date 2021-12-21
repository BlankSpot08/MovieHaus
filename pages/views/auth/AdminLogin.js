import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";

import HomeNav from "../../../components/HomeNav";
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
    <div>
      <Head>
        <title>Admin Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HomeNav>
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
                      Login
                    </h1>
                    <form onSubmit={formik.handleSubmit}>
                      <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="U  sername"
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
        </div>
      </HomeNav>
    </div>
  );
};

export default AdminLogin;
