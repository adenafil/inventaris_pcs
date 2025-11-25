import { useAppearance } from '@/hooks/use-appearance';
import { useEffect, useState } from 'react';
import Snowfall from 'react-snowfall';

export default function SnowfallComponent() {
    const { appearance } = useAppearance();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check if dark mode is active
        const darkModeActive =
            document.documentElement.classList.contains('dark');
        setIsDark(darkModeActive);

        // Listen for theme changes
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, [appearance]);

    // Determine snowflake color and opacity based on theme
    const snowflakeColor = isDark ? '#fff' : '#a8b5d1';
    const opacityRange: [number, number] = isDark ? [0.6, 1.0] : [0.4, 0.8];

    return (
        <Snowfall
            style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 10,
            }}
            snowflakeCount={100}
            color={snowflakeColor}
            radius={[0.5, 3.0]}
            speed={[1.0, 3.0]}
            wind={[-0.5, 2.0]}
            opacity={opacityRange}
            changeFrequency={200}
        />
    );
}
