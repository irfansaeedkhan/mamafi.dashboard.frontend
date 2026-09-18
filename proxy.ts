import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PREFIXES = [
  '/auth',
  '/passwords',
  '/email-sent',
  '/verify-email',
  '/privacy-policy',
  '/terms',
];

function isPublicPath(pathname: string) {
  return PUBLIC_PREFIXES.some(prefix => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const hasToken = Boolean(request.cookies.get('access_token')?.value);
  const isAuthPage = pathname.startsWith('/auth') || pathname.startsWith('/passwords');

  if (!hasToken && pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = '';
    return NextResponse.redirect(url);
  }

  if (hasToken && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard/user';
    url.search = '';
    return NextResponse.redirect(url);
  }

  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = hasToken ? '/dashboard/user' : '/auth/login';
    url.search = '';
    return NextResponse.redirect(url);
  }

  if (!hasToken && !isPublicPath(pathname) && pathname !== '/') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon|images|fonts|.*\\.webmanifest).*)',
  ],
};
