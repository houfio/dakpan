import React, { Component, Fragment } from 'react';

import { Consumer } from '../state';

export class Counter extends Component {
  render() {
    return (
      <Consumer>
        {({ value }, { increment, decrement, incrementIfOdd, incrementAsync }) => (
          <Fragment>
            <div>
              <button onClick={decrement}>-</button>
              {value}
              <button onClick={increment}>+</button>
            </div>
            <div>
              <button onClick={incrementIfOdd}>Increment if odd</button>
              <button onClick={incrementAsync}>Increment async</button>
            </div>
          </Fragment>
        )}
      </Consumer>
    )
  }
}
