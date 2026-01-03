import { motion, useMotionValue, useTransform, MotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Compass, Folder, Map, Music, Terminal, Rocket, Bot, StickyNote, Calculator, Image, Calendar as CalendarIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useOSStore } from '../../store/store';

// App imports
import { Finder } from '../apps/Finder';
import { Safari } from '../apps/Safari';
import { Music as MusicApp } from '../apps/Music';
import { Maps } from '../apps/Maps';
import { Terminal as TerminalApp } from '../apps/Terminal';
import { Launchpad } from '../apps/Launchpad';
import { AIHelper } from '../apps/AIHelper';
import { Notes } from '../apps/Notes';
import { Calculator as CalculatorApp } from '../apps/Calculator';
import { Photos } from '../apps/Photos';
import { Calendar } from '../apps/Calendar';
import { Mail } from '../apps/Mail';
import { GitHub } from '../apps/GitHub';
import { Mail as MailIcon, Github } from 'lucide-react';

import { useContextMenuStore } from '../../store/contextMenuStore';
import { Play, X, Pin, Trash, Trash2 } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { FileExplorer } from '../apps/FileExplorer';

// App Icon Component with Magnification
function DockIcon({ icon: Icon, label, onClick, gradient }: { icon: LucideIcon, label: string, onClick?: () => void, gradient?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(Infinity);
    const { openMenu } = useContextMenuStore();

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        openMenu(
            { x: e.clientX, y: e.clientY },
            'dock',
            [
                {
                    id: 'open',
                    label: 'Open',
                    icon: <Play size={14} />,
                    action: onClick
                },
                {
                    id: 'quit',
                    label: 'Quit',
                    icon: <X size={14} />,
                    action: () => console.log('Quit')
                },
                {
                    id: 'options',
                    label: 'Options',
                    icon: <Pin size={14} />,
                    submenu: [
                        {
                            id: 'keep-in-dock',
                            label: 'Keep in Dock',
                            icon: <Pin size={14} />,
                            action: () => console.log('Keep in Dock')
                        }
                    ]
                }
            ]
        );
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            onClick={onClick}
            onContextMenu={handleContextMenu}
            className="flex flex-col items-center gap-1 group relative"
        >
            <AppIcon mouseX={mouseX} icon={Icon} gradient={gradient} />
            <span className="absolute -top-12 px-2 py-1 bg-gray-800/80 backdrop-blur-md rounded text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {label}
            </span>
        </motion.div>
    );
}

function AppIcon({ mouseX, icon: Icon, gradient }: { mouseX: MotionValue<number>, icon: LucideIcon, gradient?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { dockSize, dockMagnification } = useOSStore();

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [dockSize, dockMagnification ? dockSize * 1.6 : dockSize, dockSize]);
    const width = useTransform(widthSync, (val) => val);

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className={`aspect-square rounded-2xl flex items-center justify-center border border-white/10 shadow-lg backdrop-blur-sm cursor-pointer hover:brightness-110 transition-all ${gradient || 'bg-gray-700/50 hover:bg-white/20'
                }`}
        >
            <Icon size={dockSize / 2} color="white" />
        </motion.div>
    );
}

