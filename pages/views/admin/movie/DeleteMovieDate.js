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

const DeleteMovieDate = (props) => {
  const { handleCloseSubDelete, editSubValues } = props;
  // Handle Props ===============================================================
  if (
    editSubValues &&
    Object.keys(editSubValues).length === 0 &&
    Object.getPrototypeOf(editSubValues) === Object.prototype
  )
    return null;
  const editValues = editSubValues.row;
  if (!editValues) return null;
  if (
    editValues &&
    Object.keys(editValues).length === 0 &&
    Object.getPrototypeOf(editValues) === Object.prototype
  )
    return null;
  const initalValues = editValues.movie_date[editSubValues.index];
  // Handle Props ===============================================================
  const formik = useFormik({
    initialValues: {
      ...editValues,
      index: editSubValues.index,
    },
    async onSubmit(values) {
      console.log(values._id);
      axios
        .delete(`/api/admin/schedule`, { data: values })
        .then((res) => {
          const data = res.data;
          if (data.success) {
            toast.success("Successfully delete a schedule");
            handleCloseSubDelete();
          } else {
            toast.error(" Something wrong deleting this schedule");
            handleCloseSubDelete();
          }
        })
        .catch((err) => {
          console.log(err);
          handleCloseSubDelete();
        });
    },
  });
  return (
    <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full ">
      <div className="bg-white rounded-lg w-1/2">
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full">
            <div className="text-gray-900 font-medium text-lg">
              Are you sure you want to delete this Movie Schedule?
            </div>
            <svg
              className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              onClick={() => handleCloseSubDelete()}
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
              onClick={() => handleCloseSubDelete()}
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

export default DeleteMovieDate;
