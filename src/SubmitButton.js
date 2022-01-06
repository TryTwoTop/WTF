import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

const btnName = "generate";

export default function SubmitButton({ style }) {
  return (
    <label htmlFor={btnName}>
      <Input type="submit" id={btnName} />
      <Button
        style={style}
        variant="contained"
        endIcon={<SendIcon />}
        component="span"
      >
        Generate
      </Button>
    </label>
  );
}
