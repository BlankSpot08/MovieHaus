import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";

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

      <div className="w-full max-w-4xl px-4 py-3 mx-auto rounded-md shadow-md dark:bg-gray-800 z-10 relative -top-72 ">
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
          <h1 className="my-10 text-   font-semibold text-white">
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
      </div>
    </div>
  );
};

export default MovieModal;
