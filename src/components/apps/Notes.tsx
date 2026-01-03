import { useState, useEffect } from 'react';
import { Plus, Trash, Folder, FolderOpen, Search, MoreHorizontal, ChevronLeft } from 'lucide-react';

interface Note {
    id: string;
    title: string;
    content: string;
    date: string;
    folder: string;
    updatedAt: number;
}

const STORAGE_KEY = 'adithya-portfolio-notes';

const getInitialNotes = (): Note[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to load notes:', e);
    }
    return [
        { id: '1', title: 'Project Ideas', content: '1. AI specialized for elderly care\n2. Vertical farming optimization tool\n3. Personalized education path generator\n4. Multi-agent travel planner', date: 'Today', folder: 'Ideas', updatedAt: Date.now() },
        { id: '2', title: 'Interview Prep', content: '• Review system design patterns\n• Practice LeetCode medium problems\n• Prepare STAR stories for behavioral\n• Research company background', date: 'Today', folder: 'Career', updatedAt: Date.now() - 3600000 },
        { id: '3', title: 'React Best Practices', content: '• Use custom hooks for reusable logic\n• Memoize expensive computations\n• Keep components small and focused\n• Use proper TypeScript types', date: 'Yesterday', folder: 'Tech Notes', updatedAt: Date.now() - 86400000 }
    ];
};

const formatDate = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return new Date(timestamp).toLocaleDateString();
};

