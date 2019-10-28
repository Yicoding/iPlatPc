import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

function AddFun(props) {
  const {
    add
  } = props;

  const pickHandle = () => {
    add && add()
  };

  return (
    <button onClick={pickHandle}>add</button>
  );
}

const NotFound = observer(props => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(10);
  }, []);

  const pickHandle = () => {
    console.log('pick', count);
  };

  const changeHandle = () => {
    console.log('change', count);
    setCount(count + 1);
  };

  return (
    <div>
      <AddFun add={pickHandle} />
      <p>count：{count}</p>
      <button onClick={changeHandle}>change</button>
    </div>
  );
});


export default NotFound;