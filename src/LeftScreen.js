import { useState } from "react";
import Help from "./Help";
import "./LeftScreen.css";
import SubmitButton from "./SubmitButton";
import UploadButton from "./UploadButton";

import axios from "axios";
import CheckServer from "./CheckServer";

import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import SelectedImg from "./SelectedImg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import WebCamButton from "./WebCamButton";

// Help 컴포넌트 id 구현하기

const submitStyle = {
  width: "50%",
  textTransform: "none",
  fontSize: "20px",
  fontWeight: "bold",
};

const loadingStyle = {
  ...submitStyle,
  backgroundColor: "rgb(224, 224, 224)",
};

const helpText = {
  clothes: "입어보고 싶은 상의를 업로드 해주세요",
  model: "머리부터 발끝까지 보이는 본인의 신체 사진을 업로드 해주세요",
};

const delPrefix = (string) => {
  const pngPrefix = "data:image/png;base64,";
  const jpgPrefix = "data:image/jpeg;base64,";

  if (string.startsWith(pngPrefix)) {
    return string.substring(pngPrefix.length);
  } else if (string.startsWith(jpgPrefix)) {
    return string.substring(jpgPrefix.length);
  }
};

function LeftScreen({ uid, setPlyFile }) {
  const [clothes, setClothes] = useState("");
  const [model, setModel] = useState("");
  const [disabled, setDisabled] = useState(false);

  const MySwal = withReactContent(Swal);

  // https://www.code-helper.com/answers/decodes-a-string-of-data-which-has-been-encoded-using-base-64-encoding-nodejs
  const atob = (str) => Buffer.from(str, "base64").toString("binary");

  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
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

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const blobToDataURL = (blob, callback) => {
    var a = new FileReader();
    a.onload = function (e) {
      callback(e.target.result);
    };
    a.readAsDataURL(blob);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (clothes === "" || model === "") {
      MySwal.fire({
        icon: "error",
        title: "파일 부족",
        text: "파일을 모두 업로드해주세요",
      });
      return;
    }

    setDisabled(true);

    const clothesBase64 = delPrefix(clothes);
    const modelBase64 = delPrefix(model);

    console.log(modelBase64);
    // https://any-ting.tistory.com/16
    // https://github.com/axios/axios
    // http://daplus.net/http-get-post-요청을-수락하는-http-테스트-서버/
    axios
      .post("http://192.168.154.29:5000/wtf/3dtryon", {
        uid: uid,
        uploaded_cloth: clothesBase64,
        uploaded_model: modelBase64,
      })
      .then((res) => {
        const data = res.data;

        if (data.status === "success") {
          const result = data["3d_model"];
          const blob = b64toBlob(result, "application/octet-stream");
          blobToDataURL(blob, function (dataurl) {
            setPlyFile(dataurl);
          });
        } else {
          alert("실패!");
        }
      })
      .catch((err) => {
        console.log("Generate 버튼 전송 POST 실패");
        console.log(err);
      })
      .then(() => {
        setDisabled(false);
      });
  };

  return (
    <div id="leftScreen">
      <form onSubmit={onSubmit}>
        <div style={{ float: "left" }}>
          <div className="areaName" style={{ marginTop: "13px" }}>
            Clothes
          </div>
          <div className="areaName" style={{ marginTop: "23px" }}>
            Model
          </div>
        </div>
        <div>
          <UploadButton
            id="clothesFile"
            setForPost={setClothes}
            disabled={disabled}
          />
          <span className="areaName">OR</span>
          <Help id="clothes" text={helpText.clothes} />

          <UploadButton
            id="modelFile"
            setForPost={setModel}
            disabled={disabled}
          />
          <span className="areaName">OR</span>
          <Help id="model" text={helpText.model} />
        </div>

        <SelectedImg clothes={clothes} model={model} />

        {/* submit 버튼이 보이다가, 클릭하면 Loading 버튼으로 전환 */}
        {disabled ? (
          <LoadingButton
            style={loadingStyle}
            loading
            loadingPosition="end"
            endIcon={<SendIcon />}
            variant="contained"
            component="span"
          >
            Loading
          </LoadingButton>
        ) : (
          <SubmitButton style={submitStyle} />
        )}
        <WebCamButton setModel={setModel} />
        <CheckServer uid={uid} />
      </form>
    </div>
  );
}

export default LeftScreen;