export const Notes = () => {
    const [notes, setNotes] = useState<Note[]>(getInitialNotes);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(() => {
        const initial = getInitialNotes();
        return initial.length > 0 ? initial[0].id : null;
    });
    const [search, setSearch] = useState('');
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
    const [showMobileList, setShowMobileList] = useState(true);

    const handleNoteSelect = (id: string) => {
        setSelectedNoteId(id);
        setShowMobileList(false);
    };

    const handleBackToList = () => {
        setShowMobileList(true);
    };

    // Save to localStorage whenever notes change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }, [notes]);

    const activeNote = notes.find(n => n.id === selectedNoteId);

    const folders = [...new Set(notes.map(n => n.folder))];

    const filteredNotes = notes
        .filter(n => {
            const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
                n.content.toLowerCase().includes(search.toLowerCase());
            const matchesFolder = !selectedFolder || n.folder === selectedFolder;
            return matchesSearch && matchesFolder;
        })
        .sort((a, b) => b.updatedAt - a.updatedAt);

    const addNote = () => {
        const newNote: Note = {
            id: crypto.randomUUID(),
            title: 'New Note',
            content: '',
            date: 'Just now',
            folder: selectedFolder || 'Notes',
            updatedAt: Date.now()
        };
        setNotes([newNote, ...notes]);
        setSelectedNoteId(newNote.id);
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter(n => n.id !== id));
        if (selectedNoteId === id) {
            setSelectedNoteId(notes.length > 1 ? notes.find(n => n.id !== id)?.id || null : null);
        }
    };

    const updateNote = (id: string, updates: Partial<Note>) => {
        setNotes(notes.map(n =>
            n.id === id
                ? { ...n, ...updates, updatedAt: Date.now(), date: 'Just now' }
                : n
        ));
    };

    return (
        <div className="w-full h-full flex bg-[#f5f5f7] text-gray-800 font-sans overflow-hidden relative">

            {/* Folders Sidebar (Desktop Only) */}
            <div className={`w-48 bg-[#e8e8ed]/80 backdrop-blur-sm border-r border-gray-300/50 flex flex-col pt-2 hidden md:flex shrink-0`}>
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">iCloud</div>
                <button
                    onClick={() => setSelectedFolder(null)}
                    className={`mx-2 px-3 py-1.5 flex items-center gap-2 rounded-md text-sm transition-colors ${!selectedFolder ? 'bg-yellow-400/30 text-yellow-700 font-medium' : 'text-gray-700 hover:bg-gray-200/70'
                        }`}
                >
                    {!selectedFolder ? <FolderOpen size={14} className="text-yellow-600" /> : <Folder size={14} className="text-gray-400" />}
                    All Notes
                    <span className="ml-auto text-xs text-gray-400">{notes.length}</span>
                </button>

                <div className="px-4 py-2 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Folders</div>
                {folders.map(folder => (
                    <button
                        key={folder}
                        onClick={() => setSelectedFolder(folder)}
                        className={`mx-2 px-3 py-1.5 flex items-center gap-2 rounded-md text-sm transition-colors ${selectedFolder === folder ? 'bg-yellow-400/30 text-yellow-700 font-medium' : 'text-gray-700 hover:bg-gray-200/70'
                            }`}
                    >
                        {selectedFolder === folder ? <FolderOpen size={14} className="text-yellow-600" /> : <Folder size={14} className="text-gray-400" />}
                        {folder}
                        <span className="ml-auto text-xs text-gray-400">{notes.filter(n => n.folder === folder).length}</span>
                    </button>
                ))}
            </div>

            {/* Note List (Sidebar on Desktop, Full screen on Mobile) */}
            <div className={`
                ${showMobileList ? 'flex' : 'hidden md:flex'} 
                w-full md:w-72 bg-white border-r border-gray-200 flex-col shrink-0 h-full
            `}>
                <div className="h-12 border-b border-gray-100 flex items-center px-4 gap-2 shrink-0">
                    <Search size={14} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex-1 overflow-auto">
                    {filteredNotes.length === 0 ? (
                        <div className="p-4 text-center text-gray-400 text-sm">No notes found</div>
                    ) : (
                        filteredNotes.map(note => (
                            <div
                                key={note.id}
                                className={`p-4 border-b border-gray-100 cursor-pointer group ${selectedNoteId === note.id ? 'bg-yellow-50' : 'hover:bg-gray-50'
                                    }`}
                                onClick={() => handleNoteSelect(note.id)}
                            >
                                <div className="flex justify-between items-start">
                                    <h4 className="font-semibold text-sm mb-1 truncate flex-1">{note.title}</h4>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all md:block hidden"
                                        aria-label="Delete note"
                                    >
                                        <Trash size={12} className="text-red-500" />
                                    </button>
                                </div>
                                <div className="text-xs text-gray-500 flex gap-2">
                                    <span>{formatDate(note.updatedAt)}</span>
                                    <span className="truncate text-gray-400">{note.content.substring(0, 25)}...</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* Mobile FAB */}
                <button
                    onClick={addNote}
                    className="md:hidden absolute bottom-6 right-6 w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-600 transition-all z-20"
                    aria-label="Create new note"
                >
                    <Plus size={24} />
                </button>
            </div>

            {/* Editor (Main Content) */}
            <div className={`
                ${!showMobileList ? 'flex' : 'hidden md:flex'} 
                flex-1 flex-col bg-white h-full relative z-10
            `}>
                <div className="h-12 border-b border-gray-100 flex items-center justify-between px-4 md:px-6 shrink-0">
                    <div className="flex items-center gap-2">
                        <button onClick={handleBackToList} className="md:hidden flex items-center gap-1 text-yellow-500 font-medium text-sm pr-2">
                            <ChevronLeft size={20} />
                            Notes
                        </button>
                        {activeNote && (
                            <span className="text-xs text-gray-400 px-2 py-0.5 bg-gray-100 rounded hidden md:inline-block">
                                {activeNote.folder}
                            </span>
                        )}
                        <span className="text-xs text-gray-400">
                            {activeNote ? formatDate(activeNote.updatedAt) : ''}
                        </span>
                    </div>
                    <div className="flex gap-1">
                        <button
                            onClick={addNote}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden md:block"
                            aria-label="Create new note"
                        >
                            <Plus size={18} className="text-gray-600" />
                        </button>
                        {activeNote && (
                            <button
                                onClick={() => deleteNote(activeNote.id)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
                                aria-label="Delete"
                            >
                                <Trash size={18} className="text-red-500" />
                            </button>
                        )}
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="More options">
                            <MoreHorizontal size={18} className="text-gray-600" />
                        </button>
                    </div>
                </div>
                {activeNote ? (
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <input
                            type="text"
                            value={activeNote.title}
                            onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                            className="px-4 md:px-8 pt-6 pb-2 text-xl md:text-2xl font-bold outline-none border-none bg-transparent"
                            placeholder="Note title"
                        />
                        <textarea
                            className="flex-1 px-4 md:px-8 pb-8 resize-none outline-none text-gray-700 leading-relaxed bg-transparent text-base md:text-lg"
                            aria-label="Note content"
                            placeholder="Start typing..."
                            value={activeNote.content}
                            onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
                        />
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-300 flex-col gap-4">
                        <div className="text-6xl">📝</div>
                        <div>Select a note or create a new one</div>
                        <button
                            onClick={addNote}
                            className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                        >
                            Create Note
                        </button>
                    </div>
                )}
            </div>

            <button
                onClick={addNote}
                className="hidden md:flex absolute bottom-6 right-6 w-12 h-12 bg-yellow-500 text-white rounded-full items-center justify-center shadow-lg hover:bg-yellow-600 hover:scale-105 transition-all z-20"
                aria-label="Create new note"
            >
                <Plus size={24} />
            </button>
        </div>
    );
};
