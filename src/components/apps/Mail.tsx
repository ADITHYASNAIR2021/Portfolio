import { useState } from 'react';
import { Send, Mail as MailIcon, Paperclip } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

export const Mail = () => {
    const [to] = useState('adithyasnair2021@gmail.com');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const { playSwooshSound } = useSound();

    const handleSend = () => {
        if (!subject || !body) return;

        setSending(true);
        // Simulate sending
        setTimeout(() => {
            setSending(false);
            setSent(true);
            playSwooshSound();

            // Reset after delay
            setTimeout(() => {
                setSent(false);
                setSubject('');
                setBody('');
            }, 3000);
        }, 1500);
    };

    if (sent) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-green-500">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <Send size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Sent!</h2>
                <p className="text-gray-500">Your message has been delivered.</p>
                <button
                    onClick={() => setSent(false)}
                    className="mt-6 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Write Another
                </button>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* Toolbar */}
            <div className="h-12 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 justify-between bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-gray-500">
                    <MailIcon size={18} />
                    <span className="text-sm font-medium">New Message</span>
                </div>
            </div>

            {/* Form */}
            <div className="flex-1 flex flex-col">
                <div className="border-b border-gray-200 dark:border-gray-800 flex items-center px-4 py-3">
                    <span className="text-gray-500 w-16 text-sm">To:</span>
                    <input
                        aria-label="To"
                        type="email"
                        value={to}
                        readOnly // Pre-filled and read-only for this demo context usually, or editable if they want to email someone else (but prompt said pre-filled)
                        className="flex-1 bg-transparent outline-none text-sm font-medium text-gray-700 dark:text-gray-200"
                    />
                </div>

                <div className="border-b border-gray-200 dark:border-gray-800 flex items-center px-4 py-3">
                    <span className="text-gray-500 w-16 text-sm">Cc/Bcc:</span>
                    <input
                        aria-label="Cc or Bcc"
                        type="text"
                        placeholder=""
                        className="flex-1 bg-transparent outline-none text-sm"
                    />
                </div>

                <div className="border-b border-gray-200 dark:border-gray-800 flex items-center px-4 py-3">
                    <span className="text-gray-500 w-16 text-sm">Subject:</span>
                    <input
                        aria-label="Subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="What's this about?"
                        className="flex-1 bg-transparent outline-none text-sm font-medium"
                    />
                </div>

                <textarea
                    aria-label="Message body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Write your message..."
                    className="flex-1 p-4 bg-transparent outline-none resize-none font-normal text-base leading-relaxed"
                />
            </div>

            {/* Footer */}
            <div className="h-14 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 bg-gray-50/50 dark:bg-gray-800/50">
                <button
                    aria-label="Attach file"
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500"
                >
                    <Paperclip size={20} />
                </button>

                <button
                    aria-label="Send email"
                    onClick={handleSend}
                    disabled={!subject || !body || sending}
                    className={`px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-sm flex items-center gap-2 transition-all ${sending ? 'opacity-70 cursor-wait' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {sending ? 'Sending...' : (
                        <>
                            Send <Send size={16} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
