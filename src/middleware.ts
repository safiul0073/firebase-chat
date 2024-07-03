import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from './app/api/auth';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  // const jwt = (await getToken({ req: request }));
  //   if (!jwt) {
        
  //   }

    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!.*\\..*|_next).*)',
}