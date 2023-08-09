import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // const userToken = req.cookies.get('ummahlink_sid')?.value

  const sessionToken = req.cookies.has("ummahlink_sid");

  // console.log("USER TOKEN", userToken)

  console.log("ISSESSION", sessionToken);

  const host = req.nextUrl.protocol + req.headers.get("host");
  // console.log("host", host);




  // user login control
  if (sessionToken && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL(`${host}/`));
  }
  // Add a closing bracket here
  if (!sessionToken && req.nextUrl.pathname.includes("/user")) {
    return NextResponse.redirect(new URL(`${host}/login`));
  }
 
}

export const config = {
  matcher: ["/user/:path*", "/login/:path*","/login/:path*"], // Add "/profile" path here

}