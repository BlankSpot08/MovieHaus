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

class RemWrapper extends React.Component {
  translateTransformToRem(transform, remBaseline = 16) {
    const convertedValues = transform
      .replace("translate(", "")
      .replace(")", "")
      .split(",")
      .map((px) => px.replace("px", ""))
      .map((px) => parseInt(px, 10) / remBaseline)
      .map((x) => `${x}rem`);
    const [x, y] = convertedValues;

    return `translate(${x}, ${y})`;
  }

  render() {
    const { children, remBaseline = 16, style } = this.props;
    const child = React.Children.only(children);

    const editedStyle = {
      ...child.props.style,
      ...style,
      transform: this.translateTransformToRem(style.transform, remBaseline),
    };

    return React.cloneElement(child, {
      ...child.props,
      ...this.props,
      style: editedStyle,
    });
  }
}

const ToolsUsed = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon label tabs example"
    >
      <Tab icon={<EventSeatIcon />} label="Add" />
      <Tab icon={<DeleteForeverIcon />} label="Remove" />
      <Tab icon={<PanToolIcon />} label="Drag" />
    </Tabs>
  );
};

class ArrangeSeat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseDown: false,
      current_value: null,
      seats: [
        {
          x: 0,
          y: 0,
          seat_no: 0,
        },
      ],
    };
  }

  mouseDown(event) {
    this.setState({ isMouseDown: true, current_value: event });
  }
  mouseMove(event) {
    // const index = event.target.value;
    const current_value = this.state.current_value;
    if (this.state.isMouseDown && !current_value) {
      const bounds = event.target.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const copy = [...this.state.seats];
      console.log(bounds.left);
      copy[current_value] = { x: x, y: y };
      this.setState({ seats: [...copy] });
    }
  }
  mouseUp(event) {
    this.setState({ isMouseDown: false, current_value: null });
  }
  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    return (
      <div
        onMouseMove={this.mouseMove.bind(this)}
        onMouseUp={this.mouseUp.bind(this)}
      >
        <ToolsUsed />
        <div className={styles.display}>
          {this.state.seats &&
            this.state.seats.map((value, index) => {
              const { x, y } = value;
              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    top: y,
                    left: x,
                  }}
                  onMouseDown={this.mouseDown.bind(this, index)}
                >
                  <EventSeatIcon />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default Seat;
