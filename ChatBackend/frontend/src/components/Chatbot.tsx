import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { sendMessageStream } from '../services/chatService';
import type { ChatMessage as ChatMessageType } from '../types';
import { SuggestedQuestions } from './SuggestedQuestions';
import { ChatMessage } from './ChatMessage';

const WELCOME_MESSAGE: ChatMessageType = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hey! I'm Siddhant's AI assistant. I can help you explore his technical skills, experience, projects, and achievements. What would you like to know?",
  timestamp: new Date(),
};

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessageType[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll ONLY the internal chat container, never the window/page
  const scrollToBottom = useCallback((smooth = true) => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom(true);
  }, [messages, isLoading, scrollToBottom]);

  const handleSend = useCallback(
    async (text?: string) => {
      const question = (text ?? input).trim();
      if (!question || isLoading) return;

      setError(null);
      setInput('');

      const userMessage: ChatMessageType = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: question,
        timestamp: new Date(),
      };

      const assistantId = `assistant-${Date.now()}`;
      const assistantPlaceholder: ChatMessageType = {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      // Add user message and blank assistant message
      setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
      setIsLoading(true);

      try {
        let accumulated = '';
        await sendMessageStream(question, (chunk) => {
          accumulated += chunk;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId ? { ...msg, content: accumulated } : msg
            )
          );
          // Keep inner view pinned to bottom during streaming without page jump
          if (chatScrollRef.current) {
            chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
          }
        });
      } catch {
        setError('Failed to get a response. Please check if the backend is running and try again.');
        // Remove empty assistant message on failure
        setMessages((prev) => prev.filter((msg) => msg.id !== assistantId || msg.content !== ''));
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          inputRef.current?.focus({ preventScroll: true });
        }, 50);
      }
    },
    [input, isLoading]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showSuggestions = messages.length === 1 && !isLoading;

  return (
    <div className="flex flex-col w-full max-w-xl h-[520px] md:h-[580px] rounded-2xl border border-white/[0.08] bg-black/45 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden transition-all">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-400/20">
          <Bot className="w-4 h-4 text-cyan-400" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-black" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-semibold text-white/90">AI Assistant</h3>
            <span className="px-1.5 py-0.2 text-[9px] uppercase tracking-wider font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-400/20 rounded">
              Live Stream
            </span>
          </div>
          <p className="text-[11px] text-white/40">Ask anything about skills, projects & background</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {messages.length > 1 && (
            <button
              type="button"
              onClick={() => {
                setMessages([WELCOME_MESSAGE]);
                setError(null);
              }}
              className="text-[11px] text-white/40 hover:text-white/70 px-2 py-1 rounded bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
              title="Reset conversation"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area (Only this container scrolls) */}
      <div
        ref={chatScrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin"
      >
        {messages.map((msg) =>
          // Don't render empty assistant bubble before first token arrives
          msg.role === 'assistant' && !msg.content ? null : (
            <ChatMessage key={msg.id} message={msg} />
          )
        )}

        {showSuggestions && (
          <div className="pt-1">
            <SuggestedQuestions onSelect={handleSend} />
          </div>
        )}

        {/* Loading indicator before first streamed chunk arrives */}
        {isLoading && messages[messages.length - 1]?.content === '' && (
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-400/20 shrink-0 mt-0.5">
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-white/50">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 animate-bounce [animation-delay:0ms]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 animate-bounce [animation-delay:150ms]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 animate-bounce [animation-delay:300ms]" />
                </div>
                <span className="text-[11px] text-white/40">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p className="text-xs leading-relaxed">{error}</p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2 focus-within:border-cyan-400/35 focus-within:bg-white/[0.06] transition-all">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about Siddhant..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-sm text-white/90 placeholder:text-white/25 outline-none disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 border border-cyan-400/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Send message"
          >
            {isLoading && messages[messages.length - 1]?.content === '' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="text-[10px] text-white/20 mt-1.5 text-center flex items-center justify-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-cyan-400/40" /> Powered by FastAPI, Groq Streaming & Siddhant's Resume
        </p>
      </div>
    </div>
  );
}
