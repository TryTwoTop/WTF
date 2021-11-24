import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const submit_style = {
  width: '50%',
};

export default function SubmitButton({ value = "제출" }) {
  return (
    <label htmlFor="submit">
      <Input type="submit" id="submit" />
      <Button style={submit_style} variant="contained" component="span" >
        {value}
      </Button>
    </label>
  );
}