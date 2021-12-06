import axios from "axios";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import LeftScreen from "./LeftScreen";
import RightScreen from "./RightScreen";
import Top from "./Top";

// hr 태그의 스타일
const hr_style = {
  clear: 'both'
};

function App() {
  //creating IP state
  const [ip, setIP] = useState('');

  // ply 파일
  const [plyFile, setPlyFile] = useState('./ply/Lucy100k.ply');

   //creating function to load ip address from the API
   const getData = async () => {
     const res = await axios.get('https://geolocation-db.com/json/');
     const IPv4 = res.data.IPv4;
    //  const ID = IPv4.split('.').join("");
     setIP(IPv4);
   }
   
   useEffect(() => {
     //passing getData method to the lifecycle method
     getData();
   }, [])

  return (
    <>
      <Top ip={ip} />
      <hr style={hr_style} />

      <LeftScreen uid={ip} setPlyFile={setPlyFile} />
      <RightScreen plyFile={plyFile} />
    </>
  );
}

export default App;