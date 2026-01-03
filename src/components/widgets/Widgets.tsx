import { CloudSun, Cpu, Wifi, Battery, Cloud, Sun, CloudRain, Thermometer } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Widgets.css';

// Glass morphism base styles
const glassStyle = "bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg shadow-black/10";

export const ClockWidget = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    const date = time.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className={`${glassStyle} p-4 w-44 text-white`}>
            <div className="text-center">
                <div className="text-4xl font-light tracking-wide">
                    {hours}:{minutes}
                    <span className="text-lg text-white/50 ml-1">{seconds}</span>
                </div>
                <div className="text-xs text-white/60 mt-1">{date}</div>
                <div className="text-[10px] text-white/40 mt-0.5">IST (UTC+5:30)</div>
            </div>
        </div>
    );
};

export const CalculatorWidget = () => {
    const [display, setDisplay] = useState('0');
    const [memory, setMemory] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputDigit = (digit: string) => {
        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? digit : display + digit);
        }
    };

    const inputOperator = (nextOperator: string) => {
        const inputValue = parseFloat(display);

        if (memory === null) {
            setMemory(inputValue);
        } else if (operator) {
            const result = calculate(memory, inputValue, operator);
            setDisplay(String(result));
            setMemory(result);
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const calculate = (a: number, b: number, op: string): number => {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '×': return a * b;
            case '÷': return b !== 0 ? a / b : 0;
            default: return b;
        }
    };

    const performCalculation = () => {
        if (operator && memory !== null) {
            const result = calculate(memory, parseFloat(display), operator);
            setDisplay(String(result));
            setMemory(null);
            setOperator(null);
            setWaitingForOperand(true);
        }
    };

    const clear = () => {
        setDisplay('0');
        setMemory(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    const buttons = [
        ['C', '±', '%', '÷'],
        ['7', '8', '9', '×'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '.', '=']
    ];

    return (
        <div className={`${glassStyle} p-3 w-44 text-white`}>
            <div className="text-right text-2xl font-light mb-2 px-1 truncate">
                {display}
            </div>
            <div className="grid grid-cols-4 gap-1.5">
                {buttons.flat().map((btn, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (btn === 'C') clear();
                            else if (btn === '=') performCalculation();
                            else if (['+', '-', '×', '÷'].includes(btn)) inputOperator(btn);
                            else if (btn === '±') setDisplay(String(-parseFloat(display)));
                            else if (btn === '%') setDisplay(String(parseFloat(display) / 100));
                            else inputDigit(btn);
                        }}
                        className={`${btn === '0' ? 'col-span-2' : ''
                            } ${['+', '-', '×', '÷', '='].includes(btn)
                                ? 'bg-orange-500 hover:bg-orange-400'
                                : ['C', '±', '%'].includes(btn)
                                    ? 'bg-white/30 hover:bg-white/40'
                                    : 'bg-white/10 hover:bg-white/20'
                            } rounded-lg py-2 text-sm font-medium transition-colors`}
                    >
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const WeatherWidget = () => {
    const [weather, setWeather] = useState({
        temp: 28,
        condition: 'Partly Cloudy',
        high: 32,
        low: 24,
        humidity: 65,
        loading: true
    });

    useEffect(() => {
        // Fetch real weather data from Open-Meteo API (free, no key required)
        const fetchWeather = async () => {
            try {
                // Kottayam, Kerala coordinates
                const response = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=9.5916&longitude=76.5222&current=temperature_2m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Asia/Kolkata'
                );
                const data = await response.json();

                const weatherCode = data.current.weather_code;
                let condition = 'Clear';
                if (weatherCode >= 1 && weatherCode <= 3) condition = 'Partly Cloudy';
                else if (weatherCode >= 45 && weatherCode <= 48) condition = 'Foggy';
                else if (weatherCode >= 51 && weatherCode <= 67) condition = 'Rainy';
                else if (weatherCode >= 71 && weatherCode <= 77) condition = 'Snowy';
                else if (weatherCode >= 80 && weatherCode <= 99) condition = 'Stormy';

                setWeather({
                    temp: Math.round(data.current.temperature_2m),
                    condition,
                    high: Math.round(data.daily.temperature_2m_max[0]),
                    low: Math.round(data.daily.temperature_2m_min[0]),
                    humidity: data.current.relative_humidity_2m,
                    loading: false
                });
            } catch (error) {
                console.error('Weather fetch error:', error);
                setWeather(prev => ({ ...prev, loading: false }));
            }
        };

        fetchWeather();
        const interval = setInterval(fetchWeather, 600000); // Update every 10 mins
        return () => clearInterval(interval);
    }, []);

    const getWeatherIcon = () => {
        switch (weather.condition) {
            case 'Clear': return <Sun size={28} className="text-yellow-400" />;
            case 'Rainy': return <CloudRain size={28} className="text-blue-400" />;
            case 'Stormy': return <CloudRain size={28} className="text-gray-400" />;
            default: return <CloudSun size={28} className="text-yellow-300" />;
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-500/80 to-blue-600/80 backdrop-blur-xl rounded-2xl p-4 w-44 text-white shadow-lg border border-white/20">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-sm">Kottayam</h3>
                    <div className="text-4xl font-light mt-1">
                        {weather.loading ? '--' : `${weather.temp}°`}
                    </div>
                </div>
                {getWeatherIcon()}
            </div>
            <div className="mt-3 text-xs opacity-90">
                {weather.condition}<br />
                H:{weather.high}° L:{weather.low}°
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs opacity-70">
                <Cloud size={12} />
                Humidity: {weather.humidity}%
            </div>
        </div>
    );
};

export const SystemWidget = () => {
    const [stats, setStats] = useState({
        cpu: 12,
        memory: 4.2,
        battery: 85,
        wifi: true
    });

    useEffect(() => {
        // Simulate changing system stats
        const interval = setInterval(() => {
            setStats(prev => ({
                cpu: Math.min(100, Math.max(5, prev.cpu + (Math.random() - 0.5) * 10)),
                memory: Math.min(8, Math.max(2, prev.memory + (Math.random() - 0.5) * 0.5)),
                battery: Math.max(20, prev.battery - 0.1),
                wifi: true
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`${glassStyle} p-4 w-44 text-white`}>
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Cpu size={14} className="text-green-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">CPU</span>
                            <span className="text-xs font-medium">{Math.round(stats.cpu)}%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                            <div
                                className="h-full bg-green-500 rounded-full transition-all duration-500 widget-progress-bar"
                                style={{ '--progress-width': `${stats.cpu}%` } as React.CSSProperties}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Thermometer size={14} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">Memory</span>
                            <span className="text-xs font-medium">{stats.memory.toFixed(1)} GB</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                            <div
                                className="h-full bg-blue-500 rounded-full transition-all duration-500 widget-progress-bar"
                                style={{ '--progress-width': `${(stats.memory / 8) * 100}%` } as React.CSSProperties}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <Battery size={14} className="text-yellow-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">Battery</span>
                            <span className="text-xs font-medium">{Math.round(stats.battery)}%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 widget-progress-bar ${stats.battery > 50 ? 'bg-yellow-500' : stats.battery > 20 ? 'bg-orange-500' : 'bg-red-500'
                                    }`}
                                style={{ '--progress-width': `${stats.battery}%` } as React.CSSProperties}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Wifi size={14} className="text-purple-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">WiFi</span>
                            <span className="text-xs font-medium text-green-400">Connected</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const QuoteWidget = () => {
    const quotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
        { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" }
    ];

    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex(prev => (prev + 1) % quotes.length);
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const quote = quotes[quoteIndex];

    return (
        <div className={`${glassStyle} p-4 w-44 text-white`}>
            <div className="text-2xl mb-2 opacity-30">"</div>
            <p className="text-xs leading-relaxed text-white/80 italic">
                {quote.text}
            </p>
            <p className="text-[10px] text-white/50 mt-2">— {quote.author}</p>
        </div>
    );
};
