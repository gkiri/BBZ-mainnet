import React, { useEffect, useState } from "react";

const Counter = ({ mintDate }: { mintDate: string }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(mintDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }); // Add mintDate as a dependency for the useEffect hook

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  const timerComponents = Object.keys(timeLeft).map((interval: string) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return null;
    }

    return (
      <span
        key={interval}
        className="font-bold text-4xl text-blue-800 custom-container"
      >
        {formatTime(timeLeft[interval as keyof typeof timeLeft])} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="flex items-center justify-center space-x-4">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-green-500">Minting is live!</span>
      )}
    </div>
  );
};

export default Counter;
