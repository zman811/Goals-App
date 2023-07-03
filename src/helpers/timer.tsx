import React, { useState, useEffect } from "react";

export default (props: any) => {
  const { initialMinute = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isTimer, setIsTimer] = useState(false);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (isTimer) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  return (
    <div>
      timer, {seconds} <button onClick={() => setIsTimer(true)}>start</button>
      <button onClick={() => setIsTimer(false)}>stop</button>
      <button onClick={() => {
        setMinutes(initialMinute);
        setSeconds(initialSeconds);
      }}>reset</button>
    </div>
  );
};
