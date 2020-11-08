import { useEffect, useState } from 'react';

const stores = {};
const queue = {};
const isObject = val => val !== null && typeof val === 'object'

const subScribe = (name, cb) => {
  if (!queue[name]) queue[name] = [];
  queue[name].push(cb);
};

const unSubScribe = (name, cb) => {
  if (!queue[name]) return;
  const index = queue[name].indexOf(cb);
  if (index !== -1) queue[name].splice(index, 1);
};

const broadcast = (name, state) => {
  if (!queue[name]) return;
  queue[name].forEach(fn => fn(state));
};

function reactive(object, handler) {
  // if(!isObject(object)) return object;

  const observed = new Proxy(object, handler);
  return observed;
}

export function createStore(config) {

  const { namespace, state } = config;

  if (!namespace) {
    return;
  }

  if (stores[namespace]) {
    return stores[namespace];
  }
  
  const handler = {
    set(target, key, val, receiver) {
      const ret = Reflect.set(target, key, val, receiver);
      broadcast(namespace, Math.random());
      return ret;
    },
    get(target, key, receiver) {
      const ret = Reflect.get(target, key, receiver);
      return isObject(ret) ? reactive(ret, handler) : ret
    },
  };

  const proxyState = reactive(state, handler);

  stores[namespace] = proxyState;

  return proxyState;
}

export function useStore() {
  return new Proxy({}, {
    get(target, key) {
      if (!stores[key]) throw new Error(`Not found the store: ${key}.`);
      const [, setState] = useState();
      useEffect(() => {
        subScribe(key, setState);
        return () => unSubScribe(key, setState);
      }, []);
      return stores[key];
    },
  })
}