import { useEffect, useState } from 'react';

export function useScreen() {
    const [screenView, setScreenView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    useEffect(() => {
        const handleResize = () => {
            setScreenView(window.innerWidth < 768 ? 'mobile' : 'desktop');
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { screenView };
}
