import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormControl } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function KeepMountedModal(props) {
  const {
    buttonTextAccept,
    buttonTextExit,
    title,
    message,
    variant,
    text,
    onAccept,
    children,

    icon,
  } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="inline">
      <FormControl onClick={handleOpen} display="inline">
        <Button variant={variant} startIcon={icon} sx={{ m: 1, height: 50 }}>
          {text}
        </Button>
      </FormControl>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full ">
          <div className="bg-white rounded-lg w-1/2">
            <div className="flex flex-col items-start p-4">
              <div className="flex items-center w-full">
                <div className="text-gray-900 font-medium text-lg">{title}</div>
                <svg
                  className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 18 18"
                  onClick={() => handleClose()}
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                </svg>
              </div>
              <hr />
              <div className="">{message}</div>
              <hr />
              <div className="ml-auto">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                  onClick={() => {
                    onAccept();
                    handleClose();
                  }}
                >
                  {buttonTextAccept}
                </button>

                <button
                  onClick={() => handleClose()}
                  className="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  {buttonTextExit}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
