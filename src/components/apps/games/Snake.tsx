import { useState, useEffect, useCallback, useRef } from 'react';
import { Play, RotateCcw, Trophy } from 'lucide-react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export const SnakeGame = () => {
    const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Point>({ x: 15, y: 15 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('snake_highscore');
        return saved ? parseInt(saved, 10) : 0;
    });
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(INITIAL_SPEED);

    // Refs for mutable state in the game loop to avoid dependency closures
    const directionRef = useRef<Direction>('RIGHT');
    const lastRenderTimeRef = useRef<number>(0);
    const requestRef = useRef<number>(0);

    // Handle key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (directionRef.current !== 'DOWN') directionRef.current = 'UP';
                    break;
                case 'ArrowDown':
                    if (directionRef.current !== 'UP') directionRef.current = 'DOWN';
                    break;
                case 'ArrowLeft':
                    if (directionRef.current !== 'RIGHT') directionRef.current = 'LEFT';
                    break;
                case 'ArrowRight':
                    if (directionRef.current !== 'LEFT') directionRef.current = 'RIGHT';
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const generateFood = useCallback((currentSnake: Point[]) => {
        let newFood: Point;
        let isOnSnake;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
            isOnSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
        } while (isOnSnake);
        return newFood;
    }, []);

    // Helper to reset game state
    const resetGame = useCallback(() => {
        setSnake([{ x: 10, y: 10 }]);
        directionRef.current = 'RIGHT';
        setScore(0);
        setGameOver(false);
        setIsPlaying(true);
        setSpeed(INITIAL_SPEED);
        setFood(generateFood([{ x: 10, y: 10 }]));
    }, [generateFood]);

    // Game Logic Function (wrapped in Ref to be accessible in loop without stale closures)
    const gameLogic = useCallback(() => {
        setSnake(prevSnake => {
            const head = { ...prevSnake[0] };

            // Move head
            switch (directionRef.current) {
                case 'UP': head.y -= 1; break;
                case 'DOWN': head.y += 1; break;
                case 'LEFT': head.x -= 1; break;
                case 'RIGHT': head.x += 1; break;
            }

            // Check collision with walls
            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                setGameOver(true);
                setIsPlaying(false);
                return prevSnake;
            }

            // Check collision with self
            if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                setGameOver(true);
                setIsPlaying(false);
                return prevSnake;
            }

            const newSnake = [head, ...prevSnake];

            // Check if ate food
            if (head.x === food.x && head.y === food.y) {
                setScore(s => {
                    const newScore = s + 10;
                    setHighScore(prevHigh => {
                        if (newScore > prevHigh) {
                            localStorage.setItem('snake_highscore', newScore.toString());
                            return newScore;
                        }
                        return prevHigh;
                    });
                    return newScore;
                });
                setFood(generateFood(newSnake));
                setSpeed(s => Math.max(50, s * 0.98)); // Speed up slightly
                // Don't pop tail, so snake grows
            } else {
                newSnake.pop(); // Remove tail
            }

            return newSnake;
        });
    }, [food, generateFood]);

    // Keep a ref to the latest game logic
    const gameLogicRef = useRef(gameLogic);
    useEffect(() => {
        gameLogicRef.current = gameLogic;
    }, [gameLogic]);

    // The Loop
    useEffect(() => {
        if (!isPlaying || gameOver) {
            cancelAnimationFrame(requestRef.current);
            return;
        }

        const loop = (time: number) => {
            const secondsSinceLastRender = (time - lastRenderTimeRef.current) / 1000;

            if (secondsSinceLastRender < speed / 1000) {
                requestRef.current = requestAnimationFrame(loop);
                return;
            }

            lastRenderTimeRef.current = time;
            gameLogicRef.current(); // Execute latest logic
            requestRef.current = requestAnimationFrame(loop);
        };

        requestRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(requestRef.current);
    }, [isPlaying, gameOver, speed]);

    const touchStartRef = useRef<Point | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartRef.current) return;
        const touch = e.changedTouches[0];
        const diffX = touch.clientX - touchStartRef.current.x;
        const diffY = touch.clientY - touchStartRef.current.y;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal
            if (Math.abs(diffX) > 30) { // Threshold
                if (diffX > 0 && directionRef.current !== 'LEFT') directionRef.current = 'RIGHT';
                else if (diffX < 0 && directionRef.current !== 'RIGHT') directionRef.current = 'LEFT';
            }
        } else {
            // Vertical
            if (Math.abs(diffY) > 30) {
                if (diffY > 0 && directionRef.current !== 'UP') directionRef.current = 'DOWN';
                else if (diffY < 0 && directionRef.current !== 'DOWN') directionRef.current = 'UP';
            }
        }
        touchStartRef.current = null;
    };

    return (
        <div
            className="flex flex-col items-center justify-center p-4 h-full bg-gray-900 text-white rounded-lg select-none outline-none"
            tabIndex={0}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >

            {/* Header */}
            <div className="flex items-center justify-between w-full max-w-[400px] mb-4">
                <div className="flex items-center gap-2">
                    <Trophy className="text-yellow-400" size={20} />
                    <span className="font-bold text-yellow-400">{highScore}</span>
                </div>
                <div className="font-mono text-2xl font-bold">{score}</div>
                <button
                    onClick={resetGame}
                    title="Reset Game"
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            {/* Game Board */}
            <div
                className="relative bg-black/50 border-2 border-white/20 rounded-lg shadow-2xl overflow-hidden w-[400px] h-[400px]"
            >
                {!isPlaying && !gameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/60 backdrop-blur-sm">
                        <h1 className="text-4xl font-bold mb-4 text-green-500">SNAKE</h1>
                        <button
                            onClick={resetGame}
                            title="Start Game"
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105"
                        >
                            <Play size={20} fill="currentColor" />
                            START GAME
                        </button>
                        <p className="mt-4 text-white/50 text-sm">Use Arrow Keys or Swipe to Move</p>
                    </div>
                )}

                {gameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/80 backdrop-blur-md">
                        <h2 className="text-3xl font-bold mb-2 text-red-500">GAME OVER</h2>
                        <p className="text-xl mb-6">Score: {score}</p>
                        <button
                            onClick={resetGame}
                            title="Try Again"
                            className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Snake */}
                {snake.map((segment, i) => (
                    <div
                        key={`${segment.x}-${segment.y}-${i}`}
                        className="absolute rounded-sm transition-all duration-75"
                        style={{
                            left: segment.x * CELL_SIZE,
                            top: segment.y * CELL_SIZE,
                            width: CELL_SIZE - 2,
                            height: CELL_SIZE - 2,
                            backgroundColor: i === 0 ? '#4ade80' : '#22c55e', // Light green head, Green body
                            zIndex: i === 0 ? 2 : 1
                        }}
                    />
                ))}

                {/* Food */}
                <div
                    className="absolute bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-pulse"
                    style={{
                        left: food.x * CELL_SIZE,
                        top: food.y * CELL_SIZE,
                        width: CELL_SIZE - 2,
                        height: CELL_SIZE - 2,
                    }}
                />
            </div>
        </div>
    );
};
