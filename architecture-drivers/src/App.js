import React from 'react';
import ArchitectureDrivers from './ArchitectureDrivers';
import './App.css';

const mockData = {
  architectureDriverId: 'AD-AMMOS-001',
  organizationVisionStatement: 'To be the leading provider of innovative space mission operations solutions that enable seamless multi-mission operations across NASA\'s diverse mission portfolio.',
  organizationMissionStatement: 'Provide standardized, cost-effective solutions that support NASA\'s mission operations through advanced automation, interoperability, and scalable architecture.',
  productPortfolioName: 'AMMOS',
  productPortfolioScope: 'Advanced Multi-Mission Operations System - Comprehensive mission operations platform supporting NASA\'s diverse mission requirements',
  businessContext: [
    'DSN and AMMOS are funded by different NASA organizations with distinct operational requirements.',
    'AMMOS is evolutionary, not revolutionary - building on existing infrastructure and capabilities.',
    'AMMOS supports multiple planning missions with varying complexity and requirements.',
    'Integration with existing ground systems and mission control infrastructure is critical.',
    'Cost constraints require efficient resource utilization and shared capabilities.'
  ],
  technicalImperatives: [
    'Provide remote access to AMMOS capabilities for distributed mission operations.',
    'Enforce security across AMMOS to protect sensitive mission data and operations.',
    'Make AMMOS installation lightweight and deployable across different environments.',
    'Ensure interoperability with existing NASA ground systems and protocols.',
    'Support real-time data processing and mission planning capabilities.',
    'Implement scalable architecture to handle multiple concurrent missions.'
  ],
  businessImperatives: [
    'Enable new operations concepts of future NASA missions through advanced automation.',
    'Make mission data ubiquitously available across NASA\'s mission portfolio.',
    'Enable flexible deployment of Ground Data System (GDS) capabilities.',
    'Reduce operational costs through shared infrastructure and standardized processes.',
    'Support rapid mission planning and execution for time-critical operations.',
    'Facilitate collaboration between different NASA centers and mission teams.'
  ],
  qualityAttributes: [
    'Affordability',
    'Adaptability',
    'Extensibility',
    'Interoperability',
    'Deployability',
    'Reliability',
    'Security',
    'Scalability',
    'Maintainability',
    'Usability'
  ],
  importantFunctions: [
    'Mission Planning and Scheduling',
    'Real-time Data Processing',
    'Command and Control Operations',
    'Telemetry Analysis',
    'Resource Management',
    'Security and Access Control',
    'System Monitoring and Diagnostics',
    'Data Archiving and Retrieval'
  ]
};

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', margin: '20px' }}>Architecture Drivers</h1>
      <ArchitectureDrivers {...mockData} />
    </div>
  );
}

export default App;