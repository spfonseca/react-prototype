import React, { useState } from 'react';
import Variables from './Variables';

// Simple Accordion component
function Accordion({ title, children, isOpen, onClick }) {
  return (
    <div>
      <h2
        style={{ marginLeft: 0, cursor: 'pointer', userSelect: 'none' }}
        onClick={onClick}
      >
        {title}
      </h2>
      <hr />
      {isOpen && <div>{children}</div>}
    </div>
  );
}

function App() {
  const [openIndex, setOpenIndex] = useState(null);

  const sections = [
    {
      title: 'Variables',
      content: <Variables />
    },
    {
      title: 'Functions',
      content: <>goodbye world</>
    },
    {
      title: 'Compiling',
      content: <>hello world</>
    },
    {
      title: 'Objects & Arrays',
      content: <>goodbye world</>
    },
    {
      title: 'Spread Operator',
      content: <>hello world</>
    },
    {
      title: 'Asynchronicity',
      content: <>goodbye world</>
    },
    {
      title: 'Classes',
      content: <>hello world</>
    },
    {
      title: 'Modules',
      content: <>goodbye world</>
    }
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', margin: 0, padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Javascript Language Basics</h1>
      <p></p>
      {sections.map((section, idx) => (
        <Accordion
          key={section.title}
          title={section.title}
          isOpen={openIndex === idx}
          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
        >
          {section.content}
        </Accordion>
      ))}
    </div>
  );
}

export default App;
