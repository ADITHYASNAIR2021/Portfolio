import { useState } from 'react';
import { Github, ChevronLeft, ChevronRight, Home, Share, Plus, Lock, Star, Globe, ExternalLink } from 'lucide-react';
import { projects } from '../../data/resumeData';

interface Tab {
    id: string;
    title: string;
    url: string;
    favicon?: string;
}

interface SafariProps {
    initialUrl?: string;
}

// Bookmarks
const BOOKMARKS = [
    { title: 'Google', url: 'https://www.google.com', icon: '🔍' },
    { title: 'YouTube', url: 'https://www.youtube.com', icon: '▶️' },
    { title: 'GitHub', url: 'https://github.com', icon: '💻' },
    { title: 'LinkedIn', url: 'https://www.linkedin.com', icon: '💼' },
    { title: 'Twitter/X', url: 'https://twitter.com', icon: '🐦' },
    { title: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '📚' },
];

const getPageTitle = (url: string): string => {
    if (url.includes('youtube')) return 'YouTube';
    if (url.includes('github')) return 'GitHub';
    if (url.includes('linkedin')) return 'LinkedIn';
    if (url.includes('google')) return 'Google';
    if (url.includes('twitter') || url.includes('x.com')) return 'Twitter/X';
    if (url.includes('stackoverflow')) return 'Stack Overflow';
    if (url === 'internal://projects') return 'Projects';
    try {
        return new URL(url).hostname;
    } catch {
        return 'Untitled';
    }
};

const getSiteInfo = (url: string) => {
    if (url.includes('youtube')) return { icon: '▶️', color: 'from-red-500 to-red-600', desc: 'Video sharing platform' };
    if (url.includes('github')) return { icon: '💻', color: 'from-gray-700 to-gray-900', desc: 'Code hosting & collaboration' };
    if (url.includes('linkedin')) return { icon: '💼', color: 'from-blue-600 to-blue-700', desc: 'Professional networking' };
    if (url.includes('google')) return { icon: '🔍', color: 'from-blue-500 to-green-500', desc: 'Search engine' };
    if (url.includes('twitter') || url.includes('x.com')) return { icon: '🐦', color: 'from-sky-400 to-sky-500', desc: 'Social media platform' };
    if (url.includes('stackoverflow')) return { icon: '📚', color: 'from-orange-400 to-orange-500', desc: 'Developer Q&A community' };
    return { icon: '🌐', color: 'from-purple-500 to-blue-500', desc: 'External website' };
};

