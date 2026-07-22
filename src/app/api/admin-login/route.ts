import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = formData.get("password");

  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionToken = process.env.ADMIN_SESSION_TOKEN;

  if (!adminPassword || !sessionToken) {
    return NextResponse.redirect(
      new URL("/admin/login?error=config", request.url),
    );
  }

  if (password !== adminPassword) {
    return NextResponse.redirect(
      new URL("/admin/login?error=password", request.url),
    );
  }

  const response = NextResponse.redirect(new URL("/admin", request.url));

  response.cookies.set("pwpe_admin_session", sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}