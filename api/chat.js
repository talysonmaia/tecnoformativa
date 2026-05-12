export default async function handler(req, res) {
  // Só aceita POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages inválido' });
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

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,   // Chave fica segura no servidor!
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    const reply = data.content?.[0]?.text || 'Sem resposta.';
    return res.status(200).json({ reply });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
