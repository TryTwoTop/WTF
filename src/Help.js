import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// 참고하기
// https://stackoverflow.com/questions/42659843/setting-hovered-style-for-material-ui-iconbutton

// 사용하기
// https://mui.com/components/popover/#popupstate-helper

// 아래 hover 코드는 밑의 링크를 참조하였음.
// https://mui.com/components/buttons/#customization
const HelpButton = styled(IconButton)({
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
});

function Help({ id, text }) {
  const MySwal = withReactContent(Swal);

  return (
    <HelpButton
      id={id}
      onClick={() => MySwal.fire(text)}
      title="도움말"
      aria-label="help"
      size="large"
    >
      <QuestionMarkIcon />
    </HelpButton>
  );
}

export default Help;
