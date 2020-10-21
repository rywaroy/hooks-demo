import { useState, useEffect } from 'react';
import { getClasses } from '../../services';

export default function useClasses() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getClasses().then(res => {
      setClasses(res);
    });
  }, []);

  return classes;
}
