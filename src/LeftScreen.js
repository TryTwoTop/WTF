import Help from './Help';
import './LeftScreen.css';
import SampleClothes from './SampleClothes';
import SampleModels from './SampleModels';
import SubmitButton from './SubmitButton';
import UploadButton from './UploadButton';

// Help 컴포넌트 id 구현하기

function LeftScreen({ uid='' }) {
  return (
    <div id="leftScreen">
      <form action="" method="post" encType="multipart/form-data">
        <input type="hidden" name="uid" value={uid} />

        {/* 옷 */}
        <span class="areaName">Clothes</span>
        <UploadButton name="uploaded_cloth" id="clothesFile" />
        <span class="areaName">OR</span>
        <Help id="clothes" />
        <SampleClothes />

        {/* 모델 */}
        <span class="areaName">Model</span>
        <UploadButton name="uploaded_model" id="modelFile" />
        <span class="areaName">OR</span>
        <Help id="model" />
        <SampleModels />
        
        <SubmitButton value="Generate" />
      </form>
    </div>
  );
}

export default LeftScreen;