
import { motion } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react'; // Using icons for traffic lights hover state is optional, can just be colors
import { useOSStore } from '../../store/store';

import { useMobile } from '../../hooks/useMobile';

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
    zIndex: number;
    isActive: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
}

export const Window = ({ id, title, children, zIndex, isActive, isMinimized, isMaximized }: WindowProps) => {
    const { closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useOSStore();
    const isMobile = useMobile();


    // If we want constraints, we need to pass a ref from Desktop. For now, unconstrained or constrained to window.

    if (isMinimized) return null;

    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 300 }}
            animate={{
                scale: isMaximized || isMobile ? 1 : 1,
                opacity: 1,
                width: isMaximized || isMobile ? '100vw' : '800px',
                height: isMaximized || isMobile ? (isMobile ? '100vh' : 'calc(100vh - 2rem)') : '500px', // Full height for mobile
                x: 0,
                y: 0,
                top: isMaximized || isMobile ? (isMobile ? 0 : '2rem') : '100px', // Top 0 for mobile
                left: isMaximized || isMobile ? 0 : '100px',
                borderRadius: isMaximized || isMobile ? 0 : '12px'
            }}
            exit={{ scale: 0.5, opacity: 0, y: 300 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            drag={!isMaximized && !isMobile}
            dragMomentum={false}
            onDragStart={() => focusWindow(id)}
            onMouseDown={() => focusWindow(id)}
            style={{
                zIndex,
                position: 'absolute',
            }}
            className={`bg-[#1e1e1e]/85 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col ${isActive ? 'shadow-black/50' : 'shadow-black/20'}`}
        >
            {/* Window Header / Titlebar */}
            <div
                className="h-10 bg-transparent flex items-center px-4 shrink-0 select-none justify-between"
                onDoubleClick={() => maximizeWindow(id)}
            >
                <div className="flex gap-2 group/traffic">
                    <div onClick={(e) => { e.stopPropagation(); closeWindow(id); }} className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center cursor-pointer transition-all duration-200 group-hover/traffic:scale-125 group-hover/traffic:shadow-[0_0_8px_rgba(255,95,86,0.6)]">
                        <X size={8} className="text-black/50 opacity-0 group-hover/traffic:opacity-100" strokeWidth={3} />
                    </div>
                    <div onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center cursor-pointer transition-all duration-200 group-hover/traffic:scale-125 group-hover/traffic:shadow-[0_0_8px_rgba(255,189,46,0.6)]">
                        <Minus size={8} className="text-black/50 opacity-0 group-hover/traffic:opacity-100" strokeWidth={3} />
                    </div>
                    <div onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }} className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center cursor-pointer transition-all duration-200 group-hover/traffic:scale-125 group-hover/traffic:shadow-[0_0_8px_rgba(39,201,63,0.6)]">
                        <Plus size={8} className="text-black/50 opacity-0 group-hover/traffic:opacity-100" strokeWidth={3} />
                    </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-white/70">
                    {title}
                </div>

                <div className="w-16"></div> {/* Spacer for balance */}
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-auto bg-black/20 relative">
                {children}
            </div>
        </motion.div>
    );
};
