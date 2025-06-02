// ResizablePane.jsx
import React, { useRef, useState, useEffect } from 'react';
import './ResizablePane.css';

function ResizablePane() {
  const [width, setWidth] = useState(300);
  const [resizing, setResizing] = useState(false);

  const startResize = () => setResizing(true);
  const stopResize = () => setResizing(false);

  const handleMouseMove = (e) => {
    if (!resizing) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 50) {
      setWidth(newWidth);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [resizing]);

  return (
    <div
      className="resizable-pane"
      style={{ width: `${width}px` }}
    >
      <div
        className="resizable-pane-handle"
        onMouseDown={startResize}
      />
      <div className="resizable-pane-content">
        <h4>AI Assistant</h4>
        <p>You can resize this panel!</p>
      </div>
    </div>
  );
}

export default ResizablePane;
