import { useState } from 'react';
import { useOSStore } from '../../store/store';
import { ArrowRight, Lock } from 'lucide-react';

export const LockScreen = () => {
    const { setLocked, wallpaper } = useOSStore();
    const [password, setPassword] = useState('');

    const handleLogin = (e?: React.FormEvent) => {
        e?.preventDefault();
        // Allow any password for demo
        setLocked(false);
    };

    return (
        <div
            className="fixed inset-0 z-[10000] bg-cover bg-center flex flex-col items-center justify-center text-white"
            style={{ backgroundImage: `url(${wallpaper})` }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />

            <div className="relative z-10 flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-24 h-24 rounded-full bg-gray-200/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-2xl border border-white/20">
                    A
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight mb-1">Adithya</h2>
                    <p className="text-sm text-white/80">Touch ID or Enter Password</p>
                </div>

                <form onSubmit={handleLogin} className="relative group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 w-48 text-sm outline-none placeholder:text-white/50 focus:bg-white/20 transition-all text-center"
                        autoFocus
                    />
                    <button
                        type="submit"
                        title="Unlock"
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors ${password ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                        <ArrowRight size={14} />
                    </button>
                </form>

                <div className="mt-8 flex flex-col items-center gap-2 text-xs text-white/50 cursor-pointer hover:text-white transition-colors" onClick={() => window.location.reload()}>
                    <div className="p-2 rounded-full bg-white/10">
                        <Lock size={16} />
                    </div>
                    <span>Restart</span>
                </div>
            </div>

            <div className="absolute bottom-8 flex flex-col items-center gap-1 text-white/70">
                <p className="text-4xl font-thin tracking-tighter">
                    {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })}
                </p>
                <p className="text-sm font-medium">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
            </div>
        </div>
    );
};
