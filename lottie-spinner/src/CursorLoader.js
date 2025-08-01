import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import cursorLoader from "./CursorLoader.json";

const CursorLoader = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
       
        pointerEvents: "none",
        zIndex: 9999,
        width: 180,
        height: 180,
        background: "transparent",
      }}
    >
      <Lottie animationData={cursorLoader} loop autoplay />
    </div>
  );
};

export default CursorLoader;
