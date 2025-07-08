import React from "react";
import "./ChatInterface.css";

const BullseyeButton = () => {
  const handleClick = () => {
    window.alert("loading Context Editor in the Main Window");
  };
  return (
    <button
      type="button"
      aria-label="Bullseye"
      className="chat-bullseye-button"
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
  const [topInput1, setTopInput1] = React.useState("");
  const [topInput2, setTopInput2] = React.useState("");
  const [bottomInput, setBottomInput] = React.useState("");

  const [showDropdownMiddle, setShowDropdownMiddle] = React.useState(false);
  const [hoveredItemMiddle, setHoveredItemMiddle] = React.useState(null);

  const [showDropdownBottom, setShowDropdownBottom] = React.useState(false);
  const [hoveredItemBottom, setHoveredItemBottom] = React.useState(null);

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

  const topMenuOptions = [
    "Org-X",
    "User-Y",
    "RefArch-A",
    "Data B",
    "Standard-C",
  ];

  const [topButtons, setTopButtons] = React.useState([]);
  const [showTopMenu, setShowTopMenu] = React.useState(false);
  const [hoveredTopMenu, setHoveredTopMenu] = React.useState(null);

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

  const bottomMenuRef = React.useRef();
  React.useEffect(() => {
    if (!showDropdownBottom) return;
    function handleClick(e) {
      if (bottomMenuRef.current && !bottomMenuRef.current.contains(e.target)) {
        setShowDropdownBottom(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDropdownBottom]);

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

  const contextButtonClass = "chat-context-button";
  const contextButtonColors = [
    "chat-context-button", // fallback
    "chat-context-button color1",
    "chat-context-button color2",
    "chat-context-button color3",
    "chat-context-button color4",
    "chat-context-button color5",
    "chat-context-button color6",
  ];

  const renderInputFormTop = () => (
    <form onSubmit={handleTopInput1Submit} className="chat-input-form">
      <div className="chat-rectangle" style={{ flexWrap: "wrap", alignContent: "flex-start", height: "48px", maxHeight: "48px", overflowY: "auto" }}>
        {topButtons.map((label, idx) => (
          <button
            key={label + idx}
            type="button"
            title="lors ip sum"
            className={contextButtonColors[(idx % (contextButtonColors.length - 1)) + 1] || contextButtonClass}
            tabIndex={-1}
            style={{ marginBottom: "4px" }}
          >
            {label}
          </button>
        ))}
      </div>
      <div style={{ position: "relative" }}>
        <button
          type="button"
          className="chat-send-button"
          aria-label="Add"
          onClick={() => setShowTopMenu((v) => !v)}
        >
          +
        </button>
        {showTopMenu && (
          <div
            ref={topMenuRef}
            className="chat-dropdown-panel-down"
            style={{ right: "auto", left: 0, minWidth: "120px", marginTop: "4px" }}
          >
            {topMenuOptions.map((item) => (
              <div
                key={item}
                onClick={() => {
                  if (!topButtons.includes(item)) {
                    setTopButtons((prev) => [...prev, item]);
                  }
                  setShowTopMenu(false);
                }}
                className="chat-dropdown-item"
                style={{
                  backgroundColor: hoveredTopMenu === item ? "#f0f0f0" : "transparent",
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
        className="chat-extra-button"
        aria-label="Cancel"
        onClick={() => setTopButtons([])}
      >
        ×
      </button>
    </form>
  );

  const renderInputFormMiddle = () => (
    <form onSubmit={handleTopInput2Submit} className="chat-input-form">
      <div className="chat-rectangle" style={{ flexWrap: "wrap", alignContent: "flex-start", height: "48px", maxHeight: "48px", overflowY: "auto" }}>
        {contextGroupButtons[modelMiddle].map((label, idx) => (
          <button
            key={label}
            type="button"
            title="lors ip sum"
            className={contextButtonColors[(idx % (contextButtonColors.length - 1)) + 1] || contextButtonClass}
            tabIndex={-1}
            style={{ marginBottom: "4px" }}
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
          <div ref={middleMenuRef} className="chat-dropdown-panel-down">
            {contextGroups.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setModelMiddle(item);
                  setShowDropdownMiddle(false);
                }}
                className="chat-dropdown-item"
                style={{
                  backgroundColor: hoveredItemMiddle === item ? "#f0f0f0" : "transparent",
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

  const renderInputFormWithMic = () => (
    <form onSubmit={handleBottomInputSubmit} className="chat-input-form">
      <button type="button" className="chat-mic-button" aria-label="Voice input">
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
        className="chat-input"
        placeholder="Type your message..."
      />
      <button type="submit" className="chat-send-button" aria-label="Send message">
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
          <div ref={bottomMenuRef} className="chat-dropdown-panel-up">
            {modelsBottom.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setModelBottom(item);
                  setShowDropdownBottom(false);
                }}
                className="chat-dropdown-item"
                style={{
                  backgroundColor: hoveredItemBottom === item ? "#f0f0f0" : "transparent",
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
      <div className="chat-container">
        <div className="chat-top-inputs-wrapper">
          <BullseyeButton />
          <div className="chat-input-stack">
            {renderInputFormTop()}
            {renderInputFormMiddle()}
          </div>
        </div>

        <hr style={{ borderTop: "1px solid #e0e0e0", margin: 0 }} />

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                "chat-message " +
                (msg.role === "user"
                  ? "chat-user-message"
                  : "chat-assistant-message")
              }
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="chat-bottom-input-wrapper">{renderInputFormWithMic()}</div>
      </div>
    </div>
  );
}