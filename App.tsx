import * as React from 'react';
import { BehaviorSubject } from 'rxjs';
import './style.css';

interface State {
  isLoading: boolean;
  data1: string;
  data2: string;
  data5: string;
  data4: string;
}

interface MyPromise {
  data: string;
}

class FamilyAccountHome extends React.Component<State, any> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      data1: '',
      data2: '',
      data5: '',
      data4: '',
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    this.setState({
      isLoading: true,
    });
    Promise.all([
      this.getone(1),
      this.getone(2),
      this.getone(5),
      this.getone(4),
    ]).then(() => {
      this.setState({
        isLoading: false,
      });
    });
  };

  getone = (index = 1) => {
    console.log('fetch data');
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`get data done${index}`);
        resolve({ data: `get data done${index}` });
      }, index * 1000);
    })
      .catch((err) => {
        console.log('err=', err);
        return { status: 'err1' };
      })
      .then((value: MyPromise) => {
        console.log(`${index} then=`, value);
        this.setState({
          [`data${index}`]: value.data,
        });
      });
  };

  clearData = () => {
    this.setState(
      {
        data1: '',
        data2: '',
        data5: '',
        data4: '',
      },
      () => {
        this.initData();
      }
    );
  };

  render() {
    const { data1, data2, data5, data4 } = this.state;
    return [
      <div className={'container'}>
        <React.Fragment>
          <div className={'area1'}>{data1 && <div>接口一数据{data1}</div>}</div>
          <div className={'area2'}>{data2 && <div>接口二数据{data2}</div>}</div>
          <div className={'area3'}>{data5 && <div>接口五数据{data5}</div>}</div>
          <div className={'area4'}>{data4 && <div>接口四数据{data4}</div>}</div>
        </React.Fragment>
      </div>,
      <button onClick={this.clearData}>切换孩子</button>,
    ];
  }
}

export default FamilyAccountHome;
