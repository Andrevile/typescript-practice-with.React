import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
} as const;
const scores = {
  바위: 0,
  가위: 1,
  보: -1,
} as const;

type imgCoords = typeof rspCoords[keyof typeof rspCoords];
// type imgCoords = '0' | '-142px' | '-284px';
const computerChoice = (imgCoords: imgCoords) => {
  return (Object.keys(rspCoords) as ['바위', '가위', '보']).find((k) => {
    //Object.keys의 return 값은 string[] 이므로 as로 타입을
    return rspCoords[k] === imgCoords;
  })!; //타입스크립트의 한계로 undefined가 나올 수 있으므로 !로 확정시켜줌
};

function RSP() {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState<imgCoords>(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef<number>();

  useEffect(() => {
    console.log('다시 싱행');
    interval.current = window.setInterval(changeHand, 100);
    return () => {
      console.log('종료');
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };
  const onClickBtn = (choice: keyof typeof rspCoords) => () => {
    clearInterval(interval.current);

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult('비겼습니다!');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다');
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('졌습니다!');
      setScore((prevScore) => prevScore - 1);
    }

    setTimeout(() => {
      interval.current = window.setInterval(changeHand, 100);
    }, 1000);
  };
  return (
    <>
      <div id='computer' style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
      <div>
        <button id='rock' className='btn' onClick={onClickBtn('바위')}>
          바위
        </button>
        <button id='scissor' className='btn' onClick={onClickBtn('가위')}>
          가위
        </button>
        <button id='paper' className='btn' onClick={onClickBtn('보')}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}</div>
    </>
  );
}

export default RSP;
