import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import green from './images/greenCircle.png';
import red from './images/redCircle.png';

const circle_style = {
  position: 'relative',
  top: '1px',
  marginRight: '10px',
};

// 서버 연결 여부
function CheckServer({ children }) {

  const [circle, setCircle] = useState(red);
  const [sentence, setSentence] = useState('서버 연결 실패');

  useEffect(() => {
    if (children) {
      setCircle(green);
      setSentence('서버 연결 성공'); 
    }
  }, [circle])

  return (
    <h3>
      <img src={circle} alt="서버 연결 여부" width="15" style={circle_style} />
      {sentence}
    </h3>
  );
}

export default CheckServer;