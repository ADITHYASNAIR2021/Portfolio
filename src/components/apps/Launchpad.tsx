import { Compass, Folder, Map, Music, Terminal, Calculator, StickyNote, Bot, Image, Calendar as CalendarIcon, Youtube, Video, Monitor, FileText, CheckSquare, Github, Settings as SettingsIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useOSStore } from '../../store/store';

import { Finder } from './Finder';
import { Safari } from './Safari';
import { Music as MusicApp } from './Music';
import { Maps } from './Maps';
import { Terminal as TerminalApp } from './Terminal';
import { Calculator as CalculatorApp } from './Calculator';
import { AIHelper } from './AIHelper';
import { Notes } from './Notes';
import { Photos } from './Photos';
import { Calendar } from './Calendar';
import { FaceTime } from './FaceTime';
import { ScreenSaver } from './ScreenSaver';
import { Preview } from './Preview';
import { Reminders } from './Reminders';
import { GitHub } from './GitHub';
import { Settings as SettingsApp } from './Settings';

interface AppIconProps {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
    gradient?: string;
}

const AppIcon = ({ icon: Icon, label, onClick, gradient }: AppIconProps) => (
    <div className="flex flex-col items-center gap-3 cursor-pointer group" onClick={onClick}>
        <div className={`w-16 h-16 md:w-20 md:h-20 backdrop-blur-md rounded-[18px] md:rounded-[22px] flex items-center justify-center shadow-xl border border-white/20 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-200 ${gradient || 'bg-gray-100/10'}`}>
            <Icon size={32} className="text-white drop-shadow-lg md:w-10 md:h-10" />
        </div>
        <span className="text-white font-medium text-xs md:text-sm drop-shadow-lg text-center max-w-[80px] truncate">{label}</span>
    </div>
);

export const Launchpad = () => {
    const { openWindow, closeWindow } = useOSStore();

    const apps = [
        { icon: Folder, label: 'Finder', onClick: () => openWindow('finder', 'Finder', <Finder />), gradient: 'bg-gradient-to-br from-blue-400 to-blue-600' },
        { icon: Compass, label: 'Safari', onClick: () => openWindow('safari', 'Safari', <Safari />), gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
        { icon: Music, label: 'Music', onClick: () => openWindow('music', 'Music', <MusicApp />), gradient: 'bg-gradient-to-br from-pink-500 to-red-500' },
        { icon: Map, label: 'Maps', onClick: () => openWindow('maps', 'Maps', <Maps />), gradient: 'bg-gradient-to-br from-green-400 to-teal-500' },
        { icon: StickyNote, label: 'Notes', onClick: () => openWindow('notes', 'Notes', <Notes />), gradient: 'bg-gradient-to-br from-yellow-400 to-orange-400' },
        { icon: CheckSquare, label: 'Reminders', onClick: () => openWindow('reminders', 'Reminders', <Reminders />), gradient: 'bg-gradient-to-br from-orange-500 to-red-500' },
        { icon: Image, label: 'Photos', onClick: () => openWindow('photos', 'Photos', <Photos />), gradient: 'bg-gradient-to-br from-orange-400 to-pink-500' },
        { icon: CalendarIcon, label: 'Calendar', onClick: () => openWindow('calendar', 'Calendar', <Calendar />), gradient: 'bg-gradient-to-br from-red-500 to-red-600' },
        { icon: Calculator, label: 'Calculator', onClick: () => openWindow('calculator', 'Calculator', <CalculatorApp />), gradient: 'bg-gradient-to-br from-orange-500 to-orange-600' },
        { icon: Terminal, label: 'Terminal', onClick: () => openWindow('terminal', 'Terminal', <TerminalApp />), gradient: 'bg-gradient-to-br from-gray-700 to-gray-900' },
        { icon: Github, label: 'GitHub', onClick: () => openWindow('github', 'GitHub', <GitHub />), gradient: 'bg-gradient-to-br from-gray-800 to-black' },
        { icon: Bot, label: 'AI Assistant', onClick: () => openWindow('ai-helper', 'AI Assistant', <AIHelper />), gradient: 'bg-gradient-to-br from-purple-500 to-pink-500' },
        { icon: Video, label: 'FaceTime', onClick: () => openWindow('facetime', 'FaceTime', <FaceTime />), gradient: 'bg-gradient-to-br from-green-500 to-green-600' },
        { icon: FileText, label: 'Preview', onClick: () => openWindow('preview', 'Preview', <Preview />), gradient: 'bg-gradient-to-br from-blue-600 to-blue-700' },
        { icon: Monitor, label: 'Screen Saver', onClick: () => openWindow('screensaver', 'Screen Saver', <ScreenSaver />), gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600' },
        { icon: Youtube, label: 'YouTube', onClick: () => openWindow('youtube', 'YouTube', <Safari initialUrl="https://www.youtube.com" />), gradient: 'bg-gradient-to-br from-red-600 to-red-700' },
        { icon: SettingsIcon, label: 'System Settings', onClick: () => openWindow('settings', 'System Settings', <SettingsApp />), gradient: 'bg-gradient-to-br from-gray-500 to-gray-600' },
    ];

    return (
        <div
            className="w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-2xl"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    closeWindow('launchpad');
                }
            }}
        >
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-8 gap-y-10 p-8 md:p-12 max-w-6xl">
                {apps.map((app, i) => (
                    <AppIcon key={i} {...app} />
                ))}
            </div>
        </div>
    );
};
