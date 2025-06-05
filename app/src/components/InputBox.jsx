import React, { useState } from "react";

function InputBox({ onSend }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim()) {
      onSend(value.trim());
      setValue("");
    }
  };

  return (
    <div className="input-row">
      <input
        type="text"
        placeholder="Escribe tu mensaje..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
}

export default InputBox;