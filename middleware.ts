import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request); // Optionally pass config as the second argument if cookie name or prefix is customized.

  console.log("~~~~~~~~~~~~~~~~", sessionCookie)

  if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", request.url));
	}
	return NextResponse.next();
}
 
export const config = {
	matcher: ["/admin/dashboard", "/admin/certificates/new"], // Specify the routes the middleware applies to
};