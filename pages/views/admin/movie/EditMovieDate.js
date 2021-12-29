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
import config from "../../../../config/config";
toast.configure();

const EditMovieDate = () => {
  return <div></div>;
};

export default EditMovieDate;
