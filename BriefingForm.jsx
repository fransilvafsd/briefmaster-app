
import { useState } from "react";

export default function BriefingForm() {
  const [formData, setFormData] = useState({
    nome: "", marca: "", setor: "", objetivo: "", publico_alvo: "",
    mensagem: "", cores: "", referencias: "", concorrentes: "",
    elementos: "", prazo: ""
  });
  const [loading, setLoading] = useState(false);
  const [briefing, setBriefing] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/generateBriefing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    setBriefing(data.result);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block font-bold capitalize">{key.replace("_", " ")}</label>
            <textarea
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={2}
            />
          </div>
        ))}
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Gerando..." : "Gerar Briefing"}
        </button>
      </form>
      {briefing && (
        <div className="mt-6 p-4 border rounded bg-gray-100 whitespace-pre-wrap">
          {briefing}
        </div>
      )}
    </div>
  );
}
