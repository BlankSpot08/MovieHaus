import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TimePicker from "@mui/lab/TimePicker";
import Autocomplete from "@mui/material/Autocomplete";
import config from "./config";
toast.configure();
const genres = config.genres;
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
      description: "",
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
                    <TextField
                      multiline
                      maxRows={4}
                      id="description"
                      label="Description"
                      name="description"
                      fullWidth
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
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

export default FormAdd;
