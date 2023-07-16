import React, { useState, useEffect } from "react";

function Stopwatch() {
  const [milsec, setmilsec] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#374151");
  const [running, setRunning] = useState(false);
  const [buttonText, setButtonText] = useState("Run");
  const [textColor, setTextColor] = useState("#000");

  useEffect(() => {
    let intervalId = null;

    if (running) {
      intervalId = setInterval(() => {
        setmilsec((prevmilsec) => prevmilsec + 10);
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [running]);

  useEffect(() => {
    let colorIntervalId = null;

    if (running) {
      colorIntervalId = setInterval(() => {
        setBackgroundColor(generateRandomColor());
      }, 1000); // Change the interval duration here (e.g., 700 for 0.7 seconds)
    }

    return () => {
      clearInterval(colorIntervalId);
    };
  }, [running]);

  useEffect(() => {
    const brightness = calculateBrightness(backgroundColor);
    setTextColor(brightness > 127 ? "#000" : "#fff");
  }, [backgroundColor]);

  const generateRandomColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const calculateBrightness = (color) => {
    const hex = color.replace("#", "");
    const red = parseInt(hex.substr(0, 2), 16);
    const green = parseInt(hex.substr(2, 2), 16);
    const blue = parseInt(hex.substr(4, 2), 16);
    return red * 0.299 + green * 0.587 + blue * 0.114;
  };

  const handleStartStop = () => {
    if (running) {
      setRunning(false);
      setButtonText("Run");
    } else {
      setRunning(true);
      setButtonText("Stop");
    }
  };

  const handleReset = () => {
    setmilsec(0);
    setBackgroundColor("#374151");
    setRunning(false);
    setButtonText("Start");
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milsec = time % 1000;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${milsec
      .toString()
      .padStart(3, "0")}`;
  };

  return (
    <div
      style={{
        backgroundColor,
        color: textColor,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem" }}>TT-Stopwatch</h1>
      <div className="w-40">
        <img src="./nino.png" />
      </div>

      <p style={{ fontSize: "2rem", marginBottom: "2rem" }}>
        Time: {formatTime(milsec)}
      </p>
      <div>
        <button
          style={{
            fontSize: "1.5rem",
            padding: "1rem",
            marginRight: "1rem",
            background: running ? "#ff5555" : "#55ff55",
            color: running ? "#fff" : "#374151",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleStartStop}
        >
          {buttonText}
        </button>
        <button
          style={{
            fontSize: "1.5rem",
            padding: "1rem",
            background: "#5555ff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
