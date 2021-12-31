import React, { useEffect, useSTate } from "react";
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
const MovieCard1 = (props) => {
  const { values, trailerClick, modalClick, scheduleClick } = props;
  return (
    <div>
      <div className="flex flex-col justify-center  w-full mx-10 border-r-8 my-10  ">
        <div
          onClick={modalClick}
          className="cursor-pointer relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl   hover:blur-lg hover:bg-gray-800"
        >
          <div className="w-full md:w-1/3  grid place-items-center">
            <img
              src={values.image_src}
              alt="tailwind logo"
              className="rounded-xl  "
            />
            <div className=" flex flex-row  pb-10 space-x-4 w-full my-10 ">
              <a
                className="flex items-center py-2 px-4 w-full rounded-full mx-auto text-white bg-red-500 hover:bg-red-700 "
                onClick={scheduleClick}
                data-unsp-sanitized="clean"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div className="text-sm text-white ml-2 select-none w-full">
                  Schedule
                </div>
              </a>
            </div>
          </div>
          <div className="w-full md:w-2/3 flex flex-col space-y-10 p-3">
            <div className="flex justify-between item-center">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="text-gray-600 font-bold text-sm ml-1">
                  {values.ratings}
                </p>
              </div>
            </div>
            <div className=" justify-between my-10">
              {values.genres &&
                values.genres.slice(0, 4).map((genre, index) => (
                  <span
                    key={index}
                    className="px-1 py-1 text-xs m-1 text-white uppercase bg-red-500 rounded-full "
                  >
                    {genre}
                  </span>
                ))}
            </div>

            <h3 className="font-black text-white md:text-3xl text-xl ">
              {values.title}
            </h3>
            <p className="md:text-lg text-gray-200 text-base ">
              {values.description}
            </p>
            <div className="flex flex-row justify-between datos text-white">
              <div className="flex flex-col datos_col">
                <div className="popularity">{values.ratings}</div>
                <div className="text-sm text-gray-400">Popularity:</div>
              </div>
              <div className="flex flex-col datos_col">
                <div className="release">
                  {releaseDateFormat(values.release_date)}
                </div>
                <div className="text-sm text-gray-400">Release date:</div>
              </div>
              <div className="flex flex-col datos_col">
                <div className="release">{durationFormat(values.duration)}</div>
                <div className="text-sm text-gray-400">Runtime:</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard1;
