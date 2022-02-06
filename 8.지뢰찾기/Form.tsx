import * as React from 'react';
import { startGame } from './action';
import { TableContext } from './MineSearch';
import { useState, useCallback, useContext, memo } from 'react'; //만들때는 createContext 사용할때는 useContext

function Form() {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRow(Number(e.target.value));
  }, []);

  const onChangeCell = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCell(Number(e.target.value));
  }, []);

  const onChangeMine = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMine(Number(e.target.value));
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch(startGame(row, cell, mine));
  }, [row, cell, mine]);
  return (
    <div>
      <input type='number' placeholder='세로' value={row} onChange={onChangeRow}></input>
      <input type='number' placeholder='가로' value={cell} onChange={onChangeCell}></input>
      <input type='number' placeholder='세로' value={mine} onChange={onChangeMine}></input>
      <button onClick={onClickBtn}>시작</button>
    </div>
  );
}

export default React.memo(Form);
