import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import ResizablePane from './ResizablePane';

function Layout() {
  const [showLeftNav, setShowLeftNav] = useState(true);
  const location = useLocation();
  const breadcrumb = location.pathname.split('/').filter(Boolean).join(' / ') || 'Home';

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#ddd' }}>
      {showLeftNav && (
        <nav style={{ width: '200px', background: '#cce5ff', padding: '1rem' }}>
          <h3>Menu</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/another">Another Page</Link></li>
          </ul>
        </nav>
      )}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
        <header style={{ padding: '0.5rem', background: '#b3b3b3', display: 'flex', justifyContent: 'space-between' }}>
          <span>Breadcrumb: {breadcrumb}</span>
          <button onClick={() => setShowLeftNav((prev) => !prev)}>Toggle Nav</button>
        </header>
        <div style={{ flex: 1, display: 'flex' }}>
          <div style={{ flex: 1, padding: '1rem', background: '#e6ffe6' }}>
            <Outlet />
          </div>
          <ResizablePane />
        </div>
      </div>
    </div>
  );
}

export default Layout;
