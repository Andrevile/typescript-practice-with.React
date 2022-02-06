import * as React from 'react';
import { TableContext } from './MineSearch';
import { useContext } from 'react';
import Td from './Td';

interface Props {
  rowIndex: number;
}

function Tr({ rowIndex }: Props) {
  const { tableData } = useContext(TableContext);

  return (
    <tbody>
      <tr>
        {tableData[0] &&
          Array(tableData[0].length)
            .fill(null)
            .map((td, i) => {
              return <Td rowIndex={rowIndex}></Td>;
            })}
      </tr>
    </tbody>
  );
}

export default Tr;
