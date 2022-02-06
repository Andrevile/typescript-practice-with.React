import * as React from 'react';
import { TableContext } from './MineSearch';
import { useContext } from 'react';
import Tr from './Tr';

const Table = () => {
  const { tableData } = useContext(TableContext);

  return (
    <table>
      {Array(tableData.length)
        .fill(null)
        .map((tr, i) => (
          <Tr rowIndex={i}></Tr>
        ))}
    </table>
  );
};

export default Table;
