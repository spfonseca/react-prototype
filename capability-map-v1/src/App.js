import React from 'react';
import CapabilityMap from './CapabilityMap';
import './App.css';

const data = [
  {
    name: 'Product Management',
    children: [
      {
        name: 'Roadmapping',
        children: [
          { name: 'Vision Alignment', children: [] },
          { name: 'Milestone Planning', children: [] },
        ],
      },
      {
        name: 'Market Research',
        children: [
          { name: 'Competitor Analysis', children: [] },
          { name: 'Customer Interviews', children: [] },
        ],
      },
    ],
  },
  {
    name: 'Engineering',
    children: [
      {
        name: 'Frontend Development',
        children: [{ name: 'UI Frameworks', children: [] }],
      },
      {
        name: 'Backend Development',
        children: [{ name: 'API Design', children: [] }],
      },
    ],
  },
];

function App() {
  return (
    <div className="App">
      <h1>Business Capability Map</h1>
      <CapabilityMap capabilities={data} />
    </div>
  );
}

export default App;
