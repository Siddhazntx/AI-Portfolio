import { MessageSquare } from 'lucide-react';

const SUGGESTIONS = [
  'Tell me about Siddhant.',
  'What are his strongest technical skills?',
  'Explain his major projects.',
  'What experience does he have with backend development?',
  'Tell me about his open-source contributions.',
  'What makes him a good candidate for an engineering role?',
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="space-y-2 px-1">
      <div className="flex items-center gap-1.5 mb-2">
        <MessageSquare className="w-3 h-3 text-white/25" />
        <span className="text-[11px] text-white/25 uppercase tracking-wider font-medium">
          Suggested questions
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            className="px-3 py-1.5 text-xs text-white/50 bg-white/[0.03] border border-white/[0.06] rounded-lg hover:bg-white/[0.06] hover:text-white/70 hover:border-white/[0.1] transition-all duration-200 cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

