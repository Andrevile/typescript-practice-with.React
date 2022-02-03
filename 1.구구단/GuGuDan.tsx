import * as React from 'react'; //React import 안해주면 jsx를 못 씀
import { useState, useRef } from 'react';
// <> === React.Fragment
const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl = useRef<HTMLInputElement>(null);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    //함수를 따로 빼서 이벤트 핸들러를 만들면 e에 타입 에러
    e.preventDefault();
    const input = inputEl.current;
    if (parseInt(value) === first * second) {
      setResult('정답');
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      if (input) {
        //INPUT이 존재한다면
        input.focus();
      }
    } else {
      setResult('땡');
      setValue('');
      if (input) {
        //INPUT이 존재한다면
        input.focus();
      }
    }
  };
  return (
    <>
      <div>
        {first} 곱하기 {second}
      </div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} type='number' value={value} onChange={(e) => setValue(e.target.value)}></input> {/*태그 안에 있는 이벤트에서는 e가 타입추론이 된다*/}
      </form>
      <div>{result}</div>
    </>
  );
};

export default GuGuDan;
