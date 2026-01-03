import { Play, SkipForward, SkipBack, Pause, Volume2, VolumeX, Music2, Shuffle, Repeat } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

interface Song {
    id: string;
    title: string;
    artist: string;
    cover: string;
    audioUrl: string;
    duration: number;
}

// Using free sample audio from various sources
const SONGS: Song[] = [
    {
        id: '1',
        title: 'Ambient Dreams',
        artist: 'Chill Vibes',
        cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=320&auto=format&fit=crop',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        duration: 372
    },
    {
        id: '2',
        title: 'Electric Night',
        artist: 'Synthwave Artist',
        cover: 'https://images.unsplash.com/photo-1621360841012-980b194fb820?q=80&w=320&auto=format&fit=crop',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        duration: 280
    },
    {
        id: '3',
        title: 'Midnight Drive',
        artist: 'Retro Beats',
        cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=320&auto=format&fit=crop',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        duration: 305
    },
    {
        id: '4',
        title: 'Cosmic Journey',
        artist: 'Space Ambient',
        cover: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=320&auto=format&fit=crop',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        duration: 358
    },
    {
        id: '5',
        title: 'Digital Sunset',
        artist: 'Lo-Fi Producer',
        cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=320&auto=format&fit=crop',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        duration: 342
    },
];

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const Music = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(SONGS[0]);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const animationRef = useRef<number>(0);

    const drawVisualizer = useCallback(() => {
        if (!canvasRef.current || !analyserRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            // Safety check for analyser
            if (analyserRef.current) {
                analyserRef.current.getByteFrequencyData(dataArray);

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const barWidth = (canvas.width / bufferLength) * 2.5;
                let barHeight;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i];

                    // Gradient color based on frequency
                    const r = barHeight + (25 * (i / bufferLength));
                    const g = 250 * (i / bufferLength);
                    const b = 50;

                    ctx.fillStyle = `rgba(${r},${g},${b}, 0.5)`; // Semi-transparent
                    ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

                    x += barWidth + 1;
                }
            }
        };

        draw();
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    useEffect(() => {
        // Initialize Audio Context on first interaction
        const initAudioContext = () => {
            if (!audioContextRef.current && audioRef.current) {
                try {
                    const AudioConstructor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
                    const ctx = new AudioConstructor();
                    audioContextRef.current = ctx;
                    analyserRef.current = ctx.createAnalyser();

                    // Connect source
                    // Note: This might fail with CORS if the server doesn't support it, but we added crossOrigin="anonymous" to audio tag
                    sourceRef.current = ctx.createMediaElementSource(audioRef.current);
                    sourceRef.current.connect(analyserRef.current);
                    analyserRef.current.connect(ctx.destination);

                    analyserRef.current.fftSize = 256;
                } catch (e) {
                    console.error("Audio Context Init Error:", e);
                }
            }
        };

        if (isPlaying) {
            // Resume context if suspended (common in browsers)
            if (audioContextRef.current?.state === 'suspended') {
                audioContextRef.current.resume();
            }
            initAudioContext();
            audioRef.current?.play().catch(console.error);
            drawVisualizer();
        } else {
            audioRef.current?.pause();
            cancelAnimationFrame(animationRef.current);
        }

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, [isPlaying, currentSong, drawVisualizer]); // Re-run when song changes to ensure visualizer keeps going



    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleEnded = () => {
        if (isRepeat) {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        } else {
            playNext();
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
        setCurrentTime(time);
    };

    const playSong = (song: Song) => {
        setCurrentSong(song);
        setIsPlaying(true);
        setCurrentTime(0);
    };

    const playNext = () => {
        const currentIndex = SONGS.findIndex(s => s.id === currentSong.id);
        let nextIndex: number;

        if (isShuffled) {
            nextIndex = Math.floor(Math.random() * SONGS.length);
        } else {
            nextIndex = (currentIndex + 1) % SONGS.length;
        }

        playSong(SONGS[nextIndex]);
    };

    const playPrev = () => {
        if (currentTime > 3 && audioRef.current) {
            audioRef.current.currentTime = 0;
            return;
        }

        const currentIndex = SONGS.findIndex(s => s.id === currentSong.id);
        const prevIndex = currentIndex === 0 ? SONGS.length - 1 : currentIndex - 1;
        playSong(SONGS[prevIndex]);
    };

    return (
        <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f1a] text-white flex flex-col">
            <audio
                ref={audioRef}
                src={currentSong.audioUrl}
                crossOrigin="anonymous"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            />

            {/* Header */}
            <div className="h-14 flex items-center px-6 border-b border-white/10 bg-black/20 backdrop-blur-sm z-10">
                <Music2 size={20} className="text-pink-500" />
                <span className="font-bold text-lg ml-2">Music</span>
                {isPlaying && (
                    <div className="ml-auto px-2 py-1 rounded-full bg-pink-500/20 text-pink-500 text-[10px] md:text-xs font-bold animate-pulse">
                        Playing
                    </div>
                )}
            </div>

            <div className="flex-1 flex overflow-hidden relative">
                {/* Visualizer Background Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none opacity-30 z-0">
                    <canvas ref={canvasRef} width={600} height={100} className="w-full h-full" />
                </div>

                {/* Sidebar */}
                <div className="w-52 bg-black/30 border-r border-white/10 p-4 hidden sm:block z-10">
                    <div className="mb-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Library</h3>
                        <ul className="space-y-1">
                            <li className="bg-white/10 p-2.5 rounded-lg cursor-pointer font-medium flex items-center gap-2">
                                <Music2 size={16} /> All Songs
                            </li>
                            <li className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                                Favorites
                            </li>
                            <li className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                                Recently Played
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Playlists</h3>
                        <ul className="space-y-1 text-sm">
                            <li className="p-2 text-gray-400 hover:text-white cursor-pointer">🎵 Coding Vibes</li>
                            <li className="p-2 text-gray-400 hover:text-white cursor-pointer">🌙 Late Night</li>
                            <li className="p-2 text-gray-400 hover:text-white cursor-pointer">⚡ Energy Boost</li>
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-auto z-10">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-pink-500">♫</span> All Songs
                    </h2>
                    <div className="space-y-1">
                        {SONGS.map((song, index) => (
                            <div
                                key={song.id}
                                className={`flex items-center p-3 rounded-xl hover:bg-white/10 cursor-pointer group transition-all ${currentSong.id === song.id ? 'bg-white/10' : ''
                                    }`}
                                onClick={() => playSong(song)}
                            >
                                <div className="w-8 text-center text-sm text-gray-500 group-hover:hidden">
                                    {currentSong.id === song.id && isPlaying ? (
                                        <div className="flex justify-center gap-0.5">
                                            <div className="w-1 h-4 bg-pink-500 rounded animate-pulse" />
                                            <div className="w-1 h-3 bg-pink-500 rounded animate-pulse delay-75" />
                                            <div className="w-1 h-5 bg-pink-500 rounded animate-pulse delay-150" />
                                        </div>
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                                <div className="w-8 text-center hidden group-hover:block">
                                    <Play size={16} fill="white" className="mx-auto" />
                                </div>
                                <img src={song.cover} className="w-12 h-12 rounded-lg object-cover mx-4 shadow-lg" alt={song.title} />
                                <div className="flex-1 min-w-0">
                                    <div className={`font-medium truncate ${currentSong.id === song.id ? 'text-pink-500' : ''}`}>
                                        {song.title}
                                    </div>
                                    <div className="text-sm text-gray-400 truncate">{song.artist}</div>
                                </div>
                                <div className="text-sm text-gray-500 pr-4">
                                    {formatTime(song.duration)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Now Playing Bar */}
            <div className="h-auto md:h-24 bg-gradient-to-r from-[#1a1a2e] to-[#2a1a3e] border-t border-white/10 flex flex-col md:flex-row items-center px-4 py-4 md:py-0 md:px-6 shrink-0 z-20 relative">
                {/* Song Info */}
                <div className="flex items-center gap-4 w-1/4 min-w-0">
                    <img
                        src={currentSong.cover}
                        className="w-14 h-14 rounded-lg shadow-lg shadow-black/50"
                        alt="Cover"
                    />
                    <div className="min-w-0">
                        <div className="font-medium truncate">{currentSong.title}</div>
                        <div className="text-sm text-gray-400 truncate">{currentSong.artist}</div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center w-2/4">
                    <div className="flex items-center gap-6 mb-2">
                        <button
                            onClick={() => setIsShuffled(!isShuffled)}
                            className={`transition-colors ${isShuffled ? 'text-pink-500' : 'text-gray-400 hover:text-white'}`}
                            aria-label="Toggle shuffle"
                        >
                            <Shuffle size={18} />
                        </button>
                        <button onClick={playPrev} className="text-white/70 hover:text-white transition-colors" aria-label="Previous song">
                            <SkipBack size={22} fill="currentColor" />
                        </button>
                        <button
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg"
                            onClick={() => setIsPlaying(!isPlaying)}
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? (
                                <Pause size={20} fill="black" className="text-black" />
                            ) : (
                                <Play size={20} fill="black" className="text-black ml-0.5" />
                            )}
                        </button>
                        <button onClick={playNext} className="text-white/70 hover:text-white transition-colors" aria-label="Next song">
                            <SkipForward size={22} fill="currentColor" />
                        </button>
                        <button
                            onClick={() => setIsRepeat(!isRepeat)}
                            className={`transition-colors ${isRepeat ? 'text-pink-500' : 'text-gray-400 hover:text-white'}`}
                            aria-label="Toggle repeat"
                        >
                            <Repeat size={18} />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full max-w-md flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min="0"
                            max={duration || 100}
                            value={currentTime}
                            onChange={handleSeek}
                            className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                            aria-label="Seek"
                        />
                        <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Volume */}
                <div className="absolute top-4 right-4 md:static flex items-center gap-2 md:w-1/4 justify-end">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                            setVolume(parseFloat(e.target.value));
                            setIsMuted(false);
                        }}
                        className="hidden md:block w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                        aria-label="Volume"
                    />
                </div>
            </div>
        </div>
    );
};
