const boxStyle = {
  display: "flex",
  margin: "30px 5px",
  width: "100%",
  height: "500px",
  padding: "0",
  fontSize: "20px",
};

const selectedClothImgStyle = {
  borderRight: "3px solid black",
  width: "50%",
  textAlign: "center",
};

const selectedModelImgStyle = {
  width: "50%",
  textAlign: "center",
};

const strStyle = {
  textAlign: "center",
};

function SelectedImg({ clothes, model }) {
  const str = "data:image/png;base64,";

  return (
    <div style={boxStyle}>
      <div id="selectedClothes" style={selectedClothImgStyle}>
        <br />
        <div style={strStyle}>Selected Clothes</div>
        <br />
        {clothes === "" ? null : (
          <img
            style={{ border: "2px solid black" }}
            src={str.concat(clothes)}
            alt="사진"
            width="80%"
          />
        )}
      </div>

      <div id="selectedModel" style={selectedModelImgStyle}>
        <br />
        <div style={strStyle}>Selected Model</div>
        <br />
        {model === "" ? null : (
          <img
            style={{
              border: "2px solid black",
              textAlign: "center",
            }}
            src={str.concat(model)}
            alt="사진"
            width="80%"
          />
        )}
      </div>
    </div>
  );
}

export default SelectedImg;
