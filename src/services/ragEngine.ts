import { QueryResult } from '../types';

// This branch intentionally reports unavailable API service instead of fabricating a legal answer.
// Actual legal RAG requires indexed, verifiable source documents; the legacy data is illustrative.
export async function processLegalQuery(userQuery: string, modelName: string = 'gemini-2.5-flash'): Promise<QueryResult> {
  const query = userQuery.trim();
  if (!query) throw new Error('Vui lòng nhập câu hỏi.');
  const res = await fetch('/api/legal-query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, model: modelName })
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(payload.error || `Gemini API lỗi HTTP ${res.status}`);
  return {
    text: typeof payload.text === 'string' ? payload.text : '',
    citation: undefined,
    isRefusal: Boolean(payload.isRefusal),
    timestamp: new Date().toLocaleTimeString('vi-VN')
  };
}
