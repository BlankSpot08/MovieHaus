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
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import styles from "../../../../styles/Seat.module.scss";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Modal from "../../../../components/Modal";
toast.configure();

const UpdateSeat = () => {
  const [getSeats, setSeats] = useState([]);

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
        sx={{ m: 1, width: "100%" }}
        renderInput={(params) => <TextField {...params} label="Seats" />}
      />
      {Object.keys(getChosenSeat).length >= 1 && (
        <UpdateSeatArrangement getChosenSeat={getChosenSeat} />
      )}
    </div>
  );
};

class UpdateSeatArrangement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseDown: false,
      current_value: null,
      activity: 0,
      seat_name: "",
      seats: [],
      ...props.getChosenSeat,
      reset: { ...this.state, ...props.getChosenSeat },
    };
  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.getChosenSeat) {
      this.setState({
        ...this.state,
        ...nextProps.getChosenSeat,
        reset: { ...this.state, ...nextProps.getChosenSeat },
      });
    }
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

  handleChange(event) {
    this.setState({ seat_name: event.target.value });
  }
  onReset() {
    this.setState({ ...this.state.reset, reset: { ...this.state.reset } });
  }
  onDelete(event) {
    console.log("delete");
  }
  onUpdate(event) {
    console.log("update");
    // if (this.state.seat_name.length <= 0) {
    //   toast.error("Name is empty");
    //   return null;
    // }
    // if (this.state.seats.length <= 0) {
    //   toast.error("Seats is empty");
    //   return null;
    // }
    // axios({
    //   method: "POST",
    //   url: "/api/admin/seat",
    //   data: {
    //     seat_name: this.state.seat_name,
    //     seats: this.state.seats,
    //   },
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    //   .then((res) => {
    //     if (res.data.success == true) {
    //       this.setState({ seats: [], seat_name: "" });
    //       toast.success("success");
    //     } else {
    //       const error = res.data.message;
    //       for (const key in error) toast.error(error[key]);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
  onClear() {
    this.setState({ seats: [], seat_name: "" });
  }

  render() {
    const { activity, seats, seat_name } = this.state;

    return (
      <div>
        <TextField
          label="Seat Name"
          variant="outlined"
          name="seat_name"
          sx={{ m: 1, width: "40%" }}
          value={seat_name}
          onChange={this.handleChange.bind(this)}
        />

        <Modal
          icon={<EditIcon />}
          variant="contained"
          text="UPdate"
          buttonTextAccept="Update"
          buttonTextExit="Close"
          title={`Update ${this.state.seat_name}`}
          message="Updating the seats cannot be undo. Are you sure you want to update?"
          onAccept={this.onUpdate.bind(this)}
        ></Modal>

        <Modal
          icon={<RestartAltIcon />}
          variant="outlined"
          text="Reset"
          buttonTextAccept="Reset"
          buttonTextExit="Close"
          title={`Reset ${this.state.seat_name}`}
          message="Reseting the seats back into its normal place cannot be undo. This will not update your current seat arrangement. Are you sure you want to reset? "
          onAccept={this.onReset.bind(this)}
        ></Modal>

        <Modal
          icon={<HighlightOffIcon />}
          variant="outlined"
          text="Clear"
          buttonTextAccept="Clear"
          buttonTextExit="Close"
          title={`Clear ${this.state.seat_name}`}
          message="Are you sure you want to remove all the seats? this cannot be undo."
          onAccept={this.onClear.bind(this)}
        ></Modal>

        <Modal
          icon={<DeleteIcon />}
          variant="outlined"
          text="Delete"
          buttonTextAccept="Delete"
          buttonTextExit="Close"
          title={`Delete ${this.state.seat_name}`}
          message="Deleting this seat arrangement cannot be undo. It will be erased permanently. are you sure you want to delete?"
          onAccept={this.onDelete.bind(this)}
        ></Modal>

        <Tabs
          value={activity}
          onChange={(event, newValue) => this.setState({ activity: newValue })}
          aria-label="icon label tabs example"
        >
          <Tab icon={<EventSeatIcon />} label="Add" sx={{ m: 1, height: 55 }} />
          <Tab
            icon={<DeleteForeverIcon />}
            label="Remove"
            sx={{ m: 1, height: 55 }}
          />
          <Tab icon={<PanToolIcon />} label="Drag" sx={{ m: 1, height: 55 }} />
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
export default UpdateSeat;
