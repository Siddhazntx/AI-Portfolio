import type { ChatRequest } from '../types';

// Use relative URL by default (/api/chat) for same-origin Vercel deployment and local Vite proxy.
// VITE_API_BASE_URL can optionally override if explicitly provided.
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const CHAT_ENDPOINT = `${API_BASE_URL}/api/chat`;

export async function sendMessage(question: string): Promise<string> {
  let fullText = '';
  await sendMessageStream(question, (chunk) => {
    fullText += chunk;
  });
  return fullText;
}

export async function sendMessageStream(
  question: string,
  onChunk: (chunk: string) => void
): Promise<string> {
  const payload: ChatRequest = { question };

  const response = await fetch(CHAT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Server responded with status ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await response.json();
    const answer = data.answer || '';
    onChunk(answer);
    return answer;
  }

  if (!response.body) {
    throw new Error('ReadableStream not supported by browser environment');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    fullText += chunk;
    onChunk(chunk);
  }

  return fullText;
}
