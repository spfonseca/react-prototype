import React, { useState } from "react";
import ChatInterface from "./ChatInterface";

function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);

  const handleSend = (text) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },

    ]);
  };

  return <ChatInterface messages={messages} onSend={handleSend} />;
}

export default App;
