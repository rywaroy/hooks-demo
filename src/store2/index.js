import { useEffect, useState } from 'react';


const stores = {};

const queue = {};

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

export function createStore(config) {
  const { namespace, state } = config;

  if (!namespace) {
    return;
  }

  if (stores[namespace]) {
    return stores[namespace]
  }

  stores[namespace] = state;
}

export function useStore(config) {

  let namespace

  if (typeof config === 'object') {
    namespace = config.namespace;
    createStore(config);
  } else {
    namespace = config;
  }

  if (!stores[namespace]) {
    return [];
  }

  const [, setState] = useState();

  useEffect(() => {
    subScribe(namespace, setState);
    return () => unSubScribe(namespace, setState);
  }, []);

  function setStore(object) {
    stores[namespace] = { ...stores[namespace], ...object };
    broadcast(namespace, Math.random());
  }

  return [
    stores[namespace],
    setStore
  ]
}