import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // If user visits root path `/`, redirect to `/en`
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  return NextResponse.next();
}

// Run middleware only on root path
export const config = {
  matcher: ["/"],
};
