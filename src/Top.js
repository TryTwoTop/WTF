import logo from './images/logo.png';
import './Top.css';

// 아이디 만들기 출처
// https://stackoverflow.com/questions/10584438/removing-dot-symbol-from-a-string/10584461

function Top({ ip = '' }) {
  return (
    <div id="top">
      <img src={logo} alt="세명대학교 컴퓨터학부 로고" />
      <p>
        IP : {ip}<br />
        User ID : {ip}
      </p>
      <h1>Who's That Fashionist</h1>
    </div>
  );
}

export default Top;