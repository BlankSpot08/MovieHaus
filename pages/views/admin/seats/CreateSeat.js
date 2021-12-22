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
class CreateSeat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseDown: false,
      current_value: null,
      activity: 0,
      seats: [],
    };
  }
  async componentDidUpdate(prevProps, prevState) {
    axios({
      method: "POST",
      url: "/api/admin/tokenSeat",
      data: this.state.seats, // NOTE - this is the file not the FormData Object
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  async componentDidMount() {
    axios
      .get("/api/admin/tokenSeat")
      .then((res) => {
        const data = res.data;
        if (data.success) {
          this.setState({ seats: data.values });
        }
      })
      .catch((err) => {
        console.log();
      });
  }

  mouseDown(event) {
    if (this.state.activity == 2)
      this.setState({ isMouseDown: true, current_value: event });
    else if (this.state.activity == 1) {
      var array = [...this.state.seats];
      if (event > -1) array.splice(event, 1);
      this.setState({ seats: array });
    }
  }
  mouseMove(event) {
    const current_value = this.state.current_value;
    const verify = String(event.target).toLowerCase();
    if (
      this.state.isMouseDown &&
      !verify.includes("svg") &&
      this.state.activity == 2
    ) {
      const bounds = event.target.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const copy = [...this.state.seats];
      copy[current_value] = { x: x, y: y };
      this.setState({ seats: [...copy] });
    }
  }

  mouseUp(event) {
    this.setState({ isMouseDown: false, current_value: null });
  }

  addSeat(event) {
    const verify = String(event.target).toLowerCase();

    if (!verify.includes("svg") && this.state.activity == 0) {
      const bounds = event.target.getBoundingClientRect();
      const x = event.clientX - bounds.left - 10;
      const y = event.clientY - bounds.top - 10;
      const copy = [
        ...this.state.seats,
        {
          x: x,
          y: y,
          seat_no: 0,
        },
      ];
      this.setState({ seats: [...copy] });
    }
  }

  onSave(event) {
    // let formData = new FormData();
    // formData.append("seats", this.state.seats);
    // const config = {
    //   headers: { "content-type": "multipart/form-data" },
    // };

    // axios
    //   .post("/api/admin/seat", formData, config)
    //   .then((res) => {
    //     if (res.data.success == true) {
    //       // router.push("/views/admin/Admin?title=Admin");
    //       toast.success("success");
    //     } else {
    //       const error = res.data.message;
    //       for (const key in error) toast.error(error[key]);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    axios
      .get("/api/admin/tokenSeat")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onClear() {
    this.setState({ seats: [] });
  }
  render() {
    const { activity, seats } = this.state;

    return (
      <div>
        <Button
          variant="contained"
          startIcon={<SaveAltIcon />}
          onClick={this.onSave.bind(this)}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          startIcon={<SaveAltIcon />}
          onClick={this.onClear.bind(this)}
          sx={{ m: 1 }}
        >
          Clear
        </Button>
        <Tabs
          value={activity}
          onChange={(event, newValue) => this.setState({ activity: newValue })}
          aria-label="icon label tabs example"
        >
          <Tab icon={<EventSeatIcon />} label="Add" />
          <Tab icon={<DeleteForeverIcon />} label="Remove" />
          <Tab icon={<PanToolIcon />} label="Drag" />
        </Tabs>

        {activity == 0 && (
          <div
            className={styles.display_add}
            onClick={this.addSeat.bind(this)}
          ></div>
        )}
        <div
          onMouseMove={this.mouseMove.bind(this)}
          onMouseUp={this.mouseUp.bind(this)}
        >
          <div className={styles.display}>
            {seats &&
              seats.map((value, index) => {
                const { x, y } = value;
                return (
                  <div
                    key={index}
                    style={{
                      position: "absolute",
                      top: y,
                      left: x,
                    }}
                    className={activity == 1 ? styles.seat : ""}
                    onMouseDown={this.mouseDown.bind(this, index)}
                  >
                    <EventSeatIcon style={{ fill: "#7c77a0" }} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateSeat;
