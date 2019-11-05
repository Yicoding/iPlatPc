import React, { Component, useState, useEffect } from 'react';
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
    setCount(count + 1);
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

function getList(val) {
  return new Promise((resolve, reject) => {
    console.log('Promise')
    if (parseFloat(val)) {
      resolve(val);
    } else {
      reject('err');
    }
  })
}


function Example() {
  const [count, setCount] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

  const onScroll = (e) => {
    const top = e.target.scrollTop;
    setCount(top);
    if (top > 100) {
      console.log('top>100', isFixed);
      setIsFixed(true);
    } else {
      console.log('top<100', isFixed);
      setIsFixed(false);
    }
  };

  const handleAlertClick = () => {
    try {
      const box = document.querySelector('.example');
      box.addEventListener('scroll', onScroll, false);
    } catch (e) {
      console.log('handleAlertClick报错', e);
    }
  }

  useEffect(() => {
    handleAlertClick();
  }, []);

  return (
    <div className="example">
      {
        isFixed ? (
          <div className="header">isFixed:{count}</div>
        ) : null
      }
      <div className="child">
        <p>You clicked {count} times</p>
        <button onClick={handleAlertClick}>
          Show alert
        </button>
        <div style={{ height: '800px', background: 'blue' }}></div>
      </div>
    </div>
  );
}

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      isFixed: false
    }
  }

  componentDidMount() {
    this.handleAlertClick()
  }

  onScroll = (e) => {
    const top = e.target.scrollTop;
    this.setState({ count: top });
    const { isFixed } = this.state;
    if (top > 100) {
      if (!isFixed) {
        console.log('top>100', isFixed);
        this.setState({ isFixed: true });
      }
    } else {
      if (isFixed) {
        console.log('top<100', isFixed);
        this.setState({ isFixed: false });
      }
    }
  }

  handleAlertClick = async () => {
    try {
      const box = document.querySelector('.example');
      box.addEventListener('scroll', this.onScroll, false);
    } catch (e) {

    }
  }
  render() {
    const { count, isFixed } = this.state;
    const { handleAlertClick } = this;
    return (
      <div className="example">
        {
          isFixed ? (
            <div className="header">isFixed:{count}</div>
          ) : null
        }
        <div className="child">
          <p>You clicked {count} times</p>
          <button onClick={handleAlertClick}>
            Show alert
          </button>
          <div style={{ height: '800px', background: 'blue' }}></div>
        </div>
      </div>
    );
  }
}

export default Test;