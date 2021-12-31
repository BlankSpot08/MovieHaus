import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
function youtube_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}
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
const MovieModal = (props) => {
  const { values, movies } = props;
  const router = useRouter();
  return (
    <div className=" mx-auto overflow-hidden bg-black rounded-lg shadow-md dark:bg-gray-800">
      <div className="object-cover w-full h-2/3 ">
        <div className=" relative w-full h-screen -top-56 ">
          <iframe
            src={`https://www.youtube.com/embed/${youtube_parser(
              values.video_src
            )}?rel=0&amp;autoplay=1&mute=1&loop=1`}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex justify-between datos z-10 relative -top-96 w-96 m-auto">
          <div className="flex flex-col datos_col">
            <div className="popularity text-white text-lg font-semibold">
              {values.ratings}
            </div>
            <div className="text-sm text-gray-400">Popularity:</div>
          </div>
          <div className="flex flex-col datos_col">
            <div className="release text-white text-lg font-semibold">
              {releaseDateFormat(values.release_date)}
            </div>
            <div className="text-sm text-gray-400">Release date:</div>
          </div>
          <div className="flex flex-col text-white text-lg font-semibold">
            <div className="release">{durationFormat(values.duration)}</div>
            <div className="text-sm text-gray-400">Runtime:</div>
          </div>
        </div>
      </div>

      <div className="absolute h-screen w-full -top-96  transition duration-300 ease-in-out "></div>
      <div className="absolute h-screen w-full top-0 mt-20 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>

      <div className="text-center w-full max-w-4xl px-4 py-3 mx-auto rounded-md shadow-md dark:bg-gray-800 z-10 relative -top-72 ">
        <div className=" justify-between">
          {values.genres &&
            values.genres.map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs m-1 text-white uppercase bg-red-500 rounded-full dark:bg-blue-300 dark:text-blue-900"
              >
                {genre}
              </span>
            ))}
        </div>
        <div>
          <h1 className="my-10 text-3xl   font-semibold text-white">
            {values.title}
          </h1>
          <div className=" my-10 justify-between">
            <span className="px-3 py-1 text-sm m-1 text-white uppercase ">
              Director :
            </span>
            {values.directors &&
              values.directors.map((director, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm m-1 text-white uppercase "
                >
                  {director}
                </span>
              ))}
          </div>
        </div>
        <p className="mt-2 text-lg m-10 text-gray-100 dark:text-gray-300">
          {values.description}
        </p>
        <button
          onClick={() =>
            router.push({
              pathname: "/views/user/Movie",
              query: { title: values.title },
            })
          }
          className=" w-full text-center flex items-center px-20 py-5 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
        >
          <svg
            className="w-5 h-5 mx-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          <span className="mx-1">Schedule</span>
        </button>
      </div>
    </div>
  );
};

export default MovieModal;
