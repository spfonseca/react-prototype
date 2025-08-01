import React, { useState } from "react";
import CursorLoader from "./CursorLoader";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ height: "100vh", textAlign: "center", paddingTop: "50px" }}>
      {loading && <CursorLoader />}
      <h1>Cursor Loader Demo</h1>
      <p>Move your mouse to see the animated loader follow your cursor.</p>
      <button onClick={() => setLoading(!loading)}>
        {loading ? "Hide Loader" : "Show Loader"}
      </button>
    </div>
  );
}

export default App;
