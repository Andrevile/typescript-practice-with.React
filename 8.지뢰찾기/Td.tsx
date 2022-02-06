import * as React from 'react';
import { useContext } from 'react';
import { TableContext } from './MineSearch';

interface Props {
  rowIndex: number;
  cellIndex: number;
}

function Td({ rowIndex, cellIndex }: Props) {
  const { tableData, dispatch, halted } = useContext(TableContext);

  return <td onClick={onClickTd}>{cellData}</td>;
}

export default Td;
