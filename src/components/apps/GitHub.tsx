import { useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink, Github, Loader, Search, Code, BookMarked } from 'lucide-react';

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    updated_at: string;
}

export const GitHub = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [stats, setStats] = useState({ stars: 0, forks: 0, repos: 0 });

    const username = 'ADITHYASNAIR2021';

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
                if (!response.ok) {
                    throw new Error('Failed to fetch repositories');
                }
                const data = await response.json();
                setRepos(data);

                // Calculate stats
                const totalStars = data.reduce((acc: number, repo: Repo) => acc + repo.stargazers_count, 0);
                const totalForks = data.reduce((acc: number, repo: Repo) => acc + repo.forks_count, 0);

                setStats({
                    stars: totalStars,
                    forks: totalForks,
                    repos: data.length
                });

                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    const filteredRepos = repos.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getLanguageColor = (lang: string | null) => {
        if (!lang) return 'bg-gray-500';
        const colors: Record<string, string> = {
            TypeScript: 'bg-blue-500',
            JavaScript: 'bg-yellow-400',
            HTML: 'bg-orange-500',
            CSS: 'bg-blue-400',
            Python: 'bg-green-500',
            Rust: 'bg-orange-700',
            Go: 'bg-cyan-500',
            Java: 'bg-red-500',
            'C++': 'bg-blue-700',
            Dart: 'bg-cyan-400',
        };
        return colors[lang] || 'bg-gray-500';
    };

    return (
        <div className="w-full h-full bg-[#0d1117] text-white flex flex-col font-sans">
            {/* Header */}
            <div className="h-16 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-full">
                        <Github size={20} />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg">GitHub Explorer</h1>
                        <p className="text-xs text-gray-400">@{username}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400 hidden sm:flex">
                    <div className="flex items-center gap-1">
                        <BookMarked size={14} />
                        <span>{stats.repos} Repos</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star size={14} />
                        <span>{stats.stars} Stars</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <GitFork size={14} />
                        <span>{stats.forks} Forks</span>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-[#30363d] bg-[#0d1117]">
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search repositories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#010409] border border-[#30363d] rounded-lg py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-gray-700">
                {loading ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                        <Loader className="animate-spin" size={32} />
                        <p>Fetching repositories...</p>
                    </div>
                ) : error ? (
                    <div className="h-full flex flex-col items-center justify-center text-red-400 gap-2">
                        <p>⚠️ {error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-[#238636] text-white rounded-md text-sm hover:bg-[#2ea043] transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredRepos.map(repo => (
                            <div
                                key={repo.id}
                                className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 hover:border-blue-500/50 transition-colors flex flex-col group h-full"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2 text-blue-400 font-medium break-all">
                                        <Code size={16} className="shrink-0" />
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            {repo.name}
                                        </a>
                                    </div>
                                    <span className="text-xs px-2 py-0.5 rounded-full border border-[#30363d] text-gray-400">
                                        Public
                                    </span>
                                </div>

                                <p className="text-sm text-gray-400 mb-4 flex-1 line-clamp-3">
                                    {repo.description || 'No description provided.'}
                                </p>

                                <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-3 border-t border-[#30363d]/50">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5">
                                            <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`} />
                                            <span>{repo.language || 'Text'}</span>
                                        </div>
                                        {repo.stargazers_count > 0 && (
                                            <div className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                                                <Star size={14} />
                                                <span>{repo.stargazers_count}</span>
                                            </div>
                                        )}
                                        {repo.forks_count > 0 && (
                                            <div className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                                                <GitFork size={14} />
                                                <span>{repo.forks_count}</span>
                                            </div>
                                        )}
                                    </div>
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#30363d] rounded text-gray-300"
                                        title="Open in GitHub"
                                    >
                                        <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
