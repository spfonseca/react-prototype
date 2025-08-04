export const sampleOrgData = {
  organizationChartId: "org-chart-001",
  title: "Dragonfly Organization Chart",
  description: "Main organizational structure for Dragonfly Architect Services",
  leader: {
    userId: "user-001",
    title: "Chief Executive Officer",
    description: "John Smith - CEO"
  },
  directReports: [
    {
      userId: "user-002",
      title: "Chief Technology Officer",
      description: "Sarah Johnson - CTO",
      directReports: [
        {
          userId: "user-003",
          title: "Senior Software Engineer",
          description: "Mike Davis - Senior Software Engineer"
        },
        {
          userId: "user-004",
          title: "Product Manager",
          description: "Lisa Wilson - Product Manager"
        },
        {
          userId: "user-005",
          title: "DevOps Engineer",
          description: "Tom Anderson - DevOps Engineer"
        }
      ]
    },
    {
      userId: "user-006",
      title: "Chief Financial Officer",
      description: "David Brown - CFO",
      directReports: [
        {
          userId: "user-007",
          title: "Financial Analyst",
          description: "Emma Taylor - Financial Analyst"
        },
        {
          userId: "user-008",
          title: "Budget Manager",
          description: "Sophie Clark - Budget Manager"
        },
        {
          userId: "user-009",
          title: "Accountant",
          description: "James Miller - Accountant"
        }
      ]
    }
  ]
}; 