import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { DEFAULT_COUNTER } from '../backendData';

export const CountDownContext = createContext({
  time: 1,
  setTime: () => null,
});

export const CountDownProvider = ({ children }) => {
  const [time, setTime] = useState(1);
  const [halt, setHalt] = useState(false);
  const value = { time, setTime, halt, setHalt };
  console.log('in timer');

  useEffect(() => {
    const countTime = setInterval(
      () => setTime((prev) => (halt ? 1 : (prev % DEFAULT_COUNTER) + 1)),
      1000
    );

    return () => clearTimeout(countTime);
  }, [time]);

  return (
    <CountDownContext.Provider value={value}>
      {children}
    </CountDownContext.Provider>
  );
};
