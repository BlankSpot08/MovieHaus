import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar, CardMedia } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import Iframe from "react-iframe";
import UserNav from "../../../components/navigations/UserNav";

toast.configure();
const Movie = () => {
  const [getMovie, setMovie] = useState([]);
  const router = useRouter();

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
    controls: 0,
    autoplay: 1,
  };

  const created = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const title = queryParams.get("title");

    const query = router.query;
    const url = `/api/user/movie?title=${title}`;

    axios
      .get(url)
      .then((res) => {
        const data = res.data;

        setMovie(data.value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    created();
  }, []);

  return (
    <div className="bg-pink-100">
      <Head>
        <title>Movie</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <UserNav />
      {
        <main className="relative container mx-auto px-0">
          <div className="relative mx-auto top-0 pt-[17%] overflow-hidden w-full">
            <img
              className="absolute inset-0 object-cover object-top w-full h-full filter blur"
              src={getMovie.image_src}
              alt=""
            />
          </div>

          <div className="mt-[-10%] w-1/2 mx-auto">
            <div className="relative pt-[56.25%] overflow-hidden rounded-2xl">
              <img
                className="w-full h-full absolute inset-0 object-cover"
                src={getMovie.image_src}
                alt=""
              />
            </div>
          </div>

          <article className="max-w-prose mx-auto py-8">
            <div className="container bg-grey-lighter">
              <div className="sm:flex mb-4">
                <div className="sm:w-full h-auto">
                  <h1 className="text-2xl font-bold">{getMovie.title}</h1>
                  <h2 className="mt-2 text-sm text-gray-500">
                    {getMovie.release_date &&
                      getMovie.release_date.substring(0, 4)}{" "}
                    {getMovie.ratings}+
                  </h2>
                </div>

                <div className="sm:w-1/2 h-auto sm:mt-0 mt-8">
                  <h2 className="mt-2 text-sm text-gray-500">
                    Directors:{" "}
                    {getMovie.directors && getMovie.directors.join(", ")}
                  </h2>
                  <h2 className="mt-2 text-sm text-gray-500">
                    Casts: {getMovie.actors && getMovie.actors.join(", ")}
                  </h2>
                  <h2 className="mt-2 text-sm text-gray-500">
                    Genres: {getMovie.genres && getMovie.genres.join(", ")}
                  </h2>
                  <h2 className="mt-2 text-sm text-gray-500">
                    Studios: {getMovie.studios && getMovie.studios.join(", ")}
                  </h2>
                </div>
              </div>
            </div>

            <p className="mt-6">{getMovie.description}</p>
          </article>
        </main>
      }
    </div>
  );
};

export default Movie;
