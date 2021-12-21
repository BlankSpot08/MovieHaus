import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import AdminNav from "../../../components/AdminNav";
import Head from "next/head";
import axios from "axios";

toast.configure();
const Seat = () => {
  const router = useRouter();
  return (
    <AdminNav>
      <div>
        <Head>
          <title>Seat</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <p>Seat</p>
      </div>
    </AdminNav>
  );
};

export default Seat;
