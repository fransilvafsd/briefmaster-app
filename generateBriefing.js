
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { nome, marca, setor, objetivo, publico_alvo, mensagem, cores, referencias, concorrentes, elementos, prazo } = req.body;

  const prompt = `
Você é um assistente de briefing profissional. A partir das informações abaixo, monte um briefing organizado, claro e direto:

Informações:
- Nome: ${nome}
- Empresa: ${marca}
- Setor: ${setor}
- Objetivo: ${objetivo}
- Público-alvo: ${publico_alvo}
- Mensagem principal: ${mensagem}
- Cores preferidas: ${cores}
- Referências visuais: ${referencias}
- Concorrentes: ${concorrentes}
- Elementos obrigatórios: ${elementos}
- Prazo ideal: ${prazo}

Organize em seções:
1. Resumo do projeto
2. Objetivos
3. Público-alvo
4. Diretrizes visuais
5. Concorrência e diferenciais
6. Observações e prazo
7. Pontos de atenção para o designer
  `;

  const apiKey = process.env.OPENAI_API_KEY;
  const completion = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6
    })
  });

  const data = await completion.json();
  const result = data.choices?.[0]?.message?.content;

  res.status(200).json({ result });
}
