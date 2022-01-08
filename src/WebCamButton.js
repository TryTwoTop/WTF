import { Button } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import WebcamCapture from "./WebCamCapture";

const style = {
  width: "100px",
  height: "50px",
  marginLeft: "10px",
  marginRight: "10px",
  textTransform: "none",
  fontSize: "18px",
};

function WebCamButton({ setModel }) {
  const MySwal = withReactContent(Swal);

  const onClick = () => {
    MySwal.fire({
      html: <WebcamCapture setModel={setModel} />,
      width: "800px",
      height: "800px",
      showCloseButton: false,
      showCancelButton: false,
      focusConfirm: true,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: "Thumbs down",
    });
  };

  return (
    <Button
      onClick={onClick}
      style={style}
      variant="contained"
      component="span"
    >
      WebCam
    </Button>
  );
}

export default WebCamButton;
