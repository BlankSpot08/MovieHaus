import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import AdminNav from "../../../components/navigations/AdminNav";
import Head from "next/head";
import axios from "axios";

toast.configure();
const Schedule = () => {
  const router = useRouter();
  return (
    <AdminNav>
      <div>
        <Head>
          <title>Schedule</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <p>Schedule</p>
      </div>
    </AdminNav>
  );
};

export default Schedule;
