import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import YouTube from "react-youtube";
import UserNav from "../../../components/navigations/UserNav";
import MovieCard from "../../../components/cards/Movie";
import MovieFooter from "../../../components/cards/Footer";
import theme from "../../../src/theme";
toast.configure();

const opts = {
  height: "500px",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

const Home = (props) => {
  const { classes } = props;
  const [getMovies, setMovies] = useState([]);
  const [selectedMoves, setSelectedMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const onSearch = (e) => {
    const url = "/api/user/movie";

    axios
      .get(url)
      .then((res) => {
        const data = res.data;

        if (query == null) {
          setLoading(data);
        } else {
          const searchResult = data.value.filter(find);
          setLoading(false);
          setMovies(searchResult);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function find(row) {
    const stringTemp = ["title"];
    const intTemp = ["price", "ratings"];
    const arrayTemp = ["genres", "directors", "studios", "actors"];
    let i;
    for (i = 0; i < stringTemp.length; i++) {
      if (row[stringTemp[i]].toLowerCase().includes(query.toLowerCase())) {
        return true;
      }
    }
    for (i = 0; i < intTemp.length; i++) {
      if (row[intTemp[i]] == query) {
        return true;
      }
    }
    for (i = 0; i < arrayTemp.length; i++) {
      let j;
      for (j = 0; j < row[arrayTemp[i]].length; j++) {
        if (row[arrayTemp[i]][j].toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }

  const created = () => {
    const url = "/api/user/movie";
    axios
      .get(url)
      .then((res) => {
        const data = res.data;

        setLoading(false);
        setMovies(data.value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    created();
  }, []);

  return (
    <div className="bg-black h-screen">
      <Head>
        <title>Home</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width "
        />
        <script
          defer
          src="https://unpkg.com/alpinejs@3.2.3/dist/cdn.min.js"
        ></script>
      </Head>

      <div className="absolute w-full h-screen -top-24">
        <iframe
          src="https://www.youtube.com/embed/wWO6bdVrmak?rel=0&amp;autoplay=1&mute=1&loop=1"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <div className="absolute h-full w-full  top-0 inset-0 z-0 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
      </div>
      <UserNav loading={loading} />

      <div className="text-center pb-12 px-24 pt-12">
        <div className="w-1/4 h-10 pl-3 pr-2  border border-white rounded-full flex justify-between items-center relative">
          <input
            type="search"
            name="search"
            id="search"
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={onSearch}
            placeholder="Search for movies, genre , title.... "
            className="appearance-none w-full bg-transparent text-white outline-none focus:outline-none active:outline-none"
          />
          <button
            type="submit"
            className="ml-1 outline-none focus:outline-none active:outline-none"
          >
            <svg
              fill="none"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>

      <main className="py-12 md:px-20 sm:px-14 px-6 bg-black">
        <div className="mt-6 md:flex space-x-6 ">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 text-red-600">
            <h2 className="text-2xl font-extrabold tracking-tight">
              Now Showing
            </h2>
            <div className="mt-6 grid grid-cols-11 gap-y-20 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {getMovies.map((movie, index) => (
                <div className="shadow-md" key={index}>
                  <MovieCard values={movie} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <MovieFooter />
    </div>
  );
};

export default Home;
