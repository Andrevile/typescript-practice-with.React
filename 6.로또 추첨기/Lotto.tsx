import * as React from 'react';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { sharing } from 'webpack';
import Ball from './Ball';
function getWinNumbers() {
  const candidate = Array(45)
    .fill(null)
    .map((v, i) => i + 1);
  console.log(candidate);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

function Lotto() {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState<number[]>([]); //타입스크립트에서 빈배열은 never 따라서 제네릭으로 타입 지정해줘야함
  const [bonus, setBonus] = useState<number | null>(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef<number[]>([]);
  useEffect(() => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = window.setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = window.setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);

    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);
  const onClickRedo = useCallback(() => {
    //만약 클릭이벤트가 있다면 React.MouseEvent<HTMLButtonElement>
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);
  return (
    <>
      <div>당첨 숫자</div>
      <div id='결과창'>
        {winBalls.map((v) => (
          <Ball key={v} number={v}></Ball>
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus}></Ball>}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
}

export default Lotto;
