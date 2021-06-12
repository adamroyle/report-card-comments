import { useState } from "react";
import "./App.css";
import Textarea from "react-autosize-textarea";
import { useSessionStorage } from "./utils/useSessionStorage";
// import { fixComment } from "./utils/fixComment";

const STORAGE_PREFIX = `RCC_`;

function App() {
  const [text, setText] = useSessionStorage(`${STORAGE_PREFIX}_text`, "");
  const [limitString, setLimitString] = useSessionStorage(
    `${STORAGE_PREFIX}_limit`,
    "1500"
  );
  const [limit, setLimit] = useState(() => parseInt(limitString, 10));
  // const fixedText = fixComment(text);
  return (
    <div className="App">
      <header className="App-header">
        <Textarea
          style={{
            width: "45rem",
            fontSize: 16,
            padding: "1em",
            lineHeight: 1.5,
            fontFamily: "Helvetica",
            letterSpacing: "0.04em",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p>
          {text.length}/
          <input
            type="text"
            value={limitString}
            style={{
              border: 0,
              background: "transparent",
              color: "inherit",
              fontSize: "inherit",
              width: `${(limitString.length + 1) * 0.5}em`,
            }}
            onChange={(e) => {
              setLimitString(e.target.value);
              const intValue = parseInt(e.target.value, 10);
              if (!isNaN(intValue)) setLimit(intValue);
            }}
          />{" "}
          characters{" "}
          {/* {fixedText !== text && (
            <a
              href="#a"
              style={{ color: "inherit" }}
              onClick={(e) => {
                e.preventDefault();
                setText(fixedText);
              }}
            >
              Fix
            </a>
          )} */}
        </p>
        {text.length > limit && (
          <p>{text.length - limit} characters over limit!</p>
        )}
      </header>
    </div>
  );
}

export default App;
