import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import UserNav from "../../../components/navigations/UserNav";
toast.configure();
const Schedule = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Schedule</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <UserNav />
      <p>Hello world!</p>
    </div>
  );
};

export default Schedule;
