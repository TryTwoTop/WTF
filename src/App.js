import { useEffect, useState } from "react";
import LeftScreen from "./LeftScreen";
import RightScreen from "./RightScreen";
import Top from "./Top";

// hr 태그의 스타일
const hrStyle = {
  clear: "both",
};

function App() {
  const [IP, setIP] = useState("");
  const [plyFile, setPlyFile] = useState("./ply/Lucy100k.ply");

  const getIP = () => {
    fetch("https://geolocation-db.com/json/")
      .then((res) => res.json())
      .then((res) => setIP(res.IPv4))
      .catch((err) => {
        console.log("IP API 오류 발생");
        console.log(err);
      });
  };

  useEffect(() => {
    getIP();
  }, []);

  return (
    <>
      <Top IP={IP} />

      <hr style={hrStyle} />

      <main>
        <LeftScreen uid={IP} setPlyFile={setPlyFile} />
        <RightScreen plyFile={plyFile} />
      </main>
    </>
  );
}

export default App;
