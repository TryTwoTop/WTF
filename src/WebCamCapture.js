import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

function WebcamCapture({ setModel }) {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setModel(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && <img src={imgSrc} />}
    </>
  );
}

export default WebcamCapture;

// https://codepen.io/mozmorris/pen/gOOoqpw
