import React from 'react';

const CapabilityNode = ({ capability, onClick, levelsToShow }) => (
  <div className="capability-node-nested">
    <div className="capability-box" onClick={() => onClick(capability.id)}>
      {capability.name}
    </div>
    {capability.children && levelsToShow > 0 && (
      <div className="nested-children">
        {capability.children.map(child => (
          <CapabilityNode
            key={child.id}
            capability={child}
            onClick={onClick}
            levelsToShow={levelsToShow - 1}
          />
        ))}
      </div>
    )}
  </div>
);
export default CapabilityNode;
