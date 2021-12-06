import { useEffect, useState } from 'react';
import Help from './Help';
import './LeftScreen.css';
import SampleClothes from './SampleClothes';
import SampleModels from './SampleModels';
import SubmitButton from './SubmitButton';
import UploadButton from './UploadButton';

import axios from 'axios';

import green from './images/greenCircle.png';
import red from './images/redCircle.png';

const circle_style = {
  position: 'relative',
  top: '1px',
  marginRight: '10px',
};

// Help 컴포넌트 id 구현하기

// axios 를 쓰던지 ,fetch 를 쓰던지 알아서 결정


// 여기서 유저 디렉토리를 만드는 URL 에 접근 하도록 하기

function LeftScreen({ uid= 'Unknown', setPlyFile }) {

  const [userClothes, setUserClothes] = useState(null);
  const [userModel, setUserModel] = useState(null);

  const [circle, setCircle] = useState(red);
  const [sentence, setSentence] = useState('서버 연결 실패');

  //console.log(`/wtf/user_directory?uid=${uid}`);

  useEffect(() => 
    fetch('https://geolocation-db.com/json/')
    .then(res => res.json())
    .then(res => {
      console.log(res.IPv4);
      uid = res.IPv4;
      connectServer();
    }), []);

  function connectServer() {
    fetch(`/wtf/user_directory?uid=${uid}`)
    .then(res => res.json())
    .then(res => {
      if (res.status === 'success') {
        console.log('서버 연결 성공!');
        setCircle(green);
        setSentence('서버 연결 성공')
      } else {
        console.log('서버 연결 실패!');
        console.log(res.status);
        setCircle(red);
        setSentence('서버 연결 실패');
      }
    })
    .catch(err => {
      console.log('fetch 예외처리 작동');
      console.log(err);
    })
  };


  function onSubmit(e) {
    e.preventDefault();

    console.log('submit button clicked!');
    
    // https://any-ting.tistory.com/16
    // https://github.com/axios/axios
    // axios의 post 전송
    axios.post('/', {
      uid: uid,
      uploaded_cloth: userClothes,
      uploaded_model: userModel
    })
    .then(res => res.json())
    .then(res => {
      console.log('로드 도전!');
      setPlyFile(res);
    })
    .catch(err => {
      console.log('post 오류');
      console.log(err);
    })

  }
  
  return (
    <div id="leftScreen">
      <form action="" method="post" encType="multipart/form-data" onSubmit={onSubmit} >
        <input type="hidden" name="uid" value={uid} />

        {/* 옷 */}
        <span className="areaName">Clothes</span>
        <UploadButton name="uploaded_cloth" id="clothesFile" setForPost={setUserClothes} />
        <span className="areaName">OR</span>
        <Help id="clothes" />
        <SampleClothes />

        {/* 모델 */}
        <span className="areaName">Model</span>
        <UploadButton name="uploaded_model" id="modelFile" setForPost={setUserModel} />
        <span className="areaName">OR</span>
        <Help id="model" />
        <SampleModels />
        
        <SubmitButton value="Generate" />

        {/* 서버 연결 여부 */}
        <h3>
          <img src={circle} alt="서버 연결 여부" width="15" style={circle_style} />
          {sentence}
        </h3>
      </form>
    </div>
  );
}

export default LeftScreen;