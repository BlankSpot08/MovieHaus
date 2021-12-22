import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import AdminNav from "../../../components/navigations/AdminNav";
import PublicNav from "../../../components/navigations/PublicNav";
import Head from "next/head";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PanToolIcon from "@mui/icons-material/PanTool";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EventSeatIcon from "@mui/icons-material/EventSeat";

import styles from "../../../styles/Seat.module.scss";
import Draggable, { DraggableCore } from "react-draggable";

toast.configure();

const Seat = () => {
  const router = useRouter();
  const navs = [
    {
      title: "Create Seat",
      component: <ArrangeSeat />,
    },
  ];
  return (
    <AdminNav>
      <Head>
        <title> Seats </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminNav>
        <PublicNav navs={navs} />
      </AdminNav>
    </AdminNav>
  );
};

class ArrangeSeat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseDown: false,
      current_value: null,
      activity: 0,
      seats: [],
    };
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
      console.log({ x, y });
      this.setState({ seats: [...copy] });
    }
  }
  render() {
    const { activity, seats } = this.state;
    return (
      <div>
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
                    className={
                      activity == 1 || activity == 2 ? styles.seat : ""
                    }
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
export default Seat;
