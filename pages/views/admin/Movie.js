import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MuiPhoneNumber from "material-ui-phone-number";
import AdminNav from "../../../components/navigations/AdminNav";
import Table from "../../../components/Table";
import PublicNav from "../../../components/navigations/PublicNav";

const FormEdit = (props) => {
  const { editValues } = props;
  const router = useRouter();
  return (
    <div>
      <h1> HEllo </h1>
    </div>
  );
};

const FormAdd = () => {
  const router = useRouter();
  return (
    <div>
      <h1> HEllo </h1>
    </div>
  );
};

const FormDelete = (props) => {
  const { editValues, handleCloseDelete } = props;
  const router = useRouter();
  return (
    <div>
      <h1> HEllo </h1>
    </div>
  );
};
toast.configure();
const Movie = () => {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const headCells = [
    {
      id: "_id",
      numeric: false,
      disablePadding: false,
      label: "id",
      width: "20%",
    },
    {
      id: "price",
      numeric: false,
      disablePadding: false,
      label: "Price",
      width: "20%",
    },
    {
      id: "Duration",
      numeric: false,
      disablePadding: false,
      label: "Price",
      width: "20%",
    },
    {
      id: "Ratings",
      numeric: false,
      disablePadding: false,
      label: "Ratings",
      width: "20%",
    },
    {
      id: "genres",
      numeric: false,
      disablePadding: false,
      label: "Genre",
      width: "20%",
    },
    {
      id: "release_date",
      numeric: false,
      disablePadding: false,
      label: "Release Date",
      width: "20%",
    },
  ];
  const updateValues = () => {
    axios
      .get("/api/admin/movie")
      .then((res) => {
        if (res.data.success) setRows(res.data.value);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    updateValues();
  }, []);

  const navs = [
    {
      title: "Movies",
      component: (
        <Table
          title={"Movie Entry"}
          headCells={headCells}
          rows={rows}
          Edit={FormEdit}
          Delete={FormDelete}
          Add={FormAdd}
        />
      ),
    },
  ];
  return (
    <AdminNav>
      <Head>
        <title>Movies</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminNav>
        <PublicNav navs={navs} />
      </AdminNav>
    </AdminNav>
  );
};

export default Movie;
