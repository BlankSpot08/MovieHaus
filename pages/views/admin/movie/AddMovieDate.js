import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Avatar,
  Autocomplete,
  Box,
  LinearProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "../../../../components/Modal";
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
import config from "./config";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

toast.configure();
const movie_time_value = {
  time: "07:30",
  description: "",
  movie_seats: {},
};
const styles = {
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
};

const AddMovieDate = (props) => {
  const { handleCloseAdd, editSubValues } = props;

  const [movieTime, setMovieTime] = useState([]);
  const [getSeats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  const created = () => {
    setLoading(true);
    const url = "/api/admin/seat";
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        let i;
        for (i = 0; i < data.value.length; i++) {
          data.value[i]["label"] = data.value[i].seat_name;
        }
        setSeats(data.value);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    created();
  }, []);
  const formik = useFormik({
    initialValues: {
      movie_date: new Date(),
      movie_time: [],
    },
    onSubmit(values) {
      console.log(values);
    },
  });
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
                <form onSubmit={formik.handleSubmit}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Release Date"
                      inputFormat="MM/dd/yyyy"
                      value={formik.values.movie_date}
                      onChange={(e) => formik.setFieldValue("movie_date", e)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth sx={{ my: 1 }} />
                      )}
                    />

                    <Button
                      variant="contained"
                      component="label"
                      sx={{ width: 250, my: 1 }}
                      startIcon={<AddCircleIcon />}
                      onClick={() => {
                        setMovieTime(
                          movieTime.concat([{ ...movie_time_value }])
                        );
                        formik.values.movie_time.push({ ...movie_time_value });
                      }}
                    >
                      Add Schedule
                    </Button>
                    {movieTime &&
                      movieTime.map((value, index) => {
                        return (
                          <Card
                            sx={{ width: "100%", boxShadow: 3, my: 1 }}
                            key={index}
                          >
                            <Modal
                              icon={<DeleteIcon />}
                              variant="outlined"
                              text="Delete"
                              buttonTextAccept="Delete"
                              buttonTextExit="Close"
                              title={`Delete ${
                                editSubValues.title + " - " + index
                              }`}
                              message="Are you sure you want to delete this schedule?"
                              onAccept={() => {
                                var copy = [...movieTime];
                                copy.splice(index, 1);
                                setMovieTime(copy);
                                formik.values.movie_time = copy;
                              }}
                            ></Modal>
                            <CardMedia
                              image={editSubValues.image_src}
                              style={styles.media}
                              alt="Movie Screen"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {editSubValues.title + " - " + index}
                              </Typography>
                              <Autocomplete
                                renderOption={(props, option) => (
                                  <Box
                                    component="li"
                                    sx={{
                                      "& > img": { mr: 2, flexShrink: 0 },
                                    }}
                                    {...props}
                                  >
                                    {option.seat_name}
                                  </Box>
                                )}
                                onChange={(event, value) => {
                                  var copy = [...movieTime];
                                  copy[index].movie_seats = value;
                                  formik.values.movie_time[index].movie_seats =
                                    value;
                                  setMovieTime(copy);
                                }}
                                disablePortal
                                options={getSeats}
                                sx={{ my: 1, width: "100%" }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Select Seat Arrangement "
                                    sx={{ my: 1 }}
                                    fullWidth
                                  />
                                )}
                              />

                              <TextField
                                id="time"
                                label="Time"
                                type="time"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                inputProps={{
                                  step: 300, // 5 min
                                }}
                                sx={{ width: 150 }}
                                value={movieTime[index].time}
                                onChange={(e) => {
                                  var copy = [...movieTime];
                                  copy[index].time = e.target.value;
                                  formik.values.movie_time[index].time =
                                    e.target.value;
                                  setMovieTime(copy);
                                }}
                                sx={{ my: 1 }}
                                fullWidth
                              />
                              <TextField
                                multiline
                                maxRows={4}
                                id="description"
                                label="Description"
                                name="description"
                                sx={{ my: 1 }}
                                fullWidth
                                value={movieTime[index].description}
                                onChange={(e) => {
                                  var copy = [...movieTime];
                                  copy[index].description = e.target.value;
                                  formik.values.movie_time[index].description =
                                    e.target.value;
                                  setMovieTime(copy);
                                }}
                              />
                            </CardContent>
                          </Card>
                        );
                      })}
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
                      sx={{ mt: 10 }}
                    >
                      Submit
                    </Button>
                  </LocalizationProvider>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovieDate;
