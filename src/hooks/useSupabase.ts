import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Allow env vars to be optional for now to prevent crash
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    link?: string;
}

// Hook for projects
export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            if (supabase) {
                const { data } = await supabase.from('projects').select('*');
                if (data && data.length > 0) {
                    setProjects(data);
                    setLoading(false);
                    return;
                }
            }
            // Fallback
            setProjects([
                { id: '1', title: 'Namude Yatra', description: 'AI Tourism Assistant', tags: ['AI', 'React'], image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944' },
                { id: '2', title: 'OptiHire', description: 'Resume Scanning', tags: ['Python', 'LLM'], image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4' }
            ]);
            setLoading(false);
        }
        fetchProjects();
    }, []);

    return { projects, loading };
};

export interface Song {
    id: string;
    title: string;
    artist: string;
    cover: string;
}

// Hook for songs
export const useSongs = () => {
    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        // Fallback only for now
        const timer = setTimeout(() => {
            setSongs([
                { id: '1', title: 'Midnight City', artist: 'M83', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17' },
                { id: '2', title: 'Starboy', artist: 'The Weeknd', cover: 'https://images.unsplash.com/photo-1621360841012-980b194fb820' },
            ]);
        }, 0);
        return () => clearTimeout(timer);
    }, []);
    return { songs };
};
