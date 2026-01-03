import { useState, useRef, useEffect } from 'react';
import { Send, Search, Phone, Video, Info, User, Bot, MoreHorizontal } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'other';
    timestamp: Date;
}

interface Contact {
    id: string;
    name: string;
    avatar: React.ReactNode;
    status: 'online' | 'offline' | 'away';
    lastMessage: string;
    messages: Message[];
}

export const Messages = () => {
    const [contacts, setContacts] = useState<Contact[]>(() => [
        {
            id: 'ai',
            name: 'AdithyaOS Intelligence',
            avatar: <Bot size={24} className="text-white" />,
            status: 'online',
            lastMessage: 'How can I help you regarding Adithya\'s portfolio?',
            messages: [
                { id: '1', text: 'Hello! I am the AI assistant built into AdithyaOS.', sender: 'other', timestamp: new Date(Date.now() - 100000) },
                { id: '2', text: 'Ask me anything about Adithya\'s projects or experience.', sender: 'other', timestamp: new Date(Date.now() - 5000) }
            ]
        },
        {
            id: 'recruiter',
            name: 'Tech Recruiter',
            avatar: <User size={24} className="text-gray-600" />,
            status: 'offline',
            lastMessage: 'We would love to schedule an interview!',
            messages: [
                { id: '1', text: 'Hi Adithya, impressed by your portfolio.', sender: 'other', timestamp: new Date(Date.now() - 86400000) },
                { id: '2', text: 'We would love to schedule an interview!', sender: 'other', timestamp: new Date(Date.now() - 86000000) }
            ]
        }
    ]);

    const [activeContactId, setActiveContactId] = useState('ai');
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeContact = contacts.find(c => c.id === activeContactId)!;

    const sendMessage = () => {
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'me',
            timestamp: new Date()
        };

        const updatedContacts = contacts.map(c => {
            if (c.id === activeContactId) {
                return {
                    ...c,
                    messages: [...c.messages, newMessage],
                    lastMessage: inputText
                };
            }
            return c;
        });

        setContacts(updatedContacts);
        setInputText('');

        // Simulate reply for AI
        if (activeContactId === 'ai') {
            setTimeout(() => {
                const reply: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "I'm a demo AI. In the full version, I would connect to Groq API to answer: " + inputText,
                    sender: 'other',
                    timestamp: new Date()
                };
                setContacts(prev => prev.map(c => {
                    if (c.id === 'ai') {
                        return { ...c, messages: [...c.messages, reply], lastMessage: reply.text };
                    }
                    return c;
                }));
            }, 1000);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeContact.messages]);

    return (
        <div className="flex h-full bg-white dark:bg-[#1e1e1e] text-black dark:text-white font-sans">
            {/* Sidebar */}
            <div className="w-80 border-r border-gray-200 dark:border-white/10 flex flex-col bg-gray-50/50 dark:bg-black/20">
                <div className="p-4 pt-5 pb-2">
                    <div className="relative">
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-gray-200 dark:bg-white/10 border-none rounded-lg pl-8 pr-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-2">
                    {contacts.map(contact => (
                        <div
                            key={contact.id}
                            onClick={() => setActiveContactId(contact.id)}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${activeContactId === contact.id ? 'bg-blue-500/10 dark:bg-blue-500/20' : 'hover:bg-gray-100 dark:hover:bg-white/5'}`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${contact.id === 'ai' ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                {contact.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="font-semibold text-sm truncate">{contact.name}</h3>
                                    <span className="text-[10px] text-gray-400">
                                        {contact.messages[contact.messages.length - 1]?.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {contact.lastMessage}
                                </p>
                            </div>
                            {activeContactId === contact.id && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-[#1e1e1e]/50 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${activeContact.id === 'ai' ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                            {typeof activeContact.avatar !== 'string' ? activeContact.avatar : null}
                        </div>
                        <div>
                            <div className="font-semibold text-sm">{activeContact.name}</div>
                            <div className="text-xs text-green-500 flex items-center gap-1">
                                {activeContact.status === 'online' && <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />}
                                {activeContact.status === 'online' ? 'Online' : 'Offline'}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-blue-500">
                        <Phone size={20} className="cursor-pointer hover:opacity-80" />
                        <Video size={24} className="cursor-pointer hover:opacity-80" />
                        <Info size={20} className="cursor-pointer hover:opacity-80" />
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {activeContact.messages.map((msg, i) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'other' && (
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 self-end mb-1 ${activeContact.id === 'ai' ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                    {/* Small Avatar */}
                                    {msg.sender === 'other' && i === activeContact.messages.length - 1 && activeContact.avatar}
                                </div>
                            )}
                            <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'me'
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-gray-200 dark:bg-[#333] text-gray-900 dark:text-gray-100 rounded-bl-none'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-black/20">
                    <div className="flex items-center gap-3 bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-white/10 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                        <MoreHorizontal size={20} className="text-gray-400 cursor-pointer hover:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Message"
                            className="flex-1 bg-transparent outline-none text-sm h-full"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!inputText.trim()}
                            title="Send Message"
                            className={`p-1.5 rounded-full transition-all ${inputText.trim() ? 'bg-blue-500 text-white scale-100' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 scale-95'}`}
                        >
                            <Send size={16} className={inputText.trim() ? 'ml-0.5' : ''} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
