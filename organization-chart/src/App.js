import React, { useState } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar
} from '@mui/material';
import OrgChart from './components/OrgChart';
import { sampleOrgData } from './data/sampleData';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [orgData, setOrgData] = useState(sampleOrgData);

  const handleNodeClick = (node) => {
    console.log('Clicked node:', node);
    // You can add more functionality here like opening a modal
    // or navigating to a detail page
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Organization Chart
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <OrgChart 
            data={orgData} 
            onNodeClick={handleNodeClick}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 