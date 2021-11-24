import SendIcon from '@mui/icons-material/Send';
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const submit_style = {
  width: '50%',
  textTransform: 'none',
  fontSize: '20px',
  fontWeight: 'bold',
};

export default function SubmitButton({ value = "제출" }) {
  return (
    <label htmlFor="submit">
      <Input type="submit" id="submit" />
      <Button style={submit_style} variant="contained" endIcon={<SendIcon />} component="span" >
        {value}
      </Button>
    </label>
  );
}