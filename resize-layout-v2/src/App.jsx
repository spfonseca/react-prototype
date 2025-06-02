import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import AnotherPage from './pages/AnotherPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="another" element={<AnotherPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
