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
        <div class="relative -mx-4 top-0 bg-black">
          {/* {
            getMovie && < img class="absolute inset-0 object-cover object-top w-full h-full filter blur" src={getMovie.image_src} alt="" />
          } */}
          <Iframe url={`${getMovie.video_src}?autoplay=1&mute=1&playlist=O5jRE6Za9e8&loop=1`}
            width="100%"
            height="500px"
            id="myId"
            className="myClassname"
            display="initial"
            frameBorder='0'
            position="relative" />

          <div className="w-full top-0 absolute h-500">
            x
          </div>
        </div>

        <div class="mt-[-10%] w-1/2 mx-auto">
          <div class="relative pt-[56.25%] overflow-hidden rounded-2xl">
            {
              getMovie && <img class="w-full h-full absolute inset-0 object-cover" src={getMovie.image_src} alt="" />
            }
          </div>
        </div>

        <article class="max-w-prose mx-auto py-8">
          <h1 class="text-2xl font-bold">{getMovie.title}</h1>
          <h2 class="mt-2 text-sm text-gray-500">{getMovie.release_date}</h2>

          <p class="mt-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare justo felis, nec lobortis augue luctus et. Sed nibh metus, posuere non elit nec, rutrum imperdiet justo. Cras ut nunc felis. Nunc rhoncus faucibus ultrices. Suspendisse ut consectetur nulla. Pellentesque mattis, ligula at pellentesque tempor, nisl elit porta lectus, eu bibendum arcu purus eget urna. Phasellus euismod at elit vel convallis. Nullam porttitor mauris risus, eget hendrerit nisl tincidunt vel. Phasellus at dolor dui. Aliquam commodo tellus dolor. Sed purus nunc, laoreet quis elementum at, elementum at nisl. Praesent ut rhoncus orci. Curabitur sit amet est non dolor porttitor facilisis. Nullam velit tortor, iaculis eget vehicula quis, sollicitudin id magna.</p>
        </article>
      </main>


    </div>
  );
};

export default Movie;
