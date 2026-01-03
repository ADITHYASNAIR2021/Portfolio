import { create } from 'zustand';
import { getAllFiles, saveFileToDB, deleteFileFromDB, type FileSystemItem } from '../utils/db';

export interface WidgetItem {
    id: string;
    type: 'clock' | 'weather' | 'system' | 'quote' | 'calculator';
    position: { x: number; y: number };
}

interface WindowState {
    id: string;
    title: string;
    content: React.ReactNode;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
}

interface OSState {
    booting: boolean;
    setBooting: (booting: boolean) => void;

    wallpaper: string;
    setWallpaper: (url: string) => void;

    brightness: number;
    setBrightness: (value: number) => void;

    volume: number;
    setVolume: (value: number) => void;

    wifi: boolean;
    toggleWifi: () => void;

    bluetooth: boolean;
    toggleBluetooth: () => void;

    theme: 'light' | 'dark' | 'auto';
    setTheme: (theme: 'light' | 'dark' | 'auto') => void;

    dockSize: number;
    setDockSize: (size: number) => void;

    dockMagnification: boolean;
    toggleDockMagnification: () => void;

    isSleeping: boolean;
    setSleeping: (isSleeping: boolean) => void;

    isLocked: boolean;
    setLocked: (isLocked: boolean) => void;

    windows: WindowState[];
    activeWindowId: string | null;
    openWindow: (id: string, title: string, content: React.ReactNode) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;

    // Sidebar
    sidebarCollapsed: boolean;
    toggleSidebar: () => void;

    controlCenterOpen: boolean;
    toggleControlCenter: () => void;

    notificationCenterOpen: boolean;
    toggleNotificationCenter: () => void;

    // File System
    files: FileSystemItem[];
    fileSystemReady: boolean;
    hydrateFiles: () => Promise<void>;
    addFile: (file: FileSystemItem) => void;
    moveFile: (id: string, location: string, position: { x: number; y: number }) => void;
    renameFile: (id: string, newName: string) => void;
    updateFileContent: (id: string, content: string) => void;
    moveToTrash: (id: string) => void;
    emptyTrash: () => void;
    restoreFile: (id: string) => void;

    // Widgets
    widgets: WidgetItem[];
    addWidget: (widget: WidgetItem) => void;
    removeWidget: (id: string) => void;
    updateWidgetPosition: (id: string, position: { x: number; y: number }) => void;

    systemName: string;
}

// Helper to safely access localStorage (SSR safe)
const getLocalStorage = <T>(key: string, initialValue: T): T => {
    if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) as T : initialValue;
    }
    return initialValue;
};

