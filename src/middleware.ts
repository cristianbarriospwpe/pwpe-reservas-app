import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionToken = process.env.ADMIN_SESSION_TOKEN;
  const currentSession = request.cookies.get("pwpe_admin_session")?.value;

  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  if (isLoginPage) {
    return NextResponse.next();
  }

  if (!sessionToken || currentSession !== sessionToken) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};