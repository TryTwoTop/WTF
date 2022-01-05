import "./RightScreen.css";
import ShowScene from "./ShowScene";

function RightScreen({ plyFile }) {
  //console.log(plyFile);
  return (
    <div id="rightScreen">
      <ShowScene plyFile={plyFile} />
      <h5>Virtual Try-ON</h5>
    </div>
  );
}

export default RightScreen;
