import { useOSStore } from '../../store/store';
import { TicTacToe } from './games/TicTacToe';
import { SnakeGame } from './games/Snake';
import { Game2048 } from './games/Game2048';
import { SnakeIcon, Game2048Icon } from './AppIcons';
import { Gamepad2, Trophy, ArrowRight, Dna } from 'lucide-react';

export const GameCenter = () => {
    const { openWindow } = useOSStore();

    const games = [
        {
            id: 'tictactoe',
            title: 'Tic Tac Toe',
            description: 'Classic strategy game for two players.',
            icon: <Dna size={32} className="text-blue-500" />,
            color: 'bg-blue-50',
            component: <TicTacToe />
        },
        {
            id: 'snake',
            title: 'Snake',
            description: 'Eat apples and grow your snake!',
            icon: <SnakeIcon className="w-8 h-8" />,
            color: 'bg-green-50',
            component: <SnakeGame />
        },
        {
            id: '2048',
            title: '2048',
            description: 'Join the numbers to get to 2048.',
            icon: <Game2048Icon className="w-8 h-8" />,
            color: 'bg-orange-50',
            component: <Game2048 />
        }
    ];

    return (
        <div className="h-full bg-[#fbfbfb] dark:bg-[#1e1e1e] text-black dark:text-white flex flex-col">
            {/* Header */}
            <div className="p-8 border-b border-gray-200 dark:border-white/10 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
                        <Gamepad2 size={40} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Game Center</h1>
                        <p className="text-white/80 font-medium">Arcade & Classics</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Trophy className="text-yellow-500" />
                    Featured Games
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map((game) => (
                        <div
                            key={game.id}
                            className={`group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer bg-white dark:bg-[#2d2d2d]`}
                            onClick={() => {
                                if (game.component) {
                                    openWindow(game.id, game.title, game.component);
                                } else {
                                    alert('Coming Soon!');
                                }
                            }}
                        >
                            <div className={`w-16 h-16 rounded-2xl ${game.color} dark:bg-white/5 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}>
                                {game.icon}
                            </div>

                            <h3 className="text-lg font-bold mb-1 group-hover:text-blue-500 transition-colors">{game.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2">{game.description}</p>

                            <div className="flex items-center text-sm font-semibold text-blue-500 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                Play Now <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
