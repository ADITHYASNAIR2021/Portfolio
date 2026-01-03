import { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Download, Printer, Share, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface PreviewItem {
    id: string;
    name: string;
    type: 'image' | 'pdf' | 'document';
    url: string;
}

const SAMPLE_FILES: PreviewItem[] = [
    { id: '1', name: 'Resume_Adithya.pdf', type: 'pdf', url: '' },
    { id: '2', name: 'Profile_Photo.jpg', type: 'image', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800' },
    { id: '3', name: 'Portfolio_Screenshot.png', type: 'image', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800' },
    { id: '4', name: 'Graduation.jpg', type: 'image', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800' },
];

export const Preview = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoom, setZoom] = useState(100);
    const [rotation, setRotation] = useState(0);
    const [showSidebar, setShowSidebar] = useState(true);

    const currentFile = SAMPLE_FILES[currentIndex];

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 300));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
    const handleRotate = () => setRotation(prev => (prev + 90) % 360);
    const handlePrev = () => setCurrentIndex(prev => Math.max(prev - 1, 0));
    const handleNext = () => setCurrentIndex(prev => Math.min(prev + 1, SAMPLE_FILES.length - 1));

    return (
        <div className="w-full h-full bg-[#2d2d2d] flex flex-col text-white">
            {/* Toolbar */}
            <div className="h-12 bg-[#3d3d3d] border-b border-black/30 flex items-center px-4 gap-2 shrink-0">
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className={`p-2 rounded ${showSidebar ? 'bg-white/10' : ''} hover:bg-white/10`}
                    aria-label="Toggle sidebar"
                >
                    <Layers size={16} />
                </button>

                <div className="w-px h-6 bg-white/20 mx-2" />

                <button onClick={handlePrev} disabled={currentIndex === 0} className="p-2 hover:bg-white/10 rounded disabled:opacity-30" aria-label="Previous">
                    <ChevronLeft size={16} />
                </button>
                <button onClick={handleNext} disabled={currentIndex === SAMPLE_FILES.length - 1} className="p-2 hover:bg-white/10 rounded disabled:opacity-30" aria-label="Next">
                    <ChevronRight size={16} />
                </button>

                <div className="flex-1 text-center text-sm text-gray-300 truncate">
                    {currentFile.name}
                </div>

                <button onClick={handleZoomOut} className="p-2 hover:bg-white/10 rounded" aria-label="Zoom out">
                    <ZoomOut size={16} />
                </button>
                <span className="text-xs text-gray-400 w-12 text-center">{zoom}%</span>
                <button onClick={handleZoomIn} className="p-2 hover:bg-white/10 rounded" aria-label="Zoom in">
                    <ZoomIn size={16} />
                </button>

                <div className="w-px h-6 bg-white/20 mx-2" />

                <button onClick={handleRotate} className="p-2 hover:bg-white/10 rounded" aria-label="Rotate">
                    <RotateCw size={16} />
                </button>
                <button className="p-2 hover:bg-white/10 rounded" aria-label="Share">
                    <Share size={16} />
                </button>
                <button className="p-2 hover:bg-white/10 rounded" aria-label="Print">
                    <Printer size={16} />
                </button>
                <button className="p-2 hover:bg-white/10 rounded" aria-label="Download">
                    <Download size={16} />
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar - Thumbnails */}
                {showSidebar && (
                    <div className="w-48 bg-[#252525] border-r border-black/30 p-2 overflow-auto shrink-0">
                        {SAMPLE_FILES.map((file, index) => (
                            <div
                                key={file.id}
                                onClick={() => setCurrentIndex(index)}
                                className={`p-2 rounded cursor-pointer mb-2 ${index === currentIndex ? 'bg-blue-600' : 'hover:bg-white/10'
                                    }`}
                            >
                                <div className="aspect-[4/3] bg-gray-700 rounded mb-2 overflow-hidden flex items-center justify-center">
                                    {file.type === 'image' && file.url ? (
                                        <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-2xl">
                                            {file.type === 'pdf' ? '📄' : '🖼️'}
                                        </span>
                                    )}
                                </div>
                                <div className="text-xs truncate text-center">{file.name}</div>
                                <div className="text-[10px] text-gray-500 text-center">{index + 1} of {SAMPLE_FILES.length}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Preview Area */}
                <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-[#1a1a1a]">
                    <div
                        className="transition-transform duration-200"
                        style={{
                            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                        }}
                    >
                        {currentFile.type === 'image' && currentFile.url ? (
                            <img
                                src={currentFile.url}
                                alt={currentFile.name}
                                className="max-w-full max-h-[60vh] object-contain rounded shadow-2xl"
                            />
                        ) : currentFile.type === 'pdf' ? (
                            <div className="w-[500px] bg-white text-gray-900 p-8 rounded shadow-2xl">
                                <div className="text-center mb-6">
                                    <h1 className="text-2xl font-bold">ADITHYA S NAIR</h1>
                                    <p className="text-sm text-gray-600">Software Developer | AI/ML Enthusiast</p>
                                </div>
                                <div className="border-t pt-4 mt-4">
                                    <h2 className="font-bold text-lg mb-2">Education</h2>
                                    <p className="text-sm">B.Tech in CSE (AI/ML)</p>
                                    <p className="text-sm text-gray-600">Amrita Vishwa Vidyapeetham, 2021-2025</p>
                                </div>
                                <div className="border-t pt-4 mt-4">
                                    <h2 className="font-bold text-lg mb-2">Experience</h2>
                                    <p className="text-sm">AI R&D Intern at Doctreen</p>
                                    <p className="text-sm text-gray-600">Jan 2025 - May 2025</p>
                                </div>
                                <div className="border-t pt-4 mt-4">
                                    <h2 className="font-bold text-lg mb-2">Skills</h2>
                                    <div className="flex flex-wrap gap-1">
                                        {['Python', 'React', 'Node.js', 'TensorFlow', 'LangChain'].map(skill => (
                                            <span key={skill} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-8 text-center text-gray-400 text-xs">
                                    Preview Mode - Full resume available in Finder
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-400">
                                <div className="text-6xl mb-4">📄</div>
                                <div>Preview not available</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-[#3d3d3d] border-t border-black/30 flex items-center justify-between px-4 text-xs text-gray-400 shrink-0">
                <div>{currentIndex + 1} of {SAMPLE_FILES.length}</div>
                <div>{currentFile.type.toUpperCase()}</div>
                <div>{zoom}% - {rotation}°</div>
            </div>
        </div>
    );
};
