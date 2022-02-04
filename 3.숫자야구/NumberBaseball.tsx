import * as React from 'react';
import { useState, useRef, useCallback } from 'react';
import { TryInfo } from './types';
import Try from './Try';

const getNumbers = () => {
  console.log('뭐지 대체');
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

function NumberBaseball() {
  const [answer, setAnswer] = useState(getNumbers());
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [tries, setTries] = useState<TryInfo[]>([]); //useState가 빈 배열일때는 항상 타입 에러 따라서 interface로 정의
  const inputEl = useRef<HTMLInputElement>(null);

  const onSubmitForm = useCallback<(e: React.FormEvent) => void>(
    (e) => {
      e.preventDefault();
      console.log(tries);
      const input = inputEl.current;
      if (value === answer.join('')) {
        setTries((t) => [...t, { try: value, result: '홈런!' }]);
        setResult('홈런');
        alert('게임을 다시 실행합니다.');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        input?.focus();
      } else {
        const answerArray = value.split('').map((v) => parseInt(v));
        let strike = 0;
        let ball = 0;
        if (tries.length >= 9) {
          setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
          alert('게임을 다시 시작합니다');
          setValue('');
          setAnswer(getNumbers());
          setTries([]);
          input?.focus();
        } else {
          console.log('답은', answer.join(''));
          for (let i = 0; i < 4; i++) {
            if (answerArray[i] === answer[i]) {
              console.log('strike', answerArray[i], answer[i]);
              strike += 1;
            } else if (answer.includes(answerArray[i])) {
              console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
              ball += 1;
            }
          }
          setTries((t) => [...t, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }]);
          setValue('');
          input?.focus();
        }
      }
    },
    [value, answer]
  );

  const onChange = useCallback<(e: React.ChangeEvent<HTMLInputElement>) => void>(
    (e) => {
      setValue(e.target.value);
    },
    [value]
  );
  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} maxLength={4} value={value} onChange={onChange}></input>
        <button>입력!</button>
      </form>
      <div>시도 : {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />;
        })}
      </ul>
    </>
  );
}

export default NumberBaseball;