const setLocalStorage = <T>(key: string, value: T) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const useOSStore = create<OSState>((set) => ({
    booting: true,
    setBooting: (booting) => set({ booting }),

    wallpaper: getLocalStorage('os_wallpaper', 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=1920'),
    setWallpaper: (url) => {
        setLocalStorage('os_wallpaper', url);
        set({ wallpaper: url });
    },

    brightness: getLocalStorage('os_brightness', 100),
    setBrightness: (value) => {
        setLocalStorage('os_brightness', value);
        set({ brightness: value });
    },

    volume: getLocalStorage('os_volume', 80),
    setVolume: (value) => {
        setLocalStorage('os_volume', value);
        set({ volume: value });
    },

    wifi: getLocalStorage('os_wifi', true),
    toggleWifi: () => set((state) => {
        const newVal = !state.wifi;
        setLocalStorage('os_wifi', newVal);
        return { wifi: newVal };
    }),

    bluetooth: getLocalStorage('os_bluetooth', true),
    toggleBluetooth: () => set((state) => {
        const newVal = !state.bluetooth;
        setLocalStorage('os_bluetooth', newVal);
        return { bluetooth: newVal };
    }),

    theme: getLocalStorage('os_theme', 'light'),
    setTheme: (theme) => {
        setLocalStorage('os_theme', theme);
        set({ theme });
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (theme === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    },

    dockSize: getLocalStorage('os_dockSize', 50),
    setDockSize: (size) => {
        setLocalStorage('os_dockSize', size);
        set({ dockSize: size });
    },

    dockMagnification: getLocalStorage('os_dockMag', true),
    toggleDockMagnification: () => set((state) => {
        const newVal = !state.dockMagnification;
        setLocalStorage('os_dockMag', newVal);
        return { dockMagnification: newVal };
    }),

    isSleeping: false,
    setSleeping: (isSleeping) => set({ isSleeping }),

    isLocked: false,
    setLocked: (isLocked) => set({ isLocked }),

    windows: [],
    activeWindowId: null,
    openWindow: (id, title, content) => set((state) => {
        if (state.windows.find(w => w.id === id)) {
            // Bring to front
            const maxZ = Math.max(...state.windows.map(w => w.zIndex), 0);
            return {
                activeWindowId: id,
                windows: state.windows.map(w => w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w)
            };
        }
        const maxZ = Math.max(...state.windows.map(w => w.zIndex), 0);
        return {
            activeWindowId: id,
            windows: [...state.windows, { id, title, content, isMinimized: false, isMaximized: false, zIndex: maxZ + 1 }]
        };
    }),
    closeWindow: (id) => set((state) => ({
        windows: state.windows.filter(w => w.id !== id),
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
    })),
    minimizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: true } : w),
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
    })),
    maximizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)
    })),
    focusWindow: (id) => set((state) => {
        const maxZ = Math.max(...state.windows.map(w => w.zIndex), 0);
        return {
            activeWindowId: id,
            windows: state.windows.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w)
        };
    }),

    sidebarCollapsed: false,
    toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

    controlCenterOpen: false,
    toggleControlCenter: () => set((state) => ({ controlCenterOpen: !state.controlCenterOpen })),

    notificationCenterOpen: false,
    toggleNotificationCenter: () => set((state) => ({ notificationCenterOpen: !state.notificationCenterOpen })),

    // File System - IndexedDB
    files: [],
    fileSystemReady: false,

    hydrateFiles: async () => {
        try {
            const files = await getAllFiles();
            if (files.length === 0) {
                // Initial defaults if empty
                const defaults = [
                    { id: 'folder1', name: 'New Folder', type: 'folder', location: 'desktop', position: { x: 120, y: 20 } },
                    { id: 'resume', name: 'Resume.pdf', type: 'file', location: 'desktop', position: { x: 20, y: 120 } },
                    { id: 'project1', name: 'Namude_Yatra.deck', type: 'file', location: 'desktop', position: { x: 20, y: 20 } },
                ];
                // @ts-expect-error Inferred types do not match literal union
                for (const f of defaults) { await saveFileToDB(f); }
                // @ts-expect-error Inferred types do not match literal union
                set({ files: defaults, fileSystemReady: true });
            } else {
                set({ files, fileSystemReady: true });
            }
        } catch (error) {
            console.error("Failed to hydrate files", error);
            set({ fileSystemReady: true }); // Proceed anyway
        }
    },

    addFile: (file) => {
        saveFileToDB(file);
        set((state) => ({ files: [...state.files, file] }));
    },

    moveFile: (id, location, position) => set((state) => {
        const newFiles = state.files.map(f => {
            if (f.id === id) {
                const updated = { ...f, location, position };
                saveFileToDB(updated);
                return updated;
            }
            return f;
        });
        return { files: newFiles };
    }),

    renameFile: (id, newName) => set((state) => {
        const newFiles = state.files.map(f => {
            if (f.id === id) {
                const updated = { ...f, name: newName };
                saveFileToDB(updated);
                return updated;
            }
            return f;
        });
        return { files: newFiles };
    }),

    updateFileContent: (id, content) => set((state) => {
        const newFiles = state.files.map(f => {
            if (f.id === id) {
                const updated = { ...f, content };
                saveFileToDB(updated);
                return updated;
            }
            return f;
        });
        return { files: newFiles };
    }),

    moveToTrash: (id) => set((state) => {
        const newFiles = state.files.map(f => {
            if (f.id === id) {
                const updated = { ...f, location: 'trash' };
                saveFileToDB(updated);
                return updated;
            }
            return f;
        });
        return { files: newFiles };
    }),

    emptyTrash: () => set((state) => {
        const toDelete = state.files.filter(f => f.location === 'trash');
        toDelete.forEach(f => deleteFileFromDB(f.id));
        return { files: state.files.filter(f => f.location !== 'trash') };
    }),

    restoreFile: (id) => set((state) => {
        const newFiles = state.files.map(f => {
            if (f.id === id) {
                const updated = { ...f, location: 'desktop' };
                saveFileToDB(updated);
                return updated;
            }
            return f;
        });
        return { files: newFiles };
    }),

    // Widgets with Persistence
    widgets: getLocalStorage('os_widgets', [
        { id: 'clock-1', type: 'clock', position: { x: window.innerWidth - 200, y: 50 } },
        { id: 'weather-1', type: 'weather', position: { x: window.innerWidth - 200, y: 250 } },
    ] as WidgetItem[]),
    addWidget: (widget) => set((state) => {
        const newWidgets = [...state.widgets, widget];
        setLocalStorage('os_widgets', newWidgets);
        return { widgets: newWidgets };
    }),
    removeWidget: (id) => set((state) => {
        const newWidgets = state.widgets.filter(w => w.id !== id);
        setLocalStorage('os_widgets', newWidgets);
        return { widgets: newWidgets };
    }),
    updateWidgetPosition: (id, position) => set((state) => {
        const newWidgets = state.widgets.map(w => w.id === id ? { ...w, position } : w);
        setLocalStorage('os_widgets', newWidgets);
        return { widgets: newWidgets };
    }),

    systemName: 'AdithyaOS',
}));

export const WALLPAPERS = [
    { name: 'Mountain Peak', url: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=1920' },
    { name: 'Abstract Art', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1920' },
    { name: 'Cyberpunk City', url: 'https://images.unsplash.com/photo-1545193544-312906819eb3?auto=format&fit=crop&q=80&w=1920' },
    { name: 'Deep Space', url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=1920' },
    { name: 'Minimalist Geometry', url: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1920' },
    { name: 'Nature Forest', url: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=1920' },
];
