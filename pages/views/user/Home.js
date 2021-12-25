import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import UserNav from "../../../components/navigations/UserNav";
toast.configure();


const Home = () => {
  const [getMovies, setMovies] = useState([]);
  const router = useRouter();

  const created = () => {
    const url = "/api/user/movie";
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        // let i;
        // for (i = 0; i < data.value.length; i++) {
        //   data.value[i]["label"] = data.value[i].seat_name;
        // }

        setMovies(data.value)
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
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <UserNav />
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Now Showing</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {getMovies.map((movie) => (
              <div key={movie.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={movie.image_src}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a onClick={() => {
                        router.push({
                          pathname: '/views/user/Movie',
                          query: { title: movie.title }
                        })
                      }}>
                        <span aria-hidden="true" className="absolute inset-0" />
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{movie.title}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">₱ {movie.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
};

export default Home;
