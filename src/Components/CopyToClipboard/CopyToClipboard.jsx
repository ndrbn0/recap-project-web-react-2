import { useState, useEffect } from "react";
import "./CopyToClipboard.css";

export default function CopyToClipboard({ text, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <button onClick={handleCopy} className="button">
      {copied ? `${label} Copied!` : `Copy ${label}`}
    </button>
  );
}
