export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages inválido' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY não configurada no servidor.' });
  }

  const SYSTEM_PROMPT = `Você é um profissional especializado em educação em saúde e comunicação com pacientes.
Explique o diabetes mellitus para pacientes adultos, utilizando linguagem clara, empática e cientificamente correta.

Ao responder:
- Use linguagem acessível ao público leigo, sem jargões médicos complexos
- Organize a resposta em tópicos curtos quando necessário
- Seja empático e acolhedor
- Inclua informações baseadas em evidências científicas consolidadas
- Quando relevante, destaque a importância do acompanhamento multiprofissional
- Finalize mensagens com tom motivacional e encorajador

Diretrizes de segurança OBRIGATÓRIAS:
- Não forneça diagnóstico individual
- Não substitua avaliação médica presencial
- Não recomende medicamentos específicos ou posologias
- Evite linguagem alarmista ou estigmatizante
- Sempre incentive a busca por cuidado profissional quando adequado
- Se perguntarem sobre sintomas pessoais, oriente a procurar um médico

Responda sempre em português do Brasil.`;

  const geminiContents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

 const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: geminiContents,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        }
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const detail = data?.error?.message || JSON.stringify(data);
      return res.status(response.status).json({ error: detail });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sem resposta.';
    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Erro interno do servidor.' });
  }
}
