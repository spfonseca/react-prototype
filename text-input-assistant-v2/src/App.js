import React, { useState } from 'react';
import TextInputAssistant from './TextInputAssistant';

function App() {
  const [suggestions, setSuggestions] = useState([
    "Here's a professional suggestion.",
    "Here's a personable suggestion.",
    "Here's a playful suggestion."
  ]);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [textBoxValue, setTextBoxValue] = useState('');

  const handleExport = (data) => {
    // You can handle export logic here
    console.log('Exported:', data);
  };

  return (
    <div className="App" style={{ padding: 32 }}>
      <textarea
        className="assistant-enabled"
        style={{ width: 400, height: 100, marginBottom: 20, display: 'block' }}
        placeholder="Type here..."
        value={textAreaValue}
        onChange={e => setTextAreaValue(e.target.value)}
      />
      <input
        className="assistant-enabled"
        type="text"
        style={{ width: 400, marginBottom: 20, display: 'block' }}
        placeholder="Type here too..."
        value={textBoxValue}
        onChange={e => setTextBoxValue(e.target.value)}
      />
      <TextInputAssistant suggestions={suggestions} onExport={handleExport} />
    </div>
  );
}

export default App;