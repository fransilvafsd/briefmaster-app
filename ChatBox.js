import { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.choices?.length) setMessages([...newMessages, data.choices[0].message]);
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ border: "1px solid #ccc", padding: 10, height: 400, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <b>{m.role === "user" ? "Você" : "BriefMaster"}:</b> {m.content}
          </div>
        ))}
        {loading && <div>⏳ Respondendo...</div>}
      </div>
      <div style={{ marginTop: 10, display: "flex" }}>
        <input
          style={{ flex: 1, padding: 8 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={sendMessage} style={{ padding: "8px 16px", marginLeft: 5 }}>
          Enviar
        </button>
      </div>
    </div>
  );
}
