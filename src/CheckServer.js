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
    // fetch(`/wtf/user_directory?uid=${uid}`)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.status === "success") {
    //       // 서버 연결 성공 시 로그 출력
    //       console.log("서버 연결 성공!");
    //       setCircle(green);
    //     } else {
    //       // status가 success 가 아님
    //       console.log("서버 연결 실패!");
    //       console.log(res.status, res);
    //       setCircle(red);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("checkServer API 오류 발생");
    //     console.log(err);
    //   });

    axios
      .post("/wtf/user_directory", {
        uid: uid,
      })
      .then((res) => {
        if (CONNECTION_SUCCESS.includes(res.status)) {
          console.log("서버 연결 성공!", res.status);
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
    if (uid !== "") {
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