export const Safari = ({ initialUrl }: SafariProps) => {
    const [tabs, setTabs] = useState<Tab[]>([
        { id: '1', title: initialUrl ? getPageTitle(initialUrl) : 'Projects', url: initialUrl || 'internal://projects' }
    ]);
    const [activeTabId, setActiveTabId] = useState('1');
    const [inputUrl, setInputUrl] = useState(initialUrl || '');

    const activeTab = tabs.find(t => t.id === activeTabId);
    const isInternalPage = activeTab?.url.startsWith('internal://');

    const navigateTo = (url: string) => {
        let finalUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('internal://')) {
            finalUrl = 'https://' + url;
        }

        setTabs(prev => prev.map(tab =>
            tab.id === activeTabId
                ? { ...tab, url: finalUrl, title: getPageTitle(finalUrl) }
                : tab
        ));
        setInputUrl(finalUrl);
    };

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigateTo(inputUrl);
    };

    const goHome = () => {
        setTabs(prev => prev.map(tab =>
            tab.id === activeTabId
                ? { ...tab, url: 'internal://projects', title: 'Projects' }
                : tab
        ));
        setInputUrl('');
    };

    const addTab = () => {
        const newTab: Tab = {
            id: crypto.randomUUID(),
            title: 'New Tab',
            url: 'internal://projects'
        };
        setTabs([...tabs, newTab]);
        setActiveTabId(newTab.id);
        setInputUrl('');
    };

    const closeTab = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (tabs.length === 1) {
            setTabs([{ id: '1', title: 'Projects', url: 'internal://projects' }]);
            setActiveTabId('1');
        } else {
            const newTabs = tabs.filter(t => t.id !== id);
            setTabs(newTabs);
            if (activeTabId === id) {
                setActiveTabId(newTabs[newTabs.length - 1].id);
            }
        }
    };

    const openExternal = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="w-full h-full bg-white flex flex-col font-sans">
            {/* Tab Bar */}
            <div className="h-9 bg-[#e8e8ed] flex items-center px-2 gap-1 shrink-0 border-b border-gray-200">
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        onClick={() => { setActiveTabId(tab.id); setInputUrl(tab.url.startsWith('internal://') ? '' : tab.url); }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs max-w-[180px] cursor-pointer group ${tab.id === activeTabId ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                            }`}
                    >
                        <Globe size={12} className="text-gray-400 shrink-0" />
                        <span className="truncate flex-1">{tab.title}</span>
                        <button
                            onClick={(e) => closeTab(tab.id, e)}
                            className="opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-gray-500"
                        >
                            ×
                        </button>
                    </div>
                ))}
                <button onClick={addTab} className="p-1 hover:bg-white/50 rounded" aria-label="New tab">
                    <Plus size={14} className="text-gray-500" />
                </button>
            </div>

            {/* URL Bar */}
            <div className="h-11 bg-[#f6f6f6] border-b border-gray-200 flex items-center px-3 gap-2 shrink-0">
                <div className="flex gap-1">
                    <button onClick={() => { }} className="p-1.5 hover:bg-gray-200 rounded text-gray-400" aria-label="Back">
                        <ChevronLeft size={18} />
                    </button>
                    <button onClick={() => { }} className="p-1.5 hover:bg-gray-200 rounded text-gray-400" aria-label="Forward">
                        <ChevronRight size={18} />
                    </button>
                </div>

                <form onSubmit={handleUrlSubmit} className="flex-1 max-w-2xl mx-auto">
                    <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                        {!isInternalPage && activeTab?.url.startsWith('https://') && (
                            <Lock size={12} className="text-green-600 mr-2" />
                        )}
                        <input
                            type="text"
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                            placeholder="Search or enter website name"
                            className="flex-1 outline-none text-sm text-center text-gray-700"
                            aria-label="Address bar"
                        />
                    </div>
                </form>

                <div className="flex gap-1">
                    <button onClick={goHome} className="p-1.5 hover:bg-gray-200 rounded text-gray-500" aria-label="Home">
                        <Home size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500" aria-label="Share">
                        <Share size={16} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
                {isInternalPage ? (
                    <InternalProjectsPage onNavigate={navigateTo} />
                ) : (
                    <ExternalSitePage
                        url={activeTab?.url || ''}
                        title={activeTab?.title || ''}
                        siteInfo={getSiteInfo(activeTab?.url || '')}
                        onOpenExternal={openExternal}
                        onGoHome={goHome}
                    />
                )}
            </div>
        </div>
    );
};

// Internal Projects Page with Glassmorphism
const InternalProjectsPage = ({ onNavigate }: { onNavigate: (url: string) => void }) => {
    return (
        <div className="h-full overflow-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Animated background blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Content */}
            <div className="relative max-w-4xl mx-auto pt-12 px-6">
                {/* Quick Links - Glassmorphism */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-12">
                    {BOOKMARKS.map((bookmark, i) => (
                        <button
                            key={i}
                            onClick={() => onNavigate(bookmark.url)}
                            className="flex flex-col items-center gap-2 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center text-2xl group-hover:shadow-xl group-hover:shadow-white/5 transition-all">
                                {bookmark.icon}
                            </div>
                            <span className="text-xs text-white/70 group-hover:text-white truncate w-full text-center transition-colors">{bookmark.title}</span>
                        </button>
                    ))}
                </div>

                <h1 className="text-3xl font-bold text-center text-white mb-2">Projects</h1>
                <p className="text-center text-white/50 mb-8">Explore my recent work</p>

                {/* Project Cards - Glassmorphism */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                    {projects.slice(0, 6).map((project, i) => (
                        <div
                            key={i}
                            className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 group"
                        >
                            <div className="h-32 bg-gradient-to-br from-blue-500/30 to-purple-600/30 backdrop-blur-sm flex items-center justify-center border-b border-white/10">
                                <span className="text-white text-5xl font-bold opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all">{project.name[0]}</span>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold mb-2 text-white">{project.name}</h3>
                                <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.skills.slice(0, 3).map((skill, j) => (
                                        <span key={j} className="px-2 py-1 bg-white/10 backdrop-blur-sm text-white/80 text-xs rounded-full font-medium border border-white/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-3">
                                    <button className="flex items-center gap-1 text-sm text-white/50 hover:text-pink-400 transition-colors">
                                        <Star size={14} /> Save
                                    </button>
                                    <button className="flex items-center gap-1 text-sm text-white/50 hover:text-blue-400 transition-colors">
                                        <Github size={14} /> Code
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// External Site Page with Glassmorphism - Shows when external URL is navigated to
interface ExternalSitePageProps {
    url: string;
    title: string;
    siteInfo: { icon: string; color: string; desc: string };
    onOpenExternal: (url: string) => void;
    onGoHome: () => void;
}

const ExternalSitePage = ({ url, title, siteInfo, onOpenExternal, onGoHome }: ExternalSitePageProps) => {
    return (
        <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
            </div>

            <div className="relative max-w-md w-full text-center bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                {/* Site Icon */}
                <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${siteInfo.color} shadow-xl flex items-center justify-center text-5xl border border-white/20`}>
                    {siteInfo.icon}
                </div>

                {/* Site Name */}
                <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                <p className="text-white/60 mb-2">{siteInfo.desc}</p>
                <p className="text-sm text-white/40 mb-8 break-all">{url}</p>

                {/* Info Message - Glassmorphism */}
                <div className="bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-xl p-4 mb-6 text-left">
                    <p className="text-amber-200 text-sm">
                        <strong className="text-amber-100">Note:</strong> External websites cannot be embedded directly due to security policies.
                        Click the button below to open this site in a new browser tab.
                    </p>
                </div>

                {/* Action Buttons - Glassmorphism */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => onOpenExternal(url)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500/80 hover:bg-blue-500 backdrop-blur-sm text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105 border border-blue-400/30"
                    >
                        <ExternalLink size={18} />
                        Open in New Tab
                    </button>
                    <button
                        onClick={onGoHome}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl transition-all border border-white/10 hover:border-white/20"
                    >
                        <Home size={18} />
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
};
