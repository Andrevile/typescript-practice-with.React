import * as React from 'react';
import { useState, useRef, useCallback } from 'react';
function ResponseCheck() {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요');
  const [result, setResult] = useState<number[]>([]); // 빈배열인 경우 제네릭으로 타입을 미리 지정해줌, 그렇지 않으면 never
  const timeout = useRef<number | null>(null); //useRef 에는 3가지 종류가 있음 그중에서 readonly는 수정이 불가능하므로 바꿔줘야함
  const startTime = useRef(0);
  const endTime = useRef(0);

  const onClickScreen = useCallback(() => {
    if (state === 'waiting') {
      timeout.current = window.setTimeout(() => {
        //현재 실행환경이 Node인지 브라우저인지 헷갈려 하므로 지정해줘야함 setTimeout
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date().getTime();
      }, Math.floor(Math.random() * 1000) + 2000); //2 ~ 3 초 랜덤
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
    } else if (state === 'ready') {
      if (timeout.current) {
        //current가 존재한다라고 확정을 시켜줘야함
        clearTimeout(timeout.current);
      }

      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요');
    } else if (state === 'now') {
      endTime.current = new Date().getTime();
      setState('waiting');
      setMessage('클릭해서 시작하세요');
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  }, [state]);
  const onReset = useCallback(() => {
    //이벤트 매개변수 없어서 타이핑 할 필요 없음
    setResult([]);
  }, []);
  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        {' '}
        <div> 평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
    );
  };
  return (
    <>
      <div id='screen' className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
}

export default ResponseCheck;
