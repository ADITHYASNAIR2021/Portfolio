import { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SIZE = 4;

type Grid = number[][];

const getInitialBoard = () => {
    let newBoard = Array(SIZE).fill(0).map(() => Array(SIZE).fill(0));
    // Add two random tiles
    const addTile = (grid: number[][]) => {
        const emptyCells: { r: number, c: number }[] = [];
        grid.forEach((row, r) => {
            row.forEach((val, c) => {
                if (val === 0) emptyCells.push({ r, c });
            });
        });
        if (emptyCells.length === 0) return grid;
        const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const newGrid = grid.map(row => [...row]);
        newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
        return newGrid;
    };
    newBoard = addTile(addTile(newBoard));
    return newBoard;
};

export const Game2048 = () => {
    const [board, setBoard] = useState<number[][]>(getInitialBoard); // Initialize lazily
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('2048_highscore');
        return saved ? parseInt(saved, 10) : 0;
    });
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

    const touchStartRef = useRef<{ x: number, y: number } | null>(null);

    const checkGameOver = useCallback((grid: Grid) => {
        // Check for empty cells
        if (grid.flat().includes(0)) return false;

        // Check for merges
        for (let r = 0; r < SIZE; r++) {
            for (let c = 0; c < SIZE; c++) {
                const val = grid[r][c];
                if (c < SIZE - 1 && grid[r][c + 1] === val) return false;
                if (r < SIZE - 1 && grid[r + 1][c] === val) return false;
            }
        }
        return true;
    }, []);

    const addRandomTile = useCallback((grid: Grid): Grid => {
        const emptyCells: { r: number, c: number }[] = [];
        grid.forEach((row, r) => {
            row.forEach((val, c) => {
                if (val === 0) emptyCells.push({ r, c });
            });
        });

        if (emptyCells.length === 0) return grid;

        const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const newGrid = grid.map(row => [...row]);
        newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
        return newGrid;
    }, []);

    const initGame = useCallback(() => {
        setBoard(getInitialBoard());
        setScore(0);
        setGameOver(false);
        setWon(false);
    }, []);

    const moveRight = (grid: Grid): { newGrid: Grid, moved: boolean, scoreAdd: number } => {
        let moved = false;
        let scoreAdd = 0;
        const newGrid = grid.map(row => [...row]);

        for (let r = 0; r < SIZE; r++) {
            let row = newGrid[r].filter(val => val !== 0);
            for (let c = row.length - 1; c > 0; c--) {
                if (row[c] === row[c - 1]) {
                    row[c] *= 2;
                    scoreAdd += row[c];
                    row[c - 1] = 0;
                    moved = true;
                }
            }
            row = row.filter(val => val !== 0);
            while (row.length < SIZE) {
                row.unshift(0);
            }
            if (row.join(',') !== newGrid[r].join(',')) moved = true;
            newGrid[r] = row;
        }
        return { newGrid, moved, scoreAdd };
    };

    const rotateGrid = (grid: Grid): Grid => {
        const newGrid = Array(SIZE).fill(0).map(() => Array(SIZE).fill(0));
        for (let r = 0; r < SIZE; r++) {
            for (let c = 0; c < SIZE; c++) {
                newGrid[c][SIZE - 1 - r] = grid[r][c];
            }
        }
        return newGrid;
    };

    const rotateGridCounterClockwise = (grid: Grid): Grid => {
        const newGrid = Array(SIZE).fill(0).map(() => Array(SIZE).fill(0));
        for (let r = 0; r < SIZE; r++) {
            for (let c = 0; c < SIZE; c++) {
                newGrid[SIZE - 1 - c][r] = grid[r][c];
            }
        }
        return newGrid;
    };

    const handleMove = useCallback((direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
        if (gameOver) return;

        let processedGrid = board;
        let rotations = 0;

        // Rotate board so we always just logic for "Right"
        if (direction === 'LEFT') {
            processedGrid = rotateGrid(rotateGrid(board));
            rotations = 2;
        } else if (direction === 'UP') {
            processedGrid = rotateGrid(board);
            rotations = 1;
        } else if (direction === 'DOWN') {
            processedGrid = rotateGridCounterClockwise(board);
            rotations = 3;
        }

        const { newGrid, moved, scoreAdd } = moveRight(processedGrid);

        if (moved) {
            let finalGrid = newGrid;
            // Rotate back
            if (rotations === 1) finalGrid = rotateGridCounterClockwise(newGrid); // UP -> Right -> CCW = Original
            if (rotations === 2) finalGrid = rotateGrid(rotateGrid(newGrid)); // LEFT -> Right -> 180 = Original
            if (rotations === 3) finalGrid = rotateGrid(newGrid); // DOWN -> Right -> CW = Original

            const withNewTile = addRandomTile(finalGrid);
            setBoard(withNewTile);
            setScore(s => {
                const newScore = s + scoreAdd;
                if (newScore > highScore) {
                    setHighScore(newScore);
                    localStorage.setItem('2048_highscore', newScore.toString());
                }
                return newScore;
            });

            if (checkGameOver(withNewTile)) {
                setGameOver(true);
            }
            if (withNewTile.flat().includes(2048) && !won) {
                setWon(true);
            }
        }
    }, [board, gameOver, highScore, won, addRandomTile, checkGameOver]);

    // Touch Handlers
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
            if (Math.abs(diffX) > 30) {
                if (diffX > 0) handleMove('RIGHT');
                else handleMove('LEFT');
            }
        } else {
            if (Math.abs(diffY) > 30) {
                if (diffY > 0) handleMove('DOWN');
                else handleMove('UP');
            }
        }
        touchStartRef.current = null;
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                handleMove(e.key.replace('Arrow', '').toUpperCase() as 'UP' | 'DOWN' | 'LEFT' | 'RIGHT');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleMove]);

    // Color helpers
    const getTileColor = (value: number) => {
        const colors: Record<number, string> = {
            2: 'bg-[#eee4da] text-[#776e65]',
            4: 'bg-[#ede0c8] text-[#776e65]',
            8: 'bg-[#f2b179] text-white',
            16: 'bg-[#f59563] text-white',
            32: 'bg-[#f67c5f] text-white',
            64: 'bg-[#f65e3b] text-white',
            128: 'bg-[#edcf72] text-white text-3xl',
            256: 'bg-[#edcc61] text-white text-3xl',
            512: 'bg-[#edc850] text-white text-3xl',
            1024: 'bg-[#edc53f] text-white text-3xl',
            2048: 'bg-[#edc22e] text-white text-3xl shadow-[0_0_30px_rgba(243,215,74,0.5)]',
        };
        return colors[value] || 'bg-[#3c3a32] text-white text-2xl';
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 h-full bg-[#faf8ef] rounded-lg select-none text-[#776e65]">

            {/* Header */}
            <div className="flex items-center justify-between w-full max-w-sm mb-8">
                <div>
                    <h1 className="text-5xl font-bold text-[#776e65] mb-2">2048</h1>
                    <p className="text-[#776e65]/70 text-sm">Join the numbers!</p>
                </div>

                <div className="flex gap-2">
                    <div className="flex flex-col items-center bg-[#bbada0] p-2 px-4 rounded-md text-white min-w-[70px]">
                        <span className="text-xs font-bold uppercase tracking-wide text-[#eee4da]">Score</span>
                        <span className="text-xl font-bold">{score}</span>
                    </div>
                    <div className="flex flex-col items-center bg-[#bbada0] p-2 px-4 rounded-md text-white min-w-[70px]">
                        <span className="text-xs font-bold uppercase tracking-wide text-[#eee4da]">Best</span>
                        <span className="text-xl font-bold">{highScore}</span>
                    </div>
                </div>
            </div>

            <div
                className="relative bg-[#bbada0] p-2 rounded-lg w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] outline-none"
                tabIndex={0}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Result Overlay */}
                {gameOver && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#eee4da]/80 rounded-lg animate-fade-in">
                        <h2 className="text-4xl font-bold mb-4 text-[#776e65]">Game Over!</h2>
                        <button onClick={initGame} className="px-6 py-3 bg-[#8f7a66] text-white font-bold rounded hover:bg-[#7f6a56] transition-colors">Try Again</button>
                    </div>
                )}

                {won && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#edc22e]/50 rounded-lg animate-fade-in">
                        <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-md">You Win!</h2>
                        <button onClick={() => setWon(false)} className="px-6 py-3 bg-white text-[#776e65] font-bold rounded hover:bg-gray-100 transition-colors mb-2">Keep Playing</button>
                        <button onClick={initGame} className="text-white underline font-bold cursor-pointer">New Game</button>
                    </div>
                )}

                {/* Grid Grid */}
                <div className="grid grid-cols-4 gap-2 w-full h-full">
                    {board.map((row, r) => (
                        row.map((val, c) => (
                            <div
                                key={`${r}-${c}`}
                                className="relative flex items-center justify-center bg-[#cdc1b4] rounded-md w-full h-full"
                            >
                                <AnimatePresence mode='popLayout'>
                                    {val !== 0 && (
                                        <motion.div
                                            key={`${r}-${c}-${val}`} // Unique key for value changes to trigger animation
                                            initial={{ scale: 0, opacity: 0.5 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0.5 }} // Optional: smoother exit for merges
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className={`absolute inset-0 flex items-center justify-center rounded-md font-bold text-4xl ${getTileColor(val)}`}
                                        >
                                            {val}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))
                    ))}
                </div>
            </div>

            <div className="flex justify-end w-full max-w-sm mt-8">
                <button
                    onClick={initGame}
                    className="flex items-center gap-2 bg-[#8f7a66] text-[#f9f6f2] px-4 py-2 rounded font-bold hover:bg-[#9c8b7a] transition-colors"
                >
                    <RotateCcw size={18} />
                    New Game
                </button>
            </div>
        </div>
    );
};
