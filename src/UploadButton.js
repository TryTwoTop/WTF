import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from "react";

// 출처
// http://tcpschool.com/html-tag-attrs/form-enctype
// https://onecompiler.com/html
// https://stackoverflow.com/questions/12543848/does-form-data-still-transfer-if-the-input-tag-has-no-name

// https://jcon.tistory.com/187

const Input = styled('input')({
  display: 'none',
});

const upload_style = {
  width: '50%',
  marginLeft: '10px',
  marginRight: '10px'
};

export default function UploadButton({ name, id }) {
  const [encodedFile, setEncodedFile] = useState(0);
  const [fileName, setFileName] = useState('UPLOAD');

  const onChange = e => {
    setFileName(e.target.files[0].name);
    // 아이디 확인하려고 변수에 저장
    const id = e.target.id;
    const files = e.target.files;
    const file = files[0];
    getBase64(file, id);
  };

  const onLoad = fileString => {
    // console.log(fileString);
    console.log('로드!!!')
  };

  // const getBase64 = file => {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     onLoad(reader.result);
  //   };
  // };

  function getBase64(file, id) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (id === 'clothesFile') {        // 옷 파일이라면
        setEncodedFile(reader.result);
      } else if (id === 'modelFile') {   // 모델 파일이라면
        setEncodedFile(reader.result);
      }
      onLoad(reader.result);
    };
  }

  return (
    <>
      <label htmlFor={id}>
        <Input accept="image/*" id={id} type="file" onChange={onChange} />
        <Button style={upload_style} variant="contained" component="span">
          {fileName}
        </Button>  
      </label>
      <input type="hidden" name={name} value={encodedFile} />
    </>
  );
}