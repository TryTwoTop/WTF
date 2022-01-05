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
  const [clothes, setClothes] = useState("");
  const [model, setModel] = useState("");

  const atob = (str) => Buffer.from(str, "base64").toString("binary");

  const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  function blobToDataURL(blob, callback) {
      var a = new FileReader();
      a.onload = function(e) {callback(e.target.result);}
      a.readAsDataURL(blob);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    // https://any-ting.tistory.com/16
    // https://github.com/axios/axios
    // http://daplus.net/http-get-post-요청을-수락하는-http-테스트-서버/
    axios
      .post("http://localhost:5000/wtf/3dtryon", {
        uid: uid,
        uploaded_cloth: clothes,
        uploaded_model: model,
      })
      .then((res) => {
        const data = res.data;

        if (data.status === "success") {
          const result = data["3d_model"];
          const blob = b64toBlob(result, "application/octet-stream");
          blobToDataURL(blob, function(dataurl){
            setPlyFile(dataurl);
          });
        } else {
          alert("실패!");
        }
      })
      .catch((err) => {
        console.log("Generate 버튼 전송 POST 실패");
        console.log(err);
      });
  };

  return (
    <div id="leftScreen">
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        {/* 옷 */}
        <span className="areaName">Clothes</span>
        <UploadButton id="clothesFile" setForPost={setClothes} />
        <span className="areaName">OR</span>
        <Help id="clothes" />
        <SampleClothes />

        {/* 모델 */}
        <span className="areaName">Model</span>
        <UploadButton id="modelFile" setForPost={setModel} />
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
