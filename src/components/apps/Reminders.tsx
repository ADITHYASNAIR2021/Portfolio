import { useState, useEffect } from 'react';
import { Plus, Circle, CheckCircle2, Trash, List, Calendar, Star, Flag, ChevronRight, ChevronLeft } from 'lucide-react';

interface Reminder {
    id: string;
    text: string;
    completed: boolean;
    priority: 'none' | 'low' | 'medium' | 'high';
    list: string;
    dueDate?: string;
    createdAt: number;
}

const STORAGE_KEY = 'adithya-portfolio-reminders';

const getInitialReminders = (): Reminder[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error('Failed to load reminders:', e);
    }
    return [
        { id: '1', text: 'Complete AI integration for resume', completed: true, priority: 'high', list: 'Work', createdAt: Date.now() - 86400000 },
        { id: '2', text: 'Update LinkedIn profile', completed: false, priority: 'medium', list: 'Work', createdAt: Date.now() - 3600000 },
        { id: '3', text: 'Review ML papers for research', completed: false, priority: 'low', list: 'Study', createdAt: Date.now() },
        { id: '4', text: 'Prepare for technical interview', completed: false, priority: 'high', list: 'Work', dueDate: '2025-01-15', createdAt: Date.now() },
        { id: '5', text: 'Learn SwiftUI basics', completed: false, priority: 'medium', list: 'Study', createdAt: Date.now() },
    ];
};

const LISTS = [
    { name: 'Today', icon: Star, color: 'text-yellow-500', bgColor: 'bg-yellow-500' },
    { name: 'Scheduled', icon: Calendar, color: 'text-red-500', bgColor: 'bg-red-500' },
    { name: 'All', icon: List, color: 'text-gray-500', bgColor: 'bg-gray-500' },
    { name: 'Flagged', icon: Flag, color: 'text-orange-500', bgColor: 'bg-orange-500' },
];

const MY_LISTS = [
    { name: 'Work', color: 'bg-blue-500' },
    { name: 'Study', color: 'bg-green-500' },
    { name: 'Personal', color: 'bg-purple-500' },
];