function TrashDockIcon() {
    const { files, dockSize, dockMagnification, openWindow } = useOSStore();
    const hasTrash = files.some(f => f.location === 'trash');
    const Icon = hasTrash ? Trash2 : Trash;
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(Infinity);

    // Animation controls
    // 0 = idle, 1 = bounce

    useEffect(() => {
        if (hasTrash) {
            // Simple bounce effect when trash gets items
            // In a real app we'd use useAnimation controls from framer-motion
        }
    }, [hasTrash]);

    const handleOpenTrash = () => {
        openWindow('trash', 'Trash', <FileExplorer id="trash" title="Trash" />);
    };

    // Make trash droppable
    const { setNodeRef, isOver } = useDroppable({
        id: 'trash-bin',
    });

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [dockSize, dockMagnification ? dockSize * 1.6 : dockSize, dockSize]);
    const width = useTransform(widthSync, (val) => val);

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="flex flex-col items-center gap-1 group relative"
        >
            <div
                ref={setNodeRef}
                onClick={handleOpenTrash}
                className={`w-full aspect-square rounded-2xl flex items-center justify-center border border-white/10 shadow-lg backdrop-blur-sm cursor-pointer hover:brightness-110 transition-all ${isOver ? 'bg-red-500/50 scale-110' : 'bg-gray-700/50 hover:bg-white/20'
                    }`}
            >
                {/* 
                  Add a key to force re-render/animation on icon change if desired.
                  Using Framer Motion for the icon itself would be better for "filling" animation.
                */}
                <motion.div
                    initial={{ scale: 1, rotate: 0 }}
                    animate={{
                        scale: isOver ? 1.2 : 1,
                        rotate: isOver ? [0, -10, 10, -5, 5, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <Icon size={dockSize / 2} color="white" />
                </motion.div>
            </div>
            <span className="absolute -top-12 px-2 py-1 bg-gray-800/80 backdrop-blur-md rounded text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Trash
            </span>
        </motion.div>
    );
}




// ... (previous imports)

export const Dock = () => {
    const { openWindow } = useOSStore();

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 pb-3 pt-3 h-20 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl flex items-end gap-3 shadow-2xl z-50">
            <DockIcon icon={Folder} label="Finder" gradient="bg-gradient-to-br from-blue-400 to-blue-600" onClick={() => openWindow('finder', 'Finder', <Finder />)} />
            <DockIcon icon={Rocket} label="Launchpad" onClick={() => openWindow('launchpad', 'Launchpad', <Launchpad />)} />
            <DockIcon icon={Compass} label="Safari" gradient="bg-gradient-to-br from-blue-500 to-cyan-500" onClick={() => openWindow('safari', 'Safari', <Safari />)} />
            <DockIcon icon={MailIcon} label="Mail" gradient="bg-gradient-to-br from-blue-400 to-blue-600" onClick={() => openWindow('mail', 'Mail', <Mail />)} />
            <DockIcon icon={Music} label="Music" gradient="bg-gradient-to-br from-pink-500 to-red-500" onClick={() => openWindow('music', 'Music', <MusicApp />)} />
            <DockIcon icon={Map} label="Maps" gradient="bg-gradient-to-br from-green-400 to-teal-500" onClick={() => openWindow('maps', 'Maps', <Maps />)} />
            <DockIcon icon={StickyNote} label="Notes" gradient="bg-gradient-to-br from-yellow-400 to-orange-400" onClick={() => openWindow('notes', 'Notes', <Notes />)} />
            <DockIcon icon={Image} label="Photos" gradient="bg-gradient-to-br from-orange-400 to-pink-500" onClick={() => openWindow('photos', 'Photos', <Photos />)} />
            <DockIcon icon={CalendarIcon} label="Calendar" gradient="bg-gradient-to-br from-red-500 to-red-600" onClick={() => openWindow('calendar', 'Calendar', <Calendar />)} />
            <DockIcon icon={Calculator} label="Calculator" gradient="bg-gradient-to-br from-orange-500 to-orange-600" onClick={() => openWindow('calculator', 'Calculator', <CalculatorApp />)} />
            <DockIcon icon={Terminal} label="Terminal" gradient="bg-gradient-to-br from-gray-700 to-gray-900" onClick={() => openWindow('terminal', 'Terminal', <TerminalApp />)} />
            <DockIcon icon={Github} label="GitHub" gradient="bg-gradient-to-br from-gray-800 to-black" onClick={() => openWindow('github', 'GitHub', <GitHub />)} />
            <DockIcon
                icon={Bot}
                label="AI Assistant"
                gradient="bg-gradient-to-br from-purple-500 to-pink-500"
                onClick={() => openWindow('ai-helper', 'AI Assistant', <AIHelper />)}
            />

            {/* Divider */}
            <div className="w-[1px] h-12 bg-white/20 mx-1" />

            {/* Trash */}
            <TrashDockIcon />
        </div>
    );
};
