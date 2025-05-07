// ResizablePane.jsx
import React, { useRef, useState, useEffect } from 'react';

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
      style={{
        width: `${width}px`,
        background: '#fff4e6',
        borderLeft: '3px solid #ffa726',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        minWidth: '50px',
      }}
    >
      <div
        style={{
          width: '6px',
          cursor: 'col-resize',
          background: '#ffa726',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 10,
        }}
        onMouseDown={startResize}
      />
      <div style={{ padding: '1rem' }}>
        <h4>AI Assistant</h4>
        <p>You can resize this panel!</p>
      </div>
    </div>
  );
}

export default ResizablePane;
