import "./RightScreen.css";
import ShowScene from "./ShowScene";

function RightScreen({ plyFile }) {
  //console.log(plyFile);
  return (
    <div id="rightScreen">
      <ShowScene plyFile={plyFile} />
    </div>
  );
}

export default RightScreen;
