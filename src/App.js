import { useEffect, useState } from "react";
import LeftScreen from "./LeftScreen";
import RightScreen from "./RightScreen";
import Top from "./Top";

import { v4 as uuidv4 } from "uuid";

import dolphins_be from "./ply/dolphins_be.ply";
import dolphins_le from "./ply/dolphins_le.ply";
import Lucy100k from "./ply/Lucy100k.ply";
import default_scene from "./ply/default_scene.ply";

import custom_model from "./ply/custom_model.ply";

// hr 태그의 스타일
const hrStyle = {
  clear: "both",
};

function App() {
  const [plyFile, setPlyFile] = useState(custom_model);
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
        <LeftScreen uid={uuid} setPlyFile={setPlyFile} />
        <RightScreen plyFile={plyFile} />
      </main>
    </>
  );
}

export default App;
