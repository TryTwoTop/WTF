import logo from "./images/logo.png";
import "./Top.css";

// 아이디 만들기 출처
// https://stackoverflow.com/questions/10584438/removing-dot-symbol-from-a-string/10584461

function Top({ IP }) {
  return (
    <header>
      <img src={logo} alt="세명대학교 컴퓨터학부 로고" />
      <p>
        IP : {IP}
        <br />
        User ID : {IP}
      </p>
      <h1>Who's That Fashionist</h1>
    </header>
  );
}

export default Top;
