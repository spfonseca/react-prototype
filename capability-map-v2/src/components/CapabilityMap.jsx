import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import capabilities from '../data/capabilities';
import CapabilityNode from './CapabilityNode';

const CapabilityMap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [levelsToShow, setLevelsToShow] = useState(2);

  const pathSegments = location.pathname.split('/').filter(Boolean);
  let currentCapabilities = capabilities;

  for (const segment of pathSegments) {
    const found = currentCapabilities.find(cap => cap.id === segment);
    if (found && found.children) {
      currentCapabilities = found.children;
    } else {
      currentCapabilities = [];
      break;
    }
  }

  const handleNodeClick = (id) => {
    navigate(`${location.pathname}/${id}`);
  };

  return (
    <div className="container">
      <h1>Business Capability Map</h1>
      <div className="controls">
        <label htmlFor="levels">Levels to display:</label>
        <select
          id="levels"
          value={levelsToShow}
          onChange={(e) => setLevelsToShow(parseInt(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
      <div className="map">
        {currentCapabilities.map(capability => (
          <CapabilityNode
            key={capability.id}
            capability={capability}
            onClick={handleNodeClick}
            levelsToShow={levelsToShow - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default CapabilityMap;
