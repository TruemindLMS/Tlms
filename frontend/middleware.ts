import { NextResponse, type NextRequest } from "next/server";

function decodeJWT(token: string): any {
    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) return null;
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

// Strips surrounding brackets and whitespace from env values like "[ a@b.com, c@d.com ]"
function parseEnvList(value: string): string[] {
    return value
        .replace(/^\[|\]$/g, '') 
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
}

export async function middleware(request: NextRequest) {
    const response = NextResponse.next({
        request: { headers: request.headers },
    });

    const { pathname } = request.nextUrl;

    // 1. Read auth state from cookies
    const token = request.cookies.get('authToken')?.value ?? null;
    const userCookie = request.cookies.get('user')?.value ?? null;
    const user = userCookie
        ? (() => { try { return JSON.parse(userCookie); } catch { return null; } })()
        : null;

    const isAuthenticated = !!token && !!user;

    // 2. Derive role from JWT claims
    let userRole = 'Student';
    let emailFromJWT = '';

    if (token) {
        const decoded = decodeJWT(token);
        if (decoded) {
            userRole = (
                decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
                decoded['role'] ||
                decoded['Role'] ||
                'student'
            ).toLowerCase();

            emailFromJWT = (decoded['email'] || decoded['Email'] || '').toLowerCase();
        }
    }

    // 3. Resolve admin status
    const ADMIN_USERS = parseEnvList(process.env.ADMIN_USERS ?? '');
    const userEmail = (user?.email || emailFromJWT).toLowerCase();

    const isAdmin =
        userRole === 'admin' ||
        userRole === 'administrator' ||
        ADMIN_USERS.includes(userEmail);

    console.log('🔍 Middleware Auth Check:', {
        pathname,
        isAuthenticated,
        userRole,
        userEmail,
        isAdmin,
        ADMIN_USERS,
    });

    // 4. Route protection rules

    // Unauthenticated → block protected routes
    if (!isAuthenticated && (
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/admindashboard')
    )) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Authenticated on login page → route to correct dashboard
    if (isAuthenticated && pathname === '/') {
        return NextResponse.redirect(
            new URL(isAdmin ? '/admindashboard' : '/dashboard', request.url)
        );
    }

    if (isAuthenticated && isAdmin && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/admindashboard', request.url));
}

    // Non-admin blocked from admin areas
    if (isAuthenticated && !isAdmin && pathname.startsWith('/admindashboard')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }


    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
};