import { useState, useRef, useEffect, useCallback } from 'react';
import { VideoOff, Video, Mic, MicOff, Phone, Maximize, RotateCcw } from 'lucide-react';

export const FaceTime = () => {
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [hasError, setHasError] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const stopCamera = useCallback(() => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    }, []);

    const startCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
                audio: false
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setHasError(false);
        } catch (err) {
            console.error('Camera access denied:', err);
            setHasError(true);
        }
    }, []);

    useEffect(() => {
        if (isVideoOn) {
            // The setState in startCamera happens after awaiting getUserMedia, not synchronously
            // eslint-disable-next-line
            void startCamera();
        } else {
            stopCamera();
        }

        return () => stopCamera();
    }, [isVideoOn, startCamera, stopCamera]);

    return (
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex flex-col">
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                {hasError ? (
                    <div className="text-center text-white">
                        <div className="text-6xl mb-4">📷</div>
                        <div className="text-xl font-medium mb-2">Camera Access Required</div>
                        <div className="text-gray-400 text-sm max-w-md">
                            Please allow camera access in your browser settings to use FaceTime.
                        </div>
                        <button
                            onClick={() => { setHasError(false); setIsVideoOn(true); }}
                            className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2 mx-auto"
                        >
                            <RotateCcw size={16} /> Try Again
                        </button>
                    </div>
                ) : isVideoOn ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover scale-x-[-1]"
                    />
                ) : (
                    <div className="text-center text-white">
                        <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                            <span className="text-5xl">👤</span>
                        </div>
                        <div className="text-xl font-medium">Adithya S Nair</div>
                        <div className="text-gray-400 mt-2">Camera Off</div>
                    </div>
                )}
            </div>

            <div className="h-24 bg-black/50 backdrop-blur-xl flex items-center justify-center gap-6 shrink-0">
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/20'
                        }`}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                    {isMuted ? <MicOff size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
                </button>

                <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${!isVideoOn ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/20'
                        }`}
                    aria-label={isVideoOn ? 'Turn off video' : 'Turn on video'}
                >
                    {isVideoOn ? <Video size={24} className="text-white" /> : <VideoOff size={24} className="text-white" />}
                </button>

                <button
                    className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                    aria-label="End call"
                >
                    <Phone size={28} className="text-white rotate-[135deg]" />
                </button>

                <button
                    className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Full screen"
                >
                    <Maximize size={24} className="text-white" />
                </button>
            </div>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                FaceTime Ready
            </div>
        </div>
    );
};
