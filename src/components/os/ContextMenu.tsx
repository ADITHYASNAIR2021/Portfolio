import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useContextMenuStore } from '../../store/contextMenuStore';
import type { ContextMenuItem } from '../../store/contextMenuStore';

export const ContextMenu = () => {
    const { isOpen, position, items, closeMenu } = useContextMenuStore();
    const menuRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                closeMenu();
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeMenu();
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, closeMenu]);

    // Adjust position to prevent off-screen
    const getAdjustedPosition = () => {
        const menuWidth = 220;
        const menuHeight = items.length * 36 + 16;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let x = position.x;
        let y = position.y;

        if (x + menuWidth > windowWidth) {
            x = windowWidth - menuWidth - 10;
        }
        if (y + menuHeight > windowHeight) {
            y = windowHeight - menuHeight - 10;
        }

        return { x, y };
    };

    const adjustedPos = getAdjustedPosition();

    const handleItemClick = (item: ContextMenuItem) => {
        if (item.disabled || item.divider) return;
        if (item.action) {
            item.action();
        }
        closeMenu();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="fixed z-[9999] min-w-[200px] py-1 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-lg shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
                    style={{
                        left: adjustedPos.x,
                        top: adjustedPos.y,
                    }}
                >
                    {items.map((item, index) => (
                        item.divider ? (
                            <div key={index} className="h-px bg-gray-200 dark:bg-gray-700 my-1 mx-2" />
                        ) : (
                            <MenuItem key={item.id} item={item} onClick={() => handleItemClick(item)} />
                        )
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const MenuItem = ({ item, onClick }: { item: ContextMenuItem; onClick: () => void }) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    return (
        <div className="relative group">
            <button
                onClick={onClick}
                disabled={item.disabled}
                className={`w-full px-3 py-1.5 flex items-center gap-3 text-sm transition-colors
                    ${item.disabled
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white'
                    }
                `}
            >
                {item.icon && (
                    <span className="w-4 h-4 flex items-center justify-center opacity-70">
                        {item.icon}
                    </span>
                )}
                <span className="flex-1 text-left">{item.label}</span>
                {hasSubmenu && <ChevronRight size={14} className="opacity-50" />}
            </button>

            {/* Submenu */}
            {hasSubmenu && (
                <div className="absolute left-full top-0 hidden group-hover:block">
                    <div className="ml-1 py-1 min-w-[160px] bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                        {item.submenu!.map((subItem) => (
                            <MenuItem key={subItem.id} item={subItem} onClick={() => {
                                if (subItem.action) subItem.action();
                            }} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
