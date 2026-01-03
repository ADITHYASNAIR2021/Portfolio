import { create } from 'zustand';

interface WindowState {
    id: string;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    content: React.ReactNode;
    icon?: string;
    appId: string;
}

interface OSState {
    booting: boolean;
    setBooting: (booting: boolean) => void;

    windows: WindowState[];
    activeWindowId: string | null;

    openWindow: (appId: string, title: string, content: React.ReactNode, forceNew?: boolean) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    minimizeAllWindows: () => void;
    bringAllToFront: (appId: string) => void;

    brightness: number;
    volume: number;
    wifi: boolean;
    bluetooth: boolean;

    setBrightness: (val: number) => void;
    setVolume: (val: number) => void;
    toggleWifi: () => void;
    toggleBluetooth: () => void;

    controlCenterOpen: boolean;
    toggleControlCenter: () => void;
    notificationCenterOpen: boolean;
    toggleNotificationCenter: () => void;

    files: FileItem[];
    addFile: (file: FileItem) => void;
    moveFile: (id: string, location: 'desktop' | 'finder' | 'trash', position?: { x: number; y: number }) => void;
    renameFile: (id: string, newName: string) => void;
    moveToTrash: (id: string) => void;
    emptyTrash: () => void;
    restoreFile: (id: string) => void;

    isSleeping: boolean;
    setSleeping: (sleeping: boolean) => void;
    isLocked: boolean;
    setLocked: (locked: boolean) => void;

    wallpaper: string;
    setWallpaper: (url: string) => void;

    // System Settings
    theme: 'light' | 'dark' | 'auto';
    setTheme: (theme: 'light' | 'dark' | 'auto') => void;
    dockSize: number;
    setDockSize: (size: number) => void;
    dockMagnification: boolean;
    toggleDockMagnification: () => void;
    systemName: string;
    setSystemName: (name: string) => void;
    // Sound
    soundEnabled: boolean;
    toggleSound: () => void;

    // Sidebar
    sidebarCollapsed: boolean;
    toggleSidebar: () => void;
}

// Helper to safely access localStorage (SSR safe)
const getLocalStorage = <T>(key: string, initialValue: T): T => {
    if (typeof window === 'undefined') return initialValue;
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return initialValue;
    }
};

const setLocalStorage = <T>(key: string, value: T) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
    }
};


