import { useState } from 'react';
import { useOSStore } from '../../store/store';
import { Search } from 'lucide-react';
import { Safari } from './Safari';
import { Messages } from './Messages';
import { Terminal as TerminalApp } from './Terminal';
// import { VSCode } from './VSCode'; // Placeholder if not strictly implemented
import { GameCenter } from './GameCenter';

import { SafariIcon, MessagesIcon, MusicIcon, PhotosIcon, TerminalIcon, VSCodeIcon, GameCenterIcon, SnakeIcon, Game2048Icon } from './AppIcons';
import { SnakeGame } from './games/Snake';
import { Game2048 } from './games/Game2048';

// Mock list of apps
const APPS = [
    { id: 'safari', name: 'Safari', category: 'Productivity', icon: <SafariIcon className="w-16 h-16" />, component: <Safari />, installed: true },
    { id: 'messages', name: 'Messages', category: 'Social', icon: <MessagesIcon />, component: <Messages />, installed: true },
    { id: 'music', name: 'Music', category: 'Entertainment', icon: <MusicIcon />, component: null, installed: true },
    { id: 'photos', name: 'Photos', category: 'Creativity', icon: <PhotosIcon />, component: null, installed: true },
    { id: 'terminal', name: 'Terminal', category: 'Developer Tools', icon: <TerminalIcon />, component: <TerminalApp />, installed: true },
    { id: 'vscode', name: 'VS Code', category: 'Developer Tools', icon: <VSCodeIcon />, component: null, installed: false }, // Simulating uninstalled
    { id: 'gamecenter', name: 'Game Center', category: 'Games', icon: <GameCenterIcon />, component: <GameCenter />, installed: true },
    { id: 'snake', name: 'Snake', category: 'Games', icon: <SnakeIcon />, component: <SnakeGame />, installed: false },
    { id: '2048', name: '2048', category: 'Games', icon: <Game2048Icon />, component: <Game2048 />, installed: false },
];

export const AppStore = () => {
    const { openWindow } = useOSStore();
    const [installedState, setInstalledState] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        APPS.forEach(app => initial[app.id] = app.installed);
        return initial;
    });
    const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});

    const handleInstall = (appId: string) => {
        setLoadingState(prev => ({ ...prev, [appId]: true }));

        // Simulate download
        setTimeout(() => {
            setLoadingState(prev => ({ ...prev, [appId]: false }));
            setInstalledState(prev => ({ ...prev, [appId]: true }));
        }, 2000);
    };

    const handleOpen = (app: typeof APPS[0]) => {
        if (app.component) {
            openWindow(app.id, app.name, app.component);
        } else {
            alert(`${app.name} is installed but not fully implemented in this demo.`);
        }
    };

    const [showSidebar, setShowSidebar] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Discover');

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setShowSidebar(false);
    };

    return (
        <div className="flex h-full bg-white dark:bg-[#1e1e1e] text-black dark:text-white font-sans relative overflow-hidden">
            {/* Sidebar (Full width on Mobile) */}
            <div className={`
                ${showSidebar ? 'flex' : 'hidden md:flex'}
                w-full md:w-60 border-r border-gray-200 dark:border-white/10 p-4 bg-gray-50/50 dark:bg-black/20 flex-col shrink-0 h-full
            `}>
                <div className="relative mb-6">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-gray-200 dark:bg-white/10 border-none rounded-lg pl-8 pr-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                    />
                </div>

                <div className="space-y-1 overflow-y-auto flex-1">
                    {['Discover', 'Arcade', 'Create', 'Work', 'Play', 'Develop', 'Categories', 'Updates'].map((item) => (
                        <div
                            key={item}
                            onClick={() => handleCategorySelect(item)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${selectedCategory === item ? 'bg-blue-500/10 text-blue-500' : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300'}`}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content (Full width on Mobile) */}
            <div className={`
                ${!showSidebar ? 'flex' : 'hidden md:flex'}
                flex-1 flex-col overflow-hidden
            `}>
                {/* Mobile Header */}
                <div className="md:hidden flex items-center p-4 border-b border-gray-100 dark:border-white/5">
                    <button onClick={() => setShowSidebar(true)} className="flex items-center gap-1 text-blue-500 font-medium text-sm">
                        <span className="text-xl">‹</span> App Store
                    </button>
                    <span className="mx-auto font-semibold">{selectedCategory}</span>
                    <div className="w-10"></div> {/* Spacer for centering */}
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {/* Hero Banner */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
                        <div className="relative z-10 w-full md:w-2/3">
                            <span className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2 block">Featured</span>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">VS Code for Web</h1>
                            <p className="text-white/80 mb-6 font-medium text-sm md:text-base">Code from anywhere, anytime. The power of Visual Studio Code in your browser.</p>
                            <button
                                className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-white/90 transition-colors shadow-lg"
                                onClick={() => {
                                    if (installedState['vscode']) handleOpen(APPS.find(a => a.id === 'vscode')!);
                                    else handleInstall('vscode');
                                }}
                            >
                                {loadingState['vscode'] ? 'Downloading...' : (installedState['vscode'] ? 'OPEN' : 'GET')}
                            </button>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mb-4">Popular Apps</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {APPS.map((app) => (
                            <div key={app.id} className="flex items-center gap-4 group p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-white/5">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0">
                                    {app.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold truncate">{app.name}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{app.category}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (loadingState[app.id]) return;
                                        if (installedState[app.id]) handleOpen(app);
                                        else handleInstall(app.id);
                                    }}
                                    disabled={loadingState[app.id]}
                                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all w-24 flex items-center justify-center shrink-0 h-8 ${installedState[app.id]
                                        ? 'bg-gray-100 dark:bg-white/10 text-blue-500 hover:bg-gray-200 dark:hover:bg-white/20'
                                        : 'bg-gray-100 dark:bg-white/10 text-blue-500 hover:bg-blue-500 hover:text-white'
                                        }`}
                                >
                                    {loadingState[app.id] ? (
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        installedState[app.id] ? 'OPEN' : 'GET'
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
