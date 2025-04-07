import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Sprawdza, czy użytkownik jest na '/'
    if (pathname === '/') {
        // Sprawdza, czy ciasteczko 'visitedHome' istnieje
        const visitedHome = request.cookies.get('visitedHome');

        if (visitedHome) {
            // Przekierowywyje na '/home'
            return NextResponse.redirect(new URL('/pages/home', request.url));
        }
    }

    // Jeśli warunek nie jest spełniony, kontynuuje do następnej odpowiedzi
    return NextResponse.next();
}