export const useOSStore = create<OSState>((set) => ({
    booting: true,
    setBooting: (booting) => set({ booting }),

    windows: [],
    activeWindowId: null,

    openWindow: (appId, title, content, forceNew = false) => set((state) => {
        // Check if window already exists for this app
        const existingWindow = state.windows.find(w => w.appId === appId);
        if (existingWindow && !forceNew) {
            return {
                activeWindowId: existingWindow.id,
                windows: state.windows.map(w =>
                    w.id === existingWindow.id
                        ? { ...w, isMinimized: false, zIndex: Math.max(...state.windows.map(win => win.zIndex), 0) + 1 }
                        : w
                )
            };
        }

        const newWindow: WindowState = {
            id: crypto.randomUUID(),
            appId,
            title,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: Math.max(...state.windows.map(w => w.zIndex), 0) + 1,
            content
        };

        return {
            windows: [...state.windows, newWindow],
            activeWindowId: newWindow.id
        };
    }),

    bringAllToFront: (appId: string) => set((state) => {
        const highestZ = Math.max(...state.windows.map(w => w.zIndex), 0);
        return {
            windows: state.windows.map(w =>
                w.appId === appId
                    ? { ...w, zIndex: highestZ + 1, isMinimized: false }
                    : w
            ),
            activeWindowId: state.windows.find(w => w.appId === appId)?.id || state.activeWindowId
        };
    }),

    closeWindow: (id) => set((state) => ({
        windows: state.windows.filter(w => w.id !== id),
        activeWindowId: state.windows.length > 1 ? state.windows[state.windows.length - 2].id : null
    })),

    minimizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: true } : w)
    })),

    maximizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)
    })),

    focusWindow: (id) => set((state) => ({
        activeWindowId: id,
        windows: state.windows.map(w =>
            w.id === id
                ? { ...w, zIndex: Math.max(...state.windows.map(win => win.zIndex), 0) + 1, isMinimized: false }
                : w
        )
    })),

    minimizeAllWindows: () => set((state) => ({
        windows: state.windows.map(w => ({ ...w, isMinimized: true })),
        activeWindowId: null
    })),

    brightness: 100,
    volume: 80,
    wifi: true,
    bluetooth: true,

    setBrightness: (val) => set({ brightness: val }),
    setVolume: (val) => set({ volume: val }),
    toggleWifi: () => set((state) => ({ wifi: !state.wifi })),
    toggleBluetooth: () => set((state) => ({ bluetooth: !state.bluetooth })),

    controlCenterOpen: false,
    toggleControlCenter: () => set((state) => ({ controlCenterOpen: !state.controlCenterOpen })),
    notificationCenterOpen: false,
    toggleNotificationCenter: () => set((state) => ({ notificationCenterOpen: !state.notificationCenterOpen })),

    // File System with Persistence
    files: getLocalStorage('os_files', [
        { id: 'folder1', name: 'New Folder', type: 'folder', location: 'desktop', position: { x: 120, y: 20 } },
    ]),
    addFile: (file) => {
        set((state) => {
            const newFiles = [...state.files, file];
            setLocalStorage('os_files', newFiles);
            return { files: newFiles };
        });
    },
    moveFile: (id, location, position) => {
        set((state) => {
            const newFiles: FileItem[] = state.files.map(f => f.id === id ? { ...f, location, position: position || f.position } : f);
            setLocalStorage('os_files', newFiles);
            return { files: newFiles };
        });
    },
    renameFile: (id, newName) => {
        set((state) => {
            const newFiles: FileItem[] = state.files.map(f => f.id === id ? { ...f, name: newName } : f);
            setLocalStorage('os_files', newFiles);
            return { files: newFiles };
        });
    },
    moveToTrash: (id) => {
        set((state) => {
            const newFiles: FileItem[] = state.files.map(f => f.id === id ? { ...f, location: 'trash' } : f);
            setLocalStorage('os_files', newFiles);
            return { files: newFiles };
        });
    },
    emptyTrash: () => {
        set((state) => {
            const newFiles: FileItem[] = state.files.filter(f => f.location !== 'trash');
            setLocalStorage('os_files', newFiles);
            return { files: newFiles };
        });
    },
    restoreFile: (id) => {
        set((state) => {
            const newFiles: FileItem[] = state.files.map(f => f.id === id ? { ...f, location: 'desktop' } : f);
            setLocalStorage('os_files', newFiles);
            return { files: newFiles };
        });
    },

    isSleeping: false,
    setSleeping: (isSleeping) => set({ isSleeping }),
    isLocked: false,
    setLocked: (isLocked) => set({ isLocked }),

    // Wallpapers with Persistence
    wallpaper: getLocalStorage('os_wallpaper', 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=1920'),
    setWallpaper: (url) => {
        setLocalStorage('os_wallpaper', url);
        set({ wallpaper: url });
    },

    // System Settings with Persistence
    theme: getLocalStorage('os_theme', 'auto'),
    setTheme: (theme) => {
        setLocalStorage('os_theme', theme);
        set({ theme });
    },
    dockSize: getLocalStorage('os_dock_size', 50),
    setDockSize: (dockSize) => {
        setLocalStorage('os_dock_size', dockSize);
        set({ dockSize });
    },
    dockMagnification: getLocalStorage('os_dock_mag', true),
    toggleDockMagnification: () => set((state) => {
        setLocalStorage('os_dock_mag', !state.dockMagnification);
        return { dockMagnification: !state.dockMagnification };
    }),
    systemName: "Adithya's MacBook Pro",
    setSystemName: (systemName) => set({ systemName }),

    // Sound
    soundEnabled: getLocalStorage('os_sound_enabled', true),
    toggleSound: () => set((state) => {
        setLocalStorage('os_sound_enabled', !state.soundEnabled);
        return { soundEnabled: !state.soundEnabled };
    }),

    sidebarCollapsed: false,
    toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));

export const WALLPAPERS = [
    { name: 'Mountain Peak', url: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=1920' },
    { name: 'Abstract Art', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1920' },
    { name: 'Cyberpunk City', url: 'https://images.unsplash.com/photo-1545193544-312906819eb3?auto=format&fit=crop&q=80&w=1920' },
    { name: 'Deep Space', url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=1920' },
    { name: 'Minimalist Geometry', url: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1920' },
    { name: 'Nature Forest', url: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=1920' },
];

export interface FileItem {
    id: string;
    name: string;
    type: 'file' | 'folder';
    location: string; // 'desktop', 'trash', or folderId
    position?: { x: number; y: number };
}
