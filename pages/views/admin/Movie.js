import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

// Components
import AdminNav from "../../../components/navigations/AdminNav";
import Table from "../../../components/Table";
import PublicNav from "../../../components/navigations/PublicNav";
import AddMovie from "./movie/AddMovie";
import DeleteMovie from "./movie/DeleteMovie";
import EditMovie from "./movie/EditMovie";
import AddMovieDate from "./movie/AddMovieDate";
import DeleteMovieDate from "./movie/DeleteMovieDate";
import EditMovieDate from "./movie/EditMovieDate";

toast.configure();
const Movie = () => {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const headCells = [
    {
      id: "_id",
      numeric: false,
      disablePadding: false,
      label: "id",
      width: "20%",
    },
    {
      id: "title",
      numeric: false,
      disablePadding: false,
      label: "Title",
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
      id: "ratings",
      numeric: false,
      disablePadding: false,
      label: "Ratings",
      width: "20%",
    },
    {
      id: "directors",
      numeric: false,
      disablePadding: false,
      label: "Directors",
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
  const subHeadCells = [
    {
      id: "release_date",
      numeric: false,
      disablePadding: false,
      label: "Release Date",
      width: "20%",
    },
    {
      id: "release_date1",
      numeric: false,
      disablePadding: false,
      label: "Release Date",
      width: "20%",
    },
    {
      id: "release_date2",
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
        console.log(res.data);
        if (res.data.success) setRows(res.data.value);
        setLoading(false);
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
          onUpdate={updateValues}
          rows={rows}
          Edit={EditMovie}
          Delete={DeleteMovie}
          Add={AddMovie}
          dropDown={true}
          subTitle={"Add Schedule"}
          subHeadCells={subHeadCells}
          SubEdit={EditMovieDate}
          SubDelete={DeleteMovieDate}
          SubAdd={AddMovieDate}
        />
      ),
    },
  ];
  return (
    <>
      <Head>
        <title>Movies</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminNav loading={loading}>
        <PublicNav navs={navs} />
      </AdminNav>
    </>
  );
};

export default Movie;
