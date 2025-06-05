import React from "react";

const styles = {
  container: {
    fontFamily: "Segoe UI, Roboto, Helvetica Neue, sans-serif",
    maxWidth: "700px",
    margin: "24px auto",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "80vh",
  },
  messages: {
    padding: "20px",
    flexGrow: 1,
    overflowY: "auto",
    backgroundColor: "#fbfbfb",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  message: {
    padding: "12px 16px",
    borderRadius: "16px",
    maxWidth: "75%",
    fontSize: "14px",
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
  },
  userMessage: {
    backgroundColor: "#d1e7dd",
    alignSelf: "flex-end",
    color: "#1b4332",
  },
  assistantMessage: {
    backgroundColor: "#e8e9eb",
    alignSelf: "flex-start",
    color: "#2d2d2d",
  },
  topInputsWrapper: {
    display: "flex",
    alignItems: "center", // Vertically center bullseye button
    gap: "8px",
    padding: "10px",
    backgroundColor: "#fafafa",
  },
  inputStack: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flexGrow: 1,
  },
  bottomInputWrapper: {
    backgroundColor: "#fafafa",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid #e0e0e0",
  },
  bullseyeButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    color: "#000",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputForm: {
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    backgroundColor: "#fafafa",
    flexGrow: 1,
  },
  micButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    color: "#000000",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "8px",
  },
  input: {
    flexGrow: 1,
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    marginRight: "8px",
  },
  sendButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    color: "#000000",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  extraButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    color: "#000",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "8px",
  },
  dropdownPanelUp: {
    width: "180px",
    position: "absolute",
    bottom: "100%",
    right: 0,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    zIndex: 1000,
    transform: "translateY(-4px)",
    transition: "opacity 0.2s ease-out",
    opacity: 1,
  },
  dropdownPanelDown: {
    width: "180px",
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    zIndex: 1000,
    transform: "translateY(4px)",
    transition: "opacity 0.2s ease-out",
    opacity: 1,
  },
  dropdownItem: {
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#000",
    transition: "background-color 0.2s ease",
  },
};

const BullseyeButton = () => {
  const handleClick = () => {
    window.alert("loading Context Editor in the Main Window");
  };
  return (
    <button
      type="button"
      aria-label="Bullseye"
      style={styles.bullseyeButton}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        width="20"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1" fill="none" />
        <circle cx="12" cy="12" r="6" stroke="black" strokeWidth="1" fill="none" />
        <circle cx="12" cy="12" r="2" fill="black" />
      </svg>
    </button>
  );
};

