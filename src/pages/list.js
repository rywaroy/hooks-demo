import React from 'react';
// import { createStore, useStore } from '../store';
import { createStore, useStore } from '../store2'

const ListPage = () => {
  console.log('parents')

  // createStore({
  //   namespace: 'abc',
  //   state: {
  //     a: 1,
  //     b: {
  //       c: 2,
  //     },
  //     d: [{txt: 1}, {txt: 2}]
  //   }
  // });

  // const { abc } = useStore();
  const [abc, setabc] = useStore({
    namespace: 'abc',
    state: {
      a: 1,
      b: {
        c: 2,
      },
      d: [{txt: 1}, {txt: 2}]
    }
  });

  // console.log('child');

  const add = () => {
    // abc.d[1].txt = 4;
    setabc({
      a: abc.a+1
    })
  }
  return (
    <div>
      {/* {
        abc.d.map((item, index) => (
          <p key={index}>{item.txt}</p>
        ))
      } */}
      <button onClick={add}>按钮</button>
      {/* <Child /> */}
      <Child2 />
    </div>
  )
}

function Child() {
  const { abc } = useStore();
  console.log('render');

  

  return <div>
    
    <button onClick={() => abc.a++}>按钮{abc.a}</button>
  </div>
}

function Child2() {
  const [abc, setabc] = useStore('abc');
  console.log('render');
  
  const add = () => {
    setabc({
      a: abc.a+1
    })
  }
  return <div>
    
<button onClick={add}>按钮{abc.a}</button>
  </div>
}

export default ListPage;