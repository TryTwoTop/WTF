import axios from "axios";
import { useEffect, useState } from "react";
import green from "./images/greenCircle.png";
import red from "./images/redCircle.png";

const circleStyle = {
  position: "relative",
  top: "1px",
  marginRight: "10px",
};

const CONNECTION_SUCCESS = ["success", "directory exists"];

function CheckServer({ uid }) {
  const [circle, setCircle] = useState(red);

  const checkServer = () => {
    axios
      .post("http://localhost:5000/wtf/user_directory", {
        uid: uid,
      })
      .then((res) => {
        if (CONNECTION_SUCCESS.includes(res.data.status)) {
          console.log("서버 연결 성공!", res.data.status);
          setCircle(green);
        } else {
          console.log("서버 연결 실패!");
          console.log(res);
          setCircle(red);
        }
      })
      .catch((err) => {
        console.log("checkServer API 오류 발생");
        console.log(err);
      });
  };

  useEffect(() => {
    if (uid !== null) {
      checkServer();
    }
  }, [uid]);

  return (
    <h3>
      <img src={circle} alt="서버 연결 여부" width="15" style={circleStyle} />
      {circle === green ? "서버 연결 성공" : "서버 연결 실패"}
    </h3>
  );
}

export default CheckServer;
