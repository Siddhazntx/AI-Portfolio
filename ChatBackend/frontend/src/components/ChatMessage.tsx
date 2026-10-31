import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 mt-0.5 border ${
          isUser
            ? 'bg-white/[0.06] border-white/[0.1]'
            : 'bg-cyan-500/10 border-cyan-400/20'
        }`}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 text-white/60" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-cyan-400" />
        )}
      </div>

      <div
        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-cyan-500/10 border border-cyan-400/15 text-white/90 rounded-tr-md whitespace-pre-wrap'
            : 'bg-white/[0.04] border border-white/[0.06] text-white/80 rounded-tl-md'
        }`}
      >
        {isUser ? (
          message.content
        ) : (
          <div className="prose prose-invert prose-sm max-w-none space-y-2">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed text-white/80">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-white/95">{children}</strong>,
                em: ({ children }) => <em className="italic text-cyan-300/90">{children}</em>,
                ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 my-2 text-white/75">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 my-2 text-white/75">{children}</ol>,
                li: ({ children }) => <li className="leading-snug">{children}</li>,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
                  >
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="px-1.5 py-0.5 text-xs bg-white/[0.08] text-cyan-300 rounded border border-white/[0.06] font-mono">
                    {children}
                  </code>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

