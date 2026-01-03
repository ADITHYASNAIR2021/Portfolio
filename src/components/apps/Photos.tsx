import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Share, ZoomIn, X, Grid, Square } from 'lucide-react';

interface Photo {
    id: string;
    url: string;
    title: string;
    date: string;
    location?: string;
}

// Sample photos using Unsplash
const PHOTOS: Photo[] = [
    { id: '1', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', title: 'Mountain Sunrise', date: '2024-12-15', location: 'Kerala' },
    { id: '2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', title: 'Portrait', date: '2024-11-20' },
    { id: '3', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800', title: 'Starry Night', date: '2024-10-10', location: 'Amritapuri' },
    { id: '4', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800', title: 'Foggy Forest', date: '2024-09-25', location: 'Munnar' },
    { id: '5', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', title: 'Sunlit Path', date: '2024-08-30' },
    { id: '6', url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800', title: 'Butterfly', date: '2024-07-15' },
    { id: '7', url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800', title: 'Valley View', date: '2024-06-20', location: 'France' },
    { id: '8', url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800', title: 'Reflection', date: '2024-05-10' },
    { id: '9', url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800', title: 'Sunset Beach', date: '2024-04-05', location: 'Varkala' },
    { id: '10', url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800', title: 'Ocean Waves', date: '2024-03-20' },
    { id: '11', url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800', title: 'Waterfall', date: '2024-02-14', location: 'Athirappilly' },
    { id: '12', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', title: 'Mountain Peak', date: '2024-01-01' },
];

export const Photos = () => {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [viewMode, setViewMode] = useState<'grid' | 'square'>('grid');

    const toggleFavorite = (id: string) => {
        setFavorites(prev => {
            const newFavs = new Set(prev);
            if (newFavs.has(id)) {
                newFavs.delete(id);
            } else {
                newFavs.add(id);
            }
            return newFavs;
        });
    };

    const navigatePhoto = (direction: 'prev' | 'next') => {
        if (!selectedPhoto) return;
        const currentIndex = PHOTOS.findIndex(p => p.id === selectedPhoto.id);
        const newIndex = direction === 'prev'
            ? (currentIndex - 1 + PHOTOS.length) % PHOTOS.length
            : (currentIndex + 1) % PHOTOS.length;
        setSelectedPhoto(PHOTOS[newIndex]);
    };

    return (
        <div className="w-full h-full bg-[#1e1e1e] flex flex-col">
            {/* Header */}
            <div className="h-14 flex items-center justify-between px-6 border-b border-white/10 bg-black/30 shrink-0">
                <div className="flex items-center gap-4">
                    <h1 className="font-semibold text-white">Photos</h1>
                    <span className="text-sm text-gray-400">{PHOTOS.length} items</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                        aria-label="Grid view"
                    >
                        <Grid size={18} className="text-white" />
                    </button>
                    <button
                        onClick={() => setViewMode('square')}
                        className={`p-2 rounded ${viewMode === 'square' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                        aria-label="Square view"
                    >
                        <Square size={18} className="text-white" />
                    </button>
                </div>
            </div>

            {/* Photo Grid */}
            <div className="flex-1 overflow-auto p-4">
                <div className={`grid gap-2 ${viewMode === 'grid' ? 'grid-cols-3 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-2 md:grid-cols-3'}`}>
                    {PHOTOS.map(photo => (
                        <div
                            key={photo.id}
                            className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <img
                                src={photo.url}
                                alt={photo.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-2 left-2 right-2">
                                    <div className="text-white text-sm font-medium truncate">{photo.title}</div>
                                    {photo.location && (
                                        <div className="text-white/70 text-xs">{photo.location}</div>
                                    )}
                                </div>
                            </div>
                            {favorites.has(photo.id) && (
                                <Heart size={16} className="absolute top-2 right-2 fill-red-500 text-red-500" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedPhoto && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
                    {/* Close */}
                    <button
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full"
                        aria-label="Close"
                    >
                        <X size={24} className="text-white" />
                    </button>

                    {/* Navigation */}
                    <button
                        onClick={() => navigatePhoto('prev')}
                        className="absolute left-4 p-3 hover:bg-white/10 rounded-full"
                        aria-label="Previous photo"
                    >
                        <ChevronLeft size={32} className="text-white" />
                    </button>
                    <button
                        onClick={() => navigatePhoto('next')}
                        className="absolute right-4 p-3 hover:bg-white/10 rounded-full"
                        aria-label="Next photo"
                    >
                        <ChevronRight size={32} className="text-white" />
                    </button>

                    {/* Photo */}
                    <div className="max-w-[80vw] max-h-[80vh]">
                        <img
                            src={selectedPhoto.url}
                            alt={selectedPhoto.title}
                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        />
                    </div>

                    {/* Info Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80">
                        <div className="flex items-center justify-between max-w-4xl mx-auto">
                            <div>
                                <h3 className="text-white font-medium text-lg">{selectedPhoto.title}</h3>
                                <div className="text-gray-400 text-sm">
                                    {selectedPhoto.date} {selectedPhoto.location && `• ${selectedPhoto.location}`}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => toggleFavorite(selectedPhoto.id)}
                                    className="p-2 hover:bg-white/10 rounded-full"
                                    aria-label="Toggle favorite"
                                >
                                    <Heart
                                        size={24}
                                        className={favorites.has(selectedPhoto.id) ? 'fill-red-500 text-red-500' : 'text-white'}
                                    />
                                </button>
                                <button className="p-2 hover:bg-white/10 rounded-full" aria-label="Share">
                                    <Share size={24} className="text-white" />
                                </button>
                                <button className="p-2 hover:bg-white/10 rounded-full" aria-label="Zoom">
                                    <ZoomIn size={24} className="text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
