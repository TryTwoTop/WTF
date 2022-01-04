import { useState } from "react";
import Help from "./Help";
import "./LeftScreen.css";
import SampleClothes from "./SampleClothes";
import SampleModels from "./SampleModels";
import SubmitButton from "./SubmitButton";
import UploadButton from "./UploadButton";

import axios from "axios";
import CheckServer from "./CheckServer";

// Help 컴포넌트 id 구현하기

function LeftScreen({ uid, setPlyFile }) {
  const [clothes, setClothes] = useState(null);
  const [model, setModel] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    // https://any-ting.tistory.com/16
    // https://github.com/axios/axios
    // axios의 post 전송
    // http://daplus.net/http-get-post-요청을-수락하는-http-테스트-서버/
    axios
      .post("/", {
        uid: uid,
        uploaded_cloth: clothes,
        uploaded_model: model,
      })
      .then((res) => {
        console.log("로드 도전!");
        setPlyFile(res);
      })
      .catch((err) => {
        console.log("생성 POST 오류");
        console.log(err);
      });
  };

  return (
    <div id="leftScreen">
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        {/* 옷 */}
        <span className="areaName">Clothes</span>
        <UploadButton
          name="uploaded_cloth"
          id="clothesFile"
          setForPost={setClothes}
        />
        <span className="areaName">OR</span>
        <Help id="clothes" />
        <SampleClothes />

        {/* 모델 */}
        <span className="areaName">Model</span>
        <UploadButton
          name="uploaded_model"
          id="modelFile"
          setForPost={setModel}
        />
        <span className="areaName">OR</span>
        <Help id="model" />
        <SampleModels />

        <SubmitButton />
      </form>
      <CheckServer uid={uid} />
    </div>
  );
}

export default LeftScreen;
