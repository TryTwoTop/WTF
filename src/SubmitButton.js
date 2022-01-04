import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

const submitStyle = {
  width: "50%",
  textTransform: "none",
  fontSize: "20px",
  fontWeight: "bold",
};

const btnName = "generate";

export default function SubmitButton() {
  return (
    <label htmlFor={btnName}>
      <Input type="submit" id={btnName} />
      <Button
        style={submitStyle}
        variant="contained"
        endIcon={<SendIcon />}
        component="span"
      >
        Generate
      </Button>
    </label>
  );
}
