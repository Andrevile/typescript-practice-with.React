import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import WordRealy from './WordRelay';

const Hot = hot(WordRealy); //HOC
ReactDOM.render(<WordRealy></WordRealy>, document.querySelector('#root'));
