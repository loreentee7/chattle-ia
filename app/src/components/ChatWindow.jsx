import React, { useState, useRef, useEffect } from "react";
import InputBox from "./InputBox";

const chistes = [
  "¿Por qué los programadores confunden Halloween y Navidad? Porque OCT 31 == DEC 25.",
  "¿Cuál es el animal más antiguo? La cebra, porque está en blanco y negro.",
  "¿Por qué el libro de matemáticas estaba triste? Porque tenía demasiados problemas."
];

const curiosidades = [
  "¿Sabías que el corazón de un camarón está en su cabeza?",
  "La miel nunca se echa a perder.",
  "El sol es 330,000 veces más grande que la Tierra."
];

const respuestas = [
  { keywords: ["hola", "buenas"], answers: ["¡Hola! ¿Cómo estás?", "¡Buenas! ¿En qué puedo ayudarte?", "¡Hola! 😊"] },
  { keywords: ["adiós", "bye", "hasta luego"], answers: ["¡Hasta luego!", "¡Nos vemos pronto!", "¡Cuídate!"] },
  { keywords: ["nombre"], answers: ["Me llamo Chattle, tu asistente local."] },
  { keywords: ["hora"], answers: [() => `Son las ${new Date().toLocaleTimeString()}`] },
  { keywords: ["día", "fecha"], answers: [() => `Hoy es ${new Date().toLocaleDateString()}`] },
  { keywords: ["gracias"], answers: ["¡De nada! 😊", "¡Para eso estoy!", "¡Un placer ayudarte!"] },
  { keywords: ["ayuda"], answers: ["Puedes preguntarme por la hora, fecha, chistes, curiosidades o simplemente saludarme."] },
  { keywords: ["chiste"], answers: [() => chistes[Math.floor(Math.random() * chistes.length)]] },
  { keywords: ["curiosidad"], answers: [() => curiosidades[Math.floor(Math.random() * curiosidades.length)]] },
  { keywords: ["jugar", "piedra", "papel", "tijera"], answers: [() => {
      const opciones = ["piedra", "papel", "tijera"];
      const eleccion = opciones[Math.floor(Math.random() * 3)];
      return `¡Yo elijo ${eleccion}! ¿Y tú?`;
    }]
  }
];

const defaultAnswers = [
  "No estoy seguro de cómo responder a eso.",
  "¡Interesante! ¿Puedes preguntarme otra cosa?",
  "Lo siento, aún estoy aprendiendo.",
  "No entiendo bien, ¿puedes reformularlo?"
];

function getRespuesta(text) {
  const lower = text.toLowerCase();
  for (const r of respuestas) {
    if (r.keywords.some(k => lower.includes(k))) {
      const answer = r.answers[Math.floor(Math.random() * r.answers.length)];
      return typeof answer === "function" ? answer() : answer;
    }
  }
  return defaultAnswers[Math.floor(Math.random() * defaultAnswers.length)];
}

function ChatWindow() {
  const [messages, setMessages] = useState([
    { from: "ia", text: "¡Hola! Soy tu asistente local. ¿En qué puedo ayudarte hoy?" }
  ]);
  const messagesEndRef = useRef(null);

  const handleSend = (text) => {
    setMessages(prev => [
      ...prev,
      { from: "user", text }
    ]);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { from: "ia", text: getRespuesta(text) }
      ]);
    }, 600);
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