import * as React from 'react';
import { FunctionComponent } from 'react';
import { TryInfo } from './types';
const Try: React.FunctionComponent<{ tryInfo: TryInfo }> = ({ tryInfo }) => {
  console.log(tryInfo);
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
};

export default Try;