export default function ChatInterface({ messages = [], onSend }) {
  // Separate states for each input box
  const [topInput1, setTopInput1] = React.useState("");
  const [topInput2, setTopInput2] = React.useState("");
  const [bottomInput, setBottomInput] = React.useState("");

  // Dropdown states for middle and bottom inputs
  const [showDropdownMiddle, setShowDropdownMiddle] = React.useState(false);
  const [hoveredItemMiddle, setHoveredItemMiddle] = React.useState(null);

  const [showDropdownBottom, setShowDropdownBottom] = React.useState(false);
  const [hoveredItemBottom, setHoveredItemBottom] = React.useState(null);

  // Models for middle input dropdown updated to Context Groups
  const contextGroups = [
    "Azure Microservices",
    "Data Warehouse Publication",
    "Eventing Integrations",
    "None",
  ];

  const [modelMiddle, setModelMiddle] = React.useState(contextGroups[0]);
  const [modelBottom, setModelBottom] = React.useState("GPT-4.1");

  const modelsBottom = [
    "GPT-4.1",
    "GPT-4.0",
    "Gemini 2.0 Flash",
    "o3-mini",
    "Claude 3.5 Sonnet",
  ];

  // Options for the "+" menu in the upper rectangle
  const topMenuOptions = [
    "Org-X",
    "User-Y",
    "RefArch-A",
    "Data B",
    "Standard-C",
  ];

  // State for upper rectangle buttons and menu
  const [topButtons, setTopButtons] = React.useState([]);
  const [showTopMenu, setShowTopMenu] = React.useState(false);
  const [hoveredTopMenu, setHoveredTopMenu] = React.useState(null);

  // Close top menu on outside click
  const topMenuRef = React.useRef();
  React.useEffect(() => {
    if (!showTopMenu) return;
    function handleClick(e) {
      if (topMenuRef.current && !topMenuRef.current.contains(e.target)) {
        setShowTopMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showTopMenu]);

  // State and ref for middle context group dropdown menu
  const middleMenuRef = React.useRef();

  React.useEffect(() => {
    if (!showDropdownMiddle) return;
    function handleClick(e) {
      if (middleMenuRef.current && !middleMenuRef.current.contains(e.target)) {
        setShowDropdownMiddle(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDropdownMiddle]);

  // Example context group buttons
  const contextGroupButtons = {
    "Azure Microservices": [
      "My Dev Org",
      "My Profile",
      "Azure Tech Stacks",
      "REST + SQL APIs Ref Arch",
      "Corp Tech Standards",
    ],
    "Data Warehouse Publication": [
      "My Dev Org",
      "GCP Big Data Ref Arch",
      "Enterprise Integration Standard V1",
    ],
    "Eventing Integrations": [
      "Event Pub Standard V1",
      "Eventing Data Model V2",
      "GCP Eventing Ref Arch",
      "Eventing Arch Def V1",
    ],
    "None": [],
  };

  const handleTopInput1Submit = (e) => {
    e.preventDefault();
    if (topInput1.trim()) {
      onSend(topInput1);
      setTopInput1("");
    }
  };

  const handleTopInput2Submit = (e) => {
    e.preventDefault();
    if (topInput2.trim()) {
      onSend(topInput2);
      setTopInput2("");
    }
  };

  const handleBottomInputSubmit = (e) => {
    e.preventDefault();
    if (bottomInput.trim()) {
      onSend(bottomInput);
      setBottomInput("");
    }
  };

  // Topmost input form with + and × buttons
  const rectangleStyle = {
    height: "38px",
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    marginRight: "8px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "12px",
    minWidth: 0,
    overflowX: "auto",
  };

  const contextButtonStyle = [
    {
      height: "20px",
      marginRight: "4px",
      padding: "0 7px",
      border: "none",
      borderRadius: "10px",
      fontSize: "12px",
      cursor: "pointer",
      whiteSpace: "nowrap",
      lineHeight: "18px",
      display: "inline-block",
      color: "#222",
      background: "#ffd6e0", // fallback
      transition: "background 0.2s",
    },
    {
      background: "#d6f5ff",
    },
    {
      background: "#e0ffd6",
    },
    {
      background: "#fff7d6",
    },
    {
      background: "#e0e0ff",
    },
    {
      background: "#ffe0f7",
    },
    {
      background: "#e0fff7",
    },
  ];

  // Topmost input form with + and × buttons and dynamic buttons
  const renderInputFormTop = () => (
    <form onSubmit={handleTopInput1Submit} style={styles.inputForm}>
      <div
        style={{
          ...rectangleStyle,
          flexWrap: "wrap",
          alignContent: "flex-start",
          height: "48px",
          maxHeight: "48px",
          overflowY: "auto",
        }}
      >
        {topButtons.map((label, idx) => (
          <button
            key={label + idx}
            type="button"
            title="lors ip sum"
            style={{
              ...contextButtonStyle[0],
              ...(contextButtonStyle[(idx % (contextButtonStyle.length - 1)) + 1] || {}),
              marginBottom: "4px",
            }}
            tabIndex={-1}
          >
            {label}
          </button>
        ))}
      </div>
      <div style={{ position: "relative" }}>
        <button
          type="button"
          style={styles.sendButton}
          aria-label="Add"
          onClick={() => setShowTopMenu((v) => !v)}
        >
          +
        </button>
        {showTopMenu && (
          <div
            ref={topMenuRef}
            style={{
              ...styles.dropdownPanelDown,
              right: "auto",
              left: 0,
              minWidth: "120px",
              marginTop: "4px",
            }}>
            {topMenuOptions.map((item) => (
              <div
                key={item}
                onClick={() => {
                  if (!topButtons.includes(item)) {
                    setTopButtons((prev) => [...prev, item]);
                  }
                  setShowTopMenu(false);
                }}
                style={{
                  ...styles.dropdownItem,
                  backgroundColor:
                    hoveredTopMenu === item ? "#f0f0f0" : "transparent",
                  opacity: topButtons.includes(item) ? 0.5 : 1,
                  pointerEvents: topButtons.includes(item) ? "none" : "auto",
                }}
                onMouseEnter={() => setHoveredTopMenu(item)}
                onMouseLeave={() => setHoveredTopMenu(null)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        type="button"
        style={styles.extraButton}
        aria-label="Cancel"
        onClick={() => setTopButtons([])}
      >
        ×
      </button>
    </form>
  );

  // Middle input form with dropdown opening downward with Context Group items
  const renderInputFormMiddle = () => (
    <form onSubmit={handleTopInput2Submit} style={styles.inputForm}>
      <div
        style={{
          ...rectangleStyle,
          flexWrap: "wrap",
          alignContent: "flex-start",
          height: "48px",
          maxHeight: "48px",
          overflowY: "auto",
        }}
      >
        {contextGroupButtons[modelMiddle].map((label, idx) => (
          <button
            key={label}
            type="button"
            title="lors ip sum"
            style={{
              ...contextButtonStyle[0],
              ...(contextButtonStyle[(idx % (contextButtonStyle.length - 1)) + 1] || {}),
              marginBottom: "4px",
            }}
            tabIndex={-1}
          >
            {label}
          </button>
        ))}
      </div>
      <div style={{ position: "relative", marginLeft: "8px" }}>
        <button
          type="button"
          onClick={() => setShowDropdownMiddle(!showDropdownMiddle)}
          style={{
            fontSize: "14px",
            color: "#000000",
            backgroundColor: "transparent",
            padding: "4px 24px 4px 8px",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            border: "none",
          }}
        >
          {modelMiddle}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="#000000"
            viewBox="0 0 16 16"
            style={{ marginLeft: "4px" }}
          >
            <path d="M1.5 5.5l6 6 6-6h-12z" />
          </svg>
        </button>
        {showDropdownMiddle && (
          <div ref={middleMenuRef} style={styles.dropdownPanelDown}>
            {contextGroups.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setModelMiddle(item);
                  setShowDropdownMiddle(false);
                }}
                style={{
                  ...styles.dropdownItem,
                  backgroundColor:
                    hoveredItemMiddle === item ? "#f0f0f0" : "transparent",
                }}
                onMouseEnter={() => setHoveredItemMiddle(item)}
                onMouseLeave={() => setHoveredItemMiddle(null)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );

  // Bottom input form with dropdown opening upward and mic button
  const renderInputFormWithMic = () => (
    <form onSubmit={handleBottomInputSubmit} style={styles.inputForm}>
      <button type="button" style={styles.micButton} aria-label="Voice input">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 0 24 24"
          width="20"
          fill="currentColor"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm4.3-3c0 2.31-1.66 4.19-3.8 4.47V19h3v2H8v-2h3v-3.53c-2.14-.28-3.8-2.16-3.8-4.47H4c0 3.17 2.34 5.82 5.3 6.32V19h5.4v-1.68c2.96-.5 5.3-3.15 5.3-6.32h-2.7z" />
        </svg>
      </button>
      <input
        type="text"
        value={bottomInput}
        onChange={(e) => setBottomInput(e.target.value)}
        style={styles.input}
        placeholder="Type your message..."
      />
      <button type="submit" style={styles.sendButton} aria-label="Send message">
        ➤
      </button>
      <div style={{ position: "relative", marginLeft: "8px" }}>
        <button
          type="button"
          onClick={() => setShowDropdownBottom(!showDropdownBottom)}
          style={{
            fontSize: "14px",
            color: "#000000",
            backgroundColor: "transparent",
            padding: "4px 24px 4px 8px",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            border: "none",
          }}
        >
          {modelBottom}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="#000000"
            viewBox="0 0 16 16"
            style={{ marginLeft: "4px" }}
          >
            <path d="M1.5 5.5l6 6 6-6h-12z" />
          </svg>
        </button>
        {showDropdownBottom && (
          <div style={styles.dropdownPanelUp}>
            {modelsBottom.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setModelBottom(item);
                  setShowDropdownBottom(false);
                }}
                style={{
                  ...styles.dropdownItem,
                  backgroundColor:
                    hoveredItemBottom === item ? "#f0f0f0" : "transparent",
                }}
                onMouseEnter={() => setHoveredItemBottom(item)}
                onMouseLeave={() => setHoveredItemBottom(null)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );

  return (
    <div style={{ backgroundColor: "#e6f4ff", padding: "20px" }}>
      <div style={styles.container}>
        <div style={styles.topInputsWrapper}>
          <BullseyeButton />
          <div style={styles.inputStack}>
            {renderInputFormTop()}
            {renderInputFormMiddle()}
          </div>
        </div>

        <hr style={{ borderTop: "1px solid #e0e0e0", margin: 0 }} />

        <div style={styles.messages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                ...(msg.role === "user"
                  ? styles.userMessage
                  : styles.assistantMessage),
              }}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div style={styles.bottomInputWrapper}>{renderInputFormWithMic()}</div>
      </div>
    </div>
  );
}