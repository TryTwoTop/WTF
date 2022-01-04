import { useEffect, useState } from "react";
import LeftScreen from "./LeftScreen";
import RightScreen from "./RightScreen";
import Top from "./Top";

import { v4 as uuidv4 } from "uuid";

// hr 태그의 스타일
const hrStyle = {
  clear: "both",
};

function App() {
  const [plyFile, setPlyFile] = useState("./ply/Lucy100k.ply");
  const [uuid, setUuid] = useState(null);

  const getUuid = () => {
    const uuid = uuidv4();
    setUuid(uuid);
  };

  useEffect(() => {
    getUuid();
  }, []);

  return (
    <>
      <Top userId={uuid} />

      <hr style={hrStyle} />

      <main>
        <LeftScreen uuid={uuid} setPlyFile={setPlyFile} />
        <RightScreen plyFile={plyFile} />
      </main>
    </>
  );
}

export default App;
