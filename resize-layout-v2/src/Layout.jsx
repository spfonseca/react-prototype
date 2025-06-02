import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import ResizablePane from './ResizablePane';
import './Layout.css';

function Layout() {
  const [showLeftNav, setShowLeftNav] = useState(true);
  const location = useLocation();
  const breadcrumb = location.pathname.split('/').filter(Boolean).join(' / ') || 'Home';

  return (
    <div className="layout-root">
      {showLeftNav && (
        <nav className="layout-nav">
          <h3>Menu</h3>
          <ul className="layout-menu-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/another">Another Page</Link></li>
          </ul>
        </nav>
      )}
      <div className="layout-main">
        <header className="layout-header">
          <span>Breadcrumb: {breadcrumb}</span>
          <button onClick={() => setShowLeftNav((prev) => !prev)}>Toggle Nav</button>
        </header>
        <div className="layout-content-row">
          <div className="layout-content">
            <Outlet />
          </div>
          <ResizablePane />
        </div>
      </div>
    </div>
  );
}

export default Layout;
