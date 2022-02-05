import * as React from 'react';
import { useMemo } from 'react';

import Tr from './Tr';
interface propsState {
  onClick: () => void; //이벤트도 타입정의 해줘야함
  tableData: string[][];
  dispatch: React.Dispatch<any>;
}

function Table({ tableData, dispatch }: propsState) {
  return (
    <>
      <table>
        {Array(tableData.length)
          .fill(null)
          .map((tr, i) => {
            return useMemo(() => <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]}></Tr>, [tableData[i]]);
          })}
      </table>
    </>
  );
}

export default Table;
