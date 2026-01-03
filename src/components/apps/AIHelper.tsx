import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { personalInfo, profile, education, experience, projects, skills, leadership } from '../../data/resumeData';
import { useOSStore } from '../../store/store';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_MODEL = 'llama-3.3-70b-versatile';

// Build the system prompt with resume context
const buildSystemPrompt = () => {
    return `You are an AI assistant representing Adithya S Nair. You have complete knowledge of his background, skills, and experience. Always respond as if you are Adithya's personal AI assistant helping visitors learn about him.

## About Adithya
${profile}

## Personal Information
- Name: ${personalInfo.name}
- Email: ${personalInfo.email}
- Phone: ${personalInfo.phone}
- Location: ${personalInfo.address}
- LinkedIn: ${personalInfo.linkedin}
- GitHub: ${personalInfo.github}

## Education
${education.map(e => `- ${e.degree} at ${e.institution} (${e.timeline}) - ${e.score}`).join('\n')}

## Professional Experience
${experience.map(e => `- ${e.title} at ${e.company} (${e.timeline}, ${e.location}): ${e.description.join('; ')}`).join('\n')}

## Leadership
${leadership.map(l => `- ${l.role} at ${l.organization} (${l.timeline}): ${l.description.join('; ')}`).join('\n')}

## Projects
${projects.map(p => `- ${p.name} (${p.timeline}): ${p.description} | Skills: ${p.skills.join(', ')}`).join('\n')}

## Technical Skills
- Programming: ${skills.programmingLanguages.join(', ')}
- Frameworks: ${skills.frameworks.join(', ')}
- AI/ML: ${skills.ai.join(', ')}
- Tools: ${skills.tools.join(', ')}

## Instructions
1. Be friendly, professional, and enthusiastic about Adithya's work
2. Answer questions about his background, skills, projects, and experience
3. If asked something not in his resume, politely say you can only speak about his professional background
4. Keep responses concise but informative
5. Use emojis occasionally to be friendly
6. If asked who you are, say you're Adithya's AI assistant
7. Highlight relevant achievements when appropriate`;
};

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        role: 'assistant',
        content: `👋 Hi there! I'm Adithya's AI assistant. I know everything about his background, skills, projects, and experience.\n\nFeel free to ask me anything like:\n• "What are Adithya's skills?"\n• "Tell me about his internship experience"\n• "What projects has he worked on?"\n• "What's his educational background?"`,
        timestamp: new Date()
    }
];

export const AIHelper = () => {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const { openWindow } = useOSStore();

    const processCommand = (text: string) => {
        const lower = text.toLowerCase();
        if (lower.includes('open calculator')) {
            // We need to import Calculator.tsx. It's safe if Calculator doesn't import AIHelper.
            // Let's assume it doesn't.
            return { action: 'open', app: 'calculator', title: 'Calculator' };
        }
        if (lower.includes('play music') || lower.includes('open music')) {
            return { action: 'open', app: 'music', title: 'Music' };
        }
        return null;
    };

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userText = input.trim();
        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content: userText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // System Command Check
        const command = processCommand(userText);
        if (command) {
            setIsLoading(true);
            setTimeout(async () => {
                let Component;
                if (command.app === 'calculator') {
                    const { Calculator } = await import('./Calculator');
                    Component = <Calculator />;
                } else if (command.app === 'music') {
                    const { Music } = await import('./Music');
                    Component = <Music />;
                }

                if (Component) {
                    openWindow(command.app, command.title, Component);

                    const systemMsg: Message = {
                        id: crypto.randomUUID(),
                        role: 'assistant',
                        content: `Opening ${command.title} for you... 🚀`,
                        timestamp: new Date()
                    };
                    setMessages(prev => [...prev, systemMsg]);
                    setIsLoading(false);
                }
            }, 500);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: GROQ_MODEL,
                    messages: [
                        { role: 'system', content: buildSystemPrompt() },
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        { role: 'user', content: input.trim() }
                    ],
                    temperature: 0.7,
                    max_tokens: 1024
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            const assistantContent = data.choices[0]?.message?.content || 'Sorry, I encountered an issue. Please try again.';

            const assistantMessage: Message = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: assistantContent,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('AI Error:', error);
            const errorMessage: Message = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: '❌ Sorry, I encountered an error connecting to the AI service. Please try again later.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const suggestedQuestions = [
        "What are Adithya's top skills?",
        "Tell me about his projects",
        "Where has he worked?",
        "What's his education?"
    ];

    return (
        <div className="w-full h-full flex flex-col bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] text-white">
            {/* Header */}
            <div className="h-14 flex items-center justify-between px-6 border-b border-white/10 bg-black/20 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Sparkles size={16} />
                    </div>
                    <div>
                        <h1 className="font-semibold">AI Assistant</h1>
                        <p className="text-xs text-gray-400">Powered by Llama 3.3 70B</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Online
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {message.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                                <Bot size={16} />
                            </div>
                        )}
                        <div
                            className={`max-w-[80%] px-4 py-3 rounded-2xl ${message.role === 'user'
                                ? 'bg-blue-600 text-white rounded-tr-sm'
                                : 'bg-white/10 text-gray-100 rounded-tl-sm'
                                }`}
                        >
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                            <p className="text-[10px] opacity-50 mt-1">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                        {message.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                                <User size={16} />
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                            <Bot size={16} />
                        </div>
                        <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Loader2 size={16} className="animate-spin" />
                                <span className="text-sm">Thinking...</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
                <div className="px-4 pb-2">
                    <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setInput(q);
                                    inputRef.current?.focus();
                                }}
                                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-gray-300 transition-colors"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/20 shrink-0">
                <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2 border border-white/10 focus-within:border-purple-500/50">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me about Adithya..."
                        className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
                        disabled={isLoading}
                        aria-label="Chat input"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading}
                        className="w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        aria-label="Send message"
                    >
                        {isLoading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Send size={14} />
                        )}
                    </button>
                </div>
                <p className="text-[10px] text-gray-500 text-center mt-2">
                    AI responses are based on Adithya's resume and may occasionally be inaccurate
                </p>
            </div>
        </div>
    );
};
