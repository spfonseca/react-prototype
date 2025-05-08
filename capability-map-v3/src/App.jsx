import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CapabilityMap from './components/CapabilityMap';

const App = () => (
  <Router>
    <Routes>
      <Route path="/*" element={<CapabilityMap />} />
    </Routes>
  </Router>
);

export default App;
