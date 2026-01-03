import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

// Fix for default marker icon
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface JourneyPoint {
    id: string;
    name: string;
    location: string;
    coords: [number, number];
    period: string;
    type: 'origin' | 'education' | 'work';
    details: string[];
    achievements?: string[];
}

const JOURNEY_POINTS: JourneyPoint[] = [
    {
        id: 'ponkunnam',
        name: 'Ponkunnam',
        location: 'Kottayam, Kerala, India',
        coords: [9.5937, 76.5242],
        period: '2002 - 2020',
        type: 'origin',
        details: [
            'Birthplace and hometown',
            'Sreyas Public School (10th & 12th)'
        ],
        achievements: [
            '88% in 10th Grade (2018)',
            '87% in 12th Grade (2020)'
        ]
    },
    {
        id: 'amritapuri',
        name: 'Amritapuri',
        location: 'Kollam, Kerala, India',
        coords: [9.0988, 76.4855],
        period: '2021 - 2025',
        type: 'education',
        details: [
            'B.Tech in CS with AI/ML',
            'Amrita Vishwa Vidyapeetham'
        ],
        achievements: [
            'CGPA: 8.48',
            'ACM Chapter Chairman (2023-24)',
            'ICPC Coordinator (2023-24)',
            'Vidyut Core Committee (2024)'
        ]
    },
    {
        id: 'montpellier',
        name: 'Montpellier',
        location: 'Occitanie, France',
        coords: [43.6108, 3.8767],
        period: 'Jan - May 2025',
        type: 'work',
        details: [
            'AI R&D Research Intern',
            'Doctreen Healthcare AI'
        ],
        achievements: [
            'Medical Report Generation AI',
            'State-of-the-art NLP Systems',
            'User Experience Enhancement'
        ]
    }
];

const PATH_COORDS: [number, number][] = JOURNEY_POINTS.map(p => p.coords);

// Animated path component
const AnimatedPath = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => (p >= 100 ? 0 : p + 0.5));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Polyline
                positions={PATH_COORDS}
                pathOptions={{ color: '#3b82f6', weight: 2, opacity: 0.3 }}
            />
            <Polyline
                positions={PATH_COORDS}
                pathOptions={{
                    color: '#60a5fa',
                    weight: 3,
                    dashArray: '10, 10',
                    dashOffset: `${-progress}`,
                    opacity: 0.8
                }}
            />
        </>
    );
};

// Fly to location on click
const FlyToButton = ({ coords }: { coords: [number, number] }) => {
    const map = useMap();

    return (
        <button
            onClick={() => map.flyTo(coords, 10, { duration: 1.5 })}
            className="text-xs text-blue-400 hover:text-blue-300 underline mt-2"
        >
            Fly to location →
        </button>
    );
};

const getTypeColor = (type: JourneyPoint['type']) => {
    switch (type) {
        case 'origin': return 'bg-green-500';
        case 'education': return 'bg-blue-500';
        case 'work': return 'bg-purple-500';
    }
};

const getTypeLabel = (type: JourneyPoint['type']) => {
    switch (type) {
        case 'origin': return 'Home';
        case 'education': return 'Education';
        case 'work': return 'Work';
    }
};

export const Maps = () => {
    const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={[20, 40]}
                zoom={3}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                <AnimatedPath />

                {JOURNEY_POINTS.map((point) => (
                    <Marker
                        key={point.id}
                        position={point.coords}
                        eventHandlers={{
                            click: () => setSelectedPoint(point.id)
                        }}
                    >
                        <Popup>
                            <div className="min-w-[200px]">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-2 h-2 rounded-full ${getTypeColor(point.type)}`} />
                                    <span className="text-xs text-gray-500">{getTypeLabel(point.type)}</span>
                                </div>
                                <h3 className="font-bold text-lg">{point.name}</h3>
                                <p className="text-gray-600 text-sm">{point.location}</p>
                                <p className="text-blue-600 text-xs font-medium mt-1">{point.period}</p>

                                <div className="mt-3 pt-3 border-t">
                                    {point.details.map((d, i) => (
                                        <p key={i} className="text-sm text-gray-700">{d}</p>
                                    ))}
                                </div>

                                {point.achievements && (
                                    <div className="mt-3 pt-2 border-t">
                                        <p className="text-xs font-semibold text-gray-500 mb-1">Achievements:</p>
                                        {point.achievements.map((a, i) => (
                                            <p key={i} className="text-xs text-green-700">✓ {a}</p>
                                        ))}
                                    </div>
                                )}

                                <FlyToButton coords={point.coords} />
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Journey Panel */}
            <div className="absolute top-4 left-4 z-[400] bg-black/80 text-white p-5 rounded-2xl backdrop-blur-xl border border-white/10 max-w-xs shadow-2xl">
                <h3 className="font-bold text-lg mb-1">My Journey</h3>
                <p className="text-xs text-gray-400 mb-4">From Kerala to France 🌍</p>

                <div className="space-y-4">
                    {JOURNEY_POINTS.map((point, index) => (
                        <div
                            key={point.id}
                            className={`relative pl-6 cursor-pointer transition-all ${selectedPoint === point.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                                }`}
                            onClick={() => setSelectedPoint(point.id)}
                        >
                            {/* Timeline line */}
                            {index < JOURNEY_POINTS.length - 1 && (
                                <div className="absolute left-[5px] top-4 w-0.5 h-full bg-gradient-to-b from-blue-500 to-blue-500/20" />
                            )}

                            {/* Timeline dot */}
                            <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white ${getTypeColor(point.type)}`} />

                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">{point.name}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${getTypeColor(point.type)} text-white`}>
                                        {getTypeLabel(point.type)}
                                    </span>
                                </div>
                                <div className="text-xs text-blue-400">{point.period}</div>
                                <div className="text-xs text-gray-400 mt-1">
                                    {point.details[0]}
                                </div>
                                {point.achievements && point.achievements.length > 0 && (
                                    <div className="text-xs text-green-400 mt-1">
                                        ⭐ {point.achievements[0]}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-400">
                    📍 Click markers for details
                </div>
            </div>

            {/* Stats Panel */}
            <div className="absolute bottom-4 right-4 z-[400] bg-black/80 text-white p-4 rounded-xl backdrop-blur-xl border border-white/10 flex gap-6">
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">3</div>
                    <div className="text-xs text-gray-400">Locations</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">7000+</div>
                    <div className="text-xs text-gray-400">km Traveled</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">2</div>
                    <div className="text-xs text-gray-400">Countries</div>
                </div>
            </div>
        </div>
    );
};
