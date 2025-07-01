// Badge.js
import "./Badge.css";


import React from "react";

import DynamicIcon from "./DynamicIcon";


const Badge = ({ action, categoryName, awardLevel, color, iconLibrary, iconComponentName, onClick, scale = 1}) => {

console.log("Badge iconLibrary:", iconLibrary, "iconComponentName:", iconComponentName);


  const scaledWidth = 160 * scale;
  const scaledHeight = 176 * scale;

  return (
    <div
      className="badge-container"
      style={{ width: `${scaledWidth}px`, height: `${scaledHeight}px` }}
      onClick={onClick}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
          <filter id="hexShadow" x="-10" y="-10" width="120" height="120">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="black" floodOpacity="0.4" />
          </filter>
        </defs>
        <polygon
          points="50,0 93,25 93,75 50,100 7,75 7,25"
          fill={color}
          filter="url(#hexShadow)"
        />
        <foreignObject x="10" y="20" width="80" height="60">
  <div
    className="badge-content"
    style={{
      fontSize: `${0.65 * scale}rem`,
      lineHeight: 1.1,
    }}
  >
    <div className="badge-icon" style={{ fontSize: `${1.25 * scale}rem` }}>
      <DynamicIcon libKey={iconLibrary} iconName={iconComponentName} style={{ fontSize: `${1.25 * scale}rem` }} />
    </div>
    <div className="badge-text" style={{ fontSize: `${0.6 * scale}rem` }}>
      {action}
    </div>
  </div>
</foreignObject>

      </svg>
    </div>
  );
};

export default Badge;
