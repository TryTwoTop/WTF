import { useEffect, useState } from 'react';
import Help from './Help';
import './LeftScreen.css';
import SampleClothes from './SampleClothes';
import SampleModels from './SampleModels';
import SubmitButton from './SubmitButton';
import UploadButton from './UploadButton';

import green from './images/greenCircle.png';
import red from './images/redCircle.png';

// Help 컴포넌트 id 구현하기

// axios 를 쓰던지 ,fetch 를 쓰던지 알아서 결정


// 여기서 유저 디렉토리를 만드는 URL 에 접근 하도록 하기

const circle_style = {
  position: 'relative',
  top: '1px',
  marginRight: '10px',
};

function LeftScreen({ uid= 'Unknown' }) {

  const [serverConnection, setServerConnection] = useState('서버 연결 실패');
  const [circle, setCircle] = useState(red);

  //console.log(`/wtf/user_directory?uid=${uid}`);

  useEffect(() => 
    fetch('https://geolocation-db.com/json/')
    .then(res => res.json())
    .then(res => {
      console.log(res.IPv4);
      uid = res.IPv4;
      connectServer();
    }), []
  );

  function connectServer() {
    fetch(`/wtf/user_directory?uid=${uid}`)
    .then(res => res.json())
    .then(res => {
      if (res.status === 'success') {
        console.log('서버 연결 성공!');
        setServerConnection('서버 연결 성공');
        setCircle(green);
      } else {
        console.log('서버 연결 실패!');
        console.log(res.status);
      }
    })
    .catch(err => {
      console.log('fetch 예외처리 작동');
      console.log(err);
    })
  };
  
  
  return (
    <div id="leftScreen">
      <form action="" method="post" encType="multipart/form-data">
        <input type="hidden" name="uid" value={uid} />

        {/* 옷 */}
        <span className="areaName">Clothes</span>
        <UploadButton name="uploaded_cloth" id="clothesFile" />
        <span className="areaName">OR</span>
        <Help id="clothes" />
        <SampleClothes />

        {/* 모델 */}
        <span className="areaName">Model</span>
        <UploadButton name="uploaded_model" id="modelFile" />
        <span className="areaName">OR</span>
        <Help id="model" />
        <SampleModels />
        
        <SubmitButton value="Generate" />

        {/* 서버 연결 여부 */}
        <h3>
          <img src={circle} alt="서버 연결 여부" width="15" style={circle_style} />
          {serverConnection}
        </h3>
      </form>
    </div>
  );
}

export default LeftScreen;