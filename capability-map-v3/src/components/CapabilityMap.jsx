import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import capabilities from '../data/capabilities';
import CapabilityNode from './CapabilityNode';

const CapabilityMap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [levelsToShow, setLevelsToShow] = useState(5);

  const pathSegments = location.pathname.split('/').filter(Boolean);
  let currentCapabilities = capabilities;
  const breadcrumbs = [];

  for (const segment of pathSegments) {
    const found = currentCapabilities.find(cap => cap.id === segment);
    if (found) {
      breadcrumbs.push({ id: found.id, name: found.name });
      currentCapabilities = found.children || [];
    } else {
      break;
    }
  }

  // Helper to find full path to a capability
  const findPath = (nodes, targetId, path = []) => {
    for (const node of nodes) {
      const newPath = [...path, node.id];
      if (node.id === targetId) return newPath;
      if (node.children) {
        const result = findPath(node.children, targetId, newPath);
        if (result) return result;
      }
    }
    return null;
  };

  const handleNodeClick = (id) => {
    const fullPath = findPath(capabilities, id);
    if (fullPath) {
      navigate('/' + fullPath.join('/'));
    }
  };

  const handleBreadcrumbClick = (index) => {
    const path = '/' + breadcrumbs.slice(0, index + 1).map(b => b.id).join('/');
    navigate(path);
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
      <div className="breadcrumbs">
        <span onClick={() => navigate('/')}>Home</span>
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.id} onClick={() => handleBreadcrumbClick(index)}>
            {' > '}{crumb.name}
          </span>
        ))}
      </div>
      <div className="map">
        {currentCapabilities.map(capability => (
          <CapabilityNode
            key={capability.id}
            capability={capability}
            onClick={handleNodeClick}
            levelsToShow={levelsToShow - 1}
            level={0}
          />
        ))}
      </div>
    </div>
  );
};

export default CapabilityMap;
