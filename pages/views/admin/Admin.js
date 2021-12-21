import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import axios from "axios";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MuiPhoneNumber from "material-ui-phone-number";
import FormControlLabel from "@mui/material/FormControlLabel";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import AdminNav from "../../../components/navigations/AdminNav";
import Table from "../../../components/Table";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PublicNav from "../../../components/navigations/PublicNav";

toast.configure();
const FormEdit = (props) => {
  const { editValues } = props;
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      ...editValues,
    },
    async onSubmit(values) {
      await axios
        .put(`/api/admin/admin?id=${values._id}`, values)
        .then((res) => {
          if (res.data.success == true) {
            router.push("/views/admin/Admin?title=Admin");
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

  const [profilePicture, setProfilePicture] = useState(
    editValues.profile_picture
  );
  const profilePictureSelect = (e) => {
    const file = e.target.files[0];
    if (typeof file !== "undefined") {
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        formik.values.profile_picture = reader.result;
        setProfilePicture(reader.result);
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
                  src={profilePicture}
                  align="center"
                  sx={{ width: 156, height: 156, mt: 1, mb: 1 }}
                />
                <form onSubmit={formik.handleSubmit}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Button variant="contained" component="label">
                      Upload File
                      <input
                        accept="image/*"
                        type="file"
                        hidden
                        name="profile_picture_src"
                        file={formik.values.profile_picture}
                        onChange={(e) => profilePictureSelect(e)}
                      />
                    </Button>

                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      autoComplete="current-email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      sx={{ my: 2 }}
                    />
                    <TextField
                      fullWidth
                      id="username"
                      name="username"
                      label="Username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      sx={{ my: 2 }}
                    />
                    <DesktopDatePicker
                      fullWidth
                      label="Birthday"
                      inputFormat="MM/dd/yyyy"
                      value={formik.values.birthday}
                      onChange={(e) => formik.setFieldValue("birthday", e)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      sx={{ my: 2 }}
                    />

                    <TextField
                      id="gender"
                      name="gender"
                      label="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      sx={{ my: 2 }}
                      select
                      fullWidth
                    >
                      <MenuItem key={""} value={""}>
                        Select gender
                      </MenuItem>
                      <MenuItem key={"Male"} value={"Male"}>
                        Male
                      </MenuItem>
                      <MenuItem key={"Female"} value={"Female"}>
                        Female
                      </MenuItem>
                    </TextField>

                    <MuiPhoneNumber
                      id="mobile"
                      name="mobile"
                      label="mobile"
                      value={formik.values.mobile}
                      defaultCountry={"ph"}
                      onChange={(e) => formik.setFieldValue("mobile", e)}
                      sx={{ my: 2 }}
                      fullWidth
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
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

const FormAdd = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      profile_picture: null,
      email: "",
      username: "",
      gender: "",
      birthday: new Date(),
      password: "",
      password_confirmation: "",
      mobile: "",
    },
    async onSubmit(values) {
      await axios
        .post(`/api/admin/admin?id=${values._id}`, values)
        .then((res) => {
          if (res.data.success == true) {
            router.push("/views/admin/Admin?title=Admin");
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

  const [profilePicture, setProfilePicture] = useState("");
  const profilePictureSelect = (e) => {
    const file = e.target.files[0];
    if (typeof file !== "undefined") {
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        formik.values.profile_picture = reader.result;
        setProfilePicture(reader.result);
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
                  src={profilePicture}
                  align="center"
                  sx={{ width: 156, height: 156, mt: 1, mb: 1 }}
                />
                <form onSubmit={formik.handleSubmit}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Button variant="contained" component="label">
                      Upload File
                      <input
                        accept="image/*"
                        type="file"
                        hidden
                        name="profile_picture_src"
                        file={formik.values.profile_picture}
                        onChange={(e) => profilePictureSelect(e)}
                      />
                    </Button>

                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      autoComplete="current-email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      sx={{ my: 2 }}
                    />
                    <TextField
                      fullWidth
                      id="username"
                      name="username"
                      label="Username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      sx={{ my: 2 }}
                    />
                    <DesktopDatePicker
                      fullWidth
                      label="Birthday"
                      inputFormat="MM/dd/yyyy"
                      value={formik.values.birthday}
                      onChange={(e) => formik.setFieldValue("birthday", e)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      sx={{ my: 2 }}
                    />
                    <TextField
                      fullWidth
                      id="password_confirmation"
                      name="password_confirmation"
                      label="Confirm Password"
                      type="password"
                      autoComplete="current-password"
                      value={formik.values.password_confirmation}
                      onChange={formik.handleChange}
                      sx={{ my: 2 }}
                    />

                    <TextField
                      id="gender"
                      name="gender"
                      label="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      sx={{ my: 2 }}
                      select
                      fullWidth
                    >
                      <MenuItem key={""} value={""}>
                        Select gender
                      </MenuItem>
                      <MenuItem key={"Male"} value={"Male"}>
                        Male
                      </MenuItem>
                      <MenuItem key={"Female"} value={"Female"}>
                        Female
                      </MenuItem>
                    </TextField>

                    <MuiPhoneNumber
                      id="mobile"
                      name="mobile"
                      label="mobile"
                      value={formik.values.mobile}
                      defaultCountry={"ph"}
                      onChange={(e) => formik.setFieldValue("mobile", e)}
                      sx={{ my: 2 }}
                      fullWidth
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
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
const FormDelete = (props) => {
  const { editValues, handleCloseDelete } = props;
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      ...editValues,
    },
    async onSubmit(values) {
      await axios
        .delete(`/api/admin/admin?id=${values._id}`)
        .then((res) => {
          const data = res.data;
          if (data.success) {
            toast.success(" Admin Account Has been deleted Successfully  ");
            setTimeout(() => {
              router.reload(window.location.pathname);
            }, 3000);
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
              Are you sure you want to delete this account?
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
            This account will be deleted permanently and recovery is impossible
          </div>
          <hr />
          <div className="ml-auto">
            <form onSubmit={formik.handleSubmit}>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-5"
              >
                Agree
              </button>

              <button
                onClick={() => handleCloseDelete()}
                className="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
const Admin = () => {
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
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
      width: "20%",
    },
    {
      id: "username",
      numeric: false,
      disablePadding: false,
      label: "Author",
      width: "20%",
    },
    {
      id: "gender",
      numeric: false,
      disablePadding: false,
      label: "Gender",
      width: "20%",
    },
    {
      id: "birthday",
      numeric: false,
      disablePadding: false,
      label: "birthday",
      width: "20%",
    },
    {
      id: "mobile",
      numeric: false,
      disablePadding: false,
      label: "mobile",
      width: "20%",
    },
  ];
  useEffect(() => {
    axios
      .get("/api/admin/admin")
      .then((res) => {
        if (res.data.success) setRows(res.data.value);
      })
      .catch((res) => {
        console.log(err);
      });
  }, []);
  const navs = [
    {
      title: "Admin Accounts",
      component: (
        <Table
          title={"Book entry"}
          headCells={headCells}
          rows={rows}
          Edit={FormEdit}
          Delete={FormDelete}
          Add={FormAdd}
        />
      ),
    },
  ];

  return (
    <AdminNav>
      <Head>
        <title>Admin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminNav>
        <PublicNav navs={navs} />
      </AdminNav>
    </AdminNav>
  );
};

export default Admin;
