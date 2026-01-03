import { useState, useEffect } from 'react';

export const useTime = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours();
    // Day is between 6 AM (inclusive) and 6 PM (exclusive)
    const isDay = hours >= 6 && hours < 18;

    return { time, isDay };
};
