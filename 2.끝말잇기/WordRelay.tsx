import * as React from 'react';
import { useCallback, useState, useRef } from 'react';
const WordRealy = () => {
  const [word, setWord] = useState('제로초');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl = useRef<HTMLInputElement>(null);

  const onSubmitForm = useCallback<(e: React.FormEvent) => void>(
    (e) => {
      e.preventDefault();
      const input = inputEl.current;
      console.log(word);
      console.log(value);
      if (word[word.length - 1] === value[0]) {
        setResult('딩동댕');
        setWord(value);
        setValue('');
        if (input) {
          input.focus();
        }
      } else {
        setResult('땡');
        setValue('');
        if (input) {
          input.focus();
        }
      }
    },
    [word, value]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(value);
      setValue(e.target.value);
    },
    [value]
  );
  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange}></input>
        {/* <input ref={inputEl} value={value} onChange={useCallback<(e: React.ChangeEvent<HTMLInputElement>) => void>((e) => setValue(e.currentTarget.value), [])}></input> */}
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordRealy;
