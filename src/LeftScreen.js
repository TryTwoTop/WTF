import './LeftScreen.css';
import SampleClothes from './SampleClothes';
import SampleModels from './SampleModels';
import SubmitButton from './SubmitButton';
import UploadButton from './UploadButton';

function LeftScreen({ uid='' }) {
  return (
    <div id="leftScreen">
      <form action="" method="post" encType="multipart/form-data">
        <input type="hidden" name="uid" value={uid} />
        <span>Clothes</span>
        <UploadButton name="uploaded_cloth" id="clothesFile" />
        <span>OR</span>
        <SampleClothes />

        <span>Model</span>
        <UploadButton name="uploaded_model" id="modelFile" />
        <span>OR</span>
        <SampleModels />
        
        <SubmitButton value="Generate" />
      </form>
    </div>
  );
}

export default LeftScreen;