import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  const jwt = await getToken({ req: request });
  const url = request.nextUrl.pathname;
  const witoutAuth = ["/auth/login", "/auth/register"];
  if (!jwt && !witoutAuth.includes(url)) {
    return NextResponse.next(
      {
        headers: requestHeaders,
      }
    )
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!.*\\..*|_next).*)",
};
