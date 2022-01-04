import axios from "axios";
import { useEffect, useState } from "react";
import green from "./images/greenCircle.png";
import red from "./images/redCircle.png";

const circle_style = {
  position: "relative",
  top: "1px",
  marginRight: "10px",
};

function CheckServer({ uid }) {
  // 기본 설정
  const [circle, setCircle] = useState(red);

  useEffect(() => {
    if (uid !== "") {
      connectServer();
    }
  }, [uid]);

  function connectServer() {
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
    //     console.log("fetch 예외처리 작동");
    //     console.log(err);
    //   });

    axios
      .post("/wtf/user_directory", {
        uid: uid,
      })
      .then((res) => {
        if (res.status === "success") {
          console.log("서버 연결 성공!");
          setCircle(green);
        } else {
          console.log("서버 연결 실패!");
          console.log(res);
          setCircle(red);
        }
      })
      .catch((err) => {
        console.log("fetch 예외처리 작동");
        console.log(err);
      });
  }

  return (
    <h3>
      <img src={circle} alt="서버 연결 여부" width="15" style={circle_style} />
      {circle === green ? "서버 연결 성공" : "서버 연결 실패"}
    </h3>
  );
}

export default CheckServer;
