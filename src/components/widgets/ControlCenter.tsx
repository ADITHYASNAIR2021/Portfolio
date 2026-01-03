import { Wifi, Bluetooth, Moon, Sun, Volume2, Camera } from 'lucide-react';
import { useOSStore } from '../../store/store';
import { useSound } from '../../hooks/useSound';

export const ControlCenter = () => {
    const { wifi, bluetooth, toggleWifi, toggleBluetooth, brightness, setBrightness, volume, setVolume } = useOSStore();
    const { playScreenshotSound } = useSound();

    return (
        <div className="absolute top-10 right-4 w-80 bg-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 p-4 flex flex-col gap-4 z-[100] text-black dark:text-white">
            <div className="grid grid-cols-4 gap-2">
                {/* Connectivity */}
                <div className="col-span-2 bg-white/50 dark:bg-black/20 rounded-xl p-3 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${wifi ? 'bg-blue-500 text-white' : 'bg-gray-400/50'}`}
                            onClick={toggleWifi}
                        >
                            <Wifi size={16} />
                        </div>
                        <div className="text-xs font-semibold">Wi-Fi</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${bluetooth ? 'bg-blue-500 text-white' : 'bg-gray-400/50'}`}
                            onClick={toggleBluetooth}
                        >
                            <Bluetooth size={16} />
                        </div>
                        <div className="text-xs font-semibold">Bluetooth</div>
                    </div>
                </div>

                {/* Focus Modes */}
                <div className="col-span-2 bg-white/50 dark:bg-black/20 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-white/60 dark:hover:bg-black/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                        <Moon size={16} fill="currentColor" />
                    </div>
                    <div>
                        <div className="text-xs font-semibold">Do Not Disturb</div>
                        <div className="text-[10px] opacity-60">On</div>
                    </div>
                </div>
            </div>

            {/* Display */}
            <div className="bg-white/50 dark:bg-black/20 rounded-xl p-3">
                <div className="text-xs font-medium mb-2 ml-1">Display</div>
                <div className="flex items-center gap-3">
                    <Sun size={16} className="opacity-50" />
                    <input
                        aria-label="Display Brightness"
                        type="range"
                        min="0"
                        max="100"
                        value={brightness}
                        onChange={(e) => setBrightness(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-white/50 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-sm"
                    />
                </div>
            </div>

            {/* Sound */}
            <div className="bg-white/50 dark:bg-black/20 rounded-xl p-3">
                <div className="text-xs font-medium mb-2 ml-1">Sound</div>
                <div className="flex items-center gap-3">
                    <Volume2 size={16} className="opacity-50" />
                    <input
                        aria-label="Volume Control"
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-white/50 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-sm"
                    />
                </div>
            </div>

            {/* Music Widget Placeholder */}
            <div className="bg-white/50 dark:bg-black/20 rounded-xl p-3 h-16 flex items-center justify-center text-xs opacity-50">
                No Music Playing
            </div>

            {/* Screen Capture */}
            <div
                className="bg-white/50 dark:bg-black/20 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-white/60 dark:hover:bg-black/30 transition-colors"
                onClick={() => playScreenshotSound()}
            >
                <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center">
                    <Camera size={16} />
                </div>
                <div>
                    <div className="text-xs font-semibold">Screen Capture</div>
                    <div className="text-[10px] opacity-60">Click to capture</div>
                </div>
            </div>
        </div>
    );
};
