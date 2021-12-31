import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar, CardMedia } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import Iframe from "react-iframe";
import UserNav from "../../../components/navigations/UserNav";
import MovieHeader from "../../../components/cards/MovieHeader";
import MovieFooter from "../../../components/cards/Footer";

function youtube_parser(url) {
  if (!url) return "";
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}
import dateFormat from "dateformat";
const days_between = (date1, date2) => {
  date1 = Date.parse(date1);
  date2 = Date.parse(date2);
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const differenceMs = Math.abs(date1 - date2);
  const result = Math.round(differenceMs / ONE_DAY);
  if (result <= 0) return "Now Showing";
  return result + " Days Left";
};

const releaseDateFormat = (date) => {
  date = Date.parse(date);
  return dateFormat(date, "mmmm dS, yyyy");
};

const durationFormat = (date) => {
  date = Date.parse(date);
  return dateFormat(date, "h:MM:ss");
};

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
    <div className="bg-black h-full w-screen">
      <Head>
        <title>Movie</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {typeof getMovie !== "undefined" && (
        <main className="relative  px-0">
          <div className="relative top-10 pt-[17%] overflow-hidden w-screen">
            <div className="absolute w-screen h-screen -top-24">
              <iframe
                src={`https://www.youtube.com/embed/${youtube_parser(
                  getMovie.video_src
                )}?rel=0&amp;autoplay=1&mute=1&loop=1`}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <div className="absolute h-full w-full  top-0 inset-0 z-0 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
            </div>
          </div>
          <div className="absolute h-screen w-full -top-96  transition duration-300 ease-in-out "></div>
          <div className="absolute h-screen w-full top-0 mt-20 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>

          <div className="mt-[-10%] w-1/2 mx-auto">
            <div className="relative pt-[56.25%] overflow-hidden rounded-2xl">
              <img
                className="w-full h-full absolute inset-0 object-cover"
                src={getMovie.image_src}
                alt=""
              />
            </div>

            <div className="my-10 relative">
              <h1 className="my-10 text-3xl text-center font-semibold text-white text-white">
                {getMovie.title}
              </h1>
              <div className="flex justify-between datos relative w-96 m-auto ">
                <div className="flex flex-col datos_col">
                  <div className="popularity text-white text-lg font-semibold">
                    {getMovie.ratings}
                  </div>
                  <div className="text-sm text-gray-400">Popularity:</div>
                </div>
                <div className="flex flex-col datos_col">
                  <div className="release text-white text-lg font-semibold">
                    {releaseDateFormat(getMovie.release_date)}
                  </div>
                  <div className="text-sm text-gray-400">Release date:</div>
                </div>
                <div className="flex flex-col text-white text-lg font-semibold">
                  <div className="release">
                    {durationFormat(getMovie.duration)}
                  </div>
                  <div className="text-sm text-gray-400">Runtime:</div>
                </div>
              </div>
              <div className="my-10">
                <div className=" z-10 relative w-3/4 m-auto text-center ">
                  {getMovie.genres &&
                    getMovie.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="px-1 py-1 text-xs m-1 text-white uppercase bg-red-500 rounded-full "
                      >
                        {genre}
                      </span>
                    ))}
                  <div className="my-10">
                    {getMovie.description && (
                      <div className="flex flex-col overview">
                        <div className="flex flex-col"></div>
                        <div className=" text-gray-400 m-5 text-lg">
                          Overview:
                        </div>
                        <p className="text-lg text-gray-100 mb-6">
                          {getMovie.description}
                        </p>
                      </div>
                    )}
                    <div className=" my-10 justify-between">
                      <span className="px-3 py-1 text-sm m-1 text-white uppercase ">
                        Director :
                      </span>
                      {getMovie.directors &&
                        getMovie.directors.map((director, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm m-1 text-white uppercase "
                          >
                            {director}
                          </span>
                        ))}
                    </div>
                    <div className=" my-10 justify-between">
                      <span className="px-3 py-1 text-sm m-1 text-white uppercase ">
                        Actors :
                      </span>
                      {getMovie.actors &&
                        getMovie.actors.map((actor, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm m-1 text-white uppercase "
                          >
                            {actor}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
      <UserNav />
      <div className="">
        <MovieFooter />
      </div>
    </div>
  );
};

export default Movie;
