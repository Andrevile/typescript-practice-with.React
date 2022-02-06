import * as React from 'react';
import { useEffect, useReducer, useMemo, Dispatch, createContext } from 'react';
import { ReducerActions, START_GAME, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, INCREMENT_TIMER } from './action';
import Form from './Form';
export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: 2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0,
} as const; //바뀔일이 없는 데이터이므로 const로 assertion
type Code = typeof CODE[keyof typeof CODE];
interface Context {
  tableData: Code[][];
  halted: boolean;
  dispatch: Dispatch<any>;
}
export const TableContext = createContext<Context>({
  tableData: [],
  halted: true,
  dispatch: () => {},
});
interface ReducerState {
  //state에 대한 interface 정의
  tableData: Code[][];
  data: {
    row: number;
    cell: number;
    mine: number;
  };

  timer: number;
  result: string;
  halted: boolean;
  openedCount: number;
}

const initialState: ReducerState = {
  //useReducer에 사용할 initialState에 interface로 정의한 ReducerState를 지정
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0,
};

const plantMine = (row: number, cell: number, mine: number): Code[][] => {
  const candidate = Array(row * cell)
    .fill(undefined)
    .map((arr, i) => {
      return i;
    });

  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data: Code[][] = [];
  for (let i = 0; i < row; i++) {
    const rowData: Code[] = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
};

const reducer = (state = initialState, action: ReducerActions): ReducerState => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        openedCount: 0,
        tableData: plantMine(action.row, action.cell, action.mine),
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked: string[] = [];
      let openedCount = 0;
      console.log(tableData.length, tableData[0].length);
      const checkAround = (row: number, cell: number) => {
        console.log(row, cell);
        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData.length) {
          return;
        }
        if (([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION] as Code[]).includes(tableData[row][cell])) {
          //숫자가 안겹칠 땐 as로 assertion 하는것이 편함
          return;
        }
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }

    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }

    default:
      return state;
  }
};

function MineSearch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;

  const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);

  useEffect(() => {
    let timer: number;
    if (halted === false) {
      timer = window.setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [halted]);
  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
}

export default MineSearch;
