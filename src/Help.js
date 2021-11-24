import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

// 참고하기
// https://stackoverflow.com/questions/42659843/setting-hovered-style-for-material-ui-iconbutton


// 사용하기
// https://mui.com/components/popover/#popupstate-helper

const HelpButton = styled(IconButton)({
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
});

function Help({ id }) {
  return (
    <HelpButton title='도움말' aria-label="help" size="large">
      <QuestionMarkIcon />
    </HelpButton>
  );
}

export default Help;