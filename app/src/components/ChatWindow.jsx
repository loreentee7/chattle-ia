import React, { useState, useRef, useEffect } from "react";
import InputBox from "./InputBox";

function ChatWindow() {
  const [messages, setMessages] = useState([
    { from: "ia", text: "¡Hola! Soy tu IA personalizada. ¿En qué puedo ayudarte hoy?" }
  ]);
  const messagesEndRef = useRef(null);

  const handleSend = (text) => {
    setMessages([...messages, { from: "user", text }]);
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { from: "ia", text: "Esta es una respuesta de ejemplo de la IA." }
      ]);
    }, 800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.from}`}>
            <div className={`bubble ${msg.from}`}>{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <InputBox onSend={handleSend} />
    </div>
  );
}

export default ChatWindow;