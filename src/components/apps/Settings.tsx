import { useState } from 'react';
import { useOSStore, WALLPAPERS } from '../../store/store';
import { Monitor, Volume2, Image, Info, Search, Moon, Sun, Wifi, Bluetooth, LayoutDashboard, ToggleLeft, Battery } from 'lucide-react';

export const Settings = () => {
    const {
        brightness, setBrightness,
        volume, setVolume,
        setWallpaper, wallpaper,
        wifi, toggleWifi,
        bluetooth, toggleBluetooth,
        theme, setTheme,
        dockSize, setDockSize,
        dockMagnification, toggleDockMagnification,
        systemName
    } = useOSStore();

    const [activeTab, setActiveTab] = useState('wallpaper');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        { id: 'wallpaper', icon: Image, label: 'Wallpaper' },
        { id: 'display', icon: Monitor, label: 'Displays' },
        { id: 'sound', icon: Volume2, label: 'Sound' },
        { id: 'network', icon: Wifi, label: 'Network' },
        { id: 'control-center', icon: ToggleLeft, label: 'Control Center' },
        { id: 'battery', icon: Battery, label: 'Battery' },
        { id: 'desktop', icon: LayoutDashboard, label: 'Desktop & Dock' },
        { id: 'appearance', icon: Moon, label: 'Appearance' },
        { id: 'about', icon: Info, label: 'About' },
    ];

    const filteredTabs = tabs.filter(t => t.label.toLowerCase().includes(searchQuery.toLowerCase()));

    const networks = [
        { name: "Amrita_Student", connected: true, secured: true },
        { name: "Doctreen_Guest", connected: false, secured: true },
        { name: "iPhone Hotspot", connected: false, secured: true, personal: true },
    ];

    return (
        <div className="flex h-full bg-[#fbfbfb] dark:bg-[#1e1e1e] text-black dark:text-white font-sans text-sm selection:bg-blue-500/30">
            {/* Sidebar */}
            <div className="w-[260px] bg-[#f0f0f0]/80 dark:bg-[#2d2d2d]/80 backdrop-blur-xl border-r border-[#e5e5e5] dark:border-black/20 flex flex-col pt-3 pb-4">
                <div className="px-4 mb-4">
                    <div className="relative">
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/50 dark:bg-[#3d3d3d]/50 border border-gray-200 dark:border-black/10 rounded-md pl-8 pr-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-3 space-y-0.5 custom-scrollbar">
                    {/* User Profile Snippet */}
                    <div className="flex items-center gap-3 px-3 py-2 mb-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden shadow-sm">
                            <img src="https://github.com/ADITHYASNAIR2021.png" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold truncate text-[13px]">Adithya S Nair</div>
                            <div className="text-xs text-gray-500 truncate group-hover:text-gray-600 dark:text-gray-400">Apple Account</div>
                        </div>
                    </div>

                    {filteredTabs.map(tab => (
                        <div
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-3 py-1.5 rounded-[6px] cursor-pointer transition-colors text-[13px] ${activeTab === tab.id
                                ? 'bg-blue-500 text-white font-medium shadow-sm'
                                : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            <tab.icon size={18} strokeWidth={2} />
                            <span>{tab.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-[#fbfbfb] dark:bg-[#1e1e1e]">
                <div className="p-10 max-w-4xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-white/10">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-inner">
                            {tabs.find(t => t.id === activeTab)?.icon && (() => {
                                const Icon = tabs.find(t => t.id === activeTab)!.icon;
                                return <Icon size={20} className="text-gray-600 dark:text-gray-300" />;
                            })()}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold leading-tight">{tabs.find(t => t.id === activeTab)?.label}</h2>
                        </div>
                    </div>

                    {/* About */}
                    {activeTab === 'about' && (
                        <div className="flex flex-col items-center justify-center py-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="relative">
                                <Monitor size={96} className="text-gray-800 dark:text-gray-200 drop-shadow-2xl" strokeWidth={1} />
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full" />
                            </div>

                            <div className="text-center space-y-1">
                                <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">{systemName || 'AdithyaOS'}</h1>
                                <p className="text-gray-500 font-medium">Version 1.0 (Sonoma)</p>
                            </div>

                            <div className="bg-white dark:bg-[#2d2d2d] rounded-xl border border-gray-200 dark:border-white/5 w-full max-w-lg p-5 space-y-3 text-sm shadow-sm">
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-500 font-medium">Processor</span>
                                    <span className='font-medium'>Adithya Neural Engine (ANE)</span>
                                </div>
                                <div className="flex justify-between py-1 border-t border-gray-100 dark:border-white/5">
                                    <span className="text-gray-500 font-medium">Graphics</span>
                                    <span className='font-medium'>NVIDIA RTX (Deep Learning Opt.)</span>
                                </div>
                                <div className="flex justify-between py-1 border-t border-gray-100 dark:border-white/5">
                                    <span className="text-gray-500 font-medium">Memory</span>
                                    <span className='font-medium'>Unlimited Learning Capacity</span>
                                </div>
                                <div className="flex justify-between py-1 border-t border-gray-100 dark:border-white/5">
                                    <span className="text-gray-500 font-medium">Serial Number</span>
                                    <span className='font-mono text-xs mt-0.5 text-gray-400'>19-CSE-495-A14</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="px-4 py-1.5 bg-white dark:bg-[#3d3d3d] border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-[#4d4d4d] transition-colors">
                                    System Report...
                                </button>
                                <button className="px-4 py-1.5 bg-white dark:bg-[#3d3d3d] border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-[#4d4d4d] transition-colors">
                                    Software Update...
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Desktop & Dock */}
                    {activeTab === 'desktop' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-white dark:bg-[#2d2d2d] rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm">
                                <div className="p-4 border-b border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                                    <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-500">Dock</h3>
                                </div>
                                <div className="p-4 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Size</span>
                                        <div className="flex items-center gap-4 w-1/2">
                                            <span className='text-xs text-gray-400'>Small</span>
                                            <input
                                                type="range"
                                                min="30"
                                                max="100"
                                                value={dockSize}
                                                title="Dock Size"
                                                onChange={(e) => setDockSize(Number(e.target.value))}
                                                className="flex-1 h-1 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md border border-gray-300 dark:border-gray-500"
                                            />
                                            <span className='text-xs text-gray-400'>Large</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Magnification</span>
                                        <div className="flex items-center gap-4">
                                            <div
                                                onClick={toggleDockMagnification}
                                                className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ease-in-out ${dockMagnification ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                                            >
                                                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out border border-gray-100 ${dockMagnification ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Position on screen</span>
                                        <div className="flex bg-gray-100 dark:bg-black/20 p-1 rounded-lg">
                                            <button className="px-3 py-1 rounded text-xs font-medium text-gray-500 hover:bg-white dark:hover:bg-white/10 transition">Left</button>
                                            <button className="px-3 py-1 rounded text-xs font-medium bg-white dark:bg-gray-600 text-black dark:text-white shadow-sm">Bottom</button>
                                            <button className="px-3 py-1 rounded text-xs font-medium text-gray-500 hover:bg-white dark:hover:bg-white/10 transition">Right</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Appearance */}
                    {activeTab === 'appearance' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-white dark:bg-[#2d2d2d] rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm">
                                <div className="p-4 border-b border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                                    <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-500">Appearance</h3>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className='flex gap-8 justify-center'>
                                        <div className='flex flex-col items-center gap-2 cursor-pointer' onClick={() => setTheme('light')}>
                                            <div className={`w-20 h-14 rounded-lg bg-[#e3e3e3] border-2 ${theme === 'light' ? 'border-blue-500' : 'border-gray-200 dark:border-gray-600'} flex items-center justify-center`}>
                                                <Sun size={20} className="text-gray-500" />
                                            </div>
                                            <span className="text-sm font-medium">Light</span>
                                        </div>
                                        <div className='flex flex-col items-center gap-2 cursor-pointer' onClick={() => setTheme('dark')}>
                                            <div className={`w-20 h-14 rounded-lg bg-[#1e1e1e] border-2 ${theme === 'dark' ? 'border-blue-500' : 'border-gray-200 dark:border-gray-600'} flex items-center justify-center`}>
                                                <Moon size={20} className="text-gray-400" />
                                            </div>
                                            <span className="text-sm font-medium">Dark</span>
                                        </div>
                                        <div className='flex flex-col items-center gap-2 cursor-pointer' onClick={() => setTheme('auto')}>
                                            <div className={`w-20 h-14 rounded-lg bg-gradient-to-r from-[#e3e3e3] to-[#1e1e1e] border-2 ${theme === 'auto' ? 'border-blue-500' : 'border-gray-200 dark:border-gray-600'} flex items-center justify-center`}>
                                                <div className='text-xs font-bold text-gray-500 bg-white/50 px-1 rounded'>Auto</div>
                                            </div>
                                            <span className="text-sm font-medium">Auto</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">Accent Color</span>
                                            <div className="flex gap-2">
                                                {['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-gray-500'].map((color, i) => (
                                                    <div key={i} className={`w-5 h-5 rounded-full ${color} cursor-pointer hover:scale-110 transition-transform ${i === 0 ? 'ring-2 ring-offset-2 ring-gray-300 dark:ring-gray-600' : ''}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Wallpaper Settings */}
                    {activeTab === 'wallpaper' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-white dark:bg-[#2d2d2d] rounded-xl border border-gray-200 dark:border-white/5 p-4 shadow-sm">
                                <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 shadow-sm border border-gray-200 dark:border-black/20 relative group">
                                    <img src={wallpaper} alt="Current Wallpaper" className="w-full h-full object-cover" />
                                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center'>
                                        <span className='bg-white/90 backdrop-blur text-black text-xs font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0'>Current Desktop</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-semibold text-gray-500 mb-4 ml-1 uppercase tracking-wider">Dynamic Wallpapers</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {WALLPAPERS.map((wp, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setWallpaper(wp.url)}
                                            className={`group relative aspect-video rounded-xl overflow-hidden cursor-pointer ring-offset-2 ring-offset-[#fbfbfb] dark:ring-offset-[#1e1e1e] transition-all ${wallpaper === wp.url ? 'ring-2 ring-blue-500 shadow-md' : 'ring-0 hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600 hover:shadow-lg'}`}
                                        >
                                            <img src={wp.url} alt={wp.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-3 pt-6 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-end">
                                                <span className="font-medium truncate">{wp.name}</span>
                                            </div>
                                            {wallpaper === wp.url && (
                                                <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full shadow-lg">
                                                    <div className='w-2 h-2 bg-white rounded-full' />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Network Settings */}
                    {activeTab === 'network' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-white dark:bg-[#2d2d2d] rounded-xl border border-gray-200 dark:border-white/5 divide-y divide-gray-200 dark:divide-white/5 shadow-sm">
                                {/* Wi-Fi Section */}
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full ${wifi ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'} flex items-center justify-center transition-colors`}>
                                            <Wifi size={20} className={wifi ? "text-white" : "text-gray-500"} />
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className="font-medium text-base">Wi-Fi</span>
                                            <span className="text-xs text-gray-500">{wifi ? 'On' : 'Off'}</span>
                                        </div>
                                    </div>
                                    <div
                                        onClick={toggleWifi}
                                        className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ease-in-out ${wifi ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                                    >
                                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out border border-gray-100 ${wifi ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                                    </div>
                                </div>
                                {wifi && (
                                    <div className="p-2">
                                        {networks.map((net, i) => (
                                            <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <Wifi size={16} className={net.connected ? 'text-blue-500' : 'text-gray-400'} />
                                                    <div className="flex flex-col">
                                                        <span className={`text-sm ${net.connected ? 'font-medium' : ''}`}>{net.name}</span>
                                                        {net.personal && <span className="text-[10px] text-gray-400">Personal Hotspot</span>}
                                                    </div>
                                                </div>
                                                {net.connected && <span className="text-blue-500"><div className='w-2 h-2 bg-blue-500 rounded-full' /></span>}
                                                {net.secured && !net.connected && <div className="text-gray-400"><div className='w-3 h-3 border border-current rounded-full flex justify-center items-center'><div className='w-1 h-1 bg-current rounded-full' /></div></div>}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Bluetooth Section */}
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full ${bluetooth ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'} flex items-center justify-center transition-colors`}>
                                            <Bluetooth size={20} className={bluetooth ? "text-white" : "text-gray-500"} />
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className="font-medium text-base">Bluetooth</span>
                                            <span className="text-xs text-gray-500">{bluetooth ? 'On' : 'Off'}</span>
                                        </div>
                                    </div>
                                    <div
                                        onClick={toggleBluetooth}
                                        className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ease-in-out ${bluetooth ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                                    >
                                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out border border-gray-100 ${bluetooth ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Display Settings */}
                    {activeTab === 'display' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-white dark:bg-[#2d2d2d] rounded-xl border border-gray-200 dark:border-white/5 divide-y divide-gray-200 dark:divide-white/5 shadow-sm">
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Sun size={20} className="text-gray-500" />
                                        <span className="font-medium">Brightness</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        value={brightness}
                                        title="Brightness"
                                        onChange={(e) => setBrightness(Number(e.target.value))}
                                        className="w-48 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md border border-gray-300 dark:border-gray-500"
                                    />
                                </div>
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Moon size={20} className="text-gray-500" />
                                        <span>True Tone</span>
                                    </div>
                                    <div className="w-11 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                                        <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Sound Settings */}
                    {activeTab === 'sound' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-white dark:bg-[#2d2d2d] rounded-xl border border-gray-200 dark:border-white/5 divide-y divide-gray-200 dark:divide-white/5 shadow-sm">
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Volume2 size={20} className="text-gray-500" />
                                        <span className="font-medium">Output Volume</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={volume}
                                        title="Volume"
                                        onChange={(e) => setVolume(Number(e.target.value))}
                                        className="w-48 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md border border-gray-300 dark:border-gray-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Control Center Settings */}
                    {activeTab === 'control-center' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-white dark:bg-[#2d2d2d] rounded-xl border border-gray-200 dark:border-white/5 divide-y divide-gray-200 dark:divide-white/5 shadow-sm">
                                <div className="p-4">
                                    <h3 className="font-semibold text-base mb-4">Control Center Modules</h3>
                                    <div className="space-y-4">
                                        {['Wi-Fi', 'Bluetooth', 'AirDrop'].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                                        {i === 0 ? <Wifi size={16} /> : i === 1 ? <Bluetooth size={16} /> : <div className="w-4 h-4 border-2 border-white rounded-full" />}
                                                    </div>
                                                    <span className="font-medium">{item}</span>
                                                </div>
                                                <select className="bg-gray-100 dark:bg-black/20 border-none rounded-lg text-xs font-medium px-2 py-1 outline-none" title={`${item} settings`}>
                                                    <option>Show in Menu Bar</option>
                                                    <option>Don't Show in Menu Bar</option>
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Battery Settings */}
                    {activeTab === 'battery' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="flex items-center justify-center py-10">
                                <div className="relative">
                                    <Battery size={128} className="text-green-500 rotate-90" strokeWidth={1} />
                                    <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-green-600">100%</div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-[#2d2d2d] rounded-xl border border-gray-200 dark:border-white/5 divide-y divide-gray-200 dark:divide-white/5 shadow-sm">
                                <div className="p-4 flex items-center justify-between">
                                    <span className="font-medium">Low Power Mode</span>
                                    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative cursor-pointer">
                                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                                <div className="p-4 flex items-center justify-between">
                                    <span className="font-medium">Battery Health</span>
                                    <div className="flex items-center gap-2 text-green-500 font-medium">
                                        <span>Normal</span>
                                        <Info size={16} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
