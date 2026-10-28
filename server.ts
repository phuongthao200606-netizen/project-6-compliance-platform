import express from 'express';

const app = express();
app.use(express.json({ limit: '64kb' }));
const allowedModels = new Set(['gemini-2.5-flash', 'gemini-2.5-flash-lite']);

app.post('/api/legal-query', async (req, res) => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    res.status(503).json({ error: 'GEMINI_API_KEY chưa được cấu hình phía server.' });
    return;
  }

  const query = typeof req.body?.query === 'string' ? req.body.query.trim() : '';
  const model = allowedModels.has(req.body?.model) ? req.body.model : 'gemini-2.5-flash';
  if (!query || query.length > 4000) {
    res.status(400).json({ error: 'Câu hỏi không hợp lệ (1–4000 ký tự).' });
    return;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: 'Bạn là trợ lý nghiên cứu pháp lý. Không có cơ sở dữ liệu nguồn pháp lý được truy xuất trong yêu cầu này. KHÔNG tự tạo số hiệu điều khoản, nội dung, trích dẫn hoặc kết luận pháp lý. Giải thích rằng chưa có đủ nguồn để kết luận và yêu cầu cung cấp văn bản gốc. Không được tuyên bố có RAG.' }] },
        contents: [{ role: 'user', parts: [{ text: query }] }]
      }),
      signal: AbortSignal.timeout(25000)
    });

    if (!response.ok) {
      res.status(response.status).json({
        error: response.status === 503
          ? 'Gemini đang quá tải (503), hãy thử lại sau.'
          : `Gemini API lỗi HTTP ${response.status}`
      });
      return;
    }

    const result: any = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.map((part: any) => part.text || '').join('') || '';
    res.json({ text: text || 'Không có nội dung trả lời từ mô hình.', isRefusal: true, model: result.modelVersion || model });
  } catch {
    res.status(502).json({ error: 'Không thể kết nối Gemini API. Hệ thống không trả về câu trả lời mô phỏng.' });
  }
});

const port = Number(process.env.API_PORT || 3001);
app.listen(port, () => console.log(`Gemini API server listening on ${port}`));
