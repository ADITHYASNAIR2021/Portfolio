import { useTime } from '../../hooks/useTime';
import { Battery, Wifi, Signal } from 'lucide-react';
import { useOSStore } from '../../store/store';
import { Finder } from '../apps/Finder';
import { Safari } from '../apps/Safari';
import { Mail } from '../apps/Mail';
import { Music as MusicApp } from '../apps/Music';
import { Folder, Compass, Mail as MailIcon, Music, Settings, Phone, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Simplified Icon for Mobile
const AppIcon = ({ icon: Icon, label, color, onClick }: { icon: LucideIcon, label: string, color: string, onClick?: () => void }) => (
    <div onClick={onClick} className="flex flex-col items-center gap-2">
        <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>
            <Icon size={32} />
        </div>
        <span className="text-white text-xs font-medium drop-shadow-md">{label}</span>
    </div>
);

export const MobileHome = () => {
    const { time } = useTime();
    const { openWindow } = useOSStore();

    return (
        <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1696429175928-8422687c3a05?q=80&w=2787&auto=format&fit=crop')] bg-cover bg-center overflow-hidden flex flex-col items-center pt-12 pb-8">
            {/* Status Bar */}
            <div className="absolute top-0 w-full h-12 flex justify-between items-center px-6 text-white font-medium">
                <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <div className="flex gap-2 items-center">
                    <Signal size={16} />
                    <Wifi size={16} />
                    <Battery size={20} />
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 w-full px-6 grid grid-cols-4 gap-6 content-start mt-8">
                <AppIcon icon={Folder} label="Files" color="bg-blue-500" onClick={() => openWindow('finder', 'Finder', <Finder />)} />
                <AppIcon icon={Compass} label="Safari" color="bg-blue-400" onClick={() => openWindow('safari', 'Safari', <Safari />)} />
                <AppIcon icon={MailIcon} label="Mail" color="bg-cyan-500" onClick={() => openWindow('mail', 'Mail', <Mail />)} />
                <AppIcon icon={Music} label="Music" color="bg-pink-500" onClick={() => openWindow('music', 'Music', <MusicApp />)} />
                <AppIcon icon={Settings} label="Settings" color="bg-gray-500" onClick={() => { }} />
                {/* Add more icons as requested */}
            </div>

            {/* Dock */}
            <div className="w-[90%] h-24 bg-white/20 backdrop-blur-xl rounded-[32px] flex items-center justify-around px-4 mb-4">
                <AppIcon icon={Phone} label="" color="bg-green-500" onClick={() => { }} />
                <AppIcon icon={Compass} label="" color="bg-blue-400" onClick={() => openWindow('safari', 'Safari', <Safari />)} />
                <AppIcon icon={MessageCircle} label="" color="bg-green-400" onClick={() => { }} />
                <AppIcon icon={Music} label="" color="bg-pink-500" onClick={() => openWindow('music', 'Music', <MusicApp />)} />
            </div>
        </div>
    );
};
