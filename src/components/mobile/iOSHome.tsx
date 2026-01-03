import { useTime } from '../../hooks/useTime';
import { Battery, Wifi, Signal } from 'lucide-react';
import { useOSStore } from '../../store/store';
import { Finder } from '../apps/Finder';
import { Safari } from '../apps/Safari';
import { Mail } from '../apps/Mail';
import { Music as MusicApp } from '../apps/Music';
import { Calendar } from '../apps/Calendar';
import { Notes } from '../apps/Notes';
import { Photos } from '../apps/Photos';
import { Calculator } from '../apps/Calculator';
import { Reminders } from '../apps/Reminders';
import { Maps } from '../apps/Maps';
import { Terminal } from '../apps/Terminal';
import { GitHub } from '../apps/GitHub';
import { GameCenter } from '../apps/GameCenter';
import { Messages } from '../apps/Messages';
import { AppStore } from '../apps/AppStore';
import { SnakeGame } from '../apps/games/Snake';
import { Game2048 } from '../apps/games/Game2048';

// Icons
import {
    SafariIcon, MessagesIcon, MusicIcon, PhotosIcon,
    TerminalIcon, GameCenterIcon,
    SnakeIcon, Game2048Icon
} from '../apps/AppIcons';
import {
    Folder, Mail as MailIcon, Calendar as CalendarIcon,
    StickyNote, Map as MapIcon, Github, ShoppingBag,
    Settings, Phone, Calculator as CalculatorIcon, ListTodo, type LucideIcon
} from 'lucide-react';

interface AppIconProps {
    icon?: LucideIcon;
    label: string;
    onClick?: () => void;
    component?: React.FC<{ className?: string }>;
}

const AppIcon = ({ icon: Icon, label, onClick, component: IconComponent }: AppIconProps) => (
    <div onClick={onClick} className="flex flex-col items-center gap-2 cursor-pointer transition-transform active:scale-95">
        <div className="w-16 h-16 rounded-[22%] shadow-lg overflow-hidden bg-white dark:bg-gray-800">
            {IconComponent ? (
                <IconComponent className="w-full h-full" />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                    {Icon && <Icon size={32} />}
                </div>
            )}
        </div>
        <span className="text-white text-xs font-medium drop-shadow-md">{label}</span>
    </div>
);

// Wrapper for Lucide icons to match AppIcon interface
const LucideWrapper = (Icon: LucideIcon, color: string) => ({ className }: { className?: string }) => (
    <div className={`w-full h-full ${color} flex items-center justify-center text-white ${className}`}>
        <Icon size={32} />
    </div>
);

export const MobileHome = () => {
    const { time } = useTime();
    const { openWindow } = useOSStore();

    return (
        <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1696429175928-8422687c3a05?q=80&w=2787&auto=format&fit=crop')] bg-cover bg-center overflow-hidden flex flex-col items-center pt-12 pb-8 select-none">
            {/* Status Bar */}
            <div className="absolute top-0 w-full h-12 flex justify-between items-center px-6 text-white font-medium z-10">
                <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <div className="flex gap-2 items-center">
                    <Signal size={16} />
                    <Wifi size={16} />
                    <Battery size={20} />
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 w-full px-6 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6 content-start mt-8 overflow-y-auto pb-20 no-scrollbar max-w-7xl mx-auto">
                <AppIcon component={LucideWrapper(Folder, 'bg-blue-500')} label="Files" onClick={() => openWindow('finder', 'Finder', <Finder />)} />
                <AppIcon component={SafariIcon} label="Safari" onClick={() => openWindow('safari', 'Safari', <Safari />)} />
                <AppIcon component={LucideWrapper(MailIcon, 'bg-cyan-500')} label="Mail" onClick={() => openWindow('mail', 'Mail', <Mail />)} />
                <AppIcon component={MusicIcon} label="Music" onClick={() => openWindow('music', 'Music', <MusicApp />)} />

                <AppIcon component={LucideWrapper(CalendarIcon, 'bg-red-500')} label="Calendar" onClick={() => openWindow('calendar', 'Calendar', <Calendar />)} />
                <AppIcon component={LucideWrapper(StickyNote, 'bg-yellow-400')} label="Notes" onClick={() => openWindow('notes', 'Notes', <Notes />)} />
                <AppIcon component={LucideWrapper(ListTodo, 'bg-indigo-500')} label="Reminders" onClick={() => openWindow('reminders', 'Reminders', <Reminders />)} />
                <AppIcon component={PhotosIcon} label="Photos" onClick={() => openWindow('photos', 'Photos', <Photos />)} />
                <AppIcon component={LucideWrapper(MapIcon, 'bg-green-500')} label="Maps" onClick={() => openWindow('maps', 'Maps', <Maps />)} />
                <AppIcon component={LucideWrapper(CalculatorIcon, 'bg-gray-700')} label="Calculator" onClick={() => openWindow('calculator', 'Calculator', <Calculator />)} />

                <AppIcon component={TerminalIcon} label="Terminal" onClick={() => openWindow('terminal', 'Terminal', <Terminal />)} />
                <AppIcon component={GameCenterIcon} label="Games" onClick={() => openWindow('gamecenter', 'Game Center', <GameCenter />)} />
                <AppIcon component={SnakeIcon} label="Snake" onClick={() => openWindow('snake', 'Snake', <SnakeGame />)} />
                <AppIcon component={Game2048Icon} label="2048" onClick={() => openWindow('2048', '2048', <Game2048 />)} />

                <AppIcon component={LucideWrapper(ShoppingBag, 'bg-blue-600')} label="App Store" onClick={() => openWindow('appstore', 'App Store', <AppStore />)} />
                <AppIcon component={LucideWrapper(Github, 'bg-black')} label="GitHub" onClick={() => openWindow('github', 'GitHub', <GitHub />)} />
                <AppIcon component={LucideWrapper(Settings, 'bg-gray-500')} label="Settings" onClick={() => { /* Settings logic */ }} />
            </div>

            {/* Dock */}
            <div className="absolute bottom-6 w-[90%] md:w-auto md:min-w-[320px] md:px-8 h-24 bg-white/20 backdrop-blur-2xl rounded-[32px] flex items-center justify-around gap-4 md:gap-8 px-4 shadow-xl border border-white/20 z-20">
                <AppIcon component={LucideWrapper(Phone, 'bg-green-500')} label="" onClick={() => { }} />
                <AppIcon component={SafariIcon} label="" onClick={() => openWindow('safari', 'Safari', <Safari />)} />
                <AppIcon component={MessagesIcon} label="" onClick={() => openWindow('messages', 'Messages', <Messages />)} />
                <AppIcon component={MusicIcon} label="" onClick={() => openWindow('music', 'Music', <MusicApp />)} />
            </div>
        </div>
    );
};
