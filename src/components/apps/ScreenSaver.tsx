import { useState, useEffect } from 'react';
import './ScreenSaver.css';

type AppType = 'fliqlo' | 'aerial' | 'matrix' | 'drift';

interface ScreenSaverProps {
    type?: AppType;
}

// FlipDigit component - declared outside to prevent recreation during render
const FlipDigit = ({ digit }: { digit: string }) => (
    <div className="relative w-32 h-48 md:w-48 md:h-72 bg-[#1a1a1a] rounded-lg mx-1 flex items-center justify-center overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] overflow-hidden rounded-t-lg">
            <div className="absolute inset-0 flex items-end justify-center pb-0">
                <span className="text-[8rem] md:text-[12rem] font-bold text-white leading-none translate-y-1/2">
                    {digit}
                </span>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#2a2a2a] to-[#1a1a1a] overflow-hidden rounded-b-lg">
            <div className="absolute inset-0 flex items-start justify-center pt-0">
                <span className="text-[8rem] md:text-[12rem] font-bold text-white leading-none -translate-y-1/2">
                    {digit}
                </span>
            </div>
        </div>
        <div className="absolute left-0 right-0 h-[2px] bg-black/50 z-10 top-1/2" />
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent" />
    </div>
);

export const ScreenSaver = ({ type = 'fliqlo' }: ScreenSaverProps) => {
    const [time, setTime] = useState(new Date());
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleClick = () => setIsActive(false);

    if (!isActive) {
        return (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-white text-center">
                    <div className="text-2xl mb-4">Screen Saver Deactivated</div>
                    <button
                        onClick={() => setIsActive(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                    >
                        Activate Again
                    </button>
                </div>
            </div>
        );
    }

    if (type === 'fliqlo') {
        return <FliqloScreenSaver time={time} onClick={handleClick} />;
    }

    if (type === 'matrix') {
        return <MatrixScreenSaver onClick={handleClick} />;
    }

    if (type === 'drift') {
        return <DriftScreenSaver onClick={handleClick} />;
    }

    return <FliqloScreenSaver time={time} onClick={handleClick} />;
};

// Fliqlo-style flip clock
const FliqloScreenSaver = ({ time, onClick }: { time: Date; onClick: () => void }) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');

    return (
        <div
            className="w-full h-full bg-black flex items-center justify-center cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-center">
                <FlipDigit digit={hours[0]} />
                <FlipDigit digit={hours[1]} />
                <div className="flex flex-col gap-6 mx-4">
                    <div className="w-4 h-4 bg-white/80 rounded-full" />
                    <div className="w-4 h-4 bg-white/80 rounded-full" />
                </div>
                <FlipDigit digit={minutes[0]} />
                <FlipDigit digit={minutes[1]} />
            </div>
            <div className="absolute bottom-8 text-gray-600 text-sm">
                Click anywhere to exit
            </div>
        </div>
    );
};

// Matrix rain effect
const MatrixScreenSaver = ({ onClick }: { onClick: () => void }) => {
    const columns = Math.floor(800 / 20);
    const [drops, setDrops] = useState(() => Array.from({ length: columns }, (_, i) => ({
        x: i * 20,
        chars: Array.from({ length: 30 }, () => String.fromCharCode(0x30A0 + Math.random() * 96))
    })));

    useEffect(() => {
        const interval = setInterval(() => {
            setDrops(prev => prev.map(drop => ({
                ...drop,
                chars: [
                    String.fromCharCode(0x30A0 + Math.random() * 96),
                    ...drop.chars.slice(0, -1)
                ]
            })));
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="w-full h-full bg-black overflow-hidden cursor-pointer font-mono"
            onClick={onClick}
        >
            {drops.map((drop, i) => (
                <div
                    key={i}
                    className="absolute text-green-500 text-sm matrix-column"
                    style={{ '--drop-x': drop.x } as React.CSSProperties}
                >
                    {drop.chars.map((char, j) => (
                        <div
                            key={j}
                            className="h-5 matrix-char"
                            style={{
                                '--char-opacity': j === 0 ? 1 : 1 - (j / drop.chars.length),
                                '--char-color': j === 0 ? '#fff' : '#00ff00'
                            } as React.CSSProperties}
                        >
                            {char}
                        </div>
                    ))}
                </div>
            ))}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-green-500 text-sm">
                Click anywhere to exit
            </div>
        </div>
    );
};

// Drift - floating shapes
const DriftScreenSaver = ({ onClick }: { onClick: () => void }) => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#a29bfe'];
    const [shapes, setShapes] = useState(() => Array.from({ length: 15 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 50 + Math.random() * 200,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.5 + Math.random() * 1.5
    })));
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setShapes(prev => prev.map(shape => ({
                ...shape,
                x: (shape.x + shape.speed * 0.1) % 120,
                y: (shape.y + Math.sin(Date.now() / 2000) * 0.1 + 100) % 120
            })));
            setTime(new Date());
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="w-full h-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden cursor-pointer"
            onClick={onClick}
        >
            {shapes.map((shape, i) => (
                <div
                    key={i}
                    className="absolute rounded-full blur-3xl opacity-30 drift-shape"
                    style={{
                        '--shape-x': `${shape.x}%`,
                        '--shape-y': `${shape.y}%`,
                        '--shape-size': shape.size,
                        '--shape-color': shape.color
                    } as React.CSSProperties}
                />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/20 text-9xl font-bold">
                    {time.getHours().toString().padStart(2, '0')}:
                    {time.getMinutes().toString().padStart(2, '0')}
                </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm">
                Click anywhere to exit
            </div>
        </div>
    );
};
