import ChatbotIcon from "./ChatbotIcon";
import TypingIndicator from "./TypingIndicator";

const ChatMessage = ({ chat }) => {
  return (
    <div className={`message ${chat.role === "bot" ? "bot" : "user"}-message`}>
      {chat.role === "bot" && <ChatbotIcon />}
      {chat.text === "thinking..." ? <TypingIndicator /> : <p className="message-text">{chat.text}</p>}
    </div>
  );
};

export default ChatMessage;
