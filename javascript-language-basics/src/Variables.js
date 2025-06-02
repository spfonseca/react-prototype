
import React, { useEffect } from 'react';
import './App.css';

function Variables() {
      useEffect(() => {
    // Prism will be available globally since it's loaded in index.html
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', margin: 0, padding: '20px' }}>
      
      <h3 style={{ marginLeft: 0 }}>Var</h3>
      <pre>
        <code className="language-javascript">
{`function varExample() {
  var x = 10;
  if (true) {
    var x = 20; // same variable as above
    console.log("Inside if:", x); // 20
  }
  console.log("Outside if:", x); // 20
}`}
        </code>
      </pre> 

    <h3 style={{ marginLeft: 0 }}>Let</h3>
      <pre>
        <code className="language-javascript">
{`function letExample() {
  let x = 10;
  if (true) {
      let x = 20; // different variable (block-scoped)
      console.log("Inside if:", x); // 20
  }
  console.log("Outside if:", x); // 10
}`}
        </code>
      </pre>

      <h3 style={{ marginLeft: 0 }}>Const</h3>
      <pre>
        <code className="language-javascript">
          {`
function constExample() {
  const x = 10;
  // x = 20; ❌ Error: Assignment to constant variable

  const arr = [1, 2, 3];
  arr.push(4); // ✅ allowed
  console.log("Modified array:", arr); // [1, 2, 3, 4]

  const obj = { name: "Alice" };
  obj.name = "Bob"; // ✅ allowed
  console.log("Modified object:", obj); // { name: "Bob" }
}  
          `}  
     </code>
     </pre>
    </div>
  );
}

export default Variables;
