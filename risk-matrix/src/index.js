import React from 'react';
import ReactDOM from 'react-dom/client';
import RiskMatrix from './components/RiskMatrix';
import './components/RiskMatrix.css';

const sampleData = {
  riskMatrixId: 'rm-001',
  title: 'Project Risk Matrix',
  description: 'This matrix shows the number of risks by likelihood and impact.',
  risks: [
    {
      name: 'Data Breach',
      number: 1,
      description: 'Sensitive data exposure',
      ownerId: 'user-1',
      likelihood: 'LIKELY',
      impact: 'SEVERE',
      state: 'OPEN',
      resolution: 'PARTIALLY_MITIGATED',
      mitigations: ['Encrypt data', 'Access controls']
    },
    {
      name: 'Service Downtime',
      number: 2,
      description: 'Unexpected outage',
      ownerId: 'user-2',
      likelihood: 'POSSIBLE',
      impact: 'SIGNIFICANT',
      state: 'OPEN',
      resolution: 'ACCEPTED',
      mitigations: ['Redundant systems']
    },
    {
      name: 'Compliance Violation',
      number: 3,
      description: 'Non-compliance with regulations',
      ownerId: 'user-3',
      likelihood: 'UNLIKELY',
      impact: 'MODERATE',
      state: 'DRAFT',
      resolution: 'NON_ISSUE',
      mitigations: ['Regular audits']
    },
    {
      name: 'Minor Bug',
      number: 4,
      description: 'Low impact software bug',
      ownerId: 'user-4',
      likelihood: 'VERY_UNLIKELY',
      impact: 'MINOR',
      state: 'CLOSED',
      resolution: 'FULLY_MITIGATED',
      mitigations: ['QA testing']
    },
    {
      name: 'Major Bug',
      number: 5,
      description: 'High impact software bug',
      ownerId: 'user-5',
      likelihood: 'POSSIBLE',
      impact: 'SEVERE',
      state: 'OPEN',
      resolution: 'ACCEPTED',
      mitigations: ['Code review', 'Automated tests']
    },
    {
      name: 'Negligible Issue',
      number: 6,
      description: 'Negligible impact',
      ownerId: 'user-6',
      likelihood: 'VERY_UNLIKELY',
      impact: 'NEGLIGIBLE',
      state: 'DRAFT',
      resolution: 'NON_ISSUE',
      mitigations: []
    }
  ]
};

function App() {
  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '2rem' }}>
      <RiskMatrix data={sampleData} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
