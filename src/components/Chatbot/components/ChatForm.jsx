
import { useRef, useState } from "react";
import { fetchGeminiResponse } from "../api/fetchGeminiResponse";

const ChatForm = ({ chatHistory = [], setChatHistory }) => {
  const inputRef = useRef();
  const [isWaiting, setIsWaiting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isWaiting) return;

    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setIsWaiting(true);

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
      { role: "bot", text: "thinking..." },
    ]);

    const updatedChatHistory = [...chatHistory, { role: "user", text: userMessage }];

    let responseReceived = false;
    const timeoutId = setTimeout(() => {
      if (!responseReceived) {
        setChatHistory((history) => {
          const newHistory = [...history];
          if (newHistory[newHistory.length - 1].text === "thinking...") newHistory.pop();
          newHistory.push({ role: "bot", text: "❌ Error: Server is not responding." });
          return newHistory;
        });
        setIsWaiting(false);
      }
    }, 15000);

    try {
      const botResponse = await fetchGeminiResponse(updatedChatHistory);
      responseReceived = true;
      clearTimeout(timeoutId);

      setChatHistory((history) => {
        const newHistory = [...history];
        if (newHistory[newHistory.length - 1].text === "thinking...") newHistory.pop();
        newHistory.push({ role: "bot", text: botResponse || "❌ Error: Empty response." });
        return newHistory;
      });

    } catch (error) {
      responseReceived = true;
      clearTimeout(timeoutId);
      setChatHistory((history) => {
        const newHistory = [...history];
        if (newHistory[newHistory.length - 1].text === "thinking...") newHistory.pop();
        newHistory.push({ role: "bot", text: "❌ Error: Failed to fetch response." });
        return newHistory;
      });
    }

    setIsWaiting(false);
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required />
      <button className="material-symbols-rounded" disabled={isWaiting}>
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;
