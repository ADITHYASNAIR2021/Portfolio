import { useState, useRef, useEffect } from 'react';
import { personalInfo, profile, education, experience, projects, skills, leadership } from '../../data/resumeData';

export const Terminal = () => {
    const [history, setHistory] = useState<string[]>(['Welcome to AdithyaOS v2.0. Type "help" for commands.', '']);
    const [input, setInput] = useState('');
    const [matrixMode, setMatrixMode] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    const handleCommand = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, `❯ ${input}`];

            if (cmd === 'clear' || cmd === 'cls') {
                setHistory([]);
            } else if (cmd === 'help') {
                setHistory([...newHistory, '',
                    '╔═══════════════════════════════════════╗',
                    '║           AVAILABLE COMMANDS          ║',
                    '╠═══════════════════════════════════════╣',
                    '║  about      - Who is Adithya?         ║',
                    '║  skills     - Technical skills        ║',
                    '║  contact    - Get contact info        ║',
                    '║  matrix     - Enter the matrix        ║',
                    '║  clear      - Clear screen            ║',
                    '╠═══════════════════════════════════════╣',
                    '║         @FILE: COMMANDS               ║',
                    '╠═══════════════════════════════════════╣',
                    '║  @file:resume     - Full resume       ║',
                    '║  @file:projects   - All projects      ║',
                    '║  @file:skills     - Skills breakdown  ║',
                    '║  @file:experience - Work experience   ║',
                    '║  @file:education  - Education details ║',
                    '║  @file:contact    - Contact info      ║',
                    '║  @file:leadership - Leadership roles  ║',
                    '╚═══════════════════════════════════════╝',
                    '']);
            } else if (cmd === 'about') {
                setHistory([...newHistory, '',
                `👤 ${personalInfo.name}`,
                `📍 ${personalInfo.address.split(',')[0]}`,
                    '',
                    profile,
                    '']);
            } else if (cmd === 'skills') {
                setHistory([...newHistory, '',
                    '🔧 Quick Skills Overview:',
                `   Languages: ${skills.programmingLanguages.join(', ')}`,
                `   Frameworks: ${skills.frameworks.slice(0, 4).join(', ')}...`,
                `   AI/ML: ${skills.ai.slice(0, 4).join(', ')}...`,
                    '',
                    '💡 Use @file:skills for detailed breakdown',
                    '']);
            } else if (cmd === 'matrix') {
                setMatrixMode(true);
                setHistory([...newHistory, 'Wake up, Neo...']);
            } else if (cmd === 'contact') {
                setHistory([...newHistory, '',
                `📧 Email: ${personalInfo.email}`,
                `📱 Phone: ${personalInfo.phone}`,
                `🔗 LinkedIn: ${personalInfo.linkedin}`,
                `💻 GitHub: ${personalInfo.github}`,
                    '']);
            } else if (cmd === '@file:resume') {
                const resumeOutput = [
                    '',
                    '╔═══════════════════════════════════════════════════════════════╗',
                    `║                    ${personalInfo.name.toUpperCase()}                     ║`,
                    '║              AI Undergraduate | Doctreen Intern               ║',
                    '╚═══════════════════════════════════════════════════════════════╝',
                    '',
                    `📧 ${personalInfo.email}  |  📱 ${personalInfo.phone}`,
                    `🔗 ${personalInfo.linkedin}  |  💻 ${personalInfo.github}`,
                    '',
                    '━━━ PROFILE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                    profile,
                    '',
                    '━━━ EDUCATION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                    ...education.map(e => `  🎓 ${e.degree} @ ${e.institution} (${e.score})`),
                    '',
                    '━━━ EXPERIENCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                    ...experience.map(e => `  💼 ${e.title} @ ${e.company} (${e.timeline})`),
                    '',
                    '━━━ TOP PROJECTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                    ...projects.slice(0, 3).map(p => `  🚀 ${p.name}: ${p.description.substring(0, 60)}...`),
                    '',
                    '💡 Use @file:projects, @file:skills, @file:experience for details',
                    ''
                ];
                setHistory([...newHistory, ...resumeOutput]);
            } else if (cmd === '@file:projects') {
                const projectOutput: string[] = ['', '═══ PROJECTS ═══════════════════════════════════════════════════', ''];
                projects.forEach(p => {
                    projectOutput.push(`🚀 ${p.name} (${p.timeline})`);
                    projectOutput.push(`   ${p.description}`);
                    projectOutput.push(`   Skills: ${p.skills.join(', ')}`);
                    projectOutput.push('');
                });
                setHistory([...newHistory, ...projectOutput]);
            } else if (cmd === '@file:skills') {
                const skillOutput = [
                    '',
                    '═══ SKILLS BREAKDOWN ═══════════════════════════════════════════',
                    '',
                    '💻 Programming Languages:',
                    `   ${skills.programmingLanguages.join('  |  ')}`,
                    '',
                    '🛠️  Frameworks:',
                    `   ${skills.frameworks.join('  |  ')}`,
                    '',
                    '🔧 Tools & Technologies:',
                    `   ${skills.tools.join('  |  ')}`,
                    '',
                    '🤖 AI & Machine Learning:',
                    `   ${skills.ai.join('  |  ')}`,
                    '',
                    '🌟 Professional Values:',
                    `   ${skills.values.join('  |  ')}`,
                    ''
                ];
                setHistory([...newHistory, ...skillOutput]);
            } else if (cmd === '@file:experience') {
                const expOutput: string[] = ['', '═══ WORK EXPERIENCE ════════════════════════════════════════════', ''];
                experience.forEach(e => {
                    expOutput.push(`💼 ${e.title}`);
                    expOutput.push(`   🏢 ${e.company} | 📍 ${e.location}`);
                    expOutput.push(`   📅 ${e.timeline}`);
                    e.description.forEach(d => expOutput.push(`   • ${d}`));
                    expOutput.push('');
                });
                setHistory([...newHistory, ...expOutput]);
            } else if (cmd === '@file:education') {
                const eduOutput: string[] = ['', '═══ EDUCATION ══════════════════════════════════════════════════', ''];
                education.forEach(e => {
                    eduOutput.push(`🎓 ${e.degree}`);
                    eduOutput.push(`   🏫 ${e.institution}`);
                    eduOutput.push(`   📍 ${e.location}`);
                    eduOutput.push(`   📅 ${e.timeline} | ${e.score}`);
                    eduOutput.push('');
                });
                setHistory([...newHistory, ...eduOutput]);
            } else if (cmd === '@file:contact') {
                const contactOutput = [
                    '',
                    '═══ CONTACT INFORMATION ════════════════════════════════════════',
                    '',
                    `👤 Name: ${personalInfo.name}`,
                    `📧 Email: ${personalInfo.email}`,
                    `📱 Phone: ${personalInfo.phone}`,
                    `🏠 Address: ${personalInfo.address}`,
                    `🔗 LinkedIn: https://${personalInfo.linkedin}`,
                    `💻 GitHub: https://${personalInfo.github}`,
                    `🎂 DOB: ${personalInfo.dob}`,
                    ''
                ];
                setHistory([...newHistory, ...contactOutput]);
            } else if (cmd === '@file:leadership') {
                const leaderOutput: string[] = ['', '═══ LEADERSHIP EXPERIENCE ══════════════════════════════════════', ''];
                leadership.forEach(l => {
                    leaderOutput.push(`👔 ${l.role}`);
                    leaderOutput.push(`   🏛️  ${l.organization} | 📍 ${l.location}`);
                    leaderOutput.push(`   📅 ${l.timeline}`);
                    l.description.forEach(d => leaderOutput.push(`   • ${d}`));
                    leaderOutput.push('');
                });
                setHistory([...newHistory, ...leaderOutput]);
            } else if (cmd === '') {
                setHistory([...newHistory]);
            } else {
                setHistory([...newHistory, `Command not found: ${cmd}. Type "help" for available commands.`]);
            }

            setInput('');
        }
    };

    // Matrix Effect
    useEffect(() => {
        if (!matrixMode || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = 'ADITHYASNAIR01アイウエオカキクケコサシスセソ';
        const fontSize = 16;
        const columns = canvas.width / fontSize;

        const drops: number[] = [];
        for (let x = 0; x < columns; x++) drops[x] = 1;

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const exitMatrix = () => setMatrixMode(false);
        canvas.addEventListener('click', exitMatrix);

        return () => {
            clearInterval(interval);
            canvas.removeEventListener('click', exitMatrix);
        };
    }, [matrixMode]);

    if (matrixMode) {
        return (
            <div className="fixed inset-0 z-[100] bg-black cursor-pointer">
                <canvas ref={canvasRef} className="block w-full h-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 p-6 border border-green-500 rounded text-green-500 font-mono text-center">
                    <h1 className="text-4xl font-bold mb-4">SYSTEM SECURE</h1>
                    <p className="animate-pulse">Adithya AI Active.</p>
                    <p className="mt-4 text-xs text-gray-400">(Click anywhere to return)</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-[#1a1a2e] text-green-400 font-mono p-4 text-sm flex flex-col" onClick={() => document.getElementById('terminal-input')?.focus()}>
            <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-green-900">
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap mb-0.5 leading-relaxed">{line}</div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-2 items-center mt-2 border-t border-green-900/50 pt-2">
                <span className="text-cyan-400">adithya@portfolio</span>
                <span className="text-gray-500">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-500">$</span>
                <input
                    id="terminal-input"
                    aria-label="Terminal Input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    className="flex-1 bg-transparent border-none outline-none text-green-400 caret-green-400"
                    autoFocus
                    autoComplete="off"
                    spellCheck={false}
                />
            </div>
        </div>
    );
};
