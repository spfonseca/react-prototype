const capabilities = [
  {
    id: 'business-management',
    name: 'Business Management',
    children: [
      {
        id: 'strategy',
        name: 'Strategy',
        children: [
          { id: 'market-analysis', name: 'Market Analysis' },
          { id: 'competitive-analysis', name: 'Competitive Analysis' },
        ],
      },
      {
        id: 'finance',
        name: 'Finance',
        children: [
          { id: 'budgeting', name: 'Budgeting' },
          { id: 'forecasting', name: 'Forecasting' },
        ],
      },
    ],
  },
  {
    id: 'operations',
    name: 'Operations',
    children: [
      {
        id: 'supply-chain',
        name: 'Supply Chain',
        children: [
          { id: 'procurement', name: 'Procurement' },
          { id: 'logistics', name: 'Logistics' },
        ],
      },
      {
        id: 'production',
        name: 'Production',
        children: [
          { id: 'manufacturing', name: 'Manufacturing' },
          { id: 'quality-control', name: 'Quality Control' },
        ],
      },
    ],
  },
];

export default capabilities;
