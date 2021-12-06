import './RightScreen.css';
import SceneSample from './SceneSample';

function RightScreen({ plyFile }) {
  return (
    <div id="rightScreen">
      <SceneSample plyFile={plyFile} />
      <h5>Virtual Try-ON</h5>
    </div>
  );
}

export default RightScreen;