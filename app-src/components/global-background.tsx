'use client';

import { useTheme } from '../contexts/theme-context';

export default function GlobalBackground() {
    const { theme } = useTheme();

    return (
        <div
            className={`fixed inset-0 z-[-1] transition-all duration-1000 ${theme === 'dark' ? 'bg-[#000000]' : 'bg-slate-50'
                }`}
        />
    );
}
