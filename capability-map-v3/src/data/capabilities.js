const capabilities = [
  {
    id: 'business-management',
    name: 'Business Management',
    children: [
      {
        id: 'strategy',
        name: 'Strategy',
        children: [
          {
            id: 'corporate-strategy',
            name: 'Corporate Strategy',
            children: [
              {
                id: 'goal-setting',
                name: 'Goal Setting',
                children: [
                  { id: 'kpi-definition', name: 'KPI Definition' },
                  { id: 'target-setting', name: 'Target Setting' }
                ]
              },
              {
                id: 'scenario-planning',
                name: 'Scenario Planning',
                children: [
                  { id: 'risk-analysis', name: 'Risk Analysis' },
                  { id: 'contingency-plans', name: 'Contingency Plans' }
                ]
              }
            ]
          },
          {
            id: 'competitive-analysis',
            name: 'Competitive Analysis',
            children: [
              {
                id: 'market-research',
                name: 'Market Research',
                children: [
                  { id: 'surveys', name: 'Surveys' },
                  { id: 'trend-analysis', name: 'Trend Analysis' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'finance',
        name: 'Finance',
        children: [
          {
            id: 'budgeting',
            name: 'Budgeting',
            children: [
              {
                id: 'quarterly-budgeting',
                name: 'Quarterly Budgeting',
                children: [
                  { id: 'dept-allocations', name: 'Department Allocations' },
                  { id: 'review-process', name: 'Review Process' }
                ]
              }
            ]
          },
          {
            id: 'forecasting',
            name: 'Forecasting',
            children: [
              {
                id: 'cash-flow',
                name: 'Cash Flow',
                children: [
                  { id: 'inflows', name: 'Inflows' },
                  { id: 'outflows', name: 'Outflows' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export default capabilities;
