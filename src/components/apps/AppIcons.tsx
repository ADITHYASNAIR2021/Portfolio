import type { ComponentProps } from 'react';

type IconProps = ComponentProps<'svg'>;

// Shared container style for consistency (optional usage)
export const IconContainer = ({ children, className = "", bgColor = "bg-white" }: { children: React.ReactNode, className?: string, bgColor?: string }) => (
    <div className={`w-full h-full rounded-[22%] shadow-sm flex items-center justify-center overflow-hidden ${bgColor} ${className}`}>
        {children}
    </div>
);

export const SafariIcon = (props: IconProps) => (
    <div className={`w-full h-full bg-white rounded-[22%] flex items-center justify-center overflow-hidden relative shadow-sm ${props.className || ''}`}>
        <div className="absolute inset-0 bg-blue-500 rounded-[22%] opacity-10"></div>
        {/* Compass Background */}
        <div className="w-[90%] h-[90%] bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-inner">
            <div className="w-[94%] h-[94%] bg-gradient-to-br from-white to-blue-100 rounded-full flex items-center justify-center relative">
                {/* Ticks */}
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="absolute w-[1px] h-full bg-slate-300" style={{ transform: `rotate(${i * 30}deg)` }}></div>
                ))}
                <div className="w-[85%] h-[85%] bg-white rounded-full flex items-center justify-center relative z-10 shadow-inner">
                    <div className="relative w-full h-full animate-[spin_10s_linear_infinite]" style={{ animationDuration: '20s' }}>
                        {/* Needle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-[80%]">
                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[35px] border-b-red-500 absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom transform -rotate-45" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }}></div>
                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[35px] border-t-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 origin-top transform -rotate-45"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const MessagesIcon = () => (
    <div className="w-full h-full bg-[#3CE058] rounded-[22%] flex items-center justify-center relative shadow-sm hover:brightness-105 transition-all">
        <svg viewBox="0 0 100 100" className="w-[65%] h-[65%] text-white fill-current drop-shadow-md">
            <path d="M50,15 C26.5,15 7.5,30.5 7.5,50 C7.5,61.5 13.5,71.5 23.5,78 L20.5,92.5 L36.5,83.5 C40.5,84.5 45,85 50,85 C73.5,85 92.5,69.5 92.5,50 C92.5,30.5 73.5,15 50,15 Z" />
        </svg>
    </div>
);

export const PhotosIcon = () => (
    <div className="w-full h-full bg-white rounded-[22%] flex items-center justify-center relative overflow-hidden shadow-sm">
        {/* Flower petals */}
        <div className="relative w-[80%] h-[80%] animate-[spin_60s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[50%] bg-gradient-to-b from-orange-400 to-orange-500 rounded-full blur-[0.5px] mix-blend-multiply opacity-90 origin-bottom transform rotate-0"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[50%] bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full blur-[0.5px] mix-blend-multiply opacity-90 origin-bottom transform rotate-45"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[50%] bg-gradient-to-b from-green-400 to-green-500 rounded-full blur-[0.5px] mix-blend-multiply opacity-90 origin-bottom transform rotate-90"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[50%] bg-gradient-to-b from-blue-400 to-blue-500 rounded-full blur-[0.5px] mix-blend-multiply opacity-90 origin-bottom transform rotate-[135deg]"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[50%] bg-gradient-to-b from-blue-600 to-blue-700 rounded-full blur-[0.5px] mix-blend-multiply opacity-90 origin-bottom transform rotate-180"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[50%] bg-gradient-to-b from-purple-500 to-purple-600 rounded-full blur-[0.5px] mix-blend-multiply opacity-90 origin-bottom transform rotate-[225deg]"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[50%] bg-gradient-to-b from-pink-500 to-pink-600 rounded-full blur-[0.5px] mix-blend-multiply opacity-90 origin-bottom transform rotate-[270deg]"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[50%] bg-gradient-to-b from-red-500 to-red-600 rounded-full blur-[0.5px] mix-blend-multiply opacity-90 origin-bottom transform rotate-[315deg]"></div>
        </div>
    </div>
);

