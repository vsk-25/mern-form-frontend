import { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const API_URL = "https://mern-form-iq7s.onrender.com"; // Change to Render backend later

  useEffect(() => {
    fetch(`${API_URL}/messages`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setMessages([...messages, data]);
    setText("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚀 Simple MERN App</h1>
      <form onSubmit={handleSubmit}>
        <input 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter message"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {messages.map((msg) => (
          <li key={msg._id}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
