import { useState, useEffect, useRef } from 'react';
import { Search, Folder, Music, Map, Terminal, Calculator, StickyNote, Bot, Globe, Image, Calendar as CalendarIcon, Clock, Video, Monitor, FileText, CheckSquare, Calculator as CalcIcon, Sparkles, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { useOSStore } from '../../store/store';
import { getAIResponse } from '../../utils/ai';

// Import apps
import { Finder } from '../apps/Finder';
import { Safari } from '../apps/Safari';
import { Music as MusicApp } from '../apps/Music';
import { Maps } from '../apps/Maps';
import { Terminal as TerminalApp } from '../apps/Terminal';
import { Calculator as CalculatorApp } from '../apps/Calculator';
import { Notes } from '../apps/Notes';
import { AIHelper } from '../apps/AIHelper';
import { Photos } from '../apps/Photos';
import { Calendar } from '../apps/Calendar';
import { FaceTime } from '../apps/FaceTime';
import { ScreenSaver } from '../apps/ScreenSaver';
import { Preview } from '../apps/Preview';
import { Reminders } from '../apps/Reminders';
import { Settings } from '../apps/Settings';
import { personalInfo, projects, skills, experience, education } from '../../data/resumeData';

interface SearchItem {
    id: string;
    title: string;
    subtitle?: string;
    type: 'app' | 'file' | 'project' | 'skill' | 'experience' | 'action' | 'web' | 'math' | 'ai' | 'system';
    icon: LucideIcon;
    action: () => void;
}

export const Spotlight = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const { openWindow } = useOSStore(); // Added setWallpaper for potential AI commands

    // AI State
    const [isThinking, setIsThinking] = useState(false);
    const [aiResponse, setAiResponse] = useState<{ text: string, action?: { type: string; value: string } } | null>(null);

    // Use useMemo for selectedIndex to avoid setState in useEffect
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Build search index with real actions
    const allItems: SearchItem[] = [
        // Apps
        { id: 'finder', title: 'Finder', subtitle: 'Browse files and resume', type: 'app', icon: Folder, action: () => openWindow('finder', 'Finder', <Finder />) },
        { id: 'safari', title: 'Safari', subtitle: 'Web browser', type: 'app', icon: Globe, action: () => openWindow('safari', 'Safari', <Safari />) },
        { id: 'music', title: 'Music', subtitle: 'Play your music', type: 'app', icon: Music, action: () => openWindow('music', 'Music', <MusicApp />) },
        { id: 'maps', title: 'Maps', subtitle: 'View your journey', type: 'app', icon: Map, action: () => openWindow('maps', 'Maps', <Maps />) },
        { id: 'terminal', title: 'Terminal', subtitle: 'Command line interface', type: 'app', icon: Terminal, action: () => openWindow('terminal', 'Terminal', <TerminalApp />) },
        { id: 'calculator', title: 'Calculator', subtitle: 'Scientific calculator', type: 'app', icon: Calculator, action: () => openWindow('calculator', 'Calculator', <CalculatorApp />) },
        { id: 'notes', title: 'Notes', subtitle: 'Your notes and ideas', type: 'app', icon: StickyNote, action: () => openWindow('notes', 'Notes', <Notes />) },
        { id: 'reminders', title: 'Reminders', subtitle: 'Tasks and reminders', type: 'app', icon: CheckSquare, action: () => openWindow('reminders', 'Reminders', <Reminders />) },
        { id: 'ai', title: 'AI Assistant', subtitle: 'Chat with AI about Adithya', type: 'app', icon: Bot, action: () => openWindow('ai-helper', 'AI Assistant', <AIHelper />) },
        { id: 'photos', title: 'Photos', subtitle: 'Photo gallery', type: 'app', icon: Image, action: () => openWindow('photos', 'Photos', <Photos />) },
        { id: 'calendar', title: 'Calendar', subtitle: 'View calendar', type: 'app', icon: CalendarIcon, action: () => openWindow('calendar', 'Calendar', <Calendar />) },
        { id: 'facetime', title: 'FaceTime', subtitle: 'Video calls', type: 'app', icon: Video, action: () => openWindow('facetime', 'FaceTime', <FaceTime />) },
        { id: 'preview', title: 'Preview', subtitle: 'View files and images', type: 'app', icon: FileText, action: () => openWindow('preview', 'Preview', <Preview />) },
        { id: 'screensaver', title: 'Screen Saver', subtitle: 'Animated screen saver', type: 'app', icon: Monitor, action: () => openWindow('screensaver', 'Screen Saver', <ScreenSaver />) },
        { id: 'settings', title: 'System Preferences', subtitle: 'Wallpaper, Display, Sound', type: 'app', icon: Command, action: () => openWindow('settings', 'System Preferences', <Settings />) },

        // Resume - Files
        { id: 'resume', title: 'Resume', subtitle: personalInfo.name, type: 'file', icon: Folder, action: () => openWindow('finder', 'Finder', <Finder />) },

        // Projects
        ...projects.map(p => ({
            id: `project-${p.name}`,
            title: p.name,
            subtitle: p.skills.slice(0, 3).join(', '),
            type: 'project' as const,
            icon: Folder,
            action: () => openWindow('finder', 'Finder', <Finder />)
        })),

        // Skills
        ...skills.programmingLanguages.map(s => ({
            id: `skill-${s}`,
            title: s,
            subtitle: 'Programming Language',
            type: 'skill' as const,
            icon: Terminal,
            action: () => openWindow('finder', 'Finder', <Finder />)
        })),
        ...skills.frameworks.map(s => ({
            id: `skill-${s}`,
            title: s,
            subtitle: 'Framework',
            type: 'skill' as const,
            icon: Terminal,
            action: () => openWindow('finder', 'Finder', <Finder />)
        })),

        // Experience
        ...experience.map(e => ({
            id: `exp-${e.company}`,
            title: e.company,
            subtitle: e.title,
            type: 'experience' as const,
            icon: Folder,
            action: () => openWindow('finder', 'Finder', <Finder />)
        })),

        // Education
        ...education.map(e => ({
            id: `edu-${e.institution}`,
            title: e.institution,
            subtitle: e.degree,
            type: 'experience' as const,
            icon: Folder,
            action: () => openWindow('finder', 'Finder', <Finder />)
        })),

        // Web shortcuts
        { id: 'youtube', title: 'YouTube', subtitle: 'Open YouTube', type: 'web', icon: Globe, action: () => openWindow('safari', 'YouTube', <Safari initialUrl="https://www.youtube.com" />) },
        { id: 'github', title: 'GitHub', subtitle: 'Open GitHub profile', type: 'web', icon: Globe, action: () => openWindow('safari', 'GitHub', <Safari initialUrl={`https://${personalInfo.github}`} />) },
        { id: 'linkedin', title: 'LinkedIn', subtitle: 'Open LinkedIn profile', type: 'web', icon: Globe, action: () => openWindow('safari', 'LinkedIn', <Safari initialUrl={`https://${personalInfo.linkedin}`} />) },

        // System Actions
        { id: 'action-theme', title: 'Toggle Dark Mode', subtitle: 'System', type: 'system' as const, icon: Command, action: () => console.log('Toggle Theme') }, // Placeholder
        { id: 'time', title: 'Current Time', subtitle: new Date().toLocaleTimeString(), type: 'action', icon: Clock, action: () => { } },
    ];

    const results = (() => {
        if (!query.trim()) return allItems.filter(item => item.type === 'app').slice(0, 6);

        const lowerQuery = query.toLowerCase();

        // 1. Math Check
        const mathRegex = /^[\d\s+\-*/().]+$/;
        if (query.match(mathRegex) && query.length > 2) {
            try {

                const result = Function('"use strict";return (' + query + ')')();
                if (isFinite(result)) {
                    return [{
                        id: 'math-result',
                        title: result.toString(),
                        subtitle: `Result of ${query}`,
                        type: 'math' as const,
                        icon: CalcIcon,
                        action: () => navigator.clipboard.writeText(result.toString())
                    }];
                }
            } catch {
                // Ignore invalid math
            }
        }

        // 2. Filter Items
        const filtered = allItems.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            (item.subtitle && item.subtitle.toLowerCase().includes(lowerQuery))
        ).slice(0, 8);

        // 3. Add AI Fallback/Option
        // Always add generic "Ask AI" at the end if query is long enough
        if (query.length > 2) {
            filtered.push({
                id: 'ai-search',
                title: `Ask Spotlight AI: "${query}"`,
                subtitle: 'Let AI handle it...',
                type: 'ai' as const,
                icon: Sparkles,
                action: () => handleAskAI(query)
            });
        }

        return filtered;
    })();

    const handleAskAI = async (prompt: string) => {
        setIsThinking(true);
        setAiResponse(null);

        const response = await getAIResponse(prompt);

        setIsThinking(false);
        setAiResponse(response);

        // Execute action if present
        if (response.action) {
            if (response.action.type === 'open-app') {
                const appToOpen = allItems.find(i => i.id === response.action?.value || i.title.toLowerCase() === response.action?.value);
                if (appToOpen) {
                    setTimeout(() => {
                        appToOpen.action();
                        setIsOpen(false);
                    }, 1500); // Small delay to let user read
                }
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
                setQuery('');
                setSelectedIndex(0);
                setAiResponse(null);
                setIsThinking(false);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setSelectedIndex(0);
        setAiResponse(null); // Clear previous AI answer when typing
    };

    const handleKeyNavigation = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(i => Math.min(i + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(i => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            if (results[selectedIndex]) {
                handleSelect(results[selectedIndex]);
            } else if (query) {
                // Trigger AI if nothing selected but query exists (MacOS style fallback? Or force select last item?)
                // For now, let's just do nothing if index is weird
            }
        }
    };

    const handleSelect = (item: SearchItem) => {
        if (item.type === 'ai') {
            item.action(); // This triggers handleAskAI
            // Don't close window immediately 
        } else if (item.type === 'math') {
            item.action(); // Copies to clipboard
            setIsOpen(false);
            setQuery('');
        } else {
            item.action();
            setIsOpen(false);
            setQuery('');
        }
    };

    const getTypeColor = (type: SearchItem['type']) => {
        switch (type) {
            case 'app': return 'bg-blue-500';
            case 'project': return 'bg-purple-500';
            case 'skill': return 'bg-green-500';
            case 'experience': return 'bg-orange-500';
            case 'file': return 'bg-gray-500';
            case 'web': return 'bg-red-500';
            case 'action': return 'bg-yellow-500';
            case 'math': return 'bg-gray-600';
            case 'ai': return 'bg-pink-500 animate-pulse';
            case 'system': return 'bg-slate-600';
        }
    };

    const getTypeLabel = (type: SearchItem['type']) => {
        switch (type) {
            case 'app': return 'Application';
            case 'project': return 'Project';
            case 'skill': return 'Skill';
            case 'experience': return 'Experience';
            case 'file': return 'File';
            case 'web': return 'Website';
            case 'action': return 'Action';
            case 'math': return 'Result';
            case 'ai': return 'Ask AI';
            case 'system': return 'System';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/30 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.15 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-[680px] bg-[#1e1e1e]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                    >
                        {/* Search Input */}
                        <div className="flex items-center px-5 h-16 gap-4 border-b border-white/10">
                            <Search size={22} className="text-gray-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                className="flex-1 bg-transparent outline-none text-xl text-white placeholder:text-gray-500"
                                placeholder="Spotlight Search"
                                value={query}
                                onChange={handleQueryChange}
                                onKeyDown={handleKeyNavigation}
                                aria-label="Spotlight search input"
                                autoFocus
                            />
                            <div className="text-xs text-gray-500 px-2 py-1 bg-white/5 rounded">
                                ⌘K
                            </div>
                        </div>

                        {/* AI Response Area */}
                        {(isThinking || aiResponse) && (
                            <div className="bg-white/5 border-b border-white/5 p-4">
                                {isThinking ? (
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Sparkles size={18} className="animate-spin text-pink-500" />
                                        <span className="font-medium animate-pulse">Spotlight AI is thinking...</span>
                                    </div>
                                ) : aiResponse ? (
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0">
                                            <Bot size={24} className="text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold text-pink-500 mb-1">Spotlight AI</div>
                                            <div className="text-gray-200 leading-relaxed text-sm whitespace-pre-wrap">
                                                {aiResponse.text}
                                            </div>
                                            {aiResponse.action && (
                                                <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                                    <Command size={12} /> Auto-executing action: {aiResponse.action.value}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        )}

                        {/* Results */}
                        <div className="max-h-[400px] overflow-auto">
                            {results.length > 0 ? (
                                <div className="py-2">
                                    {!query && !aiResponse && !isThinking && (
                                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                                            Suggested
                                        </div>
                                    )}
                                    {results.map((result, i) => {
                                        const Icon = result.icon;
                                        return (
                                            <div
                                                key={result.id}
                                                className={`px-4 py-3 flex items-center gap-4 cursor-pointer transition-colors ${i === selectedIndex ? 'bg-blue-600' : 'hover:bg-white/5'
                                                    }`}
                                                onClick={() => handleSelect(result)}
                                                onMouseEnter={() => setSelectedIndex(i)}
                                            >
                                                <div className={`w-10 h-10 rounded-xl ${getTypeColor(result.type)} flex items-center justify-center`}>
                                                    <Icon size={20} className="text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className={`font-medium truncate ${i === selectedIndex ? 'text-white' : 'text-gray-200'}`}>
                                                        {result.title}
                                                    </div>
                                                    {result.subtitle && (
                                                        <div className={`text-sm truncate ${i === selectedIndex ? 'text-blue-200' : 'text-gray-500'}`}>
                                                            {result.subtitle}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className={`text-xs px-2 py-1 rounded ${i === selectedIndex ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-500'
                                                    }`}>
                                                    {getTypeLabel(result.type)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    <div className="text-4xl mb-2">🔍</div>
                                    No results found for "{query}"
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
                            <div className="flex gap-4">
                                <span>↑↓ Navigate</span>
                                <span>↵ Open</span>
                                <span>esc Close</span>
                            </div>
                            <div>
                                Spotlight Search
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
