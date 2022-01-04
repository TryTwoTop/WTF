import { useEffect, useState } from "react";
import Help from "./Help";
import "./LeftScreen.css";
import SampleClothes from "./SampleClothes";
import SampleModels from "./SampleModels";
import SubmitButton from "./SubmitButton";
import UploadButton from "./UploadButton";

import axios from "axios";
import CheckServer from "./CheckServer";

// Help 컴포넌트 id 구현하기

// axios 를 쓰던지 ,fetch 를 쓰던지 알아서 결정

// 여기서 유저 디렉토리를 만드는 URL 에 접근 하도록 하기

function LeftScreen({ uid, setPlyFile }) {
  const [userClothes, setUserClothes] = useState(null);
  const [userModel, setUserModel] = useState(null);

  function onSubmit(e) {
    e.preventDefault();

    console.log("submit button clicked!");

    // https://any-ting.tistory.com/16
    // https://github.com/axios/axios
    // axios의 post 전송
    axios
      .post("/", {
        uid: uid,
        uploaded_cloth: userClothes,
        uploaded_model: userModel,
      })
      .then((res) => res.json())
      .then((res) => {
        console.log("로드 도전!");
        setPlyFile(res);
      })
      .catch((err) => {
        console.log("post 오류");
        console.log(err);
      });
  }

  return (
    <div id="leftScreen">
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        {/* 옷 */}
        <span className="areaName">Clothes</span>
        <UploadButton
          name="uploaded_cloth"
          id="clothesFile"
          setForPost={setUserClothes}
        />
        <span className="areaName">OR</span>
        <Help id="clothes" />
        <SampleClothes />

        {/* 모델 */}
        <span className="areaName">Model</span>
        <UploadButton
          name="uploaded_model"
          id="modelFile"
          setForPost={setUserModel}
        />
        <span className="areaName">OR</span>
        <Help id="model" />
        <SampleModels />

        <SubmitButton value="Generate" />
      </form>
      <CheckServer uid={uid} />
    </div>
  );
}

export default LeftScreen;
