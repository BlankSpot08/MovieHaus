import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
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
  return (
    <div>
      <h1> Hello world </h1>
    </div>
  );
};

export default UpdateSeat;
