import * as React from 'react';

interface State {
  first: number;
  second: number;
  value: string;
  result: string;
}
class GuGuDan extends React.Component<{}, State> {
  //클래스형의 React.Component는 제네릭인데 두자리가 존재 <props,state>
  state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: '',
    result: '',
  };

  onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parseInt(this.state.value) === this.state.first * this.state.second) {
      this.setState((prevState) => {
        return {
          result: '정답' + prevState.value, //제네릭에서 State의 타입을 정해주지 않아서 타입추론을 못하면 오류가 생김
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: '',
        };
      });
      if (this.input) {
        this.input.focus();
      }
    } else {
      this.setState({
        result: '땡',
        value: '',
      });
      if (this.input) {
        this.input.focus();
      }
    }
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };
  input: HTMLInputElement | null = null;

  onRefInput = (c: HTMLInputElement) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>
          {this.state.first} 곱하기 {this.state.second}는?
        </div>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.onRefInput} type='number' value={this.state.value} onChange={this.onChange}></input> {/*태그 안에 있는 이벤트에서는 e가 타입추론이 된다*/}
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

export default GuGuDan;
