"use client";

import { useEffect } from 'react';
import ActionSearchBar from '@/components/kokonutui/action-search-bar';

export default function Home() {
    useEffect(() => {
        document.cookie = 'visitedHome=true; path=/';
    }, []);

    return (
        <div className="min-h-[100vh] min-w-[100vw] overflow-hidden relative">
            <div className="pt-[80px] md:pt-[100px] flex justify-center">
                <ActionSearchBar />
            </div>
        </div>
    );
}