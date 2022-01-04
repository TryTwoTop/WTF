import { useEffect, useState } from "react";
import LeftScreen from "./LeftScreen";
import RightScreen from "./RightScreen";
import Top from "./Top";

// hr 태그의 스타일
const hr_style = {
  clear: "both",
};

function App() {
  const [IP, setIP] = useState("");
  const [plyFile, setPlyFile] = useState("./ply/Lucy100k.ply");

  // const getData = async () => {
  //   const res = await axios.get("https://geolocation-db.com/json/");
  //   const IPv4 = res.data.IPv4;
  //   const ID = IPv4.split(".").join("");
  //   setIP(IPv4);
  // };

  const getIP = () => {
    fetch("https://geolocation-db.com/json/")
      .then((res) => res.json())
      .then((res) => setIP(res.IPv4));
  };

  useEffect(() => {
    getIP();
  }, []);

  return (
    <>
      <Top ip={IP} />

      <hr style={hr_style} />

      <main>
        <LeftScreen uid={IP} setPlyFile={setPlyFile} />
        <RightScreen plyFile={plyFile} />
      </main>
    </>
  );
}

export default App;
