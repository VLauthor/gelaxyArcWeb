import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [showColon, setShowColon] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      setShowColon((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <div className="font-mono flex gap-0.5">
      <span>{hours}</span>
      <span className={showColon ? "opacity-100" : "opacity-0"}>:</span>
      <span>{minutes}</span>
    </div>
  );
}