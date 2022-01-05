import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

// 출처
// http://tcpschool.com/html-tag-attrs/form-enctype
// https://onecompiler.com/html
// https://stackoverflow.com/questions/12543848/does-form-data-still-transfer-if-the-input-tag-has-no-name

// https://jcon.tistory.com/187

const Input = styled("input")({
  display: "none",
});

const uploadStyle = {
  width: "50%",
  marginLeft: "10px",
  marginRight: "10px",
  textTransform: "none",
  fontSize: "18px",
};

export default function UploadButton({ id, setForPost }) {
  const [encodedFile, setEncodedFile] = useState("");
  const [fileName, setFileName] = useState("Upload");

  const onChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    getBase64(file);
  };

  // const onLoad = (fileString) => {
  //   console.log(fileString);
  // };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setEncodedFile(reader.result);
      setForPost(reader.result.substring(22));
      // onLoad(reader.result);
    };
  };

  return (
    <>
      <label htmlFor={id}>
        <Input accept="image/*" id={id} type="file" onChange={onChange} />
        <Button style={uploadStyle} variant="contained" component="span">
          {fileName}
        </Button>
      </label>
      {encodedFile !== "" ? (
        <img src={encodedFile} alt="사진" height="480px" />
      ) : null}
    </>
  );
}
