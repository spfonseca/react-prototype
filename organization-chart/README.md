# Organization Chart React Application

A modern, responsive organization chart application built with React and Material-UI.

## Features

- **Hierarchical Display**: Supports unlimited levels of organizational hierarchy
- **Interactive Nodes**: Click on any person to see details (console log for now)
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional design with Material-UI components
- **Visual Hierarchy**: CEO/leader has distinct styling
- **Smooth Animations**: Hover effects and transitions

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd organization-chart
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
organization-chart/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   └── OrgChart.js          # Main org chart component
│   ├── data/
│   │   └── sampleData.js        # Sample organization data
│   ├── App.js                   # Main application component
│   ├── index.js                 # Application entry point
│   └── index.css                # Global styles
├── package.json
└── README.md
```

## Data Structure

The organization chart expects data in the following format:

```javascript
{
  id: '1',
  firstName: 'John',
  lastName: 'Smith',
  title: 'Chief Executive Officer',
  children: [
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      title: 'Chief Technology Officer',
      children: [
        // ... more employees
      ]
    }
  ]
}
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## Customization

### Styling
The component uses Material-UI's styled components. You can customize:
- Colors and themes in `App.js`
- Node styling in `OrgChart.js`
- Layout and spacing in the styled components

### Data
Replace the sample data in `src/data/sampleData.js` with your organization's data.

### Functionality
Add more features by:
- Implementing click handlers in `App.js`
- Adding modals for detailed views
- Including employee photos
- Adding search functionality

## Technologies Used

- **React 18** - UI library
- **Material-UI 5** - Component library
- **Emotion** - CSS-in-JS styling
- **Create React App** - Development environment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 