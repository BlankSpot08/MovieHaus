import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import AdminNav from "../../../components/navigations/AdminNav";
import PublicNav from "../../../components/navigations/PublicNav";
import Head from "next/head";
import axios from "axios";
import CreateSeat from "./seats/CreateSeat";
import UpdateSeat from "./seats/UpdateSeat";
toast.configure();

const Seat = () => {
  const router = useRouter();
  const navs = [
    {
      title: "Create Seat",
      component: <CreateSeat />,
    },
    {
      title: "Update Seat",
      component: <UpdateSeat />,
    },
  ];
  return (
    <AdminNav>
      <Head>
        <title> Seats </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminNav>
        <PublicNav navs={navs} />
      </AdminNav>
    </AdminNav>
  );
};

export default Seat;
