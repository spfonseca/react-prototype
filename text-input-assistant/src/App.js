import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import TextInputAssistant from './TextInputAssistant';

const suggestions = [
  'Try rephrasing your intro.',
  'Consider making this more concise.',
  'Add a formal closing statement.',
];

function App() {
  const handleExport = (data) => {
    console.log('Exported:', data);
  };

  return (
    <Box p={4}>
      <Typography variant="h6">
        Try pressing Ctrl + D while your mouse is over these inputs:
      </Typography>
      <Box my={2}>
        <TextField
          label="Input 1"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          inputProps={{ className: 'assistant-enabled' }}
        />
      </Box>
      <Box my={2}>
        <TextField
          label="Text Area 1"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          inputProps={{ className: 'assistant-enabled' }}
        />
      </Box>
      <TextInputAssistant suggestions={suggestions} onExport={handleExport} />
    </Box>
  );
}

export default App;