import { useState, useEffect, useRef } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import "./styles/chatbot.css";

const ChatBot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setChatBot] = useState(false);
  const [theme, setTheme] = useState(document.body.className || "light");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Automatically scroll to bottom on new messages
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  useEffect(() => {
    // Listen to body class changes to detect theme changes
    const observer = new MutationObserver(() => {
      setTheme(document.body.className.includes("dark") ? "dark" : "light");
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""} ${theme}`}>
      <button onClick={() => setChatBot((prev) => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">chat_bubble</span>
      </button>

      <div className={`chatbot-popup ${showChatbot ? "show-chatbot" : ""} ${theme}`}>
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">TarkChat</h2>
          </div>
          <button className="material-symbols-rounded" onClick={() => setChatBot(false)}>
            keyboard_arrow_down
          </button>
        </div>

        <div
          className="chat-body"
          ref={chatContainerRef}
          style={{ overflowY: "auto", maxHeight: "370px" }}
        >
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">Hey there 👋<br />How may I assist you with TarkSkript today?</p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
