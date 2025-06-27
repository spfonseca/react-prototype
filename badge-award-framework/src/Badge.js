// Badge.js
import "./Badge.css";

import React from "react";

const awardLevelStyles = {
  bronze: "#cd7f32",
  silver: "#9ca3af",
  gold: "#ffd700",
  platinum: "#8b5cf6",
  diamond: "#b9f2ff"
};

const Badge = ({ action, category, awardLevel = "bronze", onClick, scale = 1, categoryIcons }) => {
  const color = awardLevelStyles[awardLevel] || "#ccc";
  const icon = categoryIcons[category.toLowerCase()] || categoryIcons["engineering"];
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
      {icon}
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
