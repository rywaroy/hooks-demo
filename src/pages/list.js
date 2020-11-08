import React from 'react';
import { createStore, useStore } from '../store';

const ListPage = () => {
  console.log('parents')

  createStore({
    namespace: 'abc',
    state: {
      a: 1,
      b: {
        c: 2,
      },
      d: [{txt: 1}, {txt: 2}]
    }
  });

  // const { abc } = useStore();

  console.log('child');

  const add = () => {
    // abc.d[1].txt = 4;
    abc.a++
  }
  return (
    <div>
      {/* {
        abc.d.map((item, index) => (
          <p key={index}>{item.txt}</p>
        ))
      } */}
      <button onClick={add}>按钮</button>
      <Child />
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

export default ListPage;