import React from 'react';

const CapabilityNode = ({ capability, onClick, levelsToShow, level = 0 }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick(capability.id);
  };

  return (
    <div
      className={`capability-box level-${level % 2 === 0 ? 'even' : 'odd'}`}
      onClick={handleClick}
    >
      <div className="capability-name">{capability.name}</div>
      {capability.children && levelsToShow > 0 && (
        <div className="nested-children-inside">
          {capability.children.map(child => (
            <CapabilityNode
              key={child.id}
              capability={child}
              onClick={onClick}
              levelsToShow={levelsToShow - 1}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CapabilityNode;
