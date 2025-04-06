"use client";

import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        // Ustaw ciasteczko 'visitedHome' na 'true' po załadowaniu strony
        document.cookie = 'visitedHome=true; path=/';
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold underline text-center">
                Hello!
            </h1>
            <p className="text-center">
                This is home page of the app.
            </p>
        </div>
    );
}