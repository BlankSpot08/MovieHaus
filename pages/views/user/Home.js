import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import UserNav from "../../../components/navigations/UserNav";

toast.configure();

const Home = () => {
  const [getMovies, setMovies] = useState([]);
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
          setLoading(data)
        } else {
          const searchResult = data.value.filter(find)

          setLoading(false);
          setMovies(searchResult);
          console.log(getMovies)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function find(row) {
    const stringTemp = ['title']

    const intTemp = ['price', 'ratings']
    const arrayTemp = ['genres', 'directors', 'studios', 'actors']

    let i
    for (i = 0; i < stringTemp.length; i++) {
      if (row[stringTemp[i]].toLowerCase().includes(query.toLowerCase())) {
        return true
      }
    }

    for (i = 0; i < intTemp.length; i++) {
      if (row[intTemp[i]] == query) {
        return true
      }
    }

    for (i = 0; i < arrayTemp.length; i++) {
      console.log(row[arrayTemp[i]])
      let j

      for (j = 0; j < row[arrayTemp[i]].length; j++) {
        if (row[arrayTemp[i]][j].toLowerCase().includes(query.toLowerCase())) {
          return true
        }
      }
    }

    return false
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
    <div className="bg-pink-100 h-screen">
      <Head>
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <UserNav loading={loading} />

      <div className="text-center pb-12 px-24 pt-12">
        <TextField
          fullWidth
          id="query"
          name="query"
          label="Search for movies, genre , title.... "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={onSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ManageSearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ my: 2 }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 text-pink-700">
        <h2 className="text-2xl font-extrabold tracking-tight">Now Showing</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {getMovies.map((movie, index) => (
            <div key={index} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={movie.image_src}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a
                      onClick={() => {
                        router.push({
                          pathname: "/views/user/Movie",
                          query: { title: movie.title },
                        });
                      }}
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                    </a>
                  </h3>
                  <p className="mt-1 text-sm ">{movie.title}</p>
                </div>
                <p className="text-sm font-medium">₱ {movie.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
