export default async function handler(req: any, res: any) {
  // 允许跨域请求与预检
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, category } = req.body || {};
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const systemPrompt = `你是一个世界级的概念反向检索词典与博学杂学家。用户正处于“话到嘴边却叫不上来”的极度困惑状态。
你的任务是根据用户那段充满口语化、感官感受或模糊细节的特征描述，精准反向锁定最符合的标准专业学名/专有名词/成语/作品名。

要求：
1. 必须返回纯JSON格式，严禁包含任何Markdown代码块反引号标记。
2. JSON结构必须符合以下格式：
{
  "primaryMatch": {
    "name": "标准中文名",
    "pinyin": "中文拼音带声调",
    "foreignName": "英文名或学名/起源语言词",
    "category": "分类（如：日常冷门物件 / 心理与感官现象 / 高级成语与修辞 / 影视文学寻名 / 自然与科学冷知识）",
    "matchScore": 98,
    "oneSentenceDef": "极度精炼的一句话定义（30字以内）",
    "description": "详细定义、运作机制与由来，解释得令人恍然大悟（150字以内）",
    "memoryTriggers": [
      "特征对照1（证明用户印象非常准确的点）",
      "特征对照2",
      "特征对照3"
    ],
    "trivia": "极其有趣的冷知识、历史故事或趣闻梗"
  },
  "alternatives": [
    { "name": "备选词汇1", "reason": "为什么容易跟它混淆，两者的精细区别" },
    { "name": "备选词汇2", "reason": "在什么情况下其实用户可能想表达的是这个" }
  ]
}`;

  const userPrompt = `用户描述：“${query}”${category && category !== '全部' ? ` (限定倾向分类：${category})` : ''}。
请分析这具体叫什么，请直接输出上述指定JSON格式内容。`;

  // 1. 首选：Google Gemini 原生 API (GEMINI_API_KEY)
  const geminiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
          responseMimeType: 'application/json'
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
          return res.status(200).json(JSON.parse(cleaned));
        }
      }
    } catch (e: any) {
      console.error('Gemini lookup failed, trying backup if configured:', e);
    }
  }

  // 2. 备选：服务端通用兼容 Key (OPENAI_API_KEY / AI_API_KEY / DEEPSEEK_API_KEY)
  const backupKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY || process.env.DEEPSEEK_API_KEY;
  if (backupKey) {
    try {
      const baseUrl = process.env.AI_BASE_URL || (process.env.DEEPSEEK_API_KEY ? 'https://api.deepseek.com/v1' : 'https://api.openai.com/v1');
      const model = process.env.AI_MODEL || (process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4o-mini');

      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${backupKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: 'json_object' }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawContent = data.choices?.[0]?.message?.content;
        if (rawContent) {
          const cleaned = rawContent.replace(/```json/gi, '').replace(/```/g, '').trim();
          return res.status(200).json(JSON.parse(cleaned));
        }
      }
    } catch (e: any) {
      console.error('Backup lookup failed:', e);
    }
  }

  if (!geminiKey && !backupKey) {
    return res.status(500).json({
      error: 'No AI key configured on server. Please configure GEMINI_API_KEY in environment variables.'
    });
  }

  return res.status(500).json({ error: 'Reverse lookup failed' });
}
