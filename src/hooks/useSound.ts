import { useCallback } from 'react';
import { useOSStore } from '../store/store';

// Sound URLs - using free sound effects
const SOUNDS = {
    boot: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b871c49b.mp3', // Chime
    trash: 'https://cdn.pixabay.com/download/audio/2024/09/20/audio_5159048a1c.mp3', // Crumple
    error: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c153e2.mp3', // Funk/Error
    screenshot: 'https://cdn.pixabay.com/download/audio/2022/12/13/audio_82c2125e19.mp3', // Shutter
    click: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_732b210214.mp3', // Subtle Click
    swoosh: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_331b266768.mp3', // Swoosh
    notification: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_02484ae26c.mp3', // Glass
};

type SoundName = keyof typeof SOUNDS;

// Pre-load audio elements for better performance
const audioCache: Map<SoundName, HTMLAudioElement> = new Map();

const getAudio = (name: SoundName): HTMLAudioElement => {
    if (!audioCache.has(name)) {
        const audio = new Audio(SOUNDS[name]);
        audio.preload = 'auto';
        audioCache.set(name, audio);
    }
    return audioCache.get(name)!;
};

export const useSound = () => {
    const { volume, soundEnabled } = useOSStore();

    const playSound = useCallback((soundName: SoundName) => {
        // Don't play if muted or sounds disabled
        if (volume === 0 || !soundEnabled) return;

        try {
            const audio = getAudio(soundName);
            // Clone the audio for overlapping plays
            const clone = audio.cloneNode() as HTMLAudioElement;
            clone.volume = volume / 100;
            clone.play().catch(() => {
                // Ignore autoplay errors
            });
        } catch (error) {
            console.warn('Failed to play sound:', soundName, error);
        }
    }, [volume, soundEnabled]);

    const playBootSound = useCallback(() => playSound('boot'), [playSound]);
    const playTrashSound = useCallback(() => playSound('trash'), [playSound]);
    const playErrorSound = useCallback(() => playSound('error'), [playSound]);
    const playScreenshotSound = useCallback(() => playSound('screenshot'), [playSound]);
    const playClickSound = useCallback(() => playSound('click'), [playSound]);
    const playSwooshSound = useCallback(() => playSound('swoosh'), [playSound]);
    const playNotificationSound = useCallback(() => playSound('notification'), [playSound]);

    return {
        playSound,
        playBootSound,
        playTrashSound,
        playErrorSound,
        playScreenshotSound,
        playClickSound,
        playSwooshSound,
        playNotificationSound,
    };
};
