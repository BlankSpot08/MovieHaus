import React, { useState } from "react";
import HomeNav from "../../../components/navigations/HomeNav";
import Link from "next/link";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useTimer } from "react-timer-hook";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MuiPhoneNumber from "material-ui-phone-number";
import { useFormik } from "formik";
import axios from "axios";
import Head from "next/head";

toast.configure();
const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { seconds, restart } = useTimer({
    expiryTimestamp: new Date().setSeconds(new Date().getSeconds() + 10),
    onExpire: () => console.warn("onExpire called"),
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
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

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
      mobile: "",
    },
    async onSubmit(values) {
      setLoading(true);
      await axios
        .post("/api/auth/register", values)
        .then((res) => {
          if (res.data.success == true) {
            router.push("/views/auth/login");
            toast.success("success");
            setLoading(false);
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

  return (
    <div className="bg-center bg-no-repeat bg-cover relative h-screen pattern">
      <Head>
        <title>Register</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-opacity-50 bg-black h-full">
        <div className="container mx-auto h-full">
          <HomeNav loading={loading} />

          <div className="flex justify-center items-center p-8 h-full">
            <div className="lg:w-2/5 md:w-1/2 w-2/3">
              <form
                className="bg-black bg-opacity-20 p-5 rounded-lg shadow-lg min-w-full"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-center text-2xl mb-6 text-white font-bold font-sans">
                  Register
                </h1>
                <div>
                  <label
                    className="text-white font-semibold block my-3 text-md "
                    forhtml="username"
                  >
                    Username
                  </label>
                  <input
                    className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <label
                    className="text-white font-semibold block my-3 text-md"
                    forhtml="username"
                  >
                    Email
                  </label>
                  <input
                    className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="email"
                    autoComplete="current-email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <label
                    className="text-white font-semibold block my-3 text-md"
                    forhtml="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                    type="text"
                    name="password"
                    id="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    sx={{ my: 2 }}
                  />
                </div>
                <div>
                  <label
                    className="text-white font-semibold block my-3 text-md"
                    forhtml="confirm"
                  >
                    Confirm password
                  </label>
                  <input
                    className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                    type="text"
                    placeholder="confirm password"
                    id="password_confirmation"
                    name="password_confirmation"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    value={formik.values.password_confirmation}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <label
                    className="text-white font-semibold block my-3 text-md"
                    forhtml="mobile"
                  >
                    Phone Number
                  </label>
                  <input
                    className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                    type="number"
                    placeholder="phone number"
                    id="mobile"
                    name="mobile"
                    label="mobile"
                    onChange={(e) => formik.setFieldValue("mobile", e)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-6 bg-pink-400 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
                >
                  Register
                </button>
                <a href="/views/auth/Login">
                  <button
                    type="button"
                    className="w-full mt-16 bg-pink-100 rounded-lg px-4 py-2 text-lg text-pink-400 tracking-wide font-semibold font-sans"
                  >
                    Login
                  </button>
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
                    Register
                  </h1>
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
                <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                  <p>
                    <Link href="/views/auth/Login">
                      <a className="text-cyan-600 hover:text-cyan-700">
                        Already have a student account? Login &rarr;
                      </a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Register;
