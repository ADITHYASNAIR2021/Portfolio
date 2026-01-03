import { useState, useEffect, useRef } from 'react';
import { useTime } from '../../hooks/useTime';
import { useOSStore } from '../../store/store';
import { Battery, Wifi, Search, Bluetooth } from 'lucide-react';
import { Settings as SettingsApp } from '../apps/Settings';
import { Finder } from '../apps/Finder';

// MenuItem component defined outside to avoid re-creation on every render
const MenuItem = ({ label, shortcut, onClick, danger, separator }: { label?: string, shortcut?: string, onClick?: () => void, danger?: boolean, separator?: boolean }) => {
    if (separator) return <div className="h-[1px] bg-white/10 my-1 mx-1" />;

    return (
        <button
            className={`w-full text-left px-3 py-1 text-[13px] rounded flex items-center justify-between hover:bg-blue-500 hover:text-white transition-colors group ${danger ? 'text-red-400' : 'text-white/90'}`}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
        >
            <span>{label}</span>
            {shortcut && <span className="text-white/50 text-xs ml-4 tracking-tighter group-hover:text-white/80">{shortcut}</span>}
        </button>
    );
};

export const MenuBar = () => {
    const {
        time
    } = useTime();

    const {
        toggleControlCenter,
        toggleNotificationCenter,
        wifi,
        bluetooth,
        openWindow,
        setBooting,
        activeWindowId,
        windows,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        addFile,
        setSleeping,
        setLocked
    } = useOSStore();

    const [batteryLevel, setBatteryLevel] = useState(100);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [toastMsg, setToastMsg] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Get current app name
    const activeWindow = windows.find(w => w.id === activeWindowId);
    // Simple mapping or capitalize first letter
    const currentAppName = activeWindow?.title ? activeWindow.title.split(' - ')[0] : 'Finder';

    useEffect(() => {
        // Mock battery drain
        const timer = setInterval(() => {
            setBatteryLevel(prev => Math.max(prev - 1, 20));
        }, 60000);

        // Click outside listener
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            clearInterval(timer);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const showToast = (msg: string) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(null), 2000);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleMenuClick = (menu: string) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const handleAction = (action: string) => {
        setActiveMenu(null);
        switch (action) {
            case 'about':
                openWindow('settings', 'System Settings', <SettingsApp />);
                break;
            case 'settings':
                openWindow('settings', 'System Settings', <SettingsApp />);
                break;
            case 'restart':
                setBooting(true);
                break;
            case 'shutdown':
                document.body.style.transition = 'filter 1s';
                document.body.style.filter = 'brightness(0)';
                setTimeout(() => window.location.reload(), 1000);
                break;
            case 'sleep':
                setSleeping(true);
                break;
            case 'lock':
                setLocked(true);
                break;
            case 'logout':
                setBooting(true);
                break;
            case 'force-quit':
                if (activeWindowId) {
                    closeWindow(activeWindowId);
                    showToast("Force Quit Application");
                } else {
                    showToast("No active application");
                }
                break;
            case 'fullscreen':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    document.documentElement.requestFullscreen();
                }
                break;
            case 'new-window':
                // Allow opening a new Finder window if active app is Finder (or desktop), otherwise simulate new window
                if (!activeWindow || activeWindow.appId === 'finder') {
                    openWindow('finder', 'Finder', <Finder />, true);
                } else {
                    showToast("New Window");
                }
                break;
            case 'new-folder':
                addFile({
                    id: `folder-${Date.now()}`,
                    name: 'New Folder',
                    type: 'folder',
                    location: 'desktop',
                    position: { x: 200, y: 200 }
                });
                showToast("New Folder Created on Desktop");
                break;
            case 'open': {
                // Simulate File Picker
                const input = document.createElement('input');
                input.type = 'file';
                input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                        showToast(`Selected: ${file.name}`);
                    }
                };
                input.click();
                break;
            }
            case 'close-window':
                if (activeWindowId) closeWindow(activeWindowId);
                break;
            case 'undo':
            case 'redo':
            case 'cut':
            case 'copy':
            case 'paste':
            case 'select-all':
                // Try to use Clipboard API for compatible actions
                if (action === 'copy') {
                    // This often requires user gesture and selection, which we have here (click)
                    // But we don't know WHAT to copy.
                    showToast("Copy");
                } else if (action === 'paste') {
                    showToast("Paste");
                } else {
                    showToast(action);
                }
                break;
            case 'minimize':
                if (activeWindowId) minimizeWindow(activeWindowId);
                break;
            case 'zoom':
                if (activeWindowId) maximizeWindow(activeWindowId);
                break;
            case 'bring-all-to-front':
                if (activeWindow?.appId) {
                    useOSStore.getState().bringAllToFront(activeWindow.appId);
                    showToast("Brought all to front");
                }
                break;
            default:
                break;
        }
    };

    // Helper to close menu when item clicked
    const onMenuItemClick = (actionName: string) => {
        handleAction(actionName);
        setActiveMenu(null);
    };

    return (
        <>
            <div className="fixed top-0 left-0 right-0 h-8 bg-gray-400/20 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-2 z-50 text-xs font-medium text-white shadow-sm select-none" ref={menuRef}>
                <div className="flex items-center gap-1 h-full">
                    {/* Apple Menu */}
                    <div className="relative h-full flex items-center">
                        <button
                            className={`px-3 h-full rounded hover:bg-white/10 transition-colors ${activeMenu === 'apple' ? 'bg-white/10' : ''}`}
                            onClick={() => handleMenuClick('apple')}
                        >
                            
                        </button>
                        {activeMenu === 'apple' && (
                            <div className="absolute top-full left-0 mt-1 w-64 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl p-1.5 flex flex-col z-50 animate-in fade-in zoom-in-95 duration-100">
                                <MenuItem label="About This Mac" onClick={() => openWindow('settings', 'System Settings', <SettingsApp />)} />
                                <MenuItem separator />
                                <MenuItem label="System Settings..." onClick={() => onMenuItemClick('settings')} />
                                <MenuItem label="App Store..." onClick={() => showToast("App Store not implemented")} />
                                <MenuItem separator />
                                <MenuItem label="Recent Items" />
                                <MenuItem separator />
                                <MenuItem label="Force Quit..." shortcut="⌥⌘Cs" onClick={() => onMenuItemClick('force-quit')} />
                                <MenuItem separator />
                                <MenuItem label="Sleep" onClick={() => onMenuItemClick('sleep')} />
                                <MenuItem label="Restart..." onClick={() => onMenuItemClick('restart')} />
                                <MenuItem label="Shut Down..." onClick={() => onMenuItemClick('shutdown')} />
                                <MenuItem separator />
                                <MenuItem label="Lock Screen" shortcut="^⌘Q" onClick={() => onMenuItemClick('lock')} />
                                <MenuItem label="Log Out Adithya..." shortcut="⇧⌘Q" onClick={() => onMenuItemClick('logout')} />
                            </div>
                        )}
                    </div>

                    {/* App Name Menu */}
                    <div className="relative h-full flex items-center">
                        <button
                            className={`px-3 h-full rounded hover:bg-white/10 transition-colors font-bold ${activeMenu === 'app' ? 'bg-white/10' : ''}`}
                            onClick={() => handleMenuClick('app')}
                        >
                            {currentAppName}
                        </button>
                        {activeMenu === 'app' && (
                            <div className="absolute top-full left-0 mt-1 w-56 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl p-1.5 flex flex-col z-50 animate-in fade-in zoom-in-95 duration-100">
                                <MenuItem label={`About ${currentAppName}`} onClick={() => showToast(`About ${currentAppName}`)} />
                                <MenuItem separator />
                                <MenuItem label="Settings..." shortcut="⌘," onClick={() => onMenuItemClick('settings')} />
                                <MenuItem separator />
                                <MenuItem label="Services" />
                                <MenuItem separator />
                                <MenuItem label={`Hide ${currentAppName}`} shortcut="⌘H" onClick={() => activeWindowId && minimizeWindow(activeWindowId)} />
                                <MenuItem label="Hide Others" shortcut="⌥⌘H" />
                                <MenuItem label="Show All" />
                                <MenuItem separator />
                                <MenuItem label={`Quit ${currentAppName}`} shortcut="⌘Q" onClick={() => onMenuItemClick('force-quit')} />
                            </div>
                        )}
                    </div>

                    {/* File Menu */}
                    <div className="relative h-full hidden md:flex items-center">
                        <button
                            className={`px-3 h-full rounded hover:bg-white/10 transition-colors ${activeMenu === 'file' ? 'bg-white/10' : ''}`}
                            onClick={() => handleMenuClick('file')}
                        >
                            File
                        </button>
                        {activeMenu === 'file' && (
                            <div className="absolute top-full left-0 mt-1 w-56 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl p-1.5 flex flex-col z-50 animate-in fade-in zoom-in-95 duration-100">
                                <MenuItem label="New Window" shortcut="⌘N" onClick={() => onMenuItemClick('new-window')} />
                                <MenuItem label="New Folder" shortcut="⇧⌘N" onClick={() => onMenuItemClick('new-folder')} />
                                <MenuItem label="Open..." shortcut="⌘O" onClick={() => onMenuItemClick('open')} />
                                <MenuItem separator />
                                <MenuItem label="Close Window" shortcut="⌘W" onClick={() => onMenuItemClick('close-window')} />
                            </div>
                        )}
                    </div>

                    {/* Edit Menu */}
                    <div className="relative h-full hidden md:flex items-center">
                        <button
                            className={`px-3 h-full rounded hover:bg-white/10 transition-colors ${activeMenu === 'edit' ? 'bg-white/10' : ''}`}
                            onClick={() => handleMenuClick('edit')}
                        >
                            Edit
                        </button>
                        {activeMenu === 'edit' && (
                            <div className="absolute top-full left-0 mt-1 w-56 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl p-1.5 flex flex-col z-50 animate-in fade-in zoom-in-95 duration-100">
                                <MenuItem label="Undo" shortcut="⌘Z" onClick={() => onMenuItemClick('undo')} />
                                <MenuItem label="Redo" shortcut="⇧⌘Z" onClick={() => onMenuItemClick('redo')} />
                                <MenuItem separator />
                                <MenuItem label="Cut" shortcut="⌘X" onClick={() => onMenuItemClick('cut')} />
                                <MenuItem label="Copy" shortcut="⌘C" onClick={() => onMenuItemClick('copy')} />
                                <MenuItem label="Paste" shortcut="⌘V" onClick={() => onMenuItemClick('paste')} />
                                <MenuItem label="Select All" shortcut="⌘A" onClick={() => onMenuItemClick('select-all')} />
                            </div>
                        )}
                    </div>

                    {/* View Menu */}
                    <div className="relative h-full hidden md:flex items-center">
                        <button
                            className={`px-3 h-full rounded hover:bg-white/10 transition-colors ${activeMenu === 'view' ? 'bg-white/10' : ''}`}
                            onClick={() => handleMenuClick('view')}
                        >
                            View
                        </button>
                        {activeMenu === 'view' && (
                            <div className="absolute top-full left-0 mt-1 w-56 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl p-1.5 flex flex-col z-50 animate-in fade-in zoom-in-95 duration-100">
                                <MenuItem label="As Icons" shortcut="1" onClick={() => showToast("View: Icons")} />
                                <MenuItem label="As List" shortcut="2" onClick={() => showToast("View: List")} />
                                <MenuItem label="As Columns" shortcut="3" onClick={() => showToast("View: Columns")} />
                                <MenuItem separator />
                                <MenuItem label="Enter Full Screen" shortcut="fn F" onClick={() => onMenuItemClick('fullscreen')} />
                            </div>
                        )}
                    </div>

                    {/* Window Menu */}
                    <div className="relative h-full hidden md:flex items-center">
                        <button
                            className={`px-3 h-full rounded hover:bg-white/10 transition-colors ${activeMenu === 'window' ? 'bg-white/10' : ''}`}
                            onClick={() => handleMenuClick('window')}
                        >
                            Window
                        </button>
                        {activeMenu === 'window' && (
                            <div className="absolute top-full left-0 mt-1 w-56 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl p-1.5 flex flex-col z-50 animate-in fade-in zoom-in-95 duration-100">
                                <MenuItem label="Minimize" shortcut="⌘M" onClick={() => onMenuItemClick('minimize')} />
                                <MenuItem label="Zoom" onClick={() => onMenuItemClick('zoom')} />
                                <MenuItem separator />
                                <MenuItem label="Bring All to Front" onClick={() => onMenuItemClick('bring-all-to-front')} />
                            </div>
                        )}
                    </div>

                    {/* Help Menu */}
                    <div className="relative h-full hidden md:flex items-center">
                        <button
                            className={`px-3 h-full rounded hover:bg-white/10 transition-colors ${activeMenu === 'help' ? 'bg-white/10' : ''}`}
                            onClick={() => handleMenuClick('help')}
                        >
                            Help
                        </button>
                        {activeMenu === 'help' && (
                            <div className="absolute top-full left-0 mt-1 w-56 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl p-1.5 flex flex-col z-50 animate-in fade-in zoom-in-95 duration-100">
                                <div className="px-2 py-1 mb-1">
                                    <div className="flex items-center bg-white/10 rounded px-2 py-1">
                                        <Search size={12} className="mr-2 text-white/50" />
                                        <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-white text-xs w-full placeholder:text-white/50" />
                                    </div>
                                </div>
                                <MenuItem label="macOS Help" onClick={() => showToast("Help Center")} />
                                <MenuItem separator />
                                <MenuItem label="Adithya Help" onClick={() => showToast("Contacting Adithya...")} />
                            </div>
                        )}
                    </div>

                </div>

                {/* Right Side Status Items */}
                <div className="flex items-center gap-2">
                    {/* Control Center Trigger */}
                    <div
                        className="flex items-center gap-2 hover:bg-white/10 p-1 rounded-md transition-colors cursor-pointer"
                        onClick={toggleControlCenter}
                    >
                        <div className="hidden sm:flex items-center gap-2 ml-2">
                            <div className="flex flex-col gap-0.5" title="Switch Input">
                                <span className="text-[10px] font-medium leading-none">A</span>
                            </div>
                            <Battery size={18} className={`${batteryLevel <= 20 ? "text-red-500" : "text-white"}`} />
                            {wifi ? <Wifi size={16} /> : <div className="w-4" />} {/* Placeholder to prevent jump */}
                            {bluetooth ? <Bluetooth size={16} /> : <div className="w-4" />}
                            <Search size={14} />
                        </div>
                    </div>

                    {/* Notification Center Trigger */}
                    <div
                        className="flex items-center gap-2 hover:bg-white/10 p-1.5 rounded-md transition-colors cursor-pointer"
                        onClick={toggleNotificationCenter}
                    >
                        <span>{formatDate(time)}</span>
                        <span className="w-16 text-center">{formatTime(time)}</span>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {toastMsg && (
                <div className="fixed top-12 right-4 z-[100] bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 text-white px-4 py-2 rounded-lg shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <span className="text-sm font-medium">{toastMsg}</span>
                </div>
            )}
        </>
    );
};
