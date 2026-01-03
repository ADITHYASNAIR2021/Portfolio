import { useEffect } from 'react';
import { useOSStore } from '../store/store';
import { useSound } from './useSound';
import { useContextMenuStore } from '../store/contextMenuStore';

export const useKeyboardShortcuts = () => {
    const { activeWindowId, closeWindow, minimizeWindow } = useOSStore();
    const { closeMenu } = useContextMenuStore();
    const { playTrashSound, playErrorSound } = useSound();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isCtrlOrCmd = e.ctrlKey || e.metaKey;

            // Close Window: Cmd + W
            if (isCtrlOrCmd && e.key.toLowerCase() === 'w') {
                e.preventDefault();
                if (activeWindowId) {
                    closeWindow(activeWindowId);
                } else {
                    playErrorSound();
                }
            }

            // Move to Trash: Cmd + Backspace
            if (isCtrlOrCmd && e.key === 'Backspace') {
                e.preventDefault();
                // Logic for moving selected file to trash will go here
                // For now just play sound
                playTrashSound();
            }

            // Escape: Close context menu or modals
            if (e.key === 'Escape') {
                closeMenu();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeWindowId, closeWindow, minimizeWindow, closeMenu, playTrashSound, playErrorSound]);
};