export const Reminders = () => {
    const [reminders, setReminders] = useState<Reminder[]>(getInitialReminders);
    const [selectedList, setSelectedList] = useState('All');
    const [newReminder, setNewReminder] = useState('');
    const [showCompleted, setShowCompleted] = useState(true);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
    }, [reminders]);

    const filteredReminders = reminders.filter(r => {
        if (!showCompleted && r.completed) return false;
        if (selectedList === 'All') return true;
        if (selectedList === 'Today') return !r.completed;
        if (selectedList === 'Flagged') return r.priority === 'high';
        if (selectedList === 'Scheduled') return !!r.dueDate;
        return r.list === selectedList;
    });

    const addReminder = () => {
        if (!newReminder.trim()) return;
        const reminder: Reminder = {
            id: crypto.randomUUID(),
            text: newReminder.trim(),
            completed: false,
            priority: 'none',
            list: selectedList === 'All' || LISTS.some(l => l.name === selectedList) ? 'Work' : selectedList,
            createdAt: Date.now()
        };
        setReminders([...reminders, reminder]);
        setNewReminder('');
    };

    const toggleComplete = (id: string) => {
        setReminders(reminders.map(r =>
            r.id === id ? { ...r, completed: !r.completed } : r
        ));
    };

    const deleteReminder = (id: string) => {
        setReminders(reminders.filter(r => r.id !== id));
    };

    const cyclePriority = (id: string) => {
        const priorities: Reminder['priority'][] = ['none', 'low', 'medium', 'high'];
        setReminders(reminders.map(r => {
            if (r.id !== id) return r;
            const currentIndex = priorities.indexOf(r.priority);
            const nextIndex = (currentIndex + 1) % priorities.length;
            return { ...r, priority: priorities[nextIndex] };
        }));
    };

    const getPriorityColor = (priority: Reminder['priority']) => {
        switch (priority) {
            case 'high': return 'text-red-500';
            case 'medium': return 'text-orange-500';
            case 'low': return 'text-yellow-500';
            default: return 'text-gray-300';
        }
    };

    const getListCount = (listName: string) => {
        return reminders.filter(r => {
            if (listName === 'All') return !r.completed;
            if (listName === 'Today') return !r.completed;
            if (listName === 'Flagged') return r.priority === 'high' && !r.completed;
            if (listName === 'Scheduled') return !!r.dueDate && !r.completed;
            return r.list === listName && !r.completed;
        }).length;
    };

    const [showSidebar, setShowSidebar] = useState(true);

    const handleListSelect = (listName: string) => {
        setSelectedList(listName);
        setShowSidebar(false);
    };

    const handleBackToSidebar = () => {
        setShowSidebar(true);
    };

    return (
        <div className="w-full h-full bg-[#f5f5f7] flex relative overflow-hidden">
            {/* Sidebar (Full width on Mobile) */}
            <div className={`
                ${showSidebar ? 'flex' : 'hidden md:flex'}
                w-full md:w-64 bg-[#f5f5f7] border-r border-gray-200 flex-col p-4 shrink-0 h-full overflow-y-auto
            `}>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Search reminders"
                    />
                </div>

                {/* Smart Lists */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                    {LISTS.map(list => {
                        const Icon = list.icon;
                        const count = getListCount(list.name);
                        return (
                            <button
                                key={list.name}
                                onClick={() => handleListSelect(list.name)}
                                className={`p-3 rounded-xl text-left transition-all ${selectedList === list.name ? 'bg-white shadow-md' : 'hover:bg-white/50'
                                    }`}
                            >
                                <div className={`w-8 h-8 ${list.bgColor} rounded-full flex items-center justify-center mb-2`}>
                                    <Icon size={16} className="text-white" />
                                </div>
                                <div className="text-xs text-gray-500">{list.name}</div>
                                <div className="text-xl font-bold text-gray-800">{count}</div>
                            </button>
                        );
                    })}
                </div>

                {/* My Lists */}
                <div className="flex-1">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">My Lists</h3>
                    {MY_LISTS.map(list => {
                        const count = getListCount(list.name);
                        return (
                            <button
                                key={list.name}
                                onClick={() => handleListSelect(list.name)}
                                className={`w-full p-2 rounded-lg flex items-center gap-3 transition-all ${selectedList === list.name ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                                    }`}
                            >
                                <div className={`w-4 h-4 ${list.color} rounded-full`} />
                                <span className="flex-1 text-left text-sm text-gray-700">{list.name}</span>
                                <span className="text-xs text-gray-400">{count}</span>
                                <ChevronRight size={14} className="text-gray-300" />
                            </button>
                        );
                    })}
                </div>

                {/* Add List Button */}
                <button className="mt-4 flex items-center gap-2 text-blue-600 text-sm hover:underline">
                    <Plus size={16} /> Add List
                </button>
            </div>

            {/* Main Content (Full width on Mobile) */}
            <div className={`
                 ${!showSidebar ? 'flex' : 'hidden md:flex'}
                flex-1 flex-col bg-white h-full relative z-10
            `}>
                {/* Header */}
                <div className="p-4 md:p-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                        <button onClick={handleBackToSidebar} className="md:hidden flex items-center gap-1 text-blue-500 font-medium">
                            <ChevronLeft size={24} />
                            Lists
                        </button>
                    </div>
                    <div className="flex justify-between items-end">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{selectedList}</h1>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">{filteredReminders.length} reminders</span>
                            <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hidden md:flex">
                                <input
                                    type="checkbox"
                                    checked={showCompleted}
                                    onChange={(e) => setShowCompleted(e.target.checked)}
                                    className="rounded"
                                />
                                Show completed
                            </label>
                        </div>
                    </div>
                </div>

                {/* Reminders List */}
                <div className="flex-1 overflow-auto p-4 md:p-6">
                    {filteredReminders.map(reminder => (
                        <div
                            key={reminder.id}
                            className="flex items-start gap-3 py-3 border-b border-gray-100 group"
                        >
                            <button
                                onClick={() => toggleComplete(reminder.id)}
                                className="mt-0.5"
                                aria-label={reminder.completed ? 'Mark incomplete' : 'Mark complete'}
                            >
                                {reminder.completed ? (
                                    <CheckCircle2 size={22} className="text-blue-500" />
                                ) : (
                                    <Circle size={22} className="text-gray-300 hover:text-blue-400" />
                                )}
                            </button>
                            <div className="flex-1 min-w-0">
                                <div className={`${reminder.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                    {reminder.text}
                                </div>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                    <span className={`px-1.5 py-0.5 rounded ${MY_LISTS.find(l => l.name === reminder.list)?.color} text-white`}>
                                        {reminder.list}
                                    </span>
                                    {reminder.dueDate && (
                                        <span className="flex items-center gap-1">
                                            <Calendar size={10} /> {reminder.dueDate}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => cyclePriority(reminder.id)}
                                className={getPriorityColor(reminder.priority)}
                                aria-label="Change priority"
                            >
                                <Flag size={18} fill={reminder.priority !== 'none' ? 'currentColor' : 'none'} />
                            </button>
                            <button
                                onClick={() => deleteReminder(reminder.id)}
                                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 md:block hidden"
                                aria-label="Delete reminder"
                            >
                                <Trash size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add Reminder */}
                <div className="p-4 border-t border-gray-100">
                    <form onSubmit={(e) => { e.preventDefault(); addReminder(); }} className="flex items-center gap-2">
                        <button type="button" className="text-blue-500" title="Add new reminder">
                            <Plus size={20} />
                        </button>
                        <input
                            type="text"
                            value={newReminder}
                            onChange={(e) => setNewReminder(e.target.value)}
                            placeholder="New Reminder"
                            className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="New reminder"
                        />
                        <button
                            type="submit"
                            disabled={!newReminder.trim()}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm disabled:opacity-50"
                        >
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
