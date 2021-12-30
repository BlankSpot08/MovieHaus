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

const Movie = (props) => {
  const { values, trailerClick, modalClick, scheduleClick } = props;
  return (
    <div>
      <div>
        <div
          onClick={modalClick}
          className="flex max-w-sm w-full  shadow-md rounded-lg overflow-hidden mx-auto h-1/4 select-none "
        >
          <div className="w-2 bg-gray-900"></div>

          <div
            className="overflow-hidden rounded-xl relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card"
            data-movie-id="438631"
          >
            <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
            <div
              className="relative cursor-pointer group z-10 px-10 pt-10 space-y-6 movie_info"
              data-lity=""
              href="https://www.youtube.com/embed/aSHs224Dge0"
            >
              <div className="poster__info align-self-end w-full">
                <div className="h-32"></div>
                <div className="space-y-6 detail_info">
                  <div className="flex flex-col space-y-2 inner">
                    <a
                      className="relative flex items-center w-min flex-shrink-0 p-1 text-center text-white bg-red-500 rounded-full group-hover:bg-red-700"
                      data-unsp-sanitized="clean"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <div
                        onClick={trailerClick}
                        className="absolute transition opacity-0 duration-500 ease-in-out transform group-hover:opacity-100 group-hover:translate-x-16 text-xl font-bold text-white group-hover:pr-2"
                      >
                        Trailer
                      </div>
                    </a>
                    <h3
                      className="text-2xl font-bold text-white"
                      data-unsp-sanitized="clean"
                    >
                      {values.title}
                    </h3>
                    <div className="mb-0 text-lg text-gray-400  ">
                      {values.genres &&
                        values.genres.map((genre, index) => (
                          <a key={index}> {genre + " ,"}</a>
                        ))}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between datos">
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
                      <div className="release">
                        {durationFormat(values.duration)}
                      </div>
                      <div className="text-sm text-gray-400">Runtime:</div>
                    </div>
                  </div>
                  <div className="flex flex-col overview">
                    <div className="flex flex-col"></div>
                    <div className="text-xs text-gray-400 mb-2">Overview:</div>
                    <p className="text-xs text-gray-100 mb-6">
                      {values.description}
                    </p>
                  </div>
                </div>
                <div
                  data-countdown="2021-09-15"
                  className="absolute inset-x-0 top-0 pt-5 w-full mx-auto text-2xl uppercase text-center drop-shadow-sm font-bold text-white"
                >
                  {days_between(values.release_date, new Date())}
                </div>
              </div>
            </div>
            <img
              className="absolute inset-0 transform w-full -translate-y-4"
              src={values.image_src}
              style={{ filter: "grayscale(0)" }}
            />
          </div>
        </div>
      </div>
      <div className="poster__footer flex flex-row relative pb-10 space-x-4 z-50">
        <a
          className="flex items-center py-2 px-4 rounded-full mx-auto text-white bg-red-500 hover:bg-red-700 "
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
          <div className="text-sm text-white ml-2 select-none "> Schedule</div>
        </a>
      </div>
    </div>
  );
};

export default Movie;
