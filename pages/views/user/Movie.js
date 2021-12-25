import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar, CardMedia } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import Iframe from 'react-iframe'
import UserNav from "../../../components/navigations/UserNav";

toast.configure();
const Movie = () => {
  const [getMovie, setMovie] = useState([]);
  const router = useRouter();

  const opts = {
    height: '500',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
    controls: 0,
    autoplay: 1
  };

  const created = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const title = queryParams.get("title");

    const query = router.query
    const url = `/api/user/movie?title=${title}`;

    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        console.log(data)

        setMovie(data.value)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    created();
  }, []);

  return (
    <div>
      <Head>
        <title>Movie</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <UserNav />

      <main class="relative container mx-auto bg-white px-4">
        <div class="relative -mx-4 top-0 pt-[17%] overflow-hidden w-full">
          <img class="absolute inset-0 object-cover object-top w-full h-full filter blur" src={getMovie.image_src} alt="" />
        </div>

        <div class="mt-[-10%] w-1/2 mx-auto">
          <div class="relative pt-[56.25%] overflow-hidden rounded-2xl">
            <img class="w-full h-full absolute inset-0 object-cover" src={getMovie.image_src} alt="" />
          </div>
        </div>

        <article class="max-w-prose mx-auto py-8">
          <div class="container bg-grey-lighter">
            <div class="sm:flex mb-4">

              <div class="sm:w-full h-auto">
                <h1 class="text-2xl font-bold">{getMovie.title}</h1>
                {/* <h2 class="mt-2 text-sm text-gray-500">{getMovie.release_date.substring(0, 4)} {getMovie.ratings}+</h2> */}
                <h2 class="mt-2 text-sm text-gray-500">2019 {getMovie.ratings}+</h2>
              </div>

              <div class="sm:w-1/2 h-auto sm:mt-0 mt-8">
                <h2 class="mt-2 text-sm text-gray-500">Directors: {getMovie.directors}</h2>
                <h2 class="mt-2 text-sm text-gray-500">Casts: {getMovie.actors}</h2>
                <h2 class="mt-2 text-sm text-gray-500">Genres: {getMovie.genres}</h2>
                <h2 class="mt-2 text-sm text-gray-500">Studios: {getMovie.studios}</h2>
              </div>
            </div>
          </div>

          <p class="mt-6">{getMovie.description}</p>
        </article>
      </main>

    </div>
  );
};

export default Movie;
