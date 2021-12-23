import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MuiPhoneNumber from "material-ui-phone-number";
import AdminNav from "../../../components/navigations/AdminNav";
import Table from "../../../components/Table";
import PublicNav from "../../../components/navigations/PublicNav";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import frLocale from "date-fns/locale/fr";
import ruLocale from "date-fns/locale/ru";
import arSaLocale from "date-fns/locale/ar-SA";
import enLocale from "date-fns/locale/en-US";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TimePicker from "@mui/lab/TimePicker";
import Stack from "@mui/material/Stack";
import DateTimePicker from "@mui/lab/DateTimePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import Autocomplete from "@mui/material/Autocomplete";
const genres = [
  "Action",
  "Adventure",
  "Animated",
  "Biography",
  "Comedy",
  "Crime",
  "Dance",
  "Disaster",
  "Documentary",
  "Drama",
  "Erotic",
  "Family",
  "Fantasy",
  "Found Footage",
  "Historical",
  "Horror",
  "Independent",
  "Legal",
  "Live Action",
  "Martial Arts",
  "Musical",
  "Mystery",
  "Noir",
  "Performance",
  "Political",
  "Romance",
  "Satire",
  "Science Fiction",
  "Short",
  "Silent",
  "Slasher",
  "Sports",
  "Spy",
  "Superhero",
  "Supernatural",
  "Suspense",
  "Teen",
  "Thriller",
  "War",
  "Western",
];
const FormEdit = (props) => {
  const { editValues, handleCloseEdit } = props;
  const router = useRouter();
  const [directors, setDirectors] = useState(editValues.directors);
  const [actors, setActors] = useState(editValues.actors);
  const [studios, setStudios] = useState(editValues.studios);
  const formik = useFormik({
    initialValues: {
      ...editValues,
    },
    async onSubmit(values) {
      await axios
        .put(`/api/admin/movie?id=${values._id}`, values)
        .then((res) => {
          if (res.data.success == true) {
            handleCloseEdit();
            toast.success("success");
          } else {
            const error = res.data.message;
            for (const key in error) toast.error(error[key]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const [imageSrc, setimageSrc] = useState(
    editValues.image_src ? editValues.image_src : null
  );
  const imageSrcSelect = (e) => {
    const file = e.target.files[0];
    if (typeof file !== "undefined") {
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        formik.values.image_src = reader.result;
        setimageSrc(reader.result);
      };
    }
  };

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
          Student Edit
        </h1>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <Avatar
                  alt="admin profile picture"
                  src={imageSrc}
                  align="center"
                  sx={{ bottom: 100, width: 150, height: 256, mt: 1, mb: 1 }}
                  style={{ borderRadius: 19 }}
                />
                <form onSubmit={formik.handleSubmit}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ width: 250, my: 1 }}
                      startIcon={<UploadFileIcon />}
                    >
                      Upload Movie Cover
                      <input
                        accept="image/*"
                        type="file"
                        hidden
                        name="image_src"
                        file={formik.values.image_src}
                        onChange={(e) => imageSrcSelect(e)}
                      />
                    </Button>
                    <TextField
                      fullWidth
                      id="title"
                      name="title"
                      label="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      sx={{ my: 1 }}
                    />
                    <TextField
                      fullWidth
                      id="video_src"
                      name="video_src"
                      label="Video Link"
                      value={formik.values.video_src}
                      onChange={formik.handleChange}
                      sx={{ my: 1 }}
                    />
                    <TextField
                      fullWidth
                      id="price"
                      name="price"
                      label="Price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      sx={{ my: 1 }}
                    />

                    <TimePicker
                      ampm={false}
                      openTo="hours"
                      views={["hours", "minutes", "seconds"]}
                      inputFormat="HH:mm:ss"
                      mask="__:__:__"
                      label="Movie Duration HH:mm:ss"
                      value={formik.values.duration}
                      onChange={(newValue) => {
                        formik.setFieldValue("duration", newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth sx={{ my: 1 }} />
                      )}
                    />
                    <TextField
                      fullWidth
                      id="ratings"
                      name="ratings"
                      label="Ratings"
                      value={formik.values.ratings}
                      onChange={formik.handleChange}
                      sx={{ my: 1 }}
                    />
                    <DesktopDatePicker
                      label="Release Date"
                      inputFormat="MM/dd/yyyy"
                      value={formik.values.release_date}
                      onChange={(e) => formik.setFieldValue("release_date", e)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth sx={{ my: 1 }} />
                      )}
                    />
                    <Autocomplete
                      sx={{ my: 1 }}
                      multiple
                      id="tags-standard"
                      options={genres}
                      onChange={(e, v) => formik.setFieldValue("genres", v)}
                      value={formik.values.genres}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Genres"
                          placeholder="Favorites"
                        />
                      )}
                    />
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ width: 250, my: 1 }}
                      startIcon={<AddCircleIcon />}
                      onClick={() => {
                        setDirectors(directors.concat([""]));
                        formik.values.directors.push("");
                      }}
                    >
                      Add Directors
                    </Button>
                    {directors.map((val, index) => (
                      <TextField
                        key={index}
                        fullWidth
                        id="directors"
                        name="directors"
                        label="Directors"
                        value={directors[index]}
                        onChange={(e) => {
                          var copy = [...directors];
                          copy[index] = e.target.value;
                          formik.values.directors[index] = e.target.value;
                          setDirectors(copy);
                        }}
                        InputProps={{
                          endAdornment: (
                            <Button
                              onClick={() => {
                                var copy = [...directors];
                                copy.splice(index, 1);
                                setDirectors(copy);
                                formik.values.directors = copy;
                              }}
                              endIcon={<DeleteForeverIcon />}
                            >
                              Delete
                            </Button>
                          ),
                        }}
                        sx={{ my: 1 }}
                      />
                    ))}

                    <Button
                      variant="contained"
                      component="label"
                      sx={{ width: 250, my: 1 }}
                      startIcon={<AddCircleIcon />}
                      onClick={() => {
                        setActors(actors.concat([""]));
                        formik.values.actors.push("");
                      }}
                    >
                      Add Actors
                    </Button>

                    {actors.map((val, index) => (
                      <TextField
                        key={index}
                        fullWidth
                        id="actors"
                        name="actors"
                        label="Actors"
                        value={actors[index]}
                        onChange={(e) => {
                          var copy = [...actors];
                          copy[index] = e.target.value;
                          formik.values.actors[index] = e.target.value;
                          setActors(copy);
                        }}
                        InputProps={{
                          endAdornment: (
                            <Button
                              onClick={() => {
                                var copy = [...actors];
                                copy.splice(index, 1);
                                setActors(copy);
                                formik.values.actors = copy;
                              }}
                              endIcon={<DeleteForeverIcon />}
                            >
                              Delete
                            </Button>
                          ),
                        }}
                        sx={{ my: 1 }}
                      />
                    ))}

                    <Button
                      variant="contained"
                      component="label"
                      sx={{ width: 250, my: 1 }}
                      startIcon={<AddCircleIcon />}
                      onClick={() => {
                        setStudios(studios.concat([""]));
                        formik.values.studios.push("");
                      }}
                    >
                      Add Studios
                    </Button>

                    {studios.map((val, index) => (
                      <TextField
                        key={index}
                        fullWidth
                        id="studios"
                        name="studios"
                        label="Studios"
                        value={studios[index]}
                        onChange={(e) => {
                          var copy = [...studios];
                          copy[index] = e.target.value;
                          formik.values.studios[index] = e.target.value;
                          setStudios(copy);
                        }}
                        InputProps={{
                          endAdornment: (
                            <Button
                              onClick={() => {
                                var copy = [...studios];
                                copy.splice(index, 1);
                                setStudios(copy);
                                formik.values.studios = copy;
                              }}
                              endIcon={<DeleteForeverIcon />}
                            >
                              Delete
                            </Button>
                          ),
                        }}
                        sx={{ my: 1 }}
                      />
                    ))}
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
                      sx={{ mt: 10 }}
                    >
                      Submit
                    </Button>
                  </LocalizationProvider>{" "}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormAdd = (props) => {
  const { handleCloseAdd } = props;
  const router = useRouter();
  const [directors, setDirectors] = useState([]);
  const [actors, setActors] = useState([]);
  const [studios, setStudios] = useState([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      video_src: "",
      image_src: null,
      price: 0,
      duration: "00:00:00",
      ratings: 0,
      release_date: new Date(),
      genres: [],
      directors: [],
      actors: [],
      studios: [],
      movie_date: {},
    },
    async onSubmit(values) {
      await axios
        .post(`/api/admin/movie`, values)
        .then((res) => {
          if (res.data.success == true) {
            toast.success("success");
            handleCloseAdd();
          } else {
            const error = res.data.message;
            for (const key in error) toast.error(error[key]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const [imageSrc, setimageSrc] = useState(null);
  const imageSrcSelect = (e) => {
    const file = e.target.files[0];
    if (typeof file !== "undefined") {
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        formik.values.image_src = reader.result;
        setimageSrc(reader.result);
      };
    }
  };

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
          Student Edit
        </h1>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <Avatar
                  alt="admin profile picture"
                  src={imageSrc}
                  align="center"
                  sx={{ bottom: 100, width: 150, height: 256, mt: 1, mb: 1 }}
                  style={{ borderRadius: 19 }}
                />
                <form onSubmit={formik.handleSubmit}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ width: 250, my: 1 }}
                      startIcon={<UploadFileIcon />}
                    >
                      Upload Movie Cover
                      <input
                        accept="image/*"
                        type="file"
                        hidden
                        name="image_src"
                        file={formik.values.image_src}
                        onChange={(e) => imageSrcSelect(e)}
                      />
                    </Button>
                    <TextField
                      fullWidth
                      id="title"
                      name="title"
                      label="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      sx={{ my: 1 }}
                    />
                    <TextField
                      fullWidth
                      id="video_src"
                      name="video_src"
                      label="Video Link"
                      value={formik.values.video_src}
                      onChange={formik.handleChange}
                      sx={{ my: 1 }}
                    />
                    <TextField
                      fullWidth
                      id="price"
                      name="price"
                      label="Price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      sx={{ my: 1 }}
                    />

                    <TimePicker
                      ampm={false}
                      openTo="hours"
                      views={["hours", "minutes", "seconds"]}
                      inputFormat="HH:mm:ss"
                      mask="__:__:__"
                      label="Movie Duration HH:mm:ss"
                      value={formik.values.duration}
                      onChange={(newValue) => {
                        formik.setFieldValue("duration", newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth sx={{ my: 1 }} />
                      )}
                    />
                    <TextField
                      fullWidth
                      id="ratings"
                      name="ratings"
                      label="Ratings"
                      value={formik.values.ratings}
                      onChange={formik.handleChange}
                      sx={{ my: 1 }}
                    />
                    <DesktopDatePicker
                      label="Release Date"
                      inputFormat="MM/dd/yyyy"
                      value={formik.values.release_date}
                      onChange={(e) => formik.setFieldValue("release_date", e)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth sx={{ my: 1 }} />
                      )}
                    />
                    <Autocomplete
                      sx={{ my: 1 }}
                      multiple
                      id="tags-standard"
                      options={genres}
                      onChange={(e, v) => formik.setFieldValue("genres", v)}
                      value={formik.values.genres}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Genres"
                          placeholder="Favorites"
                        />
                      )}
                    />
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ width: 250, my: 1 }}
                      startIcon={<AddCircleIcon />}
                      onClick={() => {
                        setDirectors(directors.concat([""]));
                        formik.values.directors.push("");
                      }}
                    >
                      Add Directors
                    </Button>
                    {directors.map((val, index) => (
                      <TextField
                        key={index}
                        fullWidth
                        id="directors"
                        name="directors"
                        label="Directors"
                        value={directors[index]}
                        onChange={(e) => {
                          var copy = [...directors];
                          copy[index] = e.target.value;
                          formik.values.directors[index] = e.target.value;
                          setDirectors(copy);
                        }}
                        InputProps={{
                          endAdornment: (
                            <Button
                              onClick={() => {
                                var copy = [...directors];
                                copy.splice(index, 1);
                                setDirectors(copy);
                                formik.values.directors = copy;
                              }}
                              endIcon={<DeleteForeverIcon />}
                            >
                              Delete
                            </Button>
                          ),
                        }}
                        sx={{ my: 1 }}
                      />
                    ))}

                    <Button
                      variant="contained"
                      component="label"
                      sx={{ width: 250, my: 1 }}
                      startIcon={<AddCircleIcon />}
                      onClick={() => {
                        setActors(actors.concat([""]));
                        formik.values.actors.push("");
                      }}
                    >
                      Add Actors
                    </Button>

                    {actors.map((val, index) => (
                      <TextField
                        key={index}
                        fullWidth
                        id="actors"
                        name="actors"
                        label="Actors"
                        value={actors[index]}
                        onChange={(e) => {
                          var copy = [...actors];
                          copy[index] = e.target.value;
                          formik.values.actors[index] = e.target.value;
                          setActors(copy);
                        }}
                        InputProps={{
                          endAdornment: (
                            <Button
                              onClick={() => {
                                var copy = [...actors];
                                copy.splice(index, 1);
                                setActors(copy);
                                formik.values.actors = copy;
                              }}
                              endIcon={<DeleteForeverIcon />}
                            >
                              Delete
                            </Button>
                          ),
                        }}
                        sx={{ my: 1 }}
                      />
                    ))}

                    <Button
                      variant="contained"
                      component="label"
                      sx={{ width: 250, my: 1 }}
                      startIcon={<AddCircleIcon />}
                      onClick={() => {
                        setStudios(studios.concat([""]));
                        formik.values.studios.push("");
                      }}
                    >
                      Add Studios
                    </Button>

                    {studios.map((val, index) => (
                      <TextField
                        key={index}
                        fullWidth
                        id="studios"
                        name="studios"
                        label="Studios"
                        value={studios[index]}
                        onChange={(e) => {
                          var copy = [...studios];
                          copy[index] = e.target.value;
                          formik.values.studios[index] = e.target.value;
                          setStudios(copy);
                        }}
                        InputProps={{
                          endAdornment: (
                            <Button
                              onClick={() => {
                                var copy = [...studios];
                                copy.splice(index, 1);
                                setStudios(copy);
                                formik.values.studios = copy;
                              }}
                              endIcon={<DeleteForeverIcon />}
                            >
                              Delete
                            </Button>
                          ),
                        }}
                        sx={{ my: 1 }}
                      />
                    ))}
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
                      sx={{ mt: 10 }}
                    >
                      Submit
                    </Button>
                  </LocalizationProvider>{" "}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormDelete = (props) => {
  const { editValues, handleCloseDelete } = props;
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      ...editValues,
    },
    async onSubmit(values) {
      if (
        values.movie_date.length >= 1 &&
        Object.keys(values.movie_date[0]).length >= 1
      ) {
        toast.error(
          "Cannot delete because the movie is scheduled. Delete the schedule first before deleting this movie"
        );
        return null;
      }

      await axios
        .delete(`/api/admin/movie?_id=${values._id}`, values)
        .then((res) => {
          const data = res.data;
          if (data.success) {
            toast.success(" Movie Has been deleted Successfully  ");
            handleCloseDelete();
          } else {
            toast.error(" Error deleting Student profile ");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full ">
      <div className="bg-white rounded-lg w-1/2">
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full">
            <div className="text-gray-900 font-medium text-lg">
              Are you sure you want to delete this Movie
            </div>
            <svg
              className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              onClick={() => handleCloseDelete()}
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
            </svg>
          </div>
          <hr />
          <div className="">
            This Movie will be deleted permanently and recovery seems impossible
          </div>
          <hr />
          <div className="ml-auto">
            <form onSubmit={formik.handleSubmit}>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3"
              >
                Agree
              </button>
            </form>
            <button
              onClick={() => handleCloseDelete()}
              className="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
toast.configure();
const Movie = () => {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const headCells = [
    {
      id: "_id",
      numeric: false,
      disablePadding: false,
      label: "id",
      width: "20%",
    },
    {
      id: "title",
      numeric: false,
      disablePadding: false,
      label: "Title",
      width: "20%",
    },
    {
      id: "price",
      numeric: false,
      disablePadding: false,
      label: "Price",
      width: "20%",
    },
    {
      id: "ratings",
      numeric: false,
      disablePadding: false,
      label: "Ratings",
      width: "20%",
    },
    {
      id: "directors",
      numeric: false,
      disablePadding: false,
      label: "Directors",
      width: "20%",
    },
    {
      id: "release_date",
      numeric: false,
      disablePadding: false,
      label: "Release Date",
      width: "20%",
    },
  ];
  const updateValues = () => {
    axios
      .get("/api/admin/movie")
      .then((res) => {
        if (res.data.success) setRows(res.data.value);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    updateValues();
  }, []);

  const navs = [
    {
      title: "Movies",
      component: (
        <Table
          title={"Movie Entry"}
          headCells={headCells}
          rows={rows}
          Edit={FormEdit}
          Delete={FormDelete}
          Add={FormAdd}
          onUpdate={updateValues}
        />
      ),
    },
  ];
  return (
    <AdminNav>
      <Head>
        <title>Movies</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminNav>
        <PublicNav navs={navs} />
      </AdminNav>
    </AdminNav>
  );
};

export default Movie;
