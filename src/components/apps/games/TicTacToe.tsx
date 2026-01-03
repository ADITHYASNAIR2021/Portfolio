import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

type Player = 'X' | 'O';
type Board = (Player | null)[];

export const TicTacToe = () => {
    const [board, setBoard] = useState<Board>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

    const checkWinner = (squares: Board) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return squares.every(square => square !== null) ? 'Draw' : null;
    };

    const handleClick = (index: number) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
            if (gameWinner !== 'Draw') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                Tic Tac Toe
                {winner && (
                    <span className={`text-xl font-normal px-3 py-1 rounded-full ${winner === 'Draw' ? 'bg-gray-200 text-gray-800' : 'bg-green-100 text-green-700'}`}>
                        {winner === 'Draw' ? 'Draw!' : `${winner} Wins!`}
                    </span>
                )}
            </h1>

            <div className="grid grid-cols-3 gap-3 bg-gray-200 dark:bg-gray-700 p-3 rounded-xl shadow-lg">
                {board.map((square, i) => (
                    <button
                        key={i}
                        className={`w-20 h-20 sm:w-24 sm:h-24 bg-white dark:bg-gray-800 rounded-lg text-4xl sm:text-5xl font-bold flex items-center justify-center transition-all hover:bg-gray-50 dark:hover:bg-gray-700 ${square === 'X' ? 'text-blue-500' : 'text-pink-500'
                            }`}
                        onClick={() => handleClick(i)}
                        disabled={!!square || !!winner}
                    >
                        {square}
                    </button>
                ))}
            </div>

            <button
                onClick={resetGame}
                className="mt-8 flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20"
            >
                <RotateCcw size={20} />
                New Game
            </button>
        </div>
    );
};
