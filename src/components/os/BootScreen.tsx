import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../../store/store';
import { useSound } from '../../hooks/useSound';

export const BootScreen = () => {
    const { setBooting } = useOSStore();
    const [progress, setProgress] = useState(0);
    const { playBootSound } = useSound();

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    playBootSound();
                    setTimeout(() => setBooting(false), 500);
                    return 100;
                }
                return prev + 1; // Adjust speed here
            });
        }, 30);

        return () => clearInterval(timer);
    }, [setBooting, playBootSound]);

    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 text-white">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="mb-8"
            >
                <svg viewBox="0 0 24 24" className="w-24 h-24 fill-white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53-2.61-3.79-2.33-7.5-.16-10.03 1.34-1.55 3.19-1.68 4.29-1.66 1.25.02 2.13.79 2.81.79.68 0 1.95-1.02 3.51-.83 1.15.02 2.36.42 3.29 1.4-2.82 1.48-2.38 5.62.9 6.8-.68 1.76-1.57 3.32-2.19 4.54zM15.5 5.5c.64-1.09 1.1-2.42.92-3.78-1.29.08-2.67.92-3.46 2.01-.65.9-1.09 2.14-.94 3.49 1.37.12 2.76-.71 3.48-1.72z" />
                </svg>
            </motion.div>

            <div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};
