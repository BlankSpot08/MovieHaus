import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Avatar,
  Autocomplete,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PanToolIcon from "@mui/icons-material/PanTool";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import styles from "../../../../styles/Seat.module.scss";
toast.configure();

const UpdateSeat = () => {
  const [getSeats, setSeats] = useState([{}]);

  const [getChosenSeat, setChosenSeat] = useState({});

  React.useEffect(() => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Autocomplete
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option.seat_name}
          </Box>
        )}
        onChange={(event, value) => {
          setChosenSeat(value);
        }}
        disablePortal
        id="combo-box-demo"
        options={getSeats}
        sx={{ width: 300 }}
        sx={{ m: 1, width: "50%" }}
        renderInput={(params) => <TextField {...params} label="Seats" />}
      />

      <Button
        variant="contained"
        startIcon={<EditIcon />}
        sx={{ m: 1, height: 50 }}
      >
        Edit
      </Button>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        sx={{ m: 1, height: 50 }}
      >
        Delete
      </Button>
    </div>
  );
};

export default UpdateSeat;
