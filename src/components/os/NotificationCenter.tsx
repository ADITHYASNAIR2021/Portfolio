import { motion } from 'framer-motion';
import { X, Bell, Calendar, MessageSquare } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NotificationProps {
    title: string;
    message: string;
    time: string;
    icon: LucideIcon;
    color: string;
}

const NotificationItem = ({ title, message, time, icon: Icon, color }: NotificationProps) => (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-3 border border-white/10 shadow-lg">
        <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                <Icon size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-white text-sm">{title}</h4>
                    <span className="text-xs text-white/50">{time}</span>
                </div>
                <p className="text-white/80 text-sm mt-1 leading-snug">{message}</p>
            </div>
        </div>
    </div>
);

export const NotificationCenter = ({ onClose }: { onClose: () => void }) => {
    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed top-0 right-0 w-[400px] h-full z-[70] bg-[#1e1e1e]/80 backdrop-blur-2xl border-l border-white/10 p-6 shadow-2xl overflow-y-auto"
            >
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold text-white">Notifications</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors"
                        title="Close Notifications"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Today */}
                    <div>
                        <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-4">Today</h3>
                        <NotificationItem
                            title="Calendar"
                            message="Project Review Meeting at 10:00 AM"
                            time="1h ago"
                            icon={Calendar}
                            color="bg-red-500"
                        />
                        <NotificationItem
                            title="Messages"
                            message="Sarah: Hey, did you see the new design updates?"
                            time="2h ago"
                            icon={MessageSquare}
                            color="bg-green-500"
                        />
                    </div>

                    {/* Yesterday */}
                    <div>
                        <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-4">Yesterday</h3>
                        <NotificationItem
                            title="System"
                            message="macOS update successfully installed."
                            time="1d ago"
                            icon={Bell}
                            color="bg-gray-500"
                        />
                    </div>
                </div>
            </motion.div>
        </>
    );
};