export const MusicIcon = () => (
    <div className="w-full h-full bg-gradient-to-br from-[#FB5C74] to-[#FA233B] rounded-[22%] flex items-center justify-center shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
        <svg viewBox="0 0 24 24" className="w-[60%] h-[60%] text-white fill-current drop-shadow-md relative z-10">
            <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3zm12 0a3 3 0 1 1-3-3 3 3 0 0 1 3 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M9 18V5l12-2v13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3" fill="currentColor" />
            <circle cx="18" cy="16" r="3" fill="currentColor" />
        </svg>
    </div>
);

export const TerminalIcon = () => (
    <div className="w-full h-full bg-gray-900 rounded-[22%] flex items-center justify-center border border-gray-700 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-6 bg-gray-800 flex items-center px-2 space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
        </div>
        <span className="text-white font-mono text-xl font-bold mt-2 ml-[-1rem]">{`>_`}</span>
    </div>
);

export const VSCodeIcon = () => (
    <div className="w-full h-full bg-[#0065A9] rounded-[22%] flex items-center justify-center shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2F8EF5] to-[#007ACC] opacity-90"></div>
        <svg viewBox="0 0 24 24" className="w-[70%] h-[70%] text-white fill-current drop-shadow-lg relative z-10">
            <path d="M2,12 L7,22 L17.5,12 L7,2 L2,12 Z M22,19 L10.5,12 L22,5 L22,19 Z" stroke="none" />
            <path d="M16.5,12 L22,5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16.5,12 L22,19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    </div>
);

export const GameCenterIcon = () => (
    <div className="w-full h-full rounded-[22%] flex items-center justify-center shadow-sm relative overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
        <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
        <div className="w-[90%] h-[90%] bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="w-[80%] h-[80%] bg-white/90 rounded-full flex items-center justify-center shadow-inner">
                <div className="w-[30%] h-[30%] rounded-full bg-gradient-to-br from-blue-400 to-purple-600 animate-pulse"></div>
                <div className="absolute w-[80%] h-[80%] rounded-full border-4 border-transparent border-t-blue-500 border-r-pink-500 border-b-yellow-500 border-l-green-500 animate-[spin_4s_linear_infinite] opacity-60"></div>
                <div className="absolute w-[60%] h-[60%] rounded-full border-4 border-transparent border-t-purple-500 border-l-orange-500 animate-[spin_3s_linear_infinite_reverse] opacity-60"></div>
            </div>
        </div>
    </div>
);

export const SnakeIcon = (props: IconProps) => (
    <div className={`w-full h-full bg-[#1C1C1E] rounded-[22%] flex items-center justify-center shadow-sm relative overflow-hidden border border-gray-700 ${props.className || ''}`}>
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0.5 opacity-20">
            {[...Array(16)].map((_, i) => <div key={i} className="bg-gray-600"></div>)}
        </div>
        <div className="relative z-10 w-[70%] h-[70%] flex flex-col justify-between">
            {/* Snake Body */}
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div> {/* Apple */}

            <div className="absolute top-2 left-2 flex gap-1">
                <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-500 rounded-sm translate-y-3 -translate-x-4"></div>
            </div>
        </div>
    </div>
);

export const Game2048Icon = (props: IconProps) => (
    <div className={`w-full h-full bg-[#edc22e] rounded-[22%] flex items-center justify-center shadow-sm relative overflow-hidden border-2 border-[#bbada0] ${props.className || ''}`}>
        <div className="absolute inset-0 bg-[#bbada0] p-1 grid grid-cols-2 grid-rows-2 gap-1">
            <div className="bg-[#eee4da] rounded-sm flex items-center justify-center text-[10px] font-bold text-[#776e65]">2</div>
            <div className="bg-[#ede0c8] rounded-sm flex items-center justify-center text-[10px] font-bold text-[#776e65]">4</div>
            <div className="bg-[#f2b179] rounded-sm flex items-center justify-center text-[10px] font-bold text-white">8</div>
            <div className="bg-[#edc22e] rounded-sm flex items-center justify-center text-[10px] font-bold text-white shadow-inner">2048</div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
            <span className="text-white font-bold text-xl drop-shadow-md">2048</span>
        </div>
    </div>
);
