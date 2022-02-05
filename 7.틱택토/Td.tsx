import * as React from 'react';
import { Dispatch, FC, useCallback } from 'react';
//children도 타입정의 해아함
import { CLICK_CELL } from './TicTacToe';
interface Props {
  dispatch: Dispatch<any>;
  rowIndex: number;
  cellIndex: number;
  cellData: string;
  children: string;
}

function Td({ dispatch, rowIndex, cellIndex, cellData }: Props) {
  const onClickTd = useCallback(() => {
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);
  return <td onClick={onClickTd}>{cellData}</td>;
}

export default Td;
