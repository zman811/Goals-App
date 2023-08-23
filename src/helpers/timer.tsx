import React, { useState, useEffect } from "react";

export default (props: { initialMinute: number; initialSeconds: number }) => {
  // Maybe set initials to undeifnd if not passed in, then have prompt to ask for them
  const { initialMinute = undefined, initialSeconds = undefined } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isTimer, setIsTimer] = useState(false);
  const [inputSec, setInputSec] = useState(0);
  const [inputMin, setInputMin] = useState(0);

  useEffect(() => {
    if (minutes !== undefined && seconds !== undefined) {
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
    }
  });
  if (minutes !== undefined && seconds !== undefined) {
    return (
      <div>
        timer, {minutes}:{seconds} <button onClick={() => setIsTimer(true)}>start</button>
        <button onClick={() => setIsTimer(false)}>stop</button>
        <button
          onClick={() => {
            setMinutes(initialMinute);
            setSeconds(initialSeconds);
            setIsTimer(false);
          }}
        >
          reset
        </button>
      </div>
    );
  } else {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMinutes(inputMin);
          setSeconds(inputSec);
        }}
      >
        Set a timer!
        <input
          placeholder="min"
          onChange={(e) => setInputMin(e.target.value)}
        />
        <input
          placeholder=" sec"
          onChange={(e) => setInputSec(e.target.value)}
        />
        <input type="submit" />
      </form>
    );
  }
};
