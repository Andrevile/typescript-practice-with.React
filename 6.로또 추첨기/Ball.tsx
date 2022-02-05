import * as React from 'react';

interface props {
  //props를 넘겨줄 때는 props에 대한 interface나 타입을 미리 지정해주고 받아옴
  number: number;
}
function Ball({ number }: props) {
  let background;
  if (number <= 10) {
    background = ' red';
  } else if (number <= 20) {
    background = 'orange';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }
  return (
    <>
      <div className='ball' style={{ background }}>
        {number}
      </div>
    </>
  );
}
export default Ball;
