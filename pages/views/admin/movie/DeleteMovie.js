import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import config from "../../../../config/config";

toast.configure();
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

export default FormDelete;
