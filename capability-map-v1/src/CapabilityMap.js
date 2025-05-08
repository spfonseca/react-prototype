import React, { useState } from 'react';

const CapabilityMap = ({ capabilities }) => {
  const [path, setPath] = useState([]);

  const getCurrentLevel = () => {
    let current = capabilities;
    for (const level of path) {
      const next = current.find((cap) => cap.name === level);
      current = next?.children || [];
    }
    return current;
  };

  const handleDrillDown = (name, hasChildren) => {
    if (hasChildren) {
      setPath([...path, name]);
    }
  };

  const handleBack = () => {
    setPath(path.slice(0, -1));
  };

  const currentLevel = getCurrentLevel();

  return (
    <div className="capability-container">
      {path.length > 0 && (
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
      )}
      <div className="path-label">
        {path.length === 0 ? 'Top Level' : path.join(' > ')}
      </div>
      <div className="capability-grid">
        {currentLevel.map((cap) => (
          <div
            key={cap.name}
            className="capability-card"
            onClick={() => handleDrillDown(cap.name, cap.children?.length > 0)}
          >
            <div className="capability-name">{cap.name}</div>
            {cap.children?.length > 0 && (
              <div className="hint-text">Click to explore →</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CapabilityMap;
