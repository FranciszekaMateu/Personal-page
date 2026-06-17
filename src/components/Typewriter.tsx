"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function Typewriter({ text, delay = 50, className = "" }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    setDisplayText("");
    setIsTyping(true);

    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText((prev) => prev + text.charAt(currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, delay);

    return () => clearInterval(timer);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayText}
      {isTyping && <span className="blinking-cursor" />}
    </span>
  );
}
