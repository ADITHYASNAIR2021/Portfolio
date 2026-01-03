import { useOSStore } from '../../store/store';
import { Window } from './Window';
import { AnimatePresence } from 'framer-motion';

export const WindowManager = () => {
    const { windows, activeWindowId } = useOSStore();

    return (
        <AnimatePresence>
            {windows.map((win) => (
                <Window
                    key={win.id}
                    id={win.id}
                    title={win.title}
                    zIndex={win.zIndex}
                    isActive={win.id === activeWindowId}
                    isMinimized={win.isMinimized}
                    isMaximized={win.isMaximized}
                >
                    {win.content}
                </Window>
            ))}
        </AnimatePresence>
    );
};
