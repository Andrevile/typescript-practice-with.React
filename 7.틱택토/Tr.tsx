import * as React from 'react';
import { Dispatch, useMemo, memo } from 'react';
import Td from './Td';

interface Props {
  rowData: string[];
  rowIndex: number;
  dispatch: Dispatch<any>;
}
function Tr({ rowData, rowIndex, dispatch }: Props) {
  return (
    <tbody>
      <tr>
        {Array(rowData.length)
          .fill(null)
          .map((td, i) => {
            return useMemo(
              () => (
                <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>
                  {''}
                </Td>
              ),
              [rowData[i]]
            );
          })}
      </tr>
    </tbody>
  );
}

export default React.memo(Tr);